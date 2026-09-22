// npm i jsonwebtoken

/* 
id
    details
    logo
    expiry details

token 
    details
    logo --> secret key
    expiry details
*/

import jwt from "jsonwebtoken"
let details = {
    id: 1234,
}

let secretKey = "sunwayL2"

let expiryInfo = {
    expiresIn: "30m",
}

let token = jwt.sign(details, secretKey, expiryInfo)
console.log(token)

