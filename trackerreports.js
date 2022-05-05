// const jsonToTableHtmlString = require('json-table-converter')
// // const data = [
// //     {
// //         "date": "2022-10-12",
// //         "SPC-1": {
// //             "actual": 1,
// //             "target": 2,
// //             "output": 3
// //         }
// //         "SPC-2": {
// //             "actual": 4,
// //             "target": 5,
// //             "output": 6
// //         }
// //         "SPC-3": {

// //         }
// //         "SPC-4": {
// //             "actual": 10,
// //             "target": 11,
// //             "output": 12
// //         }
// //         "SPC-5": {
// //             "actual": 13,
// //             "target": 14,
// //             "output": 15
// //         }
// //         "SPC-6": {
// //             "actual": 16,
// //             "target": 17,
// //             "output": 8
// //         }
// //     }
// //     {
// //         "date": "2022-10-13",
// //         "SPC-1": {
// //             "actual": 1,
// //             "target": 2,
// //             "output": 3
// //         }
// //         "SPC-2": {
// //             "actual": 4,
// //             "target": 5,
// //             "output": 6
// //         }
// //         "SPC-3": {
// //             "actual": 7,
// //             "target": 8,
// //             "output": 9
// //         }
// //         "SPC-4": {
// //             "actual": 10,
// //             "target": 11,
// //             "output": 12
// //         }
// //         "SPC-5": {
// //             "actual": 13,
// //             "target": 14,
// //             "output": 15
// //         }
// //         "SPC-6": {
// //             "actual": 16,
// //             "target": 17,
// //             "output": 8
// //         }
// //     }
// //     {
// //         "date": "2022-10-14",
// //         "SPC-1": {
// //             "actual": 1,
// //             "target": 2,
// //             "output": 3
// //         }
// //         "SPC-2": {
// //             "actual": 4,
// //             "target": 5,
// //             "output": 6
// //         }
// //         "SPC-3": {
// //             "actual": 7,
// //             "target": 8,
// //             "output": 9
// //         }
// //         "SPC-4": {
// //             "actual": 10,
// //             "target": 11,
// //             "output": 12
// //         }
// //         "SPC-5": {
// //             "actual": 13,
// //             "target": 14,
// //             "output": 15
// //         }
// //         "SPC-6": {
// //             "actual": 16,
// //             "target": 17,
// //             "output": 8
// //         }
// //     }
// //     {
// //         "date": "2022-10-15",
// //         "SPC-1": {
// //             "actual": 1,
// //             "target": 2,
// //             "output": 3
// //         }
// //         "SPC-2": {
// //             "actual": 4,
// //             "target": 5,
// //             "output": 6
// //         }
// //         "SPC-3": {
// //             "actual": 7,
// //             "target": 8,
// //             "output": 9
// //         }
// //         "SPC-4": {
// //             "actual": 10,
// //             "target": 11,
// //             "output": 12
// //         }
// //         "SPC-5": {
// //             "actual": 13,
// //             "target": 14,
// //             "output": 15
// //         }
// //         "SPC-6": {
// //             "actual": 16,
// //             "target": 17,
// //             "output": 8
// //         }
// //     }
// //     {
// //         "date": "2022-10-16",
// //         "SPC-1": {
// //             "actual": 1,
// //             "target": 2,
// //             "output": 3
// //         }
// //         "SPC-2": {
// //             "actual": 4,
// //             "target": 5,
// //             "output": 6
// //         }
// //         "SPC-3": {
// //             "actual": 7,
// //             "target": 8,
// //             "output": 9
// //         }
// //         "SPC-4": {
// //             "actual": 10,
// //             "target": 11,
// //             "output": 12
// //         }
// //         "SPC-5": {
// //             "actual": 13,
// //             "target": 14,
// //             "output": 15
// //         }
// //         "SPC-6": {
// //             "actual": 16,
// //             "target": 17,
// //             "output": 8
// //         }
// //     }
// // ];

// const data = [
//     {
//         "date": "2022-10-12",
//         "IS-1": [{
//             "actual": 1,
//             "target": 2,
//             "output": 3
//         }],
//         "IS-2": [{
//             "actual": 1,
//             "target": 2,
//             "output": 3
//         }],

//     }

// ];

// const fs = require('fs');

// const html = jsonToTableHtmlString.jsonToTableHtmlString(d)
// const template = (html, worksheetName = 'Sheet1') => `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>${worksheetName}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body>${html}</body></html>`;
// fs.writeFileSync('./temp2.xls', template(html));

// var tableToCsv = require('node-table-to-csv');
// csv = tableToCsv(html);
// fs.writeFileSync('./temp2.csv', csv);
// console.log(csv);

const data = [
    {
        date: "2022-10-12",
        spc: {
            "SPC-1": {
                actual: 1,
                target: 2,
                output: 3,
            },
            "SPC-2": {
                actual: 1,
                target: 2,
                output: 3,
            },
        },
    },
    {
        date: "2022-10-13",
        spc: {
            "SPC-1": {
                actual: 4,
                target: 5,
                output: 6,
            },
            "SPC-2": {
                actual: 7,
                target: 8,
                output: 9,
            },
        },
    },
    {
        date: "2022-10-14",
        spc: {
            "SPC-1": {
                actual: 14,
                target: 15,
                output: 16,
            },
            "SPC-2": {
                actual: 17,
                target: 18,
                output: 19,
            },
            "SPC-2": {
                actual: 17,
                target: 18,
                output: 19,
            },
        },
    }
];
const groupheader = (spc) => {
    let spcs = "";
    for (let i = 0; i < spc.length; i++) {
        spcs += `<td colspan=3  style="border:1px solid ">${spc[i]}</td>`;
    }
    return `<tr>
  <td rowspan="2"  style="border:1px solid ">Date</td>
  ${spcs}
  </tr>`;
};
const rowheader = (spc) => {
    let rows = "";
    for (let i = 0; i < spc.length; i++) {
        rows += `<td  style="border:1px solid ">Actual</td>
      <td  style="border:1px solid ">POS</td>
      <td  style="border:1px solid ">Value</td>`;
    }
    return `<tr  style="border:1px solid ">${rows}</tr>`;
};
const row = (datarow) => {
    let columns = `<td  style="border:1px solid ">${datarow.date}</td>`;
    const dataentries = Object.entries(datarow.spc);
    for (let i = 0; i < dataentries.length; i++) {
        columns += `<td  style="border:1px solid ">${dataentries[i][1].actual}</td>
  <td  style="border:1px solid ">${dataentries[i][1].target}</td>
  <td  style="border:1px solid ">${dataentries[i][1].output}</td>`;
    }
    return `<tr>
    ${columns}
    </tr>`;
};
const build = () => {
    let table = "";
    table =
        table +
        groupheader(Object.keys(data[0].spc)) +
        rowheader(Object.keys(data[0].spc));
    data.forEach((rowdata) => {
        table = table + row(rowdata);
    });
    return `<table style="border:1px solid ">${table}</table>`;
};
console.log(build());
