import jwtUtils from '../utils/jwt.js';

//jwt token verification middleware

export const verifyToken = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
        return res.status(403).json({ message: "Access denied" });
    }
    try {
        const verified = jwtUtils.verifyToken(token);
        req.user = verified;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid token" });
    }
};

