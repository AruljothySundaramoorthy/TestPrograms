try {
    const express = require("express");
    const app = express();
    const port = 3000;
    const { plantavailabilityreport } = require('./pareport_ACME.js')
    const { gridavailabilityreport } = require('./gareport_ACME.js')
    const { getheatmap, getmockheatmap, getnoralPRreport } = require('./heatmap_ACME.js')


    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.get("/pa", (req, res) => {
        plantavailabilityreport(req, res)
    });
    app.get("/ga", (req, res) => {
        gridavailabilityreport(req, res)
    });
    app.get("/heatmap", (req, res) => {
        getmockheatmap(req, res)
    });
    app.get("/pr", (req, res) => {
        getnoralPRreport(req, res)
    });


    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
    });
} catch (e) {
    console.log(e);
}
