data "terraform_remote_state" "auth" {
  backend = "s3"
  config = {
    bucket = "dpg-state-s3"
    key    = "auth/${var.environment}/terraform.tfstate"
    region = "eu-west-1"
  }
}

data "terraform_remote_state" "apis" {
  backend = "s3"
  config = {
    bucket = "dpg-state-s3"
    key    = "apis/${var.environment}/terraform.tfstate"
    region = "eu-west-1"
  }
}

data "terraform_remote_state" "webapp" {
  backend = "s3"
  config = {
    bucket = "dpg-state-s3"
    key    = "webapp/${var.environment}/terraform.tfstate"
    region = "eu-west-1"
  }
}

data "aws_route53_zone" "skillslounge" {
  name = "skillslounge.io."
}

data "template_file" "environment" {
  template = "${file(".env.tpl")}"
  vars = {
    environment      = var.environment
    region           = var.region
    user_pool_id     = data.terraform_remote_state.auth.outputs.cognito_id
    app_client_id    = data.terraform_remote_state.auth.outputs.app_client_id
    identity_pool_id = data.terraform_remote_state.auth.outputs.identity_pool_id
    zone_id          = data.aws_route53_zone.skillslounge.zone_id
    agw_url          = data.terraform_remote_state.apis.outputs.agw_invoke_url
    agw_key          = data.terraform_remote_state.apis.outputs.agw_key
    url              = data.terraform_remote_state.webapp.outputs.url
    captcha_site_key = var.environment == "prod" ? "6LccNs4ZAAAAAEzKe-onpvxFI5yrCeKtGCaWkyp3" : "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
    sls_api_url      = var.environment == "prod" ? "https://api.skillslounge.io" : "https://api-dev.skillslounge.io"
  }
}


resource "local_file" "foo" {
  content  = data.template_file.environment.rendered
  filename = "../.env"
}
