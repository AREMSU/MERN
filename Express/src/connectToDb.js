import mongoose from "mongoose"
import { dbUrl } from "./constant.js"

const connectToDb = async () => {
    await mongoose.connect(dbUrl)
    console.log("connected to database")
}

export default connectToDb
