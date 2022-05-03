try {
    const express = require("express");
    const app = express();
    const port = 3000;
    const { plantavailabilityreport } = require('./pareport_ACME.js')
    const { gridavailabilityreport } = require('./gareport_ACME.js')



    app.get("/pa", (req, res) => {
        plantavailabilityreport(req, res)
    });
    app.get("/ga", (req, res) => {
        gridavailabilityreport(req, res)
    });


    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
    });
} catch (e) {
    console.log(e);
}
