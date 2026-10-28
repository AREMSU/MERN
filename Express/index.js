// make express application
// attach port to it

import express, { json } from "express";
import cors from "cors";
import { port, clientUrl } from "./src/constant.js";
import connectToDb from "./src/connectToDb.js";
import authRoute from "./src/routes/authRoute.js";
import productRoute from "./src/routes/productRoute.js";
import userRoute from "./src/routes/userRoute.js";
import orderRoute from "./src/routes/orderRoute.js";

let app = express()

app.use(cors({ origin: clientUrl })) //only the frontend is allowed to call the api from a browser
app.use(json()) //this step makes the backend capable of understanding json language

app.get("/", (req, res) => {
    res.json({ success: true, message: "api is running" })
})
app.use("/auth", authRoute)
app.use("/product", productRoute)
app.use("/user", userRoute)
app.use("/order", orderRoute)

// unknown url
app.use((req, res) => {
    res.status(404).json({ success: false, message: "Route not found." })
})

// every error thrown in a route ends up here (express 5 forwards async errors automatically)
app.use((error, req, res, next) => {
    let status = error.status || 500
    let message = error.message

    if (error.name === "ValidationError") status = 400
    if (error.name === "CastError") {
        status = 400
        message = "Invalid id."
    }
    if (error.code === 11000) {
        status = 400
        message = `${Object.keys(error.keyValue || {})[0] || "value"} already exists.`
    }

    if (status === 500) {
        console.error(error)
        message = "Something went wrong on the server."
    }

    res.status(status).json({ success: false, message: message })
})

await connectToDb()
app.listen(port, () => {
    console.log(`application is listening at port ${port}`)
})
