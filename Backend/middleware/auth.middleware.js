import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {

    const authHeader = req.headers.authorization;
        const token =
            authHeader?.split(" ")[1] ||
            req.headers.token;

    if (!token) {
            return res.status(401).json({
                success:false,
                message:"No token provided"
            });
        }

    try {
        const decoded_token = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.userId = decoded_token.id;
        next();
    }
    catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export default authMiddleware;