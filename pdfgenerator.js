const PDFDocument = require("pdfkit-table");
const { pick } = require("lodash");

const generatepdf = async (req, res) => {
    try {
        var clientimage =
            "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";
        const exportdata = [
            {
                title: "report",
                data: [
                    { name: "arjul", age: 22 },
                    { name: "Kavi", age: 21 },
                    { name: "Aravind", age: 35 },
                ],
            },
            {
                title: "report2",
                data: [
                    { collegename: "arjul2", location: 22 },
                    { collegename: "Kavi2", location: 21 },
                    { collegename: "Aravind2", location: 35 },
                ],
            },
        ];
        var doc = new PDFDocument({
            margin: 30,
            // size: [100, 891],
            layout: "landscape",
        });

        // file name
        doc.pipe(res);
        const exportdatatoPDFTable = async (dataArray, response) => {
            try {
                for (let i = 0; i < dataArray.length; i++) {
                    const table = {
                        title: `Project Name: Project name needs to include`,

                        subtitle: `ReportName:${dataArray[i].title}`,

                        headers: Object.keys(dataArray[i].data[0]),
                        rows: dataArray[i].data.map((x) => Object.values(x)),
                    };
                    const size = [
                        1000,
                        150 * Object.keys(dataArray[i].data[0]).length < 891
                            ? 891
                            : 150 * Object.keys(dataArray[i].data[0]).length,
                    ];
                    doc.page.size = size;

                    doc.image(
                        `data:image/jpeg;base64,${clientimage}`,
                        size[1] - 100 - 30,
                        6,
                        {
                            fit: [100, 100],
                            align: "center",
                            valign: "center",
                        }
                    );
                    await doc.table(table, {
                        columnSpacing: 10,
                        padding: 10,
                        align: "center",
                        prepareHeader: () => {
                            doc.fontSize(11);
                        },
                        divider: {
                            header: { disabled: true, width: 2, opacity: 1 },
                        },
                        prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
                            const { x, y, width, height } = rectCell;
                            // first line
                            if (indexColumn === 0) {
                                doc
                                    .lineWidth(0.5)
                                    .moveTo(x, y)
                                    .lineTo(x, y + height)
                                    .stroke();
                            }
                            doc
                                .lineWidth(0.5)
                                .moveTo(x + width, y)
                                .lineTo(x + width, y + height)
                                .stroke();
                        },
                    });
                }

                doc.end();
            } catch (e) {
                console.log(e);
            }
        };

        const colums = Object.keys(exportdata[0]);
        await exportdatatoPDFTable(exportdata, res);
    } catch (e) {
        console.log(e);
    }
};

module.exports = { generatepdf };
