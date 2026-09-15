import { Router } from "express"

let userRoute = Router()

userRoute
    .route("/")
    .post((req, res, next) => {
        res.json({ success: true, message: "user created successfully." })
    })

    .get((req, res, next) => {
        res.json({ sucess: true, message: "user read successfully." })
    })

userRoute
    .route("/:id")
    .get((req, res, next) => {
        res.json({ success: true, message: "user read successfully" })
    })
    .patch((req, res, next) => {
        res.json({ success: true, message: "user updated successfully" })
    })
    .delete((req, res, next) => {
        res.json({ success: true, message: "user deleted successfully" })
    })

// localhost:8000/user
// post => {sucess:true; message:'user created sucessfully'}
// get => {sucess:true; message:'user read sucessfully'} ------> this is for all the data in the database

// localhost:8000/user/:id
// get => {sucess:true; message:'user read sucessfully'} ------> this is for specific user in the database
// patch => {sucess:true; message:'user updated sucessfully'}
// delete => {sucess:true; message:'user deleted sucessfully'}

export default userRoute