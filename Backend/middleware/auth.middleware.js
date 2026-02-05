import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {

    const { token } = req.headers;

    if (!token) {
        return res.json({
            success: false,
            message: "Not Authrozies Login Again "
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