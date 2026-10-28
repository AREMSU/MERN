import jwt from "jsonwebtoken"
import { secretKey } from "../constant.js"
import User from "../schema/userSchema.js"

// reads "Authorization: Bearer <token>", puts the user on req.user
export const protect = async (req, res, next) => {
    try {
        const header = req.headers.authorization || ""
        const token = header.startsWith("Bearer ") ? header.slice(7) : null
        if (!token) {
            return res.status(401).json({ success: false, message: "Please log in first." })
        }

        const { id } = jwt.verify(token, secretKey)
        const user = await User.findById(id)
        if (!user) {
            return res.status(401).json({ success: false, message: "Account no longer exists." })
        }

        req.user = user
        next()
    } catch {
        res.status(401).json({ success: false, message: "Session expired. Please log in again." })
    }
}

export const adminOnly = (req, res, next) => {
    if (req.user?.role !== "admin") {
        return res.status(403).json({ success: false, message: "Admin access only." })
    }
    next()
}
