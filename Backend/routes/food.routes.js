import express from 'express'
import { getFoodById, listFood, removeFood } from '../controllers/food.controllers.js';
const foodRouter = express.Router();

foodRouter.get('/list',listFood);
foodRouter.post('/remove',removeFood);
foodRouter.get('/get/:id',getFoodById);

export default foodRouter;