import foodModel from '../models/food.models.js'
import orderModel from '../models/order.models.js'
import userModel from '../models/user.models.js'
import { v2 as cloudinary } from "cloudinary";


// add food item 

const addFood = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;
        const imageFile = req.file;

        if (!name || !description || !price || !category) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        if (!imageFile) {
            return res.status(400).json({
                success: false,
                message: "Image is required"
            });
        }

        const imageUpload = await cloudinary.uploader.upload(
            `data:${imageFile.mimetype};base64,${imageFile.buffer.toString("base64")}`
        );

        const food = new foodModel({
            name,
            description,
            price: price,
            category,
            image: imageUpload.secure_url
        });

        await food.save();

        res.status(201).json({
            success: true,
            message: "Food Added"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const listFood = async (req, res) => {
    try {

        const food = await foodModel.find({});

        if (food.length === 0) {
            return res.status(200).json({
                success: true,
                data: [],
                message: "No food items found"
            });
        }

        res.status(200).json({
            success: true,
            data: food
        })
    }
    catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

//remove food 

const removeFood = async (req, res) => {

    const { id } = req.body;

    try {
        const fooditem = await foodModel.findById(id);
        if (!fooditem) {
            return res.status(404).json({
                success: false,
                message: "Food Not Found"
            })
        }

        const url = fooditem.image;
        if (url) {
            const publicId = url.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(publicId);
        }

        await foodModel.findByIdAndDelete(id);

        // Delete all orders associated with this deleted food item
        await orderModel.deleteMany({ "items.foodId": id });

        // Remove item from all users' carts
        await userModel.updateMany({}, { $unset: { [`cartData.${id}`]: "" } });

        res.status(200).json({
            success: true,
            message: "Food Removed and related orders cleaned up"
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//Get One Food Item Only

const getFoodById = async (req, res) => {

    try {
        const { id } = req.params;

        const food = await foodModel.findById(id);

        if (!food) {
            return res.json({
                success: false,
                message: "Food Not Found"
            });
        }

        return res.json({
            success: true,
            data: food
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};


export { addFood, listFood, getFoodById, removeFood };