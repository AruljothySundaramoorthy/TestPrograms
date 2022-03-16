const { data } = require("./mockaroo");

const plants = ["chile", "maan", "eden"];
maindata = []
data.map((x) => {
    const name = plants[Math.floor(Math.random() * (0 - 2 + 1) + 1) || 0];
    Object.assign(x, { plantname: name });
    maindata.push(x)
});
console.log(maindata)
