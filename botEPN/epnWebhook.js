const processMessage = require('../botEPN/process_message_EPN.js');
var processM = new processMessage();

function epnWebhook(){
	
};

epnWebhook.prototype.procesarRequest = function(mensaje,res){
					//var tipo= mensaje.args.type;
					//if (tipo==="texto") {
					///	processM.setJSON(mensaje);
                        processM.setMensaje(mensaje.args.text);
                        processM.setResponse(res);
                        processM.procesarMensaje();
                        console.log("MENSAJE",mensaje.args.text);
                   // }
	
}


module.exports = epnWebhook;
