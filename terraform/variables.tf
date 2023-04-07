variable "ENVIRONMENT" {
  description = "The environment to deploy into"
  type        = string
  default     = "production"
}

variable "REGION" {
  description = "The region to deploy into"
  type        = string
  validation {
    condition     = contains(["us-east-1", "sa-east-1"], var.REGION)
    error_message = "The region must be one of the following: us-east-1, sa-east-1"
  }
  default = "us-east-1"
}


locals {
  common_tags = {
    Environment = var.ENVIRONMENT
    RepoLink    = "https://github.com/santunioni/realworld-app"
  }
}
