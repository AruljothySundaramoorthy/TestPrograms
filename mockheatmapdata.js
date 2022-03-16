const moment = require('moment');

const date = new Date();

var plants = ['sb solar', 'asian fab', 'tata solar']
data = [];
for (let i = 0; i <= 30; i++) {

    const newdateval = moment(date).add(i, 'day').toDate();
    plants.map((plant) => {
        const plantdata = {
            plant: plant,
            date: moment(newdateval).format('YYYYMMDD'),
            value: Math.floor(Math.random() * 100)
        }
        // console.log(plantdata);
        data.push(plantdata);
    })
}
console.log(data)