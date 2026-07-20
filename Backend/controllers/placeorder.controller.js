import orderModel from "../models/order.models.js"
import foodModel from '../models/food.models.js'
import userModel from "../models/user.models.js"
import stripe from "../config/stripe.js"

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
                    currency: "usd",
                    product_data: { name: food.name },
                    unit_amount: (food.price) * 100 
                },
                quantity: item.quantity
            });

        }
        const Delivery_Fee = 2;

        totalAmount += Delivery_Fee;

        line_items.push({
            price_data: {
                currency: "usd",
                product_data: { name: "Delivery Charge" },
                unit_amount: Delivery_Fee * 100 
            },
            quantity: 1
        });

        const order = await orderModel.create({
            userId,
            items,
            amount: totalAmount,
            address,
        });

        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: "payment",
            metadata: { 
                orderId: order._id.toString(),
                userId : userId.toString()
            },
            success_url: `${url}/verify?orderId=${order._id}`,
            cancel_url: `${url}/cart`
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

// verifyUser Order By Stripe Webhooks 
const stripeverifyOrder = async (req, res) => {

    const sig = req.headers["stripe-signature"];
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (error) {
        console.error("Stripe webhook signature error:", error.message);
        return res.status(400).send(`Webhook Error: ${error.message}`);
    }
    
    console.log("Webhook route hit");
    console.log("Event type:", event.type);


    const session = event.data.object;

    try {
        switch (event.type) {

            // Successful Checkout Session payment
            case "checkout.session.completed": {

                const { orderId, userId } = session.metadata || {};

                if (!orderId || !userId) {
                    console.error("Missing metadata on checkout.session.completed:", session.metadata);
                    break;
                }

                await orderModel.findByIdAndUpdate(orderId, {
                    payment: true
                });

                await userModel.findByIdAndUpdate(userId, {
                    cartData: {}
                });

                break;
            }

            // Async payment failure
            case "checkout.session.async_payment_failed": {

                const { orderId } = session.metadata || {};

                if (!orderId) {
                    console.error("Missing orderId metadata on async_payment_failed:", session.metadata);
                    break;
                }

                await orderModel.findByIdAndDelete(orderId);

                break;
            }

            default:
                // Ignore other event types
                break;
        }
    } catch (err) {
        console.error("Stripe webhook handler error:", err);
        // Still return 200 so Stripe doesn't retry forever
    }

    res.status(200).json({ received: true });
};


// Get User orders

const userOrders = async (req, res) => {
    try {
        const userId = req.userId;
        let orders = await orderModel.find({ userId }).populate("userId", "name email").populate({
            path: "items.foodId",
            select: "name price image category"
        }).exec();

        // Automatically clean up any orders containing deleted food items (null foodId)
        const orphanedOrderIds = orders
            .filter(order => order.items.some(item => !item.foodId))
            .map(order => order._id);

        if (orphanedOrderIds.length > 0) {
            await orderModel.deleteMany({ _id: { $in: orphanedOrderIds } });
            orders = orders.filter(order => !orphanedOrderIds.includes(order._id));
        }

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
        let orders = await orderModel.find({}).populate("userId", "name email").populate(
            {
                path: "items.foodId",
                select: "name price category image "
            }).exec();

        // Automatically clean up any orders containing deleted food items (null foodId)
        const orphanedOrderIds = orders
            .filter(order => order.items.some(item => !item.foodId))
            .map(order => order._id);

        if (orphanedOrderIds.length > 0) {
            await orderModel.deleteMany({ _id: { $in: orphanedOrderIds } });
            orders = orders.filter(order => !orphanedOrderIds.includes(order._id));
        }

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
        if (!status || !orderId) {
            return res.status(400).json({
                success: false,
                message: "Missing fields"
            });
        }
        const allowed = ["Food Processing", "Out Of Delivery", "Delivery", "Cancelled"];

        if (!allowed.includes(status)) {
            res.status(400).json({
                success: false,
                message: "Invaild status"
            })
        }

        const update = await orderModel.findByIdAndUpdate(orderId, { status: status });

        if (!update) {
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
export { placeOrder, stripeverifyOrder, userOrders, listOrder, updateStatus }