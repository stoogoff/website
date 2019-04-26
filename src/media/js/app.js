
function time(nodes) {
	for(var i = 0, len = nodes.length; i < len; ++i) {
		var node = nodes[i];
		var time = node.getAttribute("datetime");
		var format = false;

		if(time.match(/^\d{4}$/)) {
			time += "-01-01";
			format = "YYYY";
		}
		else if(time.match(/^\d{4}-\d{2}$/)) {
			time += "-01";
			format = "MMMM YYYY";
		}
		else if(time.match(/^\d{4}-\d{2}-\d{2}$/)) {
			time += "T00:00";
			format = "Do MMMM YYYY";
		}
		else if(time.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/)) {
			format = "Do MMMM YYYY [at] HH:mm";
		}

		if(format) {
			node.setAttribute("title", moment(time).format(format));
		}
	}
}

window.onload = function() {
	time(document.getElementsByTagName("time"));
};