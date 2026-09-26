import { Router } from "express"
import User from "../schema/userSchema.js"

let userRoute = Router()

userRoute
    .route("/")
    .post(async (req, res, next) => {
        try {
            let result = await User.create(req.body)
            res.status(200).json({
                success: true,
                message: "User created Successfully",
                result: result,
            })
        }
        catch {
            res.status(400).json({
                success: false,
                message: error.message
            })
        }
    })

    .get(async (req, res, next) => {
        try {
            let result = await User.find(req.body)
            res.status(200).json({
                success: true,
                message: "Users fetched Successfully",
                result: result,
            })
        }
        catch {
            res.status(400).json({
                success: false,
                message: error.message
            })
        }
    })

userRoute
    .route("/:id")
    .get(async (req, res, next) => {
        try {
            let result = await User.findById(req.params.id)
            res.status(200).json({
                success: true,
                message: "User fetched successfully",
                result: result,
            })
        }
        catch {
            res.status(400).json({
                success: false,
                message: error.message,
            })
        }
    })
    .patch(async (req, res, next) => {
        try {
            let result = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
            res.status(200).json({
                success: true,
                message: "User data updated successfully",
                result: result,
            })
        }
        catch {
            res.status(400).json({
                success: false,
                message: error.message,
            })
        }
    })
    .delete(async (req, res, next) => {
        try {
            let result = await User.findByIdAndDelete(req.params.id)
            res.status(200).json({
                success: true,
                message: "User deleted successfully",
                result: result,
            })
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
            })
        }
    })

// localhost:8000/user
// post => {sucess:true; message:'user created sucessfully'}
// get => {sucess:true; message:'user read sucessfully'} ------> this is for all the data in the database

// localhost:8000/user/:id
// get => {sucess:true; message:'user read sucessfully'} ------> this is for specific user in the database
// patch => {sucess:true; message:'user updated sucessfully'}
// delete => {sucess:true; message:'user deleted sucessfully'}

export default userRoute