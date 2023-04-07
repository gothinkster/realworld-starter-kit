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
    key            = "realworld-app/terraform.tfstate"
  }
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

resource "planetscale_database" "production" {
  organization = local.planetscale.organization
  name         = local.planetscale.database
  provider     = planetscale
}
