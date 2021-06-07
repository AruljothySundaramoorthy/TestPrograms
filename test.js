inp = [
    { name: 'firstname', value: 'johndoe' },
    { name: 'age', value: '28' },
    { name: 'language', value: 'English' },
    { name: 'language', value: 'Tamil' },
    { name: 'language', value: 'Hindi' }
];


var data;
inp.map((m) => {
    // console.log(m);

    if (data && data.hasOwnProperty(m.name)) {
        data[m.name] = [...(data[m.name]), ...(m.value)]
        console.log(m);
    }
    data = { ...(data), [m.name]: m.value }

    console.log(data);
    // Object.values(m).map((keys) => {
    //     if (data && !data.hasOwnProperty(keys)) {
    //         data = {
    //             [keys]: m[keys]
    //         }
    //     } else {
    //         [keys] = { ...Object.values(data[keys]), ...m[keys] }
    //     }

    // })
})
console.log(data);