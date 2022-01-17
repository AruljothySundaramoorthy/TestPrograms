function getpaginations(value) {
    return Math.ceil(value / 10)
}

console.log(getpaginations(11))