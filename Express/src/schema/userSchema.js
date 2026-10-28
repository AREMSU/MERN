import { model, Schema } from "mongoose"

let userSchema = Schema({
    name: {
        type: String,
        required: [true, "name is required."],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "email is required."],
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "password is required."],
        select: false, // never sent back unless asked for with .select("+password")
    },
    address: {
        type: String,
        trim: true,
    },
    phone: {
        type: String,
        trim: true,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
}, { timestamps: true })

let User = model("User", userSchema)
export default User
