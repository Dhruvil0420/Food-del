import dotenv from 'dotenv';
dotenv.config();
import express from 'express'
import cors from 'cors'
import connectDb from './config/db.js';
import foodRouter from './routes/food.routes.js';
import userRouter from './routes/user.routes.js';
import cartRouter from './routes/cart.routes.js';
import placeOrderRouter from './routes/placeorder.routes.js';
import connectCloudinary from './config/cloudinary.js';

// app config
const app = express()
const port = 5000 || process.env.PORT;

app.use(cors());
app.use(express.json());

// db connection

await connectDb();
await connectCloudinary();

// api endpoints
app.use('/api/food', foodRouter);
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