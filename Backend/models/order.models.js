import mongoose from 'mongoose'

const orderSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    items: [
        {
            foodId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "food",
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    amount: {
        type: Number,
        required: true
    },
    address: {
        type: Object,
        required: true
    },
    status: {
        type: String,
        enum: ["Food Processing", "Out for Delivery", "Delivered", "Cancelled"],
        default: "Food Processing"
    },
    payment: {
        type: Boolean,
        default: false
    }
},{timestamps: true });

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;