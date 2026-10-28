import { model, Schema } from "mongoose"

export const STATUSES = ["pending", "processing", "shipped", "delivered", "cancelled"]

let orderSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    // name and price are copied at order time so old orders don't change when a product is edited
    items: [{
        product: { type: Schema.Types.ObjectId, ref: "Product" },
        name: String,
        price: Number,
        qty: Number,
    }],
    total: {
        type: Number,
        required: true,
    },
    shipping: {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String, required: true },
    },
    status: {
        type: String,
        enum: STATUSES,
        default: "pending",
    },
    paymentMethod: {
        type: String,
        default: "cash on delivery",
    },
}, { timestamps: true })

let Order = model("Order", orderSchema)
export default Order
