try {
    const formidable = require('formidable');
    const express = require("express");
    const app = express();
    const port = 3003;
    const dbengine = require("./dbengine");
    const { processor } = require('./excelparser');
    const stringify = require('csv-stringify');


    const data = [



        {
            'Account Name': 'Cash',
            'Account Code': '101',
            Type: 'Assets',
            Description: 'Checking account balance'
        },
        {
            'Account Name': 'Wages Payable',
            'Account Code': '220',
            Type: 'Liabilities',
            Description: 'Amount owed to employes for hours not yet paid'
        },
        {
            'Account Name': 'Rent expense',
            'Account Code': '560',
            Type: 'Expenses',
            Description: 'Cost of occupied rented facilities during accounting period'
        }
    ]

    // const PDFDocument = require('pdfkit-table');
    // const datafunction = () => {
    //     return true;
    // }
    // app.get("/", (req, res) => {
    //     datafunction(req, res);
    // });
    dbengine.connect();
    app.get("/", async (req, res) => {

        stringify(data, { 
            
            header: true
        }).pipe(res);
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader(
            'Content-Disposition',
            `attachment; filename="reportdata-${new Date()}.csv"`
        );
        // const exportdatatoPDFTable = async (dataArray, res) => {
        //     const table = {
        //         headers: Object.keys(dataArray[0]),
        //         rows: dataArray.map((x) => Object.values(x)),
        //     };
        //     const doc = new PDFDocument({
        //         margin: 30,
        //         size: [1000, 150 * Object.keys(dataArray[0]).length],
        //         layout: 'landscape',
        //     });
        //     // file name
        //     doc.pipe(res);
        //     await doc.table(table, {
        //         columnSpacing: 10,
        //         padding: 10,
        //         align: 'center',
        //         prepareHeader: () => {
        //             doc.fontSize(11);
        //         },
        //         divider: {
        //             header: { disabled: true, width: 2, opacity: 1 },
        //         },
        //         prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
        //             const { x, y, width, height } = rectCell;
        //             // first line
        //             if (indexColumn === 0) {
        //                 doc
        //                     .lineWidth(0.5)
        //                     .moveTo(x, y)
        //                     .lineTo(x, y + height)
        //                     .stroke();
        //             }
        //             doc
        //                 .lineWidth(0.5)
        //                 .moveTo(x + width, y)
        //                 .lineTo(x + width, y + height)
        //                 .stroke();
        //         },
        //     });
        //     doc.end();
        // };
        // let data = [
        //     {
        //         Timestamp: "",
        //         "IS1 Inverter1 Total Active Power(kW)": "",
        //     },
        // ]
        // await exportdatatoPDFTable(data, res);
        // // datafunction(req, res);
        // const form = formidable({ multiples: false });
        // form.parse(req, async (err, fields, files) => {
        //     if (err) {
        //         next(err);
        //         return;
        //     }

        //     try {
        //         const { file } = files;
        //         await processor(file.filepath);
        //         res.send({ data: 'Process Completed', error: false });
        //     } catch (error) {
        //         res.status(400).send({ data: error.message, error: true });
        //     }
        // });
    });

    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
    });
} catch (e) {
    console.log(e);
}
