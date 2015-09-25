app.provider('$headers', function Headers() {

	this.$get = function() {

		function getHeaderValue(name) {
			var req = new XMLHttpRequest();
			req.open('GET', document.location, false);
			req.send(null);
			
			return req.getResponseHeader(name);			
		}

		return {
			getValue : getHeaderValue
		};
	};
});
