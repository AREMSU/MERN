// make express application
// attach port to it

import express, { json } from "express";
import firstRoute from "./src/routes/firstRoute.js";
import productRoute from "./src/routes/productRoute.js";
import userRoute from "./src/routes/userRoute.js";
import reviewRoute from "./src/routes/reviewRoute.js";
import connectToDb from "./src/connectToDb.js";
import jobRoute from "./src/routes/jobRoute.js";
import cors from "cors";
let app = express();

app.listen(8000, () => {
    console.log("application is listening at port 8000")
    connectToDb()
})

app.use(cors()) //enabling cors make use hit api's through browser
app.use(json()) //this step makes the backend capable of understanding json language
app.use("/", firstRoute)
app.use("/product", productRoute)
app.use("/user", userRoute)
app.use("/review", reviewRoute)
app.use("/job",jobRoute)


/* 
database actions

C => Create    (post)
R => Read      (get)
U => Update    (put/ patch, mostly patch is used)
D => Delete    (delete)

making api means defining output for each request

localhost: 8000, post => i am post method
localhost: 8000, get => i am get method
localhost: 8000, patch => i am patch method
localhost: 8000, delete => i am delete method

database (mongodb database)

*/