try {
    const formidable = require('formidable');
    const express = require("express");
    const app = express();
    const port = 3000;
    const { processor } = require('./excelparser');

    const datafunction = () => {
        return true;
    }
    app.get("/", (req, res) => {
        datafunction(req, res);
    });
    app.post("/", async (req, res) => {
        // datafunction(req, res);
        const form = formidable({ multiples: false });
        form.parse(req, async (err, fields, files) => {
            if (err) {
                next(err);
                return;
            }

            try {
                const { file } = files;
                await processor(file.filepath);
                res.send({ data: 'Process Completed', error: false });
            } catch (error) {
                res.status(400).send({ data: error.message, error: true });
            }
        });
    });

    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
    });
} catch (e) {
    console.log(e);
}
