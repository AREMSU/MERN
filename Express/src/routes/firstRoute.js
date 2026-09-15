import { Router } from "express";

let firstRoute = Router()

firstRoute
    .route("/")
    .post((req, res, next) => {
        res.json("i am post method")
    })
    .get((req, res, next) => {
        res.json("i am get method")
    })
    .patch((req, res, next) => {
        res.json("i am patch method")
    })
    .put((req, res, next) => {
        res.json("i am put method")
    })
    .delete((req, res, next) => {
        res.json("i am delete method")
    })


export default firstRoute