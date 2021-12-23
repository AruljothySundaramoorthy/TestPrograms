const x = 22;
const y = 22;

function checkpercentage() {
    const result = (y / x) * 100;
    console.log(result);
    if (result > 100) {
        console.log("The result is greater than 100");
    } else {
        console.log("The result is less than 100");
    }
}
checkpercentage()