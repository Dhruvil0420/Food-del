import express from 'express';
import { listOrder, placeOrder, updateStatus, userOrders } from '../controllers/placeorder.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';
import adminMiddleware from '../middleware/admin.middleware.js';
import blockDemoMiddelware from '../middleware/blockdemo.middleware.js';

const placeOrderRouter = express.Router();

placeOrderRouter.post("/place",authMiddleware,placeOrder);
placeOrderRouter.get("/getorders",authMiddleware,userOrders);
placeOrderRouter.get("/list",listOrder);
placeOrderRouter.post("/change-status",adminMiddleware,blockDemoMiddelware,updateStatus);

export default placeOrderRouter;