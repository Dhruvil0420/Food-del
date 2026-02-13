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
                    unit_amount: (food.price + 2) * 100 * 80
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
    }
}

// verifyUser Order 

const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body

    try {

        const order = await orderModel.findById(orderId);

        if (!order)
            return res.status(404).json({
                success:false,
                message:"Order not found"
            });

        if (success == "true") {
            order.payment = true;
            await order.save();

            await userModel.findByIdAndUpdate(order.userId,{cartData: {}});
            
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

// Get User orders

const userOrders = async (req, res) => {
    try {
        const userId = req.userId;
        const orders = await orderModel.find({ userId }).populate("userId", "name email").populate({
            path: "items.foodId",
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

// List All Users Orders

const listOrder = async (req, res) => {

    try {
        const orders = await orderModel.find({}).populate("userId", "name email").populate(
            {
                path: "items.foodId",
                select: "name price category image "
            }).exec();
        res.json({
            success: true,
            data: orders
        })
    }
    catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
}

// api for Update Order status

const updateStatus = async (req, res) => {
    try {
        const { status, orderId } = req.body;
        if(!status || !orderId){
            return res.status(400).json({
                success:false,
                message:"Missing fields"
            });
        }
        const allowed = ["Food Processing","Out Of Delivery","Delivery","Cancelled"];

        if(!allowed.includes(status)){
            res.status(400).json({
                success: false,
                message: "Invaild status"
            })
        }

        const update = await orderModel.findByIdAndUpdate(orderId, { status: status });

        if(!update){
            res.status(404).json({
                success: false,
                message: "Order Not found"
            })
        }
        
        res.json({
            success: true,
            message: "Status Update"
        })
    }
    catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }

}
export { placeOrder, verifyOrder, userOrders, listOrder ,updateStatus}