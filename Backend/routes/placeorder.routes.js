import express from 'express';
import { listOrder, placeOrder, updateStatus, userOrders, verifyOrder } from '../controllers/placeorder.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const placeOrderRouter = express.Router();

placeOrderRouter.post("/place",authMiddleware,placeOrder);
placeOrderRouter.post("/verify",verifyOrder);
placeOrderRouter.get("/getorders",authMiddleware,userOrders);
placeOrderRouter.get("/list",listOrder);
placeOrderRouter.post("/change-status",updateStatus);

export default placeOrderRouter;