const ageGroup = (age) => {
    if (age < 18) {
        return "child";
    }
    else if (age > 17 && age < 60) {
        return "adult";
    }
    else if (age > 60) {
        return "old";
    }
    else {
        return "invalid insput";
    }
}


const Age_Group = ageGroup()

console.log(Age_Group)

