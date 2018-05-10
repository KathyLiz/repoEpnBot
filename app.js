#!/usr/bin/env node
"use strict";
const fs = require('fs');
const https = require ('https');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
var debug = require("debug")("express:server");
const app = express();
const verificationController = require('./controllers/verification');
const messageWebhookController = require('./controllers/messageWebhook');
var log4js = require('log4js');
//Log de información para errores de programación
var log = log4js.getLogger("app");
var favicon = require('static-favicon');


app.use(favicon());

var credentials ={
cert: fs.readFileSync('./bot/certificado.crt','utf8'), //-----> es el archivo a6fd4cfbe0abed37.crt
key:fs.readFileSync('./bot/server.key','utf8'), //-----> es el archivo interlancompu.key
ca:fs.readFileSync('./bot/certificado.ca','utf8'),// ----> es el archivo gd_bundle-g2-g1.crt pero se debe cambiar la extensión a .ca
passphrase:'antena10' //---> Es la clave con la que se ha creado el archivo Key
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/private'));
app.use(log4js.connectLogger(log4js.getLogger("http"), { level: 'auto' }));

//Se toman los parámetros del formulario, se evalúa u se redirige a messenger
app.get('/authorize', function (req, res) {
	var celular = req.query.celular;	
    var username = req.query.username;	
	var authCode="1234567890";
	var accountLinkingToken = req.query.account_linking_token;
	var redireccionURL="https://www.facebook.com/messenger_platform/account_linking"; 
	if (username === 'true')
		{
			var redirectUri = redireccionURL +'?account_linking_token='+accountLinkingToken+ '&authorization_code=' + celular;
			res.redirect(redirectUri);
			log.info("Autenticación EXITOSA con el número "+celular);
            console.log("Autenticación EXITOSA con el número "+celular);
		}
	else if(username === 'false')
		{
			var redirectUri = redireccionURL +'?account_linking_token='+accountLinkingToken;
			log.error("Autenticación FALLIDA con el número "+celular);
			//console.log ("entró al FALSE: ");
			res.redirect(redirectUri);
		}
});

app.get('/lgu', function(req, res,next) {  
    res.sendfile('./private/login.html',function (err) {
    if (err) {
      next(err);
      log.error("ERROR al enviar archivo de login: "+err);
    } else {
      log.info("Archivo enviado exitosamente");
    }
  });                
});

/*app.get('/lga', function(req, res,next) {  
    res.sendfile('./private/loginMovi.html',function (err) {
    if (err) {
      next(err);
      log.error("ERROR al enviar archivo de login: "+err);
    } else {
      log.info("Archivo enviado exitosamente");
    }
  });                
});

app.get('/bosch', function(req, res,next) {  
    res.sendfile('./Bosch/busqueda.html',function (err) {
    if (err) {
      next(err);
      log.error("ERROR al enviar archivo de login: "+err);
    } else {
      log.info("Archivo enviado exitosamente");
    }
  });                
});

app.get('/test', function(req, res, next) {
    var html = fs.readFileSync('./Bosch/busqueda.html', 'utf8')
    res.render('test', { html: html })
    // or res.send(html)
})

Send image from my server 
app.get('/images', function(req, res,next) {  
    res.sendfile('./images/app.png',function (err) {
    if (err) {
      next(err);
      console.error("ERROR al enviar imagen: "+err);
    } else {
      console.info("Imagen enviada exitosamente");
    }
  });                
});

Send video from my server 
app.get('/video', function(req, res,next) {  
    res.sendfile('./videos/appMiMovi.mp4',function (err) {
    if (err) {
      next(err);
      console.error("ERROR al enviar video: "+err);
    } else {
      console.info("Video enviado exitosamente");
    }
  });                
});*/


/*app.get('/video', function(req, res,next) {  
    /*res.sendfile('./videos/appMiMovi.mp4',function (err) {
    if (err) {
      next(err);
      console.error("ERROR al enviar video: "+err);
    } else {
      console.info("Video enviado exitosamente");
    }
  });  
  var path = "./videos/appMiMovi.mp4";
  var stat = fs.statSync(path);
  var total = stat.size;

  if (req.headers.range) {

    // meaning client (browser) has moved the forward/back slider
    // which has sent this request back to this server logic ... cool

    var range = req.headers.range;
    var parts = range.replace(/bytes=/, "").split("-");
    var partialstart = parts[0];
    var partialend = parts[1];

    var start = parseInt(partialstart, 10);
    var end = partialend ? parseInt(partialend, 10) : total-1;
    var chunksize = (end-start)+1;
    console.log('RANGE: ' + start + ' - ' + end + ' = ' + chunksize);

    var file = fs.createReadStream(path, {start: start, end: end});
    res.writeHead(206, { 'Content-Range': 'bytes ' + start + '-' + end + '/' + total, 'Accept-Ranges': 'bytes', 'Content-Length': chunksize, 'Content-Type': 'video/mp4' });
    file.pipe(res);

  } else {

    console.log('ALL: ' + total);
    res.writeHead(200, { 'Content-Length': total, 'Content-Type': 'video/mp4' });
    fs.createReadStream(path).pipe(res);
  }


});
app.get('/audio', function(req, res) {
    res.sendfile('./audios/audio.wav');
});*/
app.get('/', verificationController);
app.post('/', messageWebhookController);

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
    log.error("ERROR server"+err);
});

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        log.error("Error de desarrollo", err);
        res.status(err.status || 500);
        log.error(err);
    });
}

app.use(function(err, req, res, next) {
    log.error("Error programado", err);
    res.status(err.status || 500);
    log.error(err);
});


module.exports = app;






 
