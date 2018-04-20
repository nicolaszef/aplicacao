// router function

var express = require('express'),
	jwt     = require('jwt-simple'),
	config  = require('config'),
	moment  = require('moment'),
	router  = express.Router();

var mongoose           = require ('../db/mongoose');
var ProductsModel      = require('../models/productsModels')(mongoose);
var ProductsController = require('../controller/productsController')(ProductsModel);

router.get('/', function(request, response){
	response.status(201);
	response.json({'name':  'Nicolas', 'email': 'nicolas.zeferinosi@gmail.com'});
});

var middlewareAuth = function(request, response, next){
	var token = request.query.token || request.headers['x-acess-token'];
	if(!token) {
		var err = new Error('Forbidden');
		err.status = 403;
		return next (err);
	}

	try {

		var decoded   = jwt.decode(token, config.get('jwtTokenSecret'));
		var isExpired = moment(decode.exp). isBefore(new Date());

		if(isExpired) {
			var err = new Error('Unauthorized');
			err.status = 401;
			return next (err);
		} else {
			request.user = decode.user;
			next();
		}
	} catch(err) {
		return next(err);
	}
};


router.get('/', middlewareAuth, ProductsController.getAll.bind(ProductsController));
router.get('/:_id', ProductsController.getById.bind(ProductsController));
router.post('/', ProductsController.create.bind(ProductsController));
router.put('/:_id', ProductsController.update.bind(ProductsController));
router.delete('/:_id', ProductsController.remove.bind(ProductsController));

router.use('/product_responsibilities', require('../routes/product_responsibilities'));
router.use('/check', require('../routes/check'));

module.exports = router;


// AQUI AQUI AQUI AQUI AQUI


