import { Router } from "express"
import bcrypt from "bcrypt"
import User from "../schema/userSchema.js"
import { protect, adminOnly } from "../middleware/auth.js"

let userRoute = Router()

const fail = (message, status = 400) => Object.assign(new Error(message), { status })

// everything here is admin only. customers sign up through /auth/register
userRoute.use(protect, adminOnly)

userRoute
    .route("/")
    .get(async (req, res) => {
        let result = await User.find().sort({ _id: -1 })
        res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            result: result,
        })
    })

userRoute
    .route("/:id")
    .get(async (req, res) => {
        let result = await User.findById(req.params.id)
        if (!result) throw fail("User not found.", 404)
        res.status(200).json({
            success: true,
            message: "User fetched successfully",
            result: result,
        })
    })
    .patch(async (req, res) => {
        const { name, address, phone, role, password } = req.body
        const updates = { name, address, phone, role }
        Object.keys(updates).forEach((key) => updates[key] === undefined && delete updates[key])

        if (password) {
            if (password.length < 6) throw fail("Password must be at least 6 characters.")
            updates.password = await bcrypt.hash(password, 10)
        }

        let result = await User.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true })
        if (!result) throw fail("User not found.", 404)
        res.status(200).json({
            success: true,
            message: "User data updated successfully",
            result: result,
        })
    })
    .delete(async (req, res) => {
        if (req.params.id === String(req.user._id)) throw fail("You can't delete your own account.")
        let result = await User.findByIdAndDelete(req.params.id)
        if (!result) throw fail("User not found.", 404)
        res.status(200).json({
            success: true,
            message: "User deleted successfully",
            result: result,
        })
    })

export default userRoute
