import express from 'express';
import { addTocart, getCart, removeTocart } from '../controllers/cart.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const cartRouter = express.Router();

cartRouter.post("/add", authMiddleware, addTocart);
cartRouter.post("/remove", authMiddleware, removeTocart);
cartRouter.get("/get", authMiddleware, getCart);

export default cartRouter;