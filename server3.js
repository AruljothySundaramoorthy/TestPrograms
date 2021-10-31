try {
    const express = require("express");
    const app = express();
    const port = 3000;

    const startOfDay = require("date-fns/startOfDay");
    const endOfDay = require("date-fns/endOfDay");
    const parse = require("date-fns/parse");
    const format = require("date-fns/format");
    const differenceInMinutes = require("date-fns/differenceInMinutes");
    const differenceInDays = require("date-fns/differenceInDays");
    const axios = require("axios");
    const differenceInHours = require("date-fns/differenceInHours");
    const ExcelJS = require("exceljs");
    const { data } = require("./datablock1");
    const { parameters } = require("./parameters");
    const lodash = require("lodash");
    const workbook = new ExcelJS.Workbook();

    datafunction = (req, res) => {
        let tutorials = [];
        tutorials.push(
            {
                id: "obj.id",
                title: "obj.title",
                description: "obj.description",
                published: "obj.published",
            },
            {
                id: "obj.id",
                title: "obj.title",
                description: "obj.description",
                published: "obj.published",
            },
            {
                id: "obj.id",
                title: "obj.title",
                description: "obj.description",
                published: "obj.published",
            },
            {
                id: "obj.id",
                title: "obj.title",
                description: "obj.description",
                published: "obj.published",
            },
            {
                id: "obj.id",
                title: "obj.title",
                description: "obj.description",
                published: "obj.published",
            }
        );
        let workbook = new ExcelJS.Workbook();
        let worksheet = workbook.addWorksheet("Tutorials");

        worksheet.columns = [
            { header: "Id", key: "id", width: 5 },
            { header: "Title", key: "title", width: 25 },
            { header: "Description", key: "description", width: 25 },
            { header: "Published", key: "published", width: 10 },
        ]; // Add Array Rows
        worksheet.addRows(tutorials);

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            "attachment; filename=" + "tutorials.xlsx"
        );
        return workbook.xlsx.write(res).then(function () {
            res.status(200).end();
        });
    };
    app.get("/", (req, res) => {
        datafunction(req, res);
        console.log("hi");
    });

    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
    });
} catch (e) {
    console.log(e);
}
