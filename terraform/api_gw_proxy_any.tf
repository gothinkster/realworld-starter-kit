resource "aws_api_gateway_method" "request_method" {
  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_resource.proxy.id
  http_method   = "ANY"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "request_integration" {
  rest_api_id             = aws_api_gateway_rest_api.api.id
  resource_id             = aws_api_gateway_method.request_method.resource_id
  http_method             = aws_api_gateway_method.request_method.http_method
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.realworld_api_function.invoke_arn
  integration_http_method = "POST" # AWS lambdas can only be invoked with the POST method
}

resource "aws_lambda_permission" "allow_api_gateway" {
  function_name = aws_lambda_function.realworld_api_function.arn
  statement_id  = "AllowExecutionFromApiGateway"
  action        = "lambda:InvokeFunction"
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.api.execution_arn}/*/*/*"
}