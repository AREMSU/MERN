import mongoose from "mongoose"

const connectToDb = async () => {
    await mongoose.connect("mongodb://localhost:27017/sunwayL2")
    console.log("connected to database")
}

export default connectToDb

/*

npm i mongoose

*/