import orderModel from "../models/order.models.js"
import foodModel from '../models/food.models.js'
import userModel from "../models/user.models.js"
import Stripe from "stripe";

// placeOrder using Forntend

const placeOrder = async (req, res) => {

    try {
        const url = process.env.FRONTEND_URL;

        const { items, address } = req.body;

        const userId = req.userId;

        if (!items?.length) {
            return res.json({
                success: false,
                message: "Plese Select Items"
            });
        }

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

        let line_items = [];
        let totalAmount = 0;

        for (const item of items) {

            const food = await foodModel.findById(item.foodId);

            if (!food) {
                return res.json({
                    success: false,
                    message: "Selected Food is Not Found"
                })
            }

            totalAmount += food.price * item.quantity;

            line_items.push({
                price_data: {
                    currency: "inr",
                    product_data: { name: food.name },
                    unit_amount: food.price * 100 * 80
                },
                quantity: item.quantity
            });
        }

        const order = await orderModel.create({
            userId,
            items,
            amount: totalAmount,
            address,
        });

        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: "payment",
            metadata: { orderId: order._id.toString() },
            success_url: `${url}/verify?success=true&orderId=${order._id}`,
            cancel_url: `${url}/verify?success=false&orderId=${order._id}`
        });

        res.json({ success: true, session_url: session.url });

    }
    catch (error) {
        res.json({
            success: false,
            message: error.message
        })
        console.log(error.message)
    }
}

const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body
    try {
        if (success == "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.status(200).json({
                success: true,
                message: "Paid"
            });
        }
        else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({
                success: true,
                message: "Payment Failed"
            })
        }
    }
    catch (error) {
        res.status(200).json({
            success: false,
            message: error.message
        })
    }
}

const userOrders = async (req, res) => {
    try {
        const userId = req.userId;
        const orders = await orderModel.find({ userId }).populate("userId", "name email").populate({
            path:"items.foodId",
            select: "name price image category"
        }).exec()
        res.json({
            success: true,
            data: orders
        });
    }
    catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export { placeOrder, verifyOrder, userOrders }