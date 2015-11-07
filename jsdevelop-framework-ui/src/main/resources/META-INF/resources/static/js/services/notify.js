app.service('$notify', ['SweetAlert', '$translate',
               function (SweetAlert,   $translate) {
	
	this.success = function(){
		SweetAlert.swal({
			title: $translate.instant('mensagem.operacao_sucesso'),
			type: "success"
		});
	};
	
	this.error = function(msgError){
		SweetAlert.swal({
			title: $translate.instant('mensagem.erro_inesperado'),
			type: "error",
			text: msgError,
		});
	};	
		
}]);
