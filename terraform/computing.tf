provider "aws" {
  region = var.REGION
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
  tags     = local.common_tags
  provider = aws
}

resource "aws_lambda_function" "realworld_api_function" {
  function_name = "realworld-api-function-${var.ENVIRONMENT}"
  role          = aws_iam_role.realworld_api_function_role.arn
  tags          = local.common_tags
  provider      = aws
  environment {
    variables = {
      DATABASE_URL = "mysql://${local.database.username}:${local.database.password}@${local.database.host}/${local.database.database}}"
    }
  }
  filename = "${path.module}/realworld-api.zip"
  handler  = "index"
  runtime  = "nodejs18.x"
}

resource "aws_lambda_function_url" "realworld_api_function_url" {
  function_name      = aws_lambda_function.realworld_api_function.function_name
  depends_on         = [aws_lambda_function.realworld_api_function]
  authorization_type = "NONE"
  provider           = aws
}

output "API_URL" {
  value = aws_lambda_function_url.realworld_api_function_url.function_url
}