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
var log = log4js.getLogger("index");
var favicon = require('static-favicon');

function index(){
	
};

app.use(favicon());

var credentials ={
cert: fs.readFileSync('./bot/certificado.crt','utf8'),
key:fs.readFileSync('./bot/server.key','utf8'),
ca:fs.readFileSync('./bot/certificado.ca','utf8'),
passphrase:'antena10'
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/private'));
app.use(log4js.connectLogger(log4js.getLogger("https"), { level: 'auto' }));

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
		}
	else if(username === 'false')
		{
			var redirectUri = redireccionURL +'?account_linking_token='+accountLinkingToken;
			console.log ("entró al FALSE: ");
			res.redirect(redirectUri);
		}
	
	console.log("ESTE ES EL CELULAR =>",celular); 
});

app.get('/lgu', function(req, res) {  
    res.sendfile('./private/login.html');                
});
app.get('/audio', function(req, res) {
    res.sendfile('./audios/audio.wav');
});
app.get('/', verificationController);
app.post('/', messageWebhookController);

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        log.error("Something went wrong:", err);
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.use(function(err, req, res, next) {
    log.error("Something went wrong:", err);
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = index;






 
