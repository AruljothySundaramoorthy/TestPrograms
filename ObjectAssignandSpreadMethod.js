const { data } = require('./mockdata');


let newobject = {};

console.time('spreadandassignoperation');
spreadandassignoperation = () => {

    data.forEach(element => {


        let dataval = { name: element.name, age: element.age, address: element.address }
        Object.assign(newobject, dataval);
        // newobject = { ...newobject, ...dataval }

    })
};
spreadandassignoperation();


console.timeEnd('spreadandassignoperation');
