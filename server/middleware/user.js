import jwt from "jsonwebtoken";

export const authUser = (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ success: false, message: "User not authenticated" });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.userId = decoded.userId; // Store userId in req object

        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Token is not valid" });
    }
};
