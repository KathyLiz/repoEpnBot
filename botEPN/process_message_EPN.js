const API_AI_TOKEN = '3253bbd575d74ac881056c33431ddd7b';
const apiAiClient = require('apiai')(API_AI_TOKEN);
const request = require('request');
var textoProcesar = "";
var response=null;
var funcion = "";
var tRespuesta=null;
var custom1=null;
var custom2=null;
var trace="";
var idSession = "";



var constants = require('./resources.js');
var codeInitSession = "59b1b13db2df1";


var file = require("fs");
var readline = require('readline');

var log4js = require('log4js');
//Info log for reports (GEA)
var log = log4js.getLogger("process_message_EPN");
log4js.connectLogger(log4js.getLogger("chat"), { level: 'auto' })
//Info log for reports (GEA) Log de información para errores de programación
var logApp = log4js.getLogger("app");


/////////////////////////////////////////HERE THE CODE BEGINS ////////////////////////////////////////////////////

function process_message_EPN() {};



/**
 * Function to send TemplateJSON to the chat and draw there depending of the type of the content
 */ 
function sendMessage(templateJSON,resp){
	//logger.info('JSON Response: ' +JSON.stringify(templateJSON));
	console.log('JSON Response:', JSON.stringify(templateJSON));

	resp.set({
			'Content-Type': 'application/x-www-form-urlencoded',
			'Access-Control-Allow-Origin': '*'
			}).status(200).send(templateJSON);



	logApp.info("Se ha enviado el mensaje");    
};

// Getter and Setter
process_message_EPN.prototype.setMensaje = function (mensaje) {
    this.textoProcesar = mensaje
};
process_message_EPN.prototype.setResponse = function (resp) {	
    this.response = resp;
};

/**
 * Function to set the Whole JSON Params request to catch ID Session
 */
process_message_EPN.prototype.setJSON = function (json) {  
    this.json = json;
};



/**
 * Function to process the user text, and send the API.AI response or custom response
 */
process_message_EPN.prototype.procesarMensaje = function () {

	
	//logger.trace('--- TRANSACTION BEGINS ---');

	//Template JSON Response
	var templateJSON ={
		typeMessage		:'',
		message			:'',
		objectsResponse	:[]
	};

    logApp.info("Se ha recibido el mensaje " + this.textoProcesar);

	//console.log("JSON",this.json);
    console.log("\nInput text by user: ", this.textoProcesar);
    var message = this.textoProcesar;
    var totalTime = 0;
   /* idSession = this.json.session;
   
    //1st time when the chat is created (Or when the page is refreshed) here receive the 'codeInitSession'.
    //When this happens, i have to save this sessionID, after that y change the message with 'hola', 
    //for the bot to respond with a greeting.
    if(message === codeInitSession){
        //Grabo el ID nuevo generado, y sobreescribo message = 'hola'
        //Capturo el tiempo()
        message = 'hola';
        custom1 = "CLIENTE";
        var initTime = this.json.args.hora;
        var endTime = new Date().getTime();
        totalTime = endTime - initTime;
        createSession(idSession); //Get Session ID, and save it in txt file
    }else{
        //If the chat was created before, I have to retrieve the sessionID.
        if(searchSession(idSession)){
            console.log("ID Session exist!");
        }else{
            console.log("ID Session does not exist");
        }
        custom1 = "GENERADOR";
    }*/


    const apiaiSession = apiAiClient.textRequest(message, {
        sessionId: 'botcube_co'
    });

    apiaiSession.on('response', (response) => {
        logApp.info("Conexión establecida con API.AI");
        funcion = "procesarMensaje";
        var isError = 0;
        var mensaje = response.result.fulfillment.speech; 
        var intentName = response.result.metadata.intentName;
        var question = response.result.resolvedQuery;
        var action = response.result.action;
        

        trace = action;

        if(intentName === 'Default Fallback Intent'){
            isError = 1;
            intentName = 'Respuesta por defecto';
            //trace = action;
        }else{
        	isError = 0;
        }

        if(custom1 === 'CLIENTE'){ //Here is INIT Context
        	//intentName = 'INIT';
        	intentName = 'Inicio-Sesión';
        	funcion = 'initChat';
        }else{
        	intentName = response.result.metadata.intentName;
        }

        //log.addContext('funcion', funcion);

        // LOG FORMAT-- 11/09/2017 17:37:47 |procesarMensaje|idSesionidSesion|saludos-plusservice|hola|Te saluda atentamente tu agente virtual. Â¿En quÃ© puedo servirte?|1|null|null|null|input.unknown|


        log.info("|"+funcion+"|"+idSession+"|"+intentName + "|"+question+"|"+mensaje+"|"+isError+"|"+totalTime+"|"+custom1+"|"+custom2+"|"+trace+"|");
         
        //Here ask for the intents-names requested
        if(intentName === 'clientes-plusservice'){//When ask for clients, send the Carrousel JSON to draw
        	createCarrouselResponseClientsIntent("Estos son algunos de nuestros clientes:", templateJSON);
        }else if(intentName === 'servicios-calidad-plusservice'){ //Send videos when user ask of quality services
        	createVideoJSONReponse("Estos son algunos de nuestros servicios de calidad:", templateJSON, true);
        }else if(intentName === 'ubicacion-callCenter-plusservice'){ //Send ubication image of the contact center offices
        //	createImageResponse(mensaje, constants.IMAGE_UBICATION_CONTACT_CENTER_URL, templateJSON);
        }else if(intentName === 'oportunidadLaboral-plusservice'){
            createLinkJSONResponse(mensaje, templateJSON, true, 'http://plusservices.ec/unete/');
        }else if(intentName === 'visita-plusservice' || intentName === 'contacto-plusservice'){ //escribenos
            createLinkJSONResponse(mensaje, templateJSON, false, '#escribenos');
        }else if(intentName === 'presentacion-empresa-plusservice'){
            createLinkJSONResponse(mensaje, templateJSON, false, '#nosotros');
        }else if(intentName === 'servicios-plusservices'){
        	createLinkJSONResponse(mensaje, templateJSON, false, '#soluciones');
        }else if(intentName === 'tecnologiaServicios-plusservice'){//tecnologias
            createLinkJSONResponse(mensaje, templateJSON, false, '.vc_row.wpb_row.vc_row-fluid.vc_custom_1500051689539.vc_row-has-fill.vc_row-no-padding');
        }else if(intentName === 'sectores-plusservice'){
            createLinkJSONResponse(mensaje, templateJSON, false, '#sectores');
            //sectores
        }else{ //Only text response, send API.AI response
        	createTextResponse(mensaje, templateJSON);
        }
        //Send JSON response to JS Chat 
        sendMessage(templateJSON, this.response);
    });

    apiaiSession.on('error', function(error) {
        logApp.error("Error in API.AI session " + error);
    });

	apiaiSession.end();

	
};


/**
 * Function to create Carrousel response, when the user ask for 'clients' intent
 
function createCarrouselResponseClientsIntent(message, templateJSON){
	templateJSON.typeMessage = 'carousel';
	templateJSON.message = message;
    var temp = constants.CARROUSEL_CLIENTS_ARRAY;
    shuffle(temp);

    //Array.prototype.push.apply(templateJSON.objectsResponse, suffle(constants.CARROUSEL_CLIENTS_ARRAY));
    Array.prototype.push.apply(templateJSON.objectsResponse, temp.slice(0, 5));
    logApp.info("En la función: createCarrouselResponseClientsIntent()");

}*/


/**
 *  Function to shuffle array.
 */
function shuffle(totalArray) {
    var j, x, i;
    for (i = totalArray.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = totalArray[i - 1];
        totalArray[i - 1] = totalArray[j];
        totalArray[j] = x;
    }
}


/**
 * Function to send Image response to the User.
 */

function createImageResponse(message, urlImage, templateJSON){
	templateJSON.typeMessage = 'carousel';
	templateJSON.message = message;
	var videoURL = {
		'urlImage' : urlImage
	};
	templateJSON.objectsResponse.push(videoURL);


}

/**
 * Function to pass textReponse to the chat.
 */
function createTextResponse(message, templateJSON){
	templateJSON.typeMessage = 'text';
	templateJSON.message = message;
    logApp.info("En la función: createTextResponse()");
}


/**
 * Function to pass Video response (False: Videos avalaibles in the server. True: Videos are external resources(Like Youtube))
 */
function createVideoJSONReponse(message, templateJSON, isExternalVideo){
	templateJSON.typeMessage = 'video';
	templateJSON.message = message;
	//var index = getRandomInt(0,3);
	var videoURL = {
		'urlVideo' : getRandomVideo(isExternalVideo),
		'isExternalVideo': isExternalVideo
	};
	templateJSON.objectsResponse.push(videoURL);
}



/**
 * Function to create response with external o internal redirections
 */
function createLinkJSONResponse(message, templateJSON, isExternalLink, url){
    templateJSON.typeMessage = 'link';
    templateJSON.message = message;

    var paramsLink = {
        'url': url,
        'isExternalLink': isExternalLink
    };

    templateJSON.objectsResponse.push(paramsLink);
}



/**
 * Get random url in the array of URLS(Videos) (Need array with resources videos(In the server))

function getRandomVideo(isExternalVideo){
	var index = 0;
	if(isExternalVideo){ // Ex: Youtube Videos
		index = getRandomInt(0,constants.VIDEOS_SERVICES_YOUTUBE_ARRAY.length);
		return constants.VIDEOS_SERVICES_YOUTUBE_ARRAY[index];
	}else{ //Videos avalaible in the server
		//index = getRandomInt(0,urlVideoArray.length);
		return ;
	}

} */

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min; 
}



/**
 * Save session 
 */
function createSession(idSession){
    file.appendFile('./sessions.txt', "IDSession,"+idSession +",DateSession,"+ new Date()+"\n", function (err) {
        if (err)
        	throw err;
    });

}

/**
 * Search session ID
 */
function searchSession(idSession){
    var exist = false;
    var rl = readline.createInterface({
          input : file.createReadStream('./sessions.txt'),
          output: process.stdout,
          terminal: false
    });

    rl.on('line',function(line){
        var sessionValue = line.split(",");
        if(idSession === sessionValue[1])
            exist = true;
    });
    return exist;    
}



module.exports = process_message_EPN;

