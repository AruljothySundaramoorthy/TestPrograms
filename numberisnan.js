

const check = (val1, val2) => {
    console.log(Number.isNaN(val1 / val2) ? 0 : val1 / val2)

}

check(1, 'a');
check(20, 1)