/*
ws_Client.js 
version 3.4
fecha 2017/08/30
interlancompu.com
©copyright 2017
*/
 
function ws_Client(){
	this.http = new XMLHttpRequest();
	this.http.ws_gui_idm = this;
	this.argumentos.args = {};
	this.argumentos.session="";
	
}
ws_Client.prototype.argumentos = {};
ws_Client.prototype.resultado = {};
ws_Client.prototype.url = "https://bot.interlancompu.com/";
ws_Client.prototype.http = null;
ws_Client.prototype.Asincronico = true;



 ws_Client.prototype.consultarHttp = function(){
	/*ensero el resultado*/
	this.resultado ={};
	/*prepado los parametros que se envian a el ws*/
	var strparams = "PARAM=" +encodeURIComponent(JSON.stringify(this.argumentos));
	/*prepado las funciones de respuesta*/
	this.http.onreadystatechange = this.ws_gui_idm_handle_json; /*ok*/
	this.http.onerror = this.ws_gui_idm_handle_json_error; /*error*/
	
	/*abro la url*/
	this.http.open("POST", this.url, this.Asincronico);
	
	
	/*aplico el hear que indica que voy a envia un paramtro past*/

	this.http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	
	/*encodificacion de información para poder mandas simbolo */

	/*envio el parametro post con el json y le dijo que consulte el resultado*/
	this.http.send(strparams);
	/*this.http.send(strparamEncoded);*/
	

};
/*aqui entra el resultado ok;*/
 ws_Client.prototype.ws_gui_idm_handle_json = function(){
	if (this.ws_gui_idm.http.readyState == 4) {
		if (this.ws_gui_idm.http.status == 200) {
			var json_data = this.ws_gui_idm.http.responseText;
			
			try{
				
				this.ws_gui_idm.resultado = eval("(" + json_data + ")");
				
				var tipo = jQuery.isArray(this.ws_gui_idm.resultado);
				if (jQuery.isArray(this.ws_gui_idm.resultado)) {
					if( this.ws_gui_idm.resultado[0]=="ERROR")
						this.ws_gui_idm.OnError(this.ws_gui_idm.resultado);
					else
						this.ws_gui_idm.OnResponde(this.ws_gui_idm.resultado);
  
				}
				else{
				
					this.ws_gui_idm.OnResponde(this.ws_gui_idm.resultado);
				}
			
			}catch(err){
				
			 	ws_error = new	ws_Client();
				
				para = {};
				para.error=err.message;
				ws_error.setArgumentos(para);
				ws_error.OnError = function(error){ alert(err.message);};
				ws_error.OnResponde=function(data){};
				
				ws_error.consultarHttp();
				this.ws_gui_idm.ws_gui_idm_handle_json_error(err);
			}
			
						
			} else {
				
					error = {};
					error.ERROR = "Ocurrio un problema con la URL.";
					this.ws_gui_idm.ws_gui_idm_handle_json_error(error);
					
			}
					
		}
};
 ws_Client.prototype.ws_gui_idm_handle_json_error = function(err){
	this.OnError(err);
};
ws_Client.prototype.OnError = function(error){
	throw "Tienes que Implementar OnError";
};

 ws_Client.prototype.OnResponde = function (strRespuesta){
	throw "Tienes que Implementar OnResponde";
};

 ws_Client.prototype.setArgumentos = function(argumentos){
	this.argumentos.args = argumentos;
};
 ws_Client.prototype.setSession= function(session){
	this.argumentos.session = session;
};
ws_Client.prototype.Abort = function(){
	this.http.abort();
};
