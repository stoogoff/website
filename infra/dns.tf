
data "bunnynet_dns_zone" "dns" {
	domain = var.domain
}

resource "bunnynet_dns_record" "bare" {
	zone = data.bunnynet_dns_zone.dns.id

	name  = ""
	type  = "CNAME"
	value = "${bunnynet_pullzone.www.name}.${bunnynet_pullzone.www.cdn_domain}"
}

resource "bunnynet_dns_record" "www" {
	zone = data.bunnynet_dns_zone.dns.id

	name  = "www"
	type  = "CNAME"
	value = "${bunnynet_pullzone.www.name}.${bunnynet_pullzone.www.cdn_domain}"
}

resource "bunnynet_dns_record" "cdn" {
	zone = data.bunnynet_dns_zone.dns.id

	name  = "cdn"
	type  = "CNAME"
	value = "${bunnynet_pullzone.cdn.name}.${bunnynet_pullzone.cdn.cdn_domain}"
}

resource "bunnynet_dns_record" "games" {
	zone = data.bunnynet_dns_zone.dns.id

	name  = "games"
	type  = "CNAME"
	value = "${bunnynet_pullzone.games.name}.${bunnynet_pullzone.games.cdn_domain}"
}


resource "bunnynet_dns_record" "mail" {
	zone = data.bunnynet_dns_zone.dns.id

	name  = "mail"
	type  = "A"
	value = var.mail_server
}

resource "bunnynet_dns_record" "mx" {
	zone = data.bunnynet_dns_zone.dns.id

	name     = ""
	type     = "MX"
	value    = "${bunnynet_dns_record.mail.name}.${data.bunnynet_dns_zone.dns.domain}"
	priority = 10
}
