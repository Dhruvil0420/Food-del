import express from 'express'
import { loginAdmin, registerAdmin } from '../controllers/Admin.controller.js';
import upload from '../middleware/multer.js'
import adminMiddleware from '../middleware/admin.middleware.js';
import { addFood, removeFood } from '../controllers/food.controllers.js';
import blockDemoMiddelware from '../middleware/blockdemo.middleware.js';


const adminRoutes = express.Router();

adminRoutes.post("/register", registerAdmin);
adminRoutes.post("/login", loginAdmin);
adminRoutes.post('/add', adminMiddleware, blockDemoMiddelware, upload.single('image'), addFood);
adminRoutes.post("/remove", adminMiddleware, blockDemoMiddelware, removeFood);

export default adminRoutes;