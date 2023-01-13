try { 
    const express = require("express");
    const app = express();
    const port = 3002; const pino = require('pino')

    const logger = require('./lib/logger');
    logger.info('hi');
    app.get("/", (req, res) => { 
        res.status(200).send('hi')
        // plantavailabilityreport(req, res);
    });
    

    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
    });
} catch (e) {
    console.log(e);
}
