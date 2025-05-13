
resource "bunnynet_pullzone" "www" {
	name                 = "${var.service_name}-web"
	cors_enabled         = false
	add_canonical_header = true

	origin {
		type                = "OriginUrl"
		url                 = "http://${var.web_server}"
		forward_host_header = true
	}

	routing {
		tier  = "Standard"
		zones = ["AF", "ASIA", "EU", "SA", "US"]
	}
}

resource "bunnynet_pullzone_hostname" "bunnynet_web" {
	pullzone    = bunnynet_pullzone.www.id
	name        = "${var.service_name}-web.b-cdn.net"
	tls_enabled = true
	force_ssl   = true
}

resource "bunnynet_pullzone_hostname" "www" {
	pullzone    = bunnynet_pullzone.www.id
	name        = "www.${data.bunnynet_dns_zone.dns.domain}"
	tls_enabled = true
	force_ssl   = true
}

resource "bunnynet_pullzone_edgerule" "redirect_bare_domain" {
	enabled     = true
	pullzone    = bunnynet_pullzone.www.id
	description = "Redirect pullzone domain to www domain."

	actions = [
		{
			type       = "Redirect"
			parameter1 = "https://${bunnynet_pullzone_hostname.www.name}"
			parameter2 = "301"
			parameter3 = null
		}
	]

	match_type = "MatchAny"
	triggers = [
		{
			type       = "Url"
			match_type = "MatchAny"
			patterns   = [
				"https://${data.bunnynet_dns_zone.dns.domain}/*",
				"https://${bunnynet_pullzone_hostname.bunnynet_web.name}/*"
			]
			parameter1 = null
			parameter2 = null
		}
	]
}
