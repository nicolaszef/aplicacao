// server listener function

var app    = require('../app/app'),
	cluster = require('cluster'),
	numCPUs = require('os').cpus().length,
	debug = require('debug')('products:www');

var onWorkerError = function(code, signal) {
	debug(code, signal);
};

if (cluster.isMaster) {
	for (var i=0; i < numCPUs; i++) {
		var worker = cluster.fork();
		worker.on('error', onWorkerError);
	}
	cluster.on('exit', function(err) {
		var newWorker = cluster.fork();
		newWorker.on('error'. onWorkerError);
		debug('A new worker rises', newWorker.process.pid);
		
	});
}else {
	var server = app.listen(3000, function(){

//		var host = server.address().address;
//		var port = server.address().port;
		var address = server.address();

		console.log('example app listening at http://%s:%s', address.address, address.port);

	});

	server.on('error', function(err){
		debug(err);
	});
}