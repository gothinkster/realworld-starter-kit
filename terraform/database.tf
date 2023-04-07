provider "aws" {
  region = "sa-east-1"
  alias  = "saopaulo"
}

data "aws_ssm_parameter" "token_id" {
  name     = "/planetscale/id"
  provider = aws.saopaulo
}

data "aws_ssm_parameter" "token_secret" {
  name            = "/planetscale/token"
  provider        = aws.saopaulo
  with_decryption = true
}

provider "planetscale" {
  service_token_id = data.aws_ssm_parameter.token_id.value
  service_token    = data.aws_ssm_parameter.token_secret.value
}

locals {
  planetscale = {
    database     = "realworld-app"
    organization = "santunioni"
  }
}

resource "planetscale_database" "db" {
  count        = var.ENVIRONMENT == "production" ? 1 : 0
  organization = local.planetscale.organization
  name         = local.planetscale.database
  provider     = planetscale
  provisioner "local-exec" {
    command = <<EOF
local retries=30
local db=${local.planetscale.database}
local branch=main
local org=${local.planetscale.organization}

# check whether fifth parameter is set, otherwise use default value
if [ -z "$5" ]; then
    local max_timeout=60
else
    local max_timeout=$5
fi

local count=0
local wait=1

echo "Checking if branch $branch is ready for use..."
while true; do
    local raw_output=`pscale branch list $db --org $org --format json`
    # check return code, if not 0 then error
    if [ $? -ne 0 ]; then
        echo "Error: pscale branch list returned non-zero exit code $?: $raw_output"
        return 1
    fi
    local output=`echo $raw_output | jq ".[] | select(.name == \"$branch\") | .ready"`
    # test whether output is false, if so, increase wait timeout exponentially
    if [ "$output" == "false" ]; then
        # increase wait variable exponentially but only if it is less than max_timeout
        if [ $((wait * 2)) -le $max_timeout ]; then
            wait=$((wait * 2))
        else
            wait=$max_timeout
        fi

        count=$((count+1))
        if [ $count -ge $retries ]; then
            echo "Branch $branch is not ready after $retries retries. Exiting..."
            return 2
        fi
        echo "Branch $branch is not ready yet. Retrying in $wait seconds..."
        sleep $wait
    elif [ "$output" == "true" ]; then
        echo "Branch $branch is ready for use."
        return 0
    else
        echo "Branch $branch in unknown status: $raw_output"
        return 3
    fi
done
EOF
  }
}

data "planetscale_database" "db" {
  count        = var.ENVIRONMENT == "production" ? 0 : 1
  organization = local.planetscale.organization
  name         = local.planetscale.database
  provider     = planetscale
}

resource "planetscale_branch" "db" {
  count         = var.ENVIRONMENT == "production" ? 0 : 1
  organization  = local.planetscale.organization
  database      = local.planetscale.database
  parent_branch = "main"
  name          = var.ENVIRONMENT
  provider      = planetscale
  provisioner "local-exec" {
    command = <<EOF
local retries=30
local db=${local.planetscale.database}
local branch=${var.ENVIRONMENT}
local org=${local.planetscale.organization}

# check whether fifth parameter is set, otherwise use default value
if [ -z "$5" ]; then
    local max_timeout=60
else
    local max_timeout=$5
fi

local count=0
local wait=1

echo "Checking if branch $branch is ready for use..."
while true; do
    local raw_output=`pscale branch list $db --org $org --format json`
    # check return code, if not 0 then error
    if [ $? -ne 0 ]; then
        echo "Error: pscale branch list returned non-zero exit code $?: $raw_output"
        return 1
    fi
    local output=`echo $raw_output | jq ".[] | select(.name == \"$branch\") | .ready"`
    # test whether output is false, if so, increase wait timeout exponentially
    if [ "$output" == "false" ]; then
        # increase wait variable exponentially but only if it is less than max_timeout
        if [ $((wait * 2)) -le $max_timeout ]; then
            wait=$((wait * 2))
        else
            wait=$max_timeout
        fi

        count=$((count+1))
        if [ $count -ge $retries ]; then
            echo "Branch $branch is not ready after $retries retries. Exiting..."
            return 2
        fi
        echo "Branch $branch is not ready yet. Retrying in $wait seconds..."
        sleep $wait
    elif [ "$output" == "true" ]; then
        echo "Branch $branch is ready for use."
        return 0
    else
        echo "Branch $branch in unknown status: $raw_output"
        return 3
    fi
done
EOF
  }
}

resource "planetscale_branch_password" "db" {
  name         = var.ENVIRONMENT
  organization = local.planetscale.organization
  database     = local.planetscale.database
  branch       = var.ENVIRONMENT == "production" ? "main" : planetscale_branch.db[0].name
  depends_on = [
    planetscale_branch.db,
    data.planetscale_database.db,
    planetscale_database.db
  ]
}

locals {
  database = {
    host     = planetscale_branch_password.db.host
    database = local.planetscale.database
    username = planetscale_branch_password.db.username
    password = planetscale_branch_password.db.password
  }
}