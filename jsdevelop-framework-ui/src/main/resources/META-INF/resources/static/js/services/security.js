app.provider('$security', function () {
	
	var roles = {};
	
	this.$get = function() {

		addRole = function () {
			
			for (var i = 0; i < arguments.length; i++) {
				if (angular.isArray(arguments[i])) {
					this.addRole.apply(this, arguments[i]);
				
				} else if (!roles[arguments[i]]) {
					roles[arguments[i]] = true;
				}
			}
			
		};
		
		removeRole = function () {
			
			for (var i = 0; i < arguments.length; i++) {
				
				if (angular.isArray(arguments[i])) {
					this.removeRole.apply(this, arguments[i]);
					
				} else if (roles[arguments[i]]) {
					delete roles[arguments[i]];
				}
			}
		};	
		
		hasRole = function () {
			
			for (var i = 0; i < arguments.length; i++) {
				if (angular.isArray(arguments[i]) && this.hasRole.apply(this, arguments[i])) {
					return true;
					
				} else if (angular.isArray(arguments[i]) === false && roles[arguments[i]]) {
					return true;
				}
			}
			
			return false;
		};		

		return {
			addRole : addRole,
			removeRole : removeRole,
			hasRole : hasRole
		};
	};		
});

