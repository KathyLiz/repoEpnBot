var celular;
var clave;
var sesion=0;
//función para enrutar y aadir parámetros a la url
continueClicked = function () {
	
	var login = validar();
	
var username = document.getElementById('celular').value;
 
 var newLocation = '/authorize' + window.location.search;

  if (window.location.search) {
    newLocation += '&';
  } else {
    newLocation += '?';
  }
  window.location = newLocation + 'username=' + username;

};



function validar(){
	var username = 'false';
	  celular = Number( document.getElementById("celular").value);
	  clave = document.getElementById("clave").value;
	MADconexion(username,celular,clave);
	/*MADconexion(function (aws) {
		
		/*var respuesta = new Object ();
		respuesta = aws;
				
					if(respuesta.answer)
						{
							username = 'true';
							 var resultBot1 = " Bienvenido ^_^ ";
							 alert(resultBot1);
							  var newLocation = '/authorize' + window.location.search;
							if (window.location.search) 
								{
									newLocation += '&';
								} 
							else 
								{
									newLocation += '?';
								}
						//window.location = newLocation + 'username=' + username +'&celular=' + celular + '&sesion'+;						 
						}  
					else
						{
							username = 'false';
							alert("ERROR: " + aws.error);
							var newLocation = '/authorize' + window.location.search;
							if (window.location.search) 
								{
									newLocation += '&';
								} 
							else 
								{
									newLocation += '?';
								}
							//window.location = newLocation + 'username=' + username;	
						} 
				console.log ("RESPUESTA CORRECTA:",respuesta.answer);
				console.log ("RESPUESTA BONITA: ",respuesta.error);
				});*/
				
};




function MADconexion(username,celular,clave){
	
			MAD_GET_SESSION(function(aws){
		        //console.log("Respuesta de la Sessión",aws);
		        //selfObj.sesion=parseInt(aws.answer.id_session);
		        var sesion1 = parseInt(aws.answer.id_session);
		        console.log("Respuesta Servidor",aws);
		        var telefono = celular.toString();
				var con = new ws_miMovistar();
				con.setAccion('IMOVISTAR_LOGIN');
				var arg = {};
				arg.documentoID=telefono;		
				arg.clave=clave;
				arg.perfilUsuario="Numero";
				console.log('Argumentos',arg);
				var session = {};
				session.imei="1234567890";
				session.version="3.0.6";
				session.id_session=sesion1;
				console.log ('Session: ',session);
				con.setArgumentos(arg);
				con.setSession(session);
				con.consultarHttp();
				
				//con.setOnResponde (catcher);
				con.OnResponde = function(answ){
					//var username = 'false';
	  				//celular = Number( document.getElementById("celular").value);
	  				//clave = document.getElementById("clave").value;
	  				var respuesta = new Object ();
					respuesta = aws;
				
					if(respuesta.answer)
						{
							username = 'true';
							 var resultBot1 = " Bienvenido ^_^ ";
							 alert(resultBot1);
							  var newLocation = '/authorize' + window.location.search;
							if (window.location.search) 
								{
									newLocation += '&';
								} 
							else 
								{
									newLocation += '?';
								}
						console.log ("SESION DEL LOGIN",respuesta.answer.id_session);
						window.location = newLocation + 'username=' + username +'&celular=' + celular + '|'+respuesta.answer.id_session;						 
						}  
					else
						{
							username = 'false';
							alert("ERROR: " + aws.error);
							var newLocation = '/authorize' + window.location.search;
							if (window.location.search) 
								{
									newLocation += '&';
								} 
							else 
								{
									newLocation += '?';
								}
							window.location = newLocation + 'username=' + username;	
						} 
				console.log ("RESPUESTA CORRECTA:",respuesta.answer.id_session);
				console.log ("RESPUESTA BONITA: ",respuesta.error);

				}
				//con.setOnError (catcher);
		   });

		//	console.log("La Sesion:ooooo", selfObj.sesion);
	
		
};

function MAD_GET_SESSION(catcher){
    var ws_miMovi = new ws_miMovistar();
    ws_miMovi.setAccion('IMOVISTAR_INIT_APP');
    var arg = {};
    arg.plataform=3;
    arg.device='Test Mad';
    console.log('Argumentos', arg);
     var session = {};
    session.imei = "1234567890";
    session.version = "3.0.6";
    console.log('Session: ', session);
    ws_miMovi.setArgumentos(arg);
    ws_miMovi.setSession(session);
    //logError.info("Consulta a WS|ARGS|"+arg + session+"|ANS|"+catcher);
    ws_miMovi.consultarHttp();

    ws_miMovi.setOnResponde(catcher);
    ws_miMovi.setOnError(catcher);
};


