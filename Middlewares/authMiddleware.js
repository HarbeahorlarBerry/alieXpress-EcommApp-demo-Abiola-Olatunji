import  jwt  from "jsonwebtoken"
import  User  from "../Models/usersSchema.js"


// Verify JWT and attach user to request
export const authMiddleware = async (req, res, next) => {
   
    const accessToken = req.cookies.token 
    const jwtSecret = process.env.JWT_SECRET

    if (!accessToken) {
        return res.status(401).json({ message: "Please login first" })
    }
    try {
        const decoded = jwt.verify(accessToken, jwtSecret);

        if (!decoded) {
            return res.status(401).json({ message: "Invalid token"});
        }

       const verifiedUser = await User.findById(decoded.id).select("-password")
         if (!verifiedUser) {
            return res.status(401).json({ message: "Invalid id" });
        }
        // Attach full user ( with role ) to request
        req.user = verifiedUser;
        next();
    } catch (error) {
        console.error("Auth error:", error);
        return res.status(500).json(error);
    }
};

// Check if user is Admin
export const adminMiddleware = (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ message: "Admin access required" });
    }
    next();
};

// Check if user is Altimate Admin
export const altimateAdminMiddleware = (req, res, next) => {
    if (!req.user || req.user.role !== "altimateAdmin") {
        return res.status(403).json({ message: "Altimate Admin access required" });
    }
    next();
};

 