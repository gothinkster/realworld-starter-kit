resource "aws_api_gateway_resource" "proxy" {
  rest_api_id = aws_api_gateway_rest_api.api.id
  parent_id   = aws_api_gateway_rest_api.api.root_resource_id
  path_part   = "{proxy+}"
}

resource "aws_api_gateway_method" "any" {
  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_resource.proxy.id
  http_method   = "ANY"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "any_to_lambda" {
  rest_api_id             = aws_api_gateway_rest_api.api.id
  resource_id             = aws_api_gateway_method.any.resource_id
  http_method             = aws_api_gateway_method.any.http_method
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.realworld_api_function.invoke_arn
  integration_http_method = "POST" # AWS lambdas can only be invoked with the POST method
}

resource "aws_lambda_permission" "gw_lambda_proxy" {
  function_name = aws_lambda_function.realworld_api_function.arn
  statement_id  = "AllowExecutionFromApiGateway"
  action        = "lambda:InvokeFunction"
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.api.execution_arn}/*/*/*"
}