import userModel from "../models/user.models.js";


// add to item in cart

const addTocart = async (req, res) => {

    try {
        const { itemId } = req.body;
        const id = req.userId;
        const user = await userModel.findById(id);

        if (!user) {
            return res.json({
                success: false,
                message: "User is Not Founed"
            })
        }

        let cartData = user.cartData;
        if (!cartData[itemId]) {
            cartData[itemId] = 1
        }
        else {
            cartData[itemId] = cartData[itemId] + 1;
        }

        await userModel.findByIdAndUpdate(id, { cartData });

        res.json({
            success: true,
            message: "Add To Cart"
        })
    }
    catch (error) {

        res.json({
            success: false,
            message: error.message
        });

    }

}

// remove to item in cart

const removeTocart = async (req, res) => {
    try {
        const { itemId } = req.body;

        const id = req.userId;

        const user = await userModel.findById(id);

        if (!user) {
            return res.json({
                success: false,
                message: "User is Not Founed"
            })
        }

        let cartData = user.cartData;

        if (cartData[itemId] > 0) {
            cartData[itemId] = cartData[itemId] - 1;
        }

        await userModel.findByIdAndUpdate(id, { cartData });

        res.json({
            success: true,
            message: "Removed Form Cart"
        })
    }
    catch (error) {

        res.json({
            success: false,
            message: error.message
        });

    }
}

// get TO item in cart

const getCart = async (req, res) => {

    try {

        const id = req.userId;

        const user = await userModel.findById(id);

        if (!user) {
            return res.json({
                success: false,
                message: "User is Not Founed"
            })
        }
        const cartData = await user.cartData;
        
        res.json({
            success: true,
            cartData
        })
    } 
    catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
}

export { addTocart, removeTocart ,getCart}