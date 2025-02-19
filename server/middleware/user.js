import jwt from 'jsonwebtoken';

export const authUser = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ success: false, message: "User not authenticated" });
        }
        // Verify token
        const decoded = await jwt.verify(token, process.env.SECRET_KEY);
        req.id = decoded; 
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Token is not valid" });
    }
};
