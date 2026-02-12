import jwt from "jsonwebtoken";

const adminMiddleware = (req, res, next) => {
    try {

        const {token} = req.headers;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET_KEY
        );

        req.adminId = decoded.id;
        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};

export default adminMiddleware;
