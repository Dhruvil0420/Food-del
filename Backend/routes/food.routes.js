import express from 'express'
import { addFood, listFood, removeFood } from '../controllers/food.controllers.js';
import upload from '../middleware/multer.js';
import adminMiddeleware from '../middleware/admin.middleware.js';

const foodRouter = express.Router();

foodRouter.post('/add',adminMiddeleware, upload.single('image'), addFood);
foodRouter.get('/list',adminMiddeleware, listFood);
foodRouter.post('/remove',adminMiddeleware, removeFood);


export default foodRouter;