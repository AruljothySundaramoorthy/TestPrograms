const strfucntion = (key) => {
    const data = key.split(' ').map((x) => {
        if (typeof (x) == 'string' && isNaN(Number(x))) {
            console.log(Number(x))
            return x
        }
    })
    console.log(data.length)
}
strfucntion('hi how are you 86')