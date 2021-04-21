const express = require('express');
const router = express.Router();
const cors = require('cors');

var corsOptions = {
  origin: 'http://localhost:8082',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Product
const productController = require('../controllers/productController');
router.get('/products', productController.getAll);
router.get('/products/:id', productController.getById);
router.post('/products', productController.store);
router.put('/products/:id', productController.updateById);

// Category
const categoryController = require('../controllers/categoryController');
router.get('/categories', categoryController.getAll);

// Order
const orderController = require('../controllers/orderController');
router.get('/orders', cors(corsOptions), orderController.getAll);
router.post('/orders', orderController.store);
router.put(
  '/orders/:id/:state',
  cors(corsOptions),
  orderController.updateStateByID
);
router.get('/orders/:state', cors(corsOptions), orderController.getByState);

// states of order
const orderStateController = require('../controllers/orderStateController');
router.get('/states', cors(corsOptions), orderStateController.getAll);

// order_product
const orderProductController = require('../controllers/orderProductController');
router.post('/orders/products', orderProductController.store);

module.exports = router;
