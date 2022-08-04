try { 
    const express = require("express");
    const app = express();
    const port = 3002; 
    const {plantavailabilityreport}=require('./pareport_ACME')

   
    app.get("/", (req, res) => {
        plantavailabilityreport(req, res);
    });
    

    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
    });
} catch (e) {
    console.log(e);
}
