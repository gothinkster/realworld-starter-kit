terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
    planetscale = {
      source  = "s1ntaxe770r/planetscale"
      version = "~> 0.2.0"
    }
  }

  backend "s3" {
    bucket         = "santunioni-iac-state"
    region         = "us-east-1"
    dynamodb_table = "santunioni-iac-state-lock"
    key            = "realworld-app/ephemeral.tfstate"
  }
}

variable "ENVIRONMENT" {
  description = "The environment to deploy into"
  type        = string
}

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

resource "planetscale_branch" "ephemeral" {
  organization  = local.planetscale.organization
  database      = local.planetscale.database
  parent_branch = "main"
  name          = var.ENVIRONMENT
  provider      = planetscale
}

resource "planetscale_branch_password" "password" {
  name       = planetscale_branch.ephemeral.name
  organization = planetscale_branch.ephemeral.organization
  database     = planetscale_branch.ephemeral.database
  branch       = planetscale_branch.ephemeral.name
  provider     = planetscale
}

output "DATABASE_URL" {
  value = "mysql://root:${planetscale_branch_password.password.password}@${planetscale_branch.ephemeral.name}.psql.${local.planetscale.organization}.planetscale.net:3306/${local.planetscale.database}"
}