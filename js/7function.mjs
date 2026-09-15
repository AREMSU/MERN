// DEFINING A FUNCTION

let sum = () => {
    console.log("i am sum function");
}

console.log("Start");
sum();
console.log("End");

// PASSING VALUES INTO A FUNCTION

let pass = (a, b, c, d) => {
    console.log(a, b, c, d)
}

pass(1, 2, 3);

// DEFAULT VALUES IN A FUNCTION

let def = (a = 1, b = 2, c = 3, d = 4) => {
    console.log(a, b, c, d)
}

def(11, 22, 33);