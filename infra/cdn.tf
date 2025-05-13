
resource "bunnynet_storage_zone" "cdn" {
	name                 = "${var.service_name}-cdn"
	zone_tier            = "Standard"
	region               = "UK"
	replication_regions  = ["BR", "NY", "LA", "SG", "SYD"]
}

resource "bunnynet_pullzone" "cdn" {
	name         = "${var.service_name}-cdn"
	cors_enabled = false

	origin {
		type        = "StorageZone"
		storagezone = bunnynet_storage_zone.cdn.id
	}

	routing {
		tier  = "Standard"
		zones = ["AF", "ASIA", "EU", "SA", "US"]
	}
}

resource "bunnynet_pullzone_hostname" "bunnynet_cdn" {
	pullzone    = bunnynet_pullzone.cdn.id
	name        = "${var.service_name}-cdn.b-cdn.net"
	tls_enabled = true
	force_ssl   = true
}

resource "bunnynet_pullzone_hostname" "cdn" {
	pullzone    = bunnynet_pullzone.cdn.id
	name        = "cdn.${data.bunnynet_dns_zone.dns.domain}"
	tls_enabled = true
	force_ssl   = true
}

resource "bunnynet_pullzone_edgerule" "redirect_pullzone_domain_cdn" {
	enabled     = true
	pullzone    = bunnynet_pullzone.cdn.id
	description = "Redirect pullzone domain to cdn domain."

	actions = [
		{
			type       = "Redirect"
			parameter1 = "https://${bunnynet_pullzone_hostname.cdn.name}"
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
				"https://${bunnynet_pullzone_hostname.bunnynet_cdn.name}/*"
			]
			parameter1 = null
			parameter2 = null
		}
	]
}
