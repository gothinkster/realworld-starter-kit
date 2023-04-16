resource "aws_iam_role" "realworld_api_function_role" {
  name               = local.name
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
  function_name = local.name
  role          = aws_iam_role.realworld_api_function_role.arn
  tags          = local.COMMON_TAGS
  provider      = aws
  environment {
    variables = {
      DATABASE_URL = var.DATABASE_URL
      BASE_URL     = aws_api_gateway_deployment.deployment.invoke_url
      API_PREFIX   = ""
      VERSION      = data.external.git.result.sha
    }
  }
  filename         = "${path.module}/../build.zip"
  source_code_hash = filebase64sha256("${path.module}/../build.zip")
  handler          = "lambda.handler"
  runtime          = "nodejs16.x"
  timeout          = 60 * 5
  memory_size      = 516
}

output "FUNCTION_NAME" {
  value = aws_lambda_function.realworld_api_function.function_name
}
