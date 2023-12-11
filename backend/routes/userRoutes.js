import express from 'express';
import { getProducts, getProductById } from '../controller/productControllers.js';
import { Router } from 'express';
import {  authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser } from '../controller/userController.js'
    import { protect, admin } from '../middlewares/authMiddleware.js';

    const router =  express.Router();
    //agar post rahega to post run hoga nhi to directly get run hoga
router.route('/').post(registerUser).get(protect, admin, getUsers);
router.post('/logout', logoutUser);
//login hora isme
router.post('/auth', authUser); //login
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
//delte 
router.route('/:id').delete(protect, admin, deleteUser).get(protect, admin, getUserById).put(protect, admin,   updateUser);

export default router;