import { Router } from "express";
import Product from "../schema/productSchema.js";

let productRoute = Router()

productRoute
    .route("/")
    .post(async (req, res, next) => {

        try {
            let result = await Product.create(req.body)
            res.status(200).json({
                success: true,
                message: "Product created successfully.",
                result: result,
            })

        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
            })
        }


    })
    .get((req, res, next) => {
        res.json({ success: true, message: "product read successfully" })
    })

productRoute
    .route("/:id")
    .get((req, res, next) => {
        res.json({ success: true, message: "single product read successfully" })
    })
    .patch((req, res, next) => {
        res.json({ success: true, message: "product updated successfully" })
    })
    .delete((req, res, next) => {
        res.json({ success: true, message: "product deleted successfully" })
    })

export default productRoute