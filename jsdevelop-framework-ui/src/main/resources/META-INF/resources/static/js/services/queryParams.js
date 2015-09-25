app.provider('$queryParams', function QueryParams() {

	this.$get = function() {

		function getValue(name) {
			
			var url = location.href;
			name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
			var regexS = "[\\?&]"+name+"=([^&#]*)";
			var regex = new RegExp( regexS );
			var results = regex.exec( url );
			
			return results == null ? null : results[1];	
		}

		return {
			get : getValue
		};
	};
});
