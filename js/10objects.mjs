let arr = ["aarnav", 20, false, 65]
// array is useful for storing multiple data but they don't have explicite info tied to them

let info = {
    name: "aarnav",
    age: 20,
    isMarried: false,
    weight: 65,
}
//objects store multiple values WITH their info 

// get
console.log(info.name)
console.log(info.age)

// change
info.name = "AREMSU"
console.log(info)

// add new property 
info.country = "nepal"
console.log(info);
// info.variable = something with change the value 
// if the key-valu pair already exists, else it will add the value to the object

// delete
delete info.weight
console.log(info)