/* eslint-disable @typescript-eslint/no-var-requires */
const { Router } = require('express');

const ClientController = require('./app/controllers/ClientController');
const ProductController = require('./app/controllers/ProductController');
const CategoryController = require('./app/controllers/CategoryController');
const OrderController = require('./app/controllers/OrderController');

export const router = Router();

//Client
router.get('/client', ClientController.index);
router.get('/client/:id', ClientController.show);
router.post('/client', ClientController.store);
router.put('/client/:id', ClientController.update);
router.delete('/client/:id', ClientController.delete);

//Product
router.get('/products', ProductController.index);
router.get('/products/:id', ProductController.show);
router.post('/products', ProductController.store);
router.put('/products/:id', ProductController.update);
router.delete('/products/:id', ProductController.delete);

//Category
router.get('/categories', CategoryController.index);
router.get('/categories/:id', CategoryController.show);
router.post('/categories', CategoryController.store);
router.put('/categories/:id', CategoryController.update);
router.delete('/categories/:id', CategoryController.delete);

//Order
router.get('/orders', OrderController.index);
router.get('/orders/:orderd', OrderController.show);
router.post('/orders', OrderController.store);
router.delete('/orders/:orderd', OrderController.delete);
