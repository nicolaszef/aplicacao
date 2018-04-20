// declara os endpoints e delega responsabilidade para o controller
var express = require('express'),
	router  = express.Router();

var mongoose           = require ('../db/mongoose');
var ProductsModel      = require('../models/productsModels')(mongoose);
var ProductsController = require('../controller/productsController')(ProductsModel);


router.get   ('/', ProductsController.getAll.bind(ProductsController));
router.get   ('/:_id', ProductsController.getById.bind(ProductsController));
router.post  ('/', ProductsController.create.bind(ProductsController));
router.put   ('/:_id', ProductsController.update.bind(ProductsController));
router.delete('/:_id', ProductsController.remove.bind(ProductsController));

module.exports = router;