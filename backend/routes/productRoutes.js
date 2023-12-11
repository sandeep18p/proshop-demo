import express from 'express';
import { getProducts, getProductById } from '../controller/productControllers.js';
const router =  express.Router();
// import products  from '../data/products.js'
// import asyncHandler from '../middlewares/asyncHandler.js'
// import Product from '../models/productModel.js'
import {protect, admin} from '../middlewares/authMiddleware.js'
import {  createProduct, updateProduct, deleteProduct, createProductReview, getTopProducts } from '../controller/productControllers.js';
// router.get('/', (req,res)=>{
//     res.json(products)
// });
//pehle rout fir get
router.get('/top',getTopProducts);
router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/:id').get(getProductById);
router.route('/:id/reviews').post(protect, createProductReview);
router.route('/:id').put(protect, admin, updateProduct).delete(protect, admin, deleteProduct);;


export default router;