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
