app.provider('$pager', function Pager() {

	this.$get = function() {

		function Pager(resource, array) {
			this.resource = resource;
			this.array = array;
			
			this.maxSize = 5;
			this.currentPage = 1;
			this.currentLimit = 10;
			this.filter = {};
			this.sorting = [];
			
			this.results = null;
			this.totalResults = null;
			this.numPages = null;
			
			this.arrayPages = null;
			this.arrayLimits = [10,20,50,100];
			
			this.apply = function (filter) {
				this.filter = filter;
				this._goTo(1, false);
			};
			
			this.execute = function (filter) {
				this.filter = filter;
				this._goTo(1, true);
			};
			
			this.reload = function () {
				this._goTo(this.currentPage, false);
			};
			
			this.goTo = function (page) {
				this._goTo(page, true);
			};
			
			this._goTo = function (page, flag) {
				
				var actualFilter = {};
				angular.extend(actualFilter, this.filter, {page: page, limit: this.currentLimit}, {sorting: this.sorting});
				
				var self = this;
				this.resource.query(actualFilter, function (data, headers) {
					self.results = data;
					self.totalResults = parseInt(headers('x-jsdev-meta-total-count'), 10);
					self.numPages =  parseInt(headers('x-jsdev-meta-total-pages'), 10);
					self.currentLimit = parseInt(headers('x-jsdev-meta-current-limit'), 10);
					self.currentPage = parseInt(headers('x-jsdev-meta-current-page'), 10);
					
					self.startResult = self.currentPage ? (self.currentPage - 1) * self.currentLimit + 1 : 0;
					self.endResult = self.currentPage ? Math.min(self.totalResults, self.currentPage * self.currentLimit) : 0;
					
					self.arrayPages = new Array(); 
					for (index = 0; index < self.numPages; index++) {
						self.arrayPages[index] = index+1;
					 }
				});
			};
		}
		
		return {
			$resource: function (resource) {
				return new Pager(resource);
			},
			
			$array: function (array) {
				return new Pager(null, array);
			}
		};
		
	};
});
