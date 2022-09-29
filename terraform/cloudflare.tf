terraform {
  cloud {
    organization = "gangoffront"

    workspaces {
      name = "realworld-qwik"
    }
  }
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 3.0"
    }
  }
}

provider "cloudflare" {}

variable "zone_id" {
  default = "0b140084d6f4cd3e6b278eedcf6fec1a"
}

variable "account_id" {
  default = "5df477d4f9a8cf72185ef8f44fd1e144"
}

variable "domain" {
  default = "gangoffront.com"
}

variable "project_name" {
  default = "gangoffront-realworld-qwik"
}

resource "cloudflare_record" "realworld_qwik" {
  name    = "realworld-qwik"
  proxied = true
  ttl     = 1
  type    = "CNAME"
  value   = format("%s.pages.dev", var.project_name)
  zone_id = var.zone_id
}

resource "cloudflare_pages_project" "gangoffront_realworld_qwik" {
  account_id        = var.account_id
  name              = var.project_name
  production_branch = "master"
  build_config {
    destination_dir = "dist"
    build_command   = "npm run build"
    root_dir        = "/"
  }
  source {
    type = "github"
    config {
      owner                         = "gang-of-front"
      repo_name                     = "realworld-qwik"
      production_branch             = "master"
      pr_comments_enabled           = true
      deployments_enabled           = true
      production_deployment_enabled = true
      preview_branch_includes       = ["preview"]
      preview_branch_excludes       = ["master"]
    }
  }
}
