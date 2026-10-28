import { Router } from "express";
import Product from "../schema/productSchema.js";
import { protect, adminOnly } from "../middleware/auth.js";

let productRoute = Router()

const fail = (message, status = 400) => Object.assign(new Error(message), { status })
const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

// GET /product?q=pen&category=Stationery&sort=price-asc&page=1&limit=12
productRoute
    .route("/")
    .get(async (req, res) => {
        const { q, category, sort } = req.query
        const page = Math.max(1, Number(req.query.page) || 1)
        const limit = Math.min(48, Math.max(1, Number(req.query.limit) || 12))

        const filter = {}
        if (q) filter.name = { $regex: escapeRegex(String(q)), $options: "i" }
        if (category) filter.category = String(category)

        const sorts = {
            newest: { _id: -1 },
            "price-asc": { price: 1 },
            "price-desc": { price: -1 },
        }

        const total = await Product.countDocuments(filter)
        const result = await Product.find(filter)
            .sort(sorts[sort] || sorts.newest)
            .skip((page - 1) * limit)
            .limit(limit)

        res.status(200).json({
            success: true,
            message: "Products read successfully",
            result: result,
            total: total,
            page: page,
            pages: Math.max(1, Math.ceil(total / limit)),
        })
    })
    .post(protect, adminOnly, async (req, res) => {
        let result = await Product.create(req.body)
        res.status(201).json({
            success: true,
            message: "Product created successfully.",
            result: result,
        })
    })

// must stay above "/:id" or "categories" would be read as an id
productRoute
    .route("/categories")
    .get(async (req, res) => {
        let result = await Product.distinct("category")
        res.status(200).json({
            success: true,
            message: "Categories read successfully",
            result: result.filter(Boolean).sort(),
        })
    })

productRoute
    .route("/:id")//localhost:8000/product/id
    .get(async (req, res) => {
        let result = await Product.findById(req.params.id)
        if (!result) throw fail("Product not found.", 404)
        res.status(200).json({
            success: true,
            message: "Product read successfully",
            result: result,
        })
    })
    .patch(protect, adminOnly, async (req, res) => {
        let result = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!result) throw fail("Product not found.", 404)
        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            result: result,
        })
    })
    .delete(protect, adminOnly, async (req, res) => {
        let result = await Product.findByIdAndDelete(req.params.id)
        if (!result) throw fail("Product not found.", 404)
        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            result: result,
        })
    })

export default productRoute
