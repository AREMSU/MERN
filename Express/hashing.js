/* 

converting text into eligible form
eg. abc => qiojdoiqwjdklsmodiqwn 

npm i bcrypt
*/

import bcrypt from "bcrypt"

/* let password = "abc"

let hashedPassword = await bcrypt.hash(password,10) // "10" is used to encrypt the text 2^n times, here n = 10
console.log(hashedPassword) */


let hashedPassword = "$2b$10$RAtmemtdDqkNZkoA.DhLzehuH0x/edMssIOrWpnqJ7EQHEs92MtYe"

let loginPassword = "abc"

let isValidPassword = await bcrypt.compare(loginPassword, hashedPassword)
console.log(isValidPassword)