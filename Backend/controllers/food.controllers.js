import foodModel from "../models/Food.models.js";
import fs from 'fs'

// add food item 

const addFood = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;

        if (!name || !description || !price || !category) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Image is required"
            });
        }

        console.log(req.file.filename);

        const food = new foodModel({
            name,
            description,
            price: price,
            category,
            image: `${req.file.filename}`
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
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//remove food 

const removeFood = async (req, res) => {

    const {id} = req.body;
    
    try {
        const fooditem = await foodModel.findById(id);
        if (!fooditem) {
            return res.status(404).json({
                success: true,
                message: "Food Not Found"
            })
        }

        fs.unlink(`uploads/${fooditem.image}`, () => { })

        await foodModel.findByIdAndDelete(req.body.id);

        res.status(200).json({
            success: true,
            message: "Food Removed"
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
export { addFood, listFood, removeFood };