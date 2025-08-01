variable "project_prefix" {
  description = "The prefix of the project"
  type        = string
}

variable "task_cpu" {
  description = "The CPU units to allocate for the tasks"
  type        = string
  default     = "256"
}

variable "task_memory" {
  description = "The memory in MiB to allocate for the tasks"
  type        = string
  default     = "512"
}

variable "iam_role" {
  description = "Self-hosted runner EC2 instance role"
  type        = string
}

variable "lifecycle_policy" {
  description = "the lifecycle policy to be applied to the ECR repos"
  type        = string
}

variable "aws_account_id" {
  description = "Target AWS Account ID"
  type        = string
}
