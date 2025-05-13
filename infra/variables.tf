
variable "bunny_api_key" {
	type        = string
	description = "bunny.net API key"
}

variable "mail_server" {
	type        = string
	description = "Mail server IP address"
}

variable "domain" {
	type        = string
	description = "Domain name"
}

variable "service_name" {
	type        = string
	description = "Name of this service"
}

variable "web_server" {
	type        = string
	description = "IP Address of the external server"
}
