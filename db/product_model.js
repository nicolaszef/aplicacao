//

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productsSchema = new Schema({
		name:      String,
		type:      String,
		local:     String
});
module.exports = mongoose.model('products', productsSchema); 