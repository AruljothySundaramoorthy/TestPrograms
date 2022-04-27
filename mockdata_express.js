try {

    const express = require("express");
    const app = express();
    const port = 3000;
    const data = require('./mockdata/MOCK_DATA.json')
    const employeedata = require('./mockdata/MOCK_DATA_EMPLOYEE.json')
    var morgan = require('morgan')
    var cors = require('cors')
    app.use(cors())
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        next();
    })

    app.use(morgan('combined'));


    app.get("/users", (req, res) => {
        res.send(data[Math.floor(Math.random() * (1000 - 0)) + 1]);
    });
    app.get("/employee", (req, res) => {
        res.send(employeedata[Math.floor(Math.random() * (1000 - 0)) + 1]);
    });
    app.get("/employees", (req, res) => {
        res.send(employeedata.slice([Math.floor(Math.random() * (40 - 10)) + 1], [Math.floor(Math.random() * (data.length - 10)) + 1]));
    });
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
    });
} catch (e) {
    console.log(e);
}
