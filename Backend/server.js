import dotenv from 'dotenv';
dotenv.config();
import express from 'express'
import cors from 'cors'
import connectDb from './config/db.js';
import foodRouter from './routes/food.routes.js';
import userRouter from './routes/user.routes.js';
import cartRouter from './routes/cart.routes.js';
import placeOrderRouter from './routes/placeorder.routes.js';

// app config
const app = express()
const port = 5000;

app.use(cors());
app.use(express.json());

// db connection

connectDb();

// api endpoints
app.use('/api/food', foodRouter);
app.use('/images',express.static('uploads'));
app.use('/api/user',userRouter);
app.use('/api/cart',cartRouter);
app.use('/api/order',placeOrderRouter);
// middleware


app.get("/", (req, res) => {
    res.send("API Working")
})

app.listen(port, () => {
    console.log(`server is running on port no ${port}`)
})