
//Configuracoes do servidor

var express        = require('express'),
	app            = express(),
	methodOverride = require('method-override'),
	bodyParser     = require('body-parser');


//Server config
// methodOverride - preparar app para receber mais que 'GET e POST'
app.use(methodOverride('X-HTTP-Method'));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride('X-Method-Override'));
app.use(methodOverride('_method'));

// bodyParser - converte o 'texto puro' em Json, query string
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// verifica se a URL requisitada foi favicon.ico, caso for res = 200
app.use(function(request, response, next){
	if(request.url === '/favicon.ico'){
		response.writeHead(200, {'Content-Type': 'image/x-icon'});
		response.end('');

	} else {
		next();
	}
});

//Router

app.use('/', require('../routes/index'));

//Error handling

app.use(function(request, response, next) {
	var err = new Error('Not found');
	err.status = 404;
	next(err);
});

app.use(function(err, request, response, next) {
	console.log(err.stack);
	response.status(err.status || 500).json({ err: err.message});
});

//Server listener

module.exports = app;

