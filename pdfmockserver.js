try {
    const express = require("express");
    const app = express();
    const port = 3000;
    const { generatepdf } = require('./pdfgenerator.js')


    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.get("/pdf", (req, res) => {
        generatepdf(req, res)
    });
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
    });
} catch (e) {
    console.log(e);
}
