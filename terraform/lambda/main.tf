terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }

  backend "s3" {
    bucket         = "santunioni-iac-state"
    region         = "us-east-1"
    dynamodb_table = "santunioni-iac-state-lock"
    key            = "realworld-app/production/lambda.tfstate"
  }
}

variable "ENVIRONMENT" {
  description = "The environment to deploy into"
  type        = string
  default     = "production"
}

variable "DATABASE_URL" {
  description = "The database url"
  type        = string
}

locals {
  COMMON_TAGS = {
    Environment = var.ENVIRONMENT
    RepoLink    = "https://github.com/santunioni/realworld-app"
  }
  REGION = "us-east-1"
}

provider "aws" {
  region = local.REGION
}

resource "aws_iam_role" "realworld_api_function_role" {
  name               = "realworld-api-function-${var.ENVIRONMENT}"
  assume_role_policy = <<EOF
    {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Action": "sts:AssumeRole",
          "Principal": {
            "Service": "lambda.amazonaws.com"
          },
          "Effect": "Allow",
          "Sid": ""
        }
      ]
    }
EOF
  managed_policy_arns = [
    "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
  ]
  tags     = local.COMMON_TAGS
  provider = aws
}

resource "aws_lambda_function" "realworld_api_function" {
  function_name = "realworld-api-function-${var.ENVIRONMENT}"
  role          = aws_iam_role.realworld_api_function_role.arn
  tags          = local.COMMON_TAGS
  provider      = aws
  environment {
    variables = {
      DATABASE_URL = var.DATABASE_URL
    }
  }
  filename = "${path.module}/../../build.zip"
  handler  = "build/lambda.handler"
  runtime  = "nodejs16.x"
}

resource "aws_lambda_function_url" "realworld_api_function_url" {
  function_name      = aws_lambda_function.realworld_api_function.function_name
  depends_on         = [aws_lambda_function.realworld_api_function]
  authorization_type = "NONE"
  provider           = aws
  cors {
    allow_origins = [
      "*"
    ]
    allow_methods     = ["*"]
    allow_credentials = true
  }
}

output "API_URL" {
  value = aws_lambda_function_url.realworld_api_function_url.function_url
}

output "FUNCTION_NAME" {
  value = aws_lambda_function.realworld_api_function.function_name
}
