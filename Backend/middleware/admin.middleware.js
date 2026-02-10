import jwt  from "jsonwebtoken";

const adminMiddeleware = async (req, res, next) => {
    const { token } = req.headers;

    if (!token) {
        return res.json({
            success: false,
            message: "Not Authrozies Login Again "
        });
    }

    try {
        const decoded = await jwt.verify(token,process.env.JWT_SECRET_KEY);
    
        req.adminId = decoded;
        next();
    } 
    catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export default adminMiddeleware;