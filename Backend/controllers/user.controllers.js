import userModel from '../models/user.models.js'
import validator from 'validator'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

// create jwt token 

const createToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "7d" }
    );
};

// register user

const registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        // vaildate Email formate And Paaword is Strong

        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: "Invalid email"
            })
        }

        if (password.length < 8) {
            return res.json({
                success: false,
                message: "Password must be at least 8 characters"
            })
        }

        // check First This Account Alreay Exites or Not
        const exists = await userModel.findOne({ email: email });

        if (exists) {
            return res.json({
                success: false,
                message: "User already exists"
            })
        }


        // hashing user password

        const hashedpasword = await bcrypt.hash(password, 10);

        const newUser = await userModel.create({
            name: name,
            email: email,
            password: hashedpasword
        })

        const token = createToken(newUser._id);

        res.status(201).json({
            success: true,
            message: "Register Successfully",
            token: token
        })
    }

    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// login user

const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body

        //  Validate input
        if (!email || !password) {
            return res.status(400).json({
                success : false,
                message : "Email and password are required"
            });
        }

        // Check We Account on this email

        const user = await userModel.findOne({ email: email });

        if (!user) {
            return res.json({
                success : false,
                message : "User Dosen't exist"
            })
        }

        // check password is correct or not

        const ismatch = await bcrypt.compare(password, user.password);

        if (!ismatch) {

            return res.json({
                success : false,
                message : "Invaild Password"
            })

        }

        const token = createToken(user._id);

        res.status(200).json({
            success : true,
            message: "Login Successfully",
            token : token
        });

    }

    catch (error) {

        res.status(500).json({
            success : false,
            message : error.message
        });

    }
}


export { registerUser, loginUser };