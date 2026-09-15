import { model, Schema } from "mongoose"

let jobSchema = Schema({
    title: {
        type: String,
        required: [true, "title is required."],
    },
    address: {
        type: String,
        required: [true, "address is required."],
    },
    salary: {
        type: Number,
        required: [true, "salary is required."],
    },
    description: {
        type: String,
        required: [false],
    }
})

let Job = model("Job", jobSchema)
export default Job

/* 
product
    name        String
    price       Number
    quantity    Number
    description String
*/