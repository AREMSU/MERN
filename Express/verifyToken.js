// verify token

let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzNCwiaWF0IjoxNzkwMDUxNzcxLCJleHAiOjE3OTAwNTM1NzF9.EV7D9c6pMfFWNyDY9fERwWgsBRFk8rtptDOQg3eebCM"

import jwt from "jsonwebtoken"
let value = jwt.verify(token, "sunwayL2")

console.log(value)