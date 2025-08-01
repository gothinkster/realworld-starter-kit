
data "aws_caller_identity" "current" {}

resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
  tags = {
    Name = "${var.project_prefix}-vpc"
  }
}

resource "aws_subnet" "subnet_a" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.1.0/24"
  availability_zone = "ap-southeast-2a"
  tags = {
    Name = "${var.project_prefix}-subnet-a"
  }
}

resource "aws_subnet" "subnet_b" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.2.0/24"
  availability_zone = "ap-southeast-2b"
  tags = {
    Name = "${var.project_prefix}-subnet-b"
  }
}

resource "aws_security_group" "ecs_sg" {
  vpc_id = aws_vpc.main.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 8000
    to_port     = 8000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.project_prefix}-ecs-sg"
  }
}

resource "aws_ecs_service" "cypress" {
  name            = "${var.project_prefix}-cypress-service"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.cypress.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets         = [aws_subnet.subnet_a.id, aws_subnet.subnet_b.id]
    security_groups = [aws_security_group.ecs_sg.id]
  }
}

resource "aws_ecs_service" "backend" {
  name            = "${var.project_prefix}-backend-service"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.backend.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets         = [aws_subnet.subnet_a.id, aws_subnet.subnet_b.id]
    security_groups = [aws_security_group.ecs_sg.id]
  }
}

resource "aws_ecs_service" "frontend" {
  name            = "${var.project_prefix}-frontend-service"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.frontend.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets         = [aws_subnet.subnet_a.id, aws_subnet.subnet_b.id]
    security_groups = [aws_security_group.ecs_sg.id]
  }
}

resource "aws_ecs_task_definition" "backend" {
  family                = "${var.project_prefix}-backend-task"
  network_mode          = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  cpu                   = var.task_cpu
  memory                = var.task_memory

  container_definitions = jsonencode([
    {
      name      = "backend-container"
      image     = "${aws_ecr_repository.backend.repository_url}:${var.project_prefix}-backend-image"
      essential = true
      portMappings = [
        {
          containerPort = 8000
          hostPort      = 8000
        }
      ]
    }
  ])
}

resource "aws_ecs_task_definition" "frontend" {
  family                = "${var.project_prefix}-frontend-task"
  network_mode          = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  cpu                   = var.task_cpu
  memory                = var.task_memory

  container_definitions = jsonencode([
    {
      name      = "frontend-container"
      image     = "${aws_ecr_repository.frontend.repository_url}:${var.project_prefix}-frontend-image"
      essential = true
      portMappings = [
        {
          containerPort = 80
          hostPort      = 80
        }
      ]
    }
  ])
}

resource "aws_ecs_task_definition" "cypress" {
  family                = "${var.project_prefix}-cypress-task"
  network_mode          = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  cpu                   = var.task_cpu
  memory                = var.task_memory

  container_definitions = jsonencode([
    {
      name      = "cypress-container"
      image     = "${aws_ecr_repository.cypress.repository_url}:${var.project_prefix}-cypress-image"
      essential = true
      volumes = [
        {
          host = {
            sourcePath = "/frontend"
          }
          containerPath = "/e2e"
        }
      ]
    }
  ])
}

resource "aws_iam_role" "ecs_task_execution_role" {
  name = "${var.project_prefix}-ecsTaskExecutionRole"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        },
        Action = "sts:AssumeRole"
      }
    ]
  })

  managed_policy_arns = [
    "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
  ]
}

resource "aws_ecs_cluster" "main" {
  name = "${var.project_prefix}-ecs-cluster"
}

# tfsec:ignore:aws-ecr-repository-customer-key
resource "aws_ecr_repository" "backend" {
  name                 = "${var.project_prefix}-backend-repo"
  image_tag_mutability = "MUTABLE"
  image_scanning_configuration {
    scan_on_push = true
  }

  encryption_configuration {
    encryption_type = "KMS"
  }
}

resource "aws_ecr_repository" "frontend" {
  name                 = "${var.project_prefix}-frontend-repo"
  image_tag_mutability = "MUTABLE"
  image_scanning_configuration {
    scan_on_push = true
  }

  encryption_configuration {
    encryption_type = "KMS"
  }
}

resource "aws_ecr_repository" "cypress" {
  name                 = "${var.project_prefix}-cypress-repo"
  image_tag_mutability = "MUTABLE"
  image_scanning_configuration {
    scan_on_push = true
  }

  encryption_configuration {
    encryption_type = "KMS"
  }
}

resource "aws_ecr_lifecycle_policy" "backend" {
  repository = aws_ecr_repository.backend.name
  policy     = templatefile(var.lifecycle_policy, {})
}

resource "aws_ecr_lifecycle_policy" "frontend" {
  repository = aws_ecr_repository.frontend.name
  policy     = templatefile(var.lifecycle_policy, {})
}

resource "aws_ecr_lifecycle_policy" "cypress" {
  repository = aws_ecr_repository.cypress.name
  policy     = templatefile(var.lifecycle_policy, {})
}

resource "aws_ecr_registry_scanning_configuration" "scan_configuration" {
  scan_type = "ENHANCED"

  rule {
    scan_frequency = "CONTINUOUS_SCAN"
    repository_filter {
      filter      = "*"
      filter_type = "WILDCARD"
    }
  }
}
