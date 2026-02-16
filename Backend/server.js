import 'dotenv/config';
import express from 'express'
import cors from 'cors'
import connectDb from './config/db.js';
import foodRouter from './routes/food.routes.js';
import userRouter from './routes/user.routes.js';
import cartRouter from './routes/cart.routes.js';
import placeOrderRouter from './routes/placeorder.routes.js';
import connectCloudinary from './config/cloudinary.js';
import adminRoutes from './routes/admin.routes.js';
import { stripeverifyOrder } from './controllers/placeorder.controller.js';

// app config
const app = express()
const port = 5000 || process.env.PORT;

// db connection

await connectDb();
await connectCloudinary();

app.use(cors());

// Stripe webhook must receive the raw body BEFORE JSON parsing
app.post("/stripe", express.raw({ type: "application/json" }), stripeverifyOrder);

// JSON body parser for the rest of the API
app.use(express.json());

// api endpoints
app.use('/api/food', foodRouter);
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', placeOrderRouter);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
    res.send("API Working")
})

app.listen(port, () => {
    console.log(`server is running on port no ${port}`)
})