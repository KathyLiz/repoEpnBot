
const epnWebhook = require('../botEPN/epnWebhook.js');
var epnW = new epnWebhook();

const uriDecodeJson=require('uridecode');

const querystring = require('querystring');

var log4js = require('log4js');
var log = log4js.getLogger("ErrorApp");
const request = require('request');
var appID='400151793680658';
var client_secret='564ecf7efca89393fac6fb84c9f276b1';

var proof_con_page_ACC_TOK='bb3ac6e6d33b4aa85d941b8fd01c65a274d696163666eeefecdb01f605144cd9';
var hmac_con_PAGE_ACCESSTOKEN='fd424f86d27c5dc3ccffce74e6c8b0c6502006a1f5594a1440d08cbfebcc5d75';

var hmac_con_APP_ACCESSTOKEN='d4b3985e8f18cdbcca842f6804ac8cef6e2c4c662f1fa0505a10e63a6268250c';

var appAT='400151793680658|di8PfKkcLM0x6fAx84mSsPzRbMo';

//log4js.connectLogger(log4js.getLogger("http"), { level: 'auto' });
const FACEBOOK_ACCESS_TOKEN = 'EAAFr75mEwRIBAEn0nqJfqu4xlslqZC2IrOqmSfGZCLOEBZAr3YnvjW2CDQ4pLJvp2FDbOwpGvFaztfBL7PZAvEPEEEZBrskB9h2dcC2n9u6U3S8aHtlfirJwIyZCjgxUwYHhZBuvZCZChZCoZCBVZBZBI0UvU8bpOCL02RkKf9MfABwI7ZCQZDZD';

module.exports = (req, res) => {
console.log("El Request",req.body);

//Añadir un type en la petición al servidor
if (req.body.PARAM){
	const prueba=require('uridecode')(req.body.PARAM);
	var json = JSON.stringify(eval("(" + prueba + ")"));
	var message = JSON.parse(json);
	console.log("Origen",message.args.origin);
	/*res.set({
		'Content-Type': 'application/x-www-form-urlencoded',
		'Access-Control-Allow-Origin': '*'
		}).status(200).send("Resupuesta del servidor");*/

epnW.procesarRequest(message, res);

}
if(req.body.entry[0].changes){
console.log("El Request Sender",req.body.entry[0].changes[0].value.sender_id);

console.log("El Request Comment",req.body.entry[0].changes[0].value.message);

	req.body.entry[0].changes.forEach(event=>{
		moviW.procesarComentario(event);
	});
	res.status(200).end();
	
	//Request para obtener los identificadores del usuario
	/*request({
		uri:'https://graph.facebook.com/v2.11/1569736896416528?fields=name,ids_for_apps,ids_for_pages',
		qs:{access_token:'400151793680658|di8PfKkcLM0x6fAx84mSsPzRbMo'},
		method:'GET',
		json:{}
	},function(error,response,body){
		var array = [];
		var bod="";
		if(!error&&response.statusCode==200){
			array=body.ids_for_apps.data;
		//var recipientId = body.recipient_id;
		//var messageId=body.message_id;	
		console.log("Los TOKENSSSSSSSSSSSSSSSS",body);
		for(var i=0;i<array.length;i++){
			bod+=JSON.stringify(array[i]);

		}
		console.log("Los PAGING",JSON.stringify(body.ids_for_apps.paging.cursors));
		console.log("Los TOKENS",bod);
		}
	else {
		console.error("Unable to send message");
		//console.error(response);
		console.error(error);
	}

	});*/
	//Request para messenger page access token
	/*request({
        uri:'https://graph.facebook.com/v2.11//ids_for_pages',
        qs:{access_token:appAT,
            appsecret_proof:hmac_con_APP_ACCESSTOKEN},
        method:'GET',
        json:{}
    },function(error,response,body){
    console.log("Processar comentario el sender");   
        if(!error&&response.statusCode==200){
                processM.setMensaje(event.value.message);
                processM.procesarMensaje(null,null,body.data[0].id,null,sesion);
                //console.log("Processar comentario el sender");                
       // processM.procesarMensaje(null,null,getMessengerId(sender),null,sesion);
        
        console.log("EL ID DEL USUARIO",body.data[0].id);
         
        }
    else {
        console.error("Unable to send message");
        console.error(response.body);
        console.error(error);
    }

    });*/
	
}};



