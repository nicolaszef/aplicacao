//

var debug = require('debug')('products:controller');
var promise = require ('bluebird');

var handleNotFound = function(data){
	if(!data){
		var err = new Error ('Not found');
		err.status = 404;
		throw err;
	}
	return data;
}
function ProductsController(ProductsModel) {
	this.model = promise.promisifyAll(ProductsModel);
}

ProductsController.prototype.getAll = function(request, response, next) {
	this.model.findAsync({})
		.then(function(data){
		response.json(data);

		})
	.catch(next);
};

ProductsController.prototype.getById = function (request, response, next) {
	var _id = request.params._id;
	this.model.findOneAsync(_id)
		.then(function(data){
			if (!data) {
				var err = new Error('Not found');
				err.status = 404
				throw err;
			}
			return data;
		})
		.then(function(data){
			response.json(data);
		})
		.catch(next);
};

ProductsController.prototype.create = function (request, response, next) {
	var body = request.body;
	this.model.createAsync(body)
		.then(function(err, data){
			response.json(data);
		})
	.catch(next);
};

ProductsController.prototype.update = function (request, response, next) {
	var _id = request.params._id;
		body = request.body;		
	this.model.updateAsync(_id, body)
		.then(function(err, data){
			response.json(data);
		})
		
	.catch(next);
};

ProductsController.prototype.remove = function (request, response, next) {
	var _id = request.params._id;
	this.model.removeAsync(_id)
		.then(function(err, data){
		response.json(data);
		})
		.catch(next);
};

module.exports = function(ProductsModel) {
	return new ProductsController(ProductsModel);
};


