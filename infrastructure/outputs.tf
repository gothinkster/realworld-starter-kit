output "be_ecr_repo_url" {
  value = aws_ecr_repository.backend.repository_url
}

output "be_ecr_repo_arn" {
  value = aws_ecr_repository.backend.arn
}

output "fe_ecr_repo_url" {
  value = aws_ecr_repository.frontend.repository_url
}

output "fe_ecr_repo_arn" {
  value = aws_ecr_repository.frontend.arn
}

output "cy_ecr_repo_url" {
  value = aws_ecr_repository.cypress.repository_url
}

output "cy_ecr_repo_arn" {
  value = aws_ecr_repository.cypress.arn
}

output "subnet_ids" {
  value = [aws_subnet.subnet_a.id, aws_subnet.subnet_b.id]
}

output "security_group_id" {
  value = aws_security_group.ecs_sg.id
}