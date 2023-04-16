variable "ENVIRONMENT" {
  description = "The environment to deploy into"
  type        = string
}

variable "DATABASE_URL" {
  description = "The database url"
  type        = string
}

data "external" "git" {
  program = [
    "git",
    "log",
    "--pretty=format:{ \"sha\": \"%H\" }",
    "-1",
    "HEAD"
  ]
}

locals {
  COMMON_TAGS = {
    Environment = var.ENVIRONMENT
    RepoLink    = "https://github.com/santunioni/realworld-app"
  }
  name = "realworld-api-${var.ENVIRONMENT}"
}