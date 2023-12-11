import express from 'express';
import { Router } from 'express';
import {  
    getMyOrders,
    addOrderItems,  
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders, } from '../controller/orderController.js'
    import { protect, admin } from '../middlewares/authMiddleware.js';

    const router =  express.Router();
router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
router.route('/mine').get(protect,getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect,admin,updateOrderToDelivered)

export default router;



