import AdminModel from "../models/Admin.model.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

//token Gerater 

const createToken = (id, role) => {
    if (!process.env.JWT_SECRET_KEY)
        throw new Error("JWT secret missing");

    return jwt.sign(
        { id , role },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "7d" }
    )

}

// Admin register

const registerAdmin = async (req, res) => {
    try {
        const { name, email, password, role } = req.body

        if (!name || !email || !password ) {
            return res.json({
                success: false,
                message: "All fields are required"
            })
        }

        const exites = await AdminModel.findOne({ email: email });

        if (exites) {
            return res.json({
                success: false,
                message: "Email already registered"
            })
        }

        if (password.length < 8) {
            return res.json({
                success: false,
                message: "Password must be at least 6 characters"
            });
        }

        const hashpassword = await bcrypt.hash(password, 10);

        const admin = await AdminModel.create({
            name: name,
            email: email,
            password: hashpassword,
            role: role
        })

        const token = createToken(admin._id, admin.role);

        res.json({
            success: true,
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

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.json({
                success: false,
                message: "All fields are required"
            })
        }

        const admin = await AdminModel.findOne({ email: email });

        if (!admin) {
            return res.json({
                success: false,
                message: "Email Not exites"
            })
        }

        const ismatch = await bcrypt.compare(password, admin.password);

        if (!ismatch) {
            return res.json({
                success: false,
                message: "Password Is Not Mathed"
            })
        }

        const token = createToken(admin._id,admin.role);

        res.json({
            success: true,
            message: "Admin Login",
            token: token
        })
    }
    catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export { registerAdmin, loginAdmin }