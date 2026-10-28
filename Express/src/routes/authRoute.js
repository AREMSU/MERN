import { Router } from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import User from "../schema/userSchema.js"
import { secretKey } from "../constant.js"
import { protect } from "../middleware/auth.js"

let authRoute = Router()

const fail = (message, status = 400) => Object.assign(new Error(message), { status })
const makeToken = (user) => jwt.sign({ id: user._id }, secretKey, { expiresIn: "7d" })
const publicUser = (user) => {
    const { password, ...rest } = user.toObject()
    return rest
}

authRoute.post("/register", async (req, res) => {
    const { name, email, password } = req.body
    if (!password || password.length < 6) throw fail("Password must be at least 6 characters.")

    const hashed = await bcrypt.hash(password, 10)
    // role is never taken from the request, new accounts are always customers
    const user = await User.create({ name, email, password: hashed })

    res.status(201).json({
        success: true,
        message: "Account created.",
        token: makeToken(user),
        result: publicUser(user),
    })
})

authRoute.post("/login", async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email: String(email || "").toLowerCase().trim() }).select("+password")

    const ok = user && password && await bcrypt.compare(password, user.password)
    if (!ok) throw fail("Wrong email or password.", 401)

    res.json({
        success: true,
        message: "Logged in.",
        token: makeToken(user),
        result: publicUser(user),
    })
})

authRoute
    .route("/me")
    .get(protect, (req, res) => {
        res.json({ success: true, message: "Profile fetched.", result: req.user })
    })
    .patch(protect, async (req, res) => {
        const { name, address, phone } = req.body
        const updates = {}
        if (name) updates.name = name
        if (address !== undefined) updates.address = address
        if (phone !== undefined) updates.phone = phone

        const result = await User.findByIdAndUpdate(req.user._id, updates, { new: true, runValidators: true })
        res.json({ success: true, message: "Profile updated.", result })
    })

export default authRoute
