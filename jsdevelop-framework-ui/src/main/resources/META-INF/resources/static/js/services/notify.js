app.service('$notify', ['SweetAlert', '$translate',
               function (SweetAlert,   $translate) {
	
	this.success = function(){
		SweetAlert.swal({
			title: $translate.instant('OPERACAO_SUCESSO'),
			type: "success"
		});
	};
	
	this.error = function(){
		SweetAlert.swal({
			title: $translate.instant('ERROR_INESPERADO'),
			type: "error"
		});
	};	
		
}]);
