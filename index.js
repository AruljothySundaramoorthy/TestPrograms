const isHuman = false;
const isAnimal = false;

const data = {

    ...(isHuman ? { name: 'Narayanan', lastname: 'Kuppusami' } : {}),
    ...(isAnimal ? { type: 'Cat', age: 7 } : {}),
};


console.log(data);
