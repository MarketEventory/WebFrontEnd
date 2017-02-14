// URL analyze logic
var request = {
	getQuerystring: function (key, default_) {
		if (default_ == null) {
			default_ = "";
		}
		var search = unescape(location.search);
		if (search == "") {
			return default_;
		}
		search = search.substr(1);
		var params = search.split("&");
		for (var i = 0; i < params.length; i++) {
			var pairs = params[i].split("=");
			if (pairs[0] == key) {
				return pairs[1];
			}
		}

		return default_;
	}
}