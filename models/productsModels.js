'use stritc';

function ProductsDAO(model) {
	this.model = model;

}

ProductsDAO.prototype.create = function(data, callback){
	var model = new this.model(data);
	model.save(function(err, result){
		callback(err, result);
	});
};
ProductsDAO.prototype.find = function(query, callback){
	this.model.find(query).exec(callback);

};
ProductsDAO.prototype.findOne = function(_id, callback) {
	var query = {_id : _id};
	this.model.findOne(query).exec(callback);

};
ProductsDAO.prototype.update = function(_id, data, callback){
	var query = {_id : _id};
	this.model.update(query, data).exec(function(err, result){
		callback(err, result);
	});

};
ProductsDAO.prototype.remove = function(_id, callback){
	var query = {_id : _id};
	this.model.remove(query, data).exec(function(err, result){
		callback(err, result);
	});
};
module.exports = function(mongoose){
	var products = require('../db/product_model');
	var data = new products ({
		name:      String,
		type:      String,
		local:     String
	});
	return new ProductsDAO (products);
};
