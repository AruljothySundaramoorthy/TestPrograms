const express = require("express");
const app = express();
const ExcelJS = require("exceljs");
app.get("/download", async (req, res) => {
  // create a new workbook and worksheet
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Sheet1");

  // add some data to the worksheet
//   worksheet.columns = [
//     { header: "Name", key: "name", width: 30 },
//     { header: "Age", key: "age", width: 10 },
//   ];

//   worksheet.addRow({ name: "John", age: 30 });
//   worksheet.addRow({ name: "Jane", age: 25 });
//   worksheet.addRow({ name: "Bob", age: 45 });

//   worksheet.addRow();

//   worksheet.columns = [{ header: "asdasd", key: "asdasd", width: 30 }];
//   worksheet.columns = [{ header: "sd", key: "asdasd", width: 30 }];

//   worksheet.addRow({ asdasd: "John", sd: "John", age: 30 });
//   worksheet.addRow({ asdasd: "Jane", sd: "Jane", age: 25 });
//   worksheet.addRow({ asdasd: "Bob", sd: "Bob", age: 45 });

  // set the content type and attachment header
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader("Content-Disposition", "attachment; filename=example.xlsx");

  // write the workbook to the response stream
  await workbook.xlsx.write(res);
  res.end();
});

// start the server
app.listen(3002, () => console.log("Server started on port 3000"));
