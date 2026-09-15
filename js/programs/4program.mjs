const variable = (age, gender) => {
    if (age < 18) {
        return "no entry";
    }
    else if (age >= 18 && gender === "male") {
        return "Entry fee = Rs.1000";
    }
    else if (age >= 18 && gender === "female") {
        return "old";
    }
    else {
        return "invalid insput";
    }
}


const person = variable(18, "male")

console.log(person)

