import { model, Schema } from "mongoose"

let productSchema = Schema({
    name: {
        type: String,
        required: [true, "name is required."],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, "price is required."],
        min: [0, "price can't be negative."],
    },
    quantity: {
        type: Number,
        required: [true, "quantity is required."],
        min: [0, "quantity can't be negative."],
    },
    description: {
        type: String,
        trim: true,
    },
    category: {
        type: String,
        trim: true,
        default: "General",
    },
    image: {
        type: String, // image url
        trim: true,
    },
}, { timestamps: true })

let Product = model("Product", productSchema)
export default Product
