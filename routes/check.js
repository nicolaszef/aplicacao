'use strict';

var express = require ('express'),
	pkg     = require('../package.json'),
	mongoose = require ('mongoose'),
	config  = require('config'),
	router  = express.Router();

router.get('/status', function(request, response){
	response.end('PONG');
});

router.get('/version', function(request, response){
	response.json({
		"applicationName": pkg.name,
		"versionRelease" : pkg.version
	});
});
router.get('/status/complete', function(request, response, next){
	var ret = {
		"ok": true,
		"applicationName": pkg.name,
		"checks": []
	};
	mongoose.connection.db.collection('products', function(err, collection){
		collection.findOne({}, function(err, result){
			console.log('collections')
			ret.ok = !err;
			ret.checks.push({
				"ok": !err,
				"name": "mongo",
				"error": (err ? err.message : ''),
				"details": {
					"url": config.get('mongo.server') + ':' + config.get('mongo.port')
				}

			});

		response.json(ret);
		});
	});
});

module.exports = router;

