import { model, Schema } from "mongoose"

let userSchema = Schema({
    name: {
        type: String,
        required: [true, "name is required."],
    },
    email: {
        type: String,
        required: [true, "string is required."],
    },
    password: {
        type: Number,
        required: [true, "password is required."],
    },
    address: {
        type: String,
        required: [true, "address is required."],
    },
    phone: {
        type: Number,
        required: [true, "phone is required."],
    },
})

let User = model("User", userSchema)
export default User