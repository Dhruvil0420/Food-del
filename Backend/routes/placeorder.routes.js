import express from 'express';
import { placeOrder, verifyOrder } from '../controllers/placeorder.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const placeOrderRouter = express.Router();

placeOrderRouter.post("/place",authMiddleware,placeOrder);
placeOrderRouter.post("/verify",verifyOrder);

export default placeOrderRouter;