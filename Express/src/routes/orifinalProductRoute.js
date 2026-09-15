import { Router } from "express";

let productRoute = Router()

productRoute
    .route("/name/:a/price/:b")//localhost:8000/product/name/anything/price/anything
    .post((req, res, next) => {
        res.json("create product")
        console.log(req.body)
        console.log(req.params)//{a:"$$", b:"anything"}
        console.log(req.query)//{
        //   price: '10000',
        //   quantity: '2',
        //   colour: 'red'
        // }
    })
    .get((req, res, next) => {
        res.json("read product")
    })
    .patch((req, res, next) => {
        res.json("update product")
        console.log(req.body)
        console.log(req.params)
    })
    .delete((req, res, next) => {
        res.json("delete product")
    })

export default productRoute