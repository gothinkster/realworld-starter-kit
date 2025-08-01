terraform {
    required_providers {
      aws = {
        source = "hashicorp/aws"
        version = "5.49.0"
      }
    }

    backend "s3" {}
}

provider "aws" {
    region = "ap-southeast-2"
}