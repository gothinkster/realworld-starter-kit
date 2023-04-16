# Stage Deployment - Stages works as a version of your API. You can have multiple stages for the same API.
resource "aws_api_gateway_deployment" "deployment" {
  rest_api_id = aws_api_gateway_rest_api.api.id
  stage_name  = var.ENVIRONMENT

  depends_on = [
    aws_api_gateway_integration.options_integration,
  ]
}

output "API_GATEWAY_URL" {
  value = aws_api_gateway_deployment.deployment.invoke_url
}
