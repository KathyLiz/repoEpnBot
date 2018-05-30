var urlBotImage='images/nati.jpg';
var urlUserImage='images/user.png';

window.onload = function(){
  var now = new Date();
  var fecha = this.document.getElementById("dateNow");
  fecha.innerHTML = now.toDateString();
  //alert(now.toLocaleDateString('en-US'));
}

function drawResponseChat(msg){
   var now = new Date();
   dscrol=jQuery('.popup-messages')[0];
   htmladd=''
   if(dscrol.outerText.search(now.toDateString())==-1){
      htmladd+='<div class="chat-box-single-line"><abbr class="timestamp">'+now.toDateString()+'</abbr></div>';
   }
   htmladd+='<div class="direct-chat-msg"><div class="direct-chat-info clearfix"><span class="direct-chat-name pull-left">Nati</span></div><img alt="iamgurdeeposahan" src="'+urlBotImage+'" class="direct-chat-img"><div class="direct-chat-text request">'+msg+'</div><div class="direct-chat-info clearfix"><span class="direct-chat-timestamp pull-right">'+now.getHours()+':'+now.getMinutes()+'</span></div></div>';
   jQuery(".direct-chat-messages").append(htmladd);
   jQuery(dscrol).scrollTop(1000);
}

function drawResponseChatButtons(message,buttonsTemplate){
  var now = new Date();
  dscrol=jQuery('.popup-messages')[0];
  htmladd=''
  if(dscrol.outerText.search(now.toDateString())==-1){
     htmladd+='<div class="chat-box-single-line"><abbr class="timestamp">'+now.toDateString()+'</abbr></div>';
  }
  htmladd+='<div class="direct-chat-msg">'+
    '<div class="direct-chat-info clearfix">'+
    '<span class="direct-chat-name pull-left">Nati</span>'+
    '</div>'+
  '<img alt="iamgurdeeposahan" src="'+urlBotImage+'" class="direct-chat-img">'+
  '<div class="direct-chat-text request">'+message+'<br>'+
  '<div class="btn-group btn-group-sm">'+
    buttonsTemplate
 '</div>'+
  '</div>'+
  '<div class="direct-chat-info clearfix"><span class="direct-chat-timestamp pull-right">'+now.getHours()+':'+now.getMinutes()+'</span>'+
  '</div>'+
  '</div>';
  jQuery(".direct-chat-messages").append(htmladd);
  jQuery(dscrol).scrollTop((jQuery('.direct-chat-messages')[0]).clientHeight);
  //jQuery(dscrol).scrollTop(1000);
}

/** Función para graficar los elementos del carousel */
function drawResponseCarousel(message,carouselTemplate){
  var now = new Date();
  dscrol=jQuery('.popup-messages')[0];
  htmladd=''
  if(dscrol.outerText.search(now.toDateString())==-1){
     htmladd+='<div class="chat-box-single-line"><abbr class="timestamp">'+now.toDateString()+'</abbr></div>';
  }
  htmladd+='<div class="direct-chat-msg">'+
    '<div class="direct-chat-info clearfix">'+
    '<span class="direct-chat-name pull-left">Nati</span>'+
    '</div>'+
  '<img alt="iamgurdeeposahan" src="'+urlBotImage+'" class="direct-chat-img">'+
  '<div class="direct-chat-text request">'+message+'<br>'+
  '<div class="btn-group btn-group-sm">'+
 '<div id="myCarousel" class="carousel slide" data-ride="carousel">'+
  '<div class="carousel-inner">'+

 //Aquí la variable
 carouselTemplate+

  '</div>'+
  '<a class="left carousel-control" href="#myCarousel" data-slide="prev">'+
    '<span class="glyphicon glyphicon-chevron-left"></span>'+
    '<span class="sr-only">Anterior</span>'+
  '</a>'+
  '<a class="right carousel-control" href="#myCarousel" data-slide="next">'+
    '<span class="glyphicon glyphicon-chevron-right"></span>'+
    '<span class="sr-only">Siguiente</span>'+
  '</a>'+
'</div>'+
 '</div>'+
  '</div>'+
  '<div class="direct-chat-info clearfix"><span class="direct-chat-timestamp pull-right">'+now.getHours()+':'+now.getMinutes()+'</span>'+
  '</div>'+
  '</div>';
  jQuery(".direct-chat-messages").append(htmladd);
  jQuery(dscrol).scrollTop((jQuery('.direct-chat-messages')[0]).clientHeight);
  //jQuery(dscrol).scrollTop(1000);
}

function drawTextResponse(message){
  var now = new Date();
  dscrol=jQuery('.popup-messages')[0];
  htmladd=''
  if(dscrol.outerText.search(now.toDateString())==-1){
     htmladd+='<div class="chat-box-single-line"><abbr class="timestamp">'+now.toDateString()+'</abbr></div>';
  }
  htmladd+='<div class="direct-chat-msg">'+
    '<div class="direct-chat-info clearfix">'+
    '<span class="direct-chat-name pull-left">Nati</span>'+
    '</div>'+
  '<img alt="iamgurdeeposahan" src="'+urlBotImage+'" class="direct-chat-img">'+
  '<div class="direct-chat-text request">'+message
  '</div>'+
  '<div class="direct-chat-info clearfix"><span class="direct-chat-timestamp pull-right">'+now.getHours()+':'+now.getMinutes()+'</span>'+
  '</div>'+
  '</div>';
  jQuery(".direct-chat-messages").append(htmladd);
  jQuery(dscrol).scrollTop((jQuery('.direct-chat-messages')[0]).clientHeight);
  //jQuery(dscrol).scrollTop(1000);
}

function drawLinkResponse(data){
  var intent = data.intent 
  var now = new Date();
  dscrol=jQuery('.popup-messages')[0];
  htmladd=''
  if(intent === 'ingreso_epn' || intent === 'obtener_licencias'){
    if(dscrol.outerText.search(now.toDateString())==-1){
      htmladd+='<div class="chat-box-single-line"><abbr class="timestamp">'+now.toDateString()+'</abbr></div>';
   }
   htmladd+='<div class="direct-chat-msg">'+
     '<div class="direct-chat-info clearfix">'+
     '<span class="direct-chat-name pull-left">Nati</span>'+
     '</div>'+
      '<img alt="iamgurdeeposahan" src="'+urlBotImage+'" class="direct-chat-img">'+
      '<div class="direct-chat-text request">'+data.message+'<br>'+
      '<a class="btn btn-primary btn-sm" role="button" href="'+data.objectsResponse[0].url+'">Ir a la página</a>'
      '</div>'+
      '<div class="direct-chat-info clearfix"><span class="direct-chat-timestamp pull-right">'+now.getHours()+':'+now.getMinutes()+'</span>'+
      '</div>'+
      '</div>';
  }else{
    if(dscrol.outerText.search(now.toDateString())==-1){
      htmladd+='<div class="chat-box-single-line"><abbr class="timestamp">'+now.toDateString()+'</abbr></div>';
   }
   htmladd+='<div class="direct-chat-msg">'+
     '<div class="direct-chat-info clearfix">'+
     '<span class="direct-chat-name pull-left">Nati</span>'+
     '</div>'+
   '<img alt="iamgurdeeposahan" src="'+urlBotImage+'" class="direct-chat-img">'+
   '<div class="direct-chat-text request">'+data.message+'<br>'+
   '<button class="btn btn-primary btn-sm" onclick="showPDF(\''+data.objectsResponse[0].url+'\')">Quiero ver el manual</button>'
   '</div>'+
   '<div class="direct-chat-info clearfix"><span class="direct-chat-timestamp pull-right">'+now.getHours()+':'+now.getMinutes()+'</span>'+
   '</div>'+
   '</div>';
  }

  
  
  jQuery(".direct-chat-messages").append(htmladd);
  jQuery(dscrol).scrollTop((jQuery('.direct-chat-messages')[0]).clientHeight);
  //jQuery(dscrol).scrollTop(1000);
}

function showPDF(url){
  var form = ' <embed src="'+url+'" width="100%" height="70%" />';
  BootstrapDialog.show({
    title: 'Manual de usuario',
    message: form,
    size: 'size-wide',
    buttons: [{
        label: 'Cerrar',
        action: function(dialog){
           dialog.close();
        }
    }]
});
}

function drawRequestChat(msg){ 
   var now = new Date(); 
   htmladd=''
   dscrol=jQuery('.popup-messages')[0];
   if(dscrol.outerText.search(now.toDateString())==-1){
      htmladd+='<div class="chat-box-single-line"><abbr class="timestamp">'+now.toDateString()+'</abbr></div>'
   }
   htmladd+='<div class="direct-chat-msg"><div class="direct-chat-info clearfix"><span class="direct-chat-name-response pull-right">user001</span></div><img alt="iamgurdeeposahan" src="'+urlUserImage+'" class="direct-chat-img direct-chat-img-response"> <div class="direct-chat-text direct-chat-text-response">'+msg+'</div><div class="direct-chat-info clearfix"><span class="direct-chat-timestamp pull-right">'+now.getHours()+':'+now.getMinutes()+'</span></div></div>';

   jQuery(".direct-chat-messages").append(htmladd); 
    
   // $(dscrol).animate({scrollTop: 1000}, 100);
   jQuery(dscrol).scrollTop((jQuery('.direct-chat-messages')[0]).clientHeight);
  // jQuery(dscrol).scrollTop(1000);

}
/*********************************************************/

  $(function(){
$("#addClass").click(function () {
          $('#qnimate').addClass('popup-box-on');
            });
          
            $("#removeClass").click(function () {
          $('#qnimate').removeClass('popup-box-on');
            });
  })
/**********************************************************************/  
function sentButtonResponse(btn_type){
  console.log("El mensaje es: .... ",btn_type);
      sendRequest(btn_type);
      drawRequestChat(btn_type);
}  

/*************************************************************************/
   $(function(){
  $('#status_message').on('keypress', function(e){
    var search = $('#status_message').val();
    if (e.which === 13) {
      $('#status_message').val('');
      console.log("El mensaje es: .... ",search);
      sendRequest(search);
      drawRequestChat(search);
    }
  });
});
/*************************************************************************/

function sendRequest(texto)
{
 jQuery('.content-writing').show();
 
 var params = {  text:texto,
                 hora:(new Date()).getTime(),
                 type:"texto",
                origin:"web"};

  console.log("Params", params);
   var ws_consultarMantenedor = new ws_Client();
   ws_consultarMantenedor.setArgumentos(params);
   ws_consultarMantenedor.setSession("hhfihfehfwefopeoei");
     ws_consultarMantenedor.OnError = function(data) {
       console.log("Error",data);
/*     setTimeout(function(){drawResponseTextChat(data.ERROR + " Intente nuevamente.<br>Si el problema persiste intente más tarde",botName,true,true);},delay);*/
   //  setTimeout(function(){drawResponseTextChat("Disculpas, por el momento no me encuentro disponible.<br>Intenta más tarde",botName,true,true);},delay);

    };
  ws_consultarMantenedor.OnResponde = function(data) {
     console.log("Respuesta",data);

     switch(data.typeMessage){
      case 'button_template': {
        console.log('Resuesta',data);
        generateButtons(data.buttonText,data.intent,data.message);
       // drawResponseChatYesNoButtons(data);
      }
      break;
      case 'text': {
        drawTextResponse(data.message);
      }
      break;
      case 'link': {
        drawLinkResponse(data);
      }
      break;
      case 'carousel': {
        console.log('Resuesta',data);
        generateCarousel(data.cards,data.message,data.url)
      }
      break;
      case 'imagesArray': {
        console.log('Resuesta',data);
        //generateCarousel(data.cards,data.message,data.url)
      }
      break;
      default: alert('hey');
      break;
     }
     
     //setTimeout(function(){sendTypeMessage(data,playSound);},delay);
   };
   ws_consultarMantenedor.consultarHttp();
}

function generateButtons(buttonArray,intent,message){
  var buttonsTemplate = '';
  var buttonsClass = 'buttonSize'
  if(intent === 'acceso_red'){
    buttonsTemplate =  '<button type="button" value="'+buttonArray[0].texto+'" class="btn btn-primary" onclick="sentButtonResponse(this.value)">'+
      '<span class="glyphicon glyphicon-ok"></span></button>'+
      '<button type="button" value="'+buttonArray[1].texto+'" class="btn btn-primary" onclick="sentButtonResponse(this.value)">'+
      '<span class="glyphicon glyphicon-remove"></span></button>';
      drawResponseChatButtons(message,buttonsTemplate)
  }else{
    for(var i in buttonArray){
      if(i!== 1){
        buttonsTemplate += '<button type="button" value="'+buttonArray[i].texto+'" class="btn btn-primary '+buttonsClass +'" onclick="sentButtonResponse(this.value)">'+
        buttonArray[i].tipo+'</button>';
      }else{
        buttonsTemplate += '<button type="button" value="'+buttonArray[i].texto+'" class="btn btn-primary" onclick="sentButtonResponse(this.value)">'+
        buttonArray[i].tipo+'</button>';
      }
     
      
    }
    drawResponseChatButtons(message,buttonsTemplate)
  }  
  console.log('btn Template',buttonsTemplate);
}

function generateCarousel(cardsArray,message,url){
  var carouselTemplate = '';
  var elementsClass = '';
    for(var i in cardsArray){

      if(i==0){
        elementsClass = '<div class="item active">';
      }else{
        elementsClass = '<div class="item">';
      }


      carouselTemplate+= elementsClass+
     '<div class="w3-card-4 carouselSize">'+
        '<header class="w3-container headerHeigh">'+
        '<p class="headerFont"><strong>'+cardsArray[i].title+'</strong></p>'+
        '</header>'+
        '<p class="bodyFont"></p>'+
        '<div class="w3-container heightBody">'+
          '<img src="'+cardsArray[i].urlImage+'" alt="Avatar" class="w3-left w3-circle ext1" style="width:50px">'+
          '<p class="bodyFont"><strong>Carreras: </strong>'+cardsArray[i].carreras+'</p>'+
        '</div>'+
        '<button class="w3-block footerColor w3-small" onclick=" window.open(\''+url+'\',\'_blank\')"> Ver más</button>'+
      '</div>'+
    '</div>'; 
      
    }
    drawResponseCarousel(message,carouselTemplate)
  
  console.log('btn Template',carouselTemplate);

}

function verMas(){
  alert("hiciste");
}