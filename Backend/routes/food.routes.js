import express from 'express'
import { listFood, removeFood } from '../controllers/food.controllers.js';
const foodRouter = express.Router();

foodRouter.get('/list',listFood);
foodRouter.post('/remove',removeFood);

export default foodRouter;