
resource "bunnynet_storage_zone" "games" {
	name                 = "${var.service_name}-games"
	zone_tier            = "Standard"
	region               = "UK"
	replication_regions  = ["BR", "NY", "LA", "SG", "SYD"]
}

resource "bunnynet_pullzone" "games" {
	name         = "${var.service_name}-games"
	cors_enabled = false

	origin {
		type        = "StorageZone"
		storagezone = bunnynet_storage_zone.games.id
	}

	routing {
		tier  = "Standard"
		zones = ["AF", "ASIA", "EU", "SA", "US"]
	}
}

resource "bunnynet_pullzone_hostname" "bunnynet_games" {
	pullzone    = bunnynet_pullzone.games.id
	name        = "${var.service_name}-games.b-cdn.net"
	tls_enabled = true
	force_ssl   = true
}

resource "bunnynet_pullzone_hostname" "games" {
	pullzone    = bunnynet_pullzone.games.id
	name        = "games.${data.bunnynet_dns_zone.dns.domain}"
	tls_enabled = true
	force_ssl   = true
}

resource "bunnynet_pullzone_edgerule" "redirect_pullzone_domain_games" {
	enabled     = true
	pullzone    = bunnynet_pullzone.games.id
	description = "Redirect pullzone domain to games domain."

	actions = [
		{
			type       = "Redirect"
			parameter1 = "https://${bunnynet_pullzone_hostname.games.name}"
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
				"https://${bunnynet_pullzone_hostname.bunnynet_games.name}/*"
			]
			parameter1 = null
			parameter2 = null
		}
	]
}
