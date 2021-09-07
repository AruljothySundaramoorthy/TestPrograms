
const format = require("date-fns/format");
const XLSX = require('xlsx');


// Give the file path here
let filepath = 'C:\\Office\\intraday_forecast_Al Husainiayh_20210825.xlsx'
const workbook = XLSX.readFile(filepath);
console.log(workbook);
let processsheet = workbook.Sheets['Tabelle1']
const data = XLSX.utils.sheet_to_json(processsheet, { raw: true })
console.log(data);
let processeddata = []
data.map((x, idx) => {
    if (idx > 5 && idx < 53) {
        let a = Object.fromEntries(Object.entries(x))
        let date = format(new Date(Object.values(a)[0]), 'HH:mm:ss')
        let value = parseInt(Object.values(a)[1])
        let newprocessdata = { 'date': date, 'value': value }
        // processeddata = { ...processeddata, ... }
        processeddata.push(newprocessdata)
    }
}
)
