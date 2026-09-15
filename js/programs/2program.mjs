const weekDay = (day) => {
    if (day === "Saturday" || day === "Sunday") {
        return "weekend"
    }
    else {
        return "weekday"
    }
}


const checkDay = weekDay("Saturday")

console.log(checkDay)