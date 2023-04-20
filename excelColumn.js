const ExcelJS = require("exceljs");
const fillExcelData = () => {
  // create a new workbook and worksheet
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Sheet1");

  let colIndex = 0;
  const jobTemplates = [];
  const defaultCols = Array.from({ length: 10 }).map((_, i) => ({
    key: `Column Name${i + 1}`,
    lable: `Column Name${i + 1}`,
  }));

  defaultCols.forEach((column) => {
    // header names
    const values = [
      column.lable,
      ...jobTemplates.forEach((temp) => temp[column.key]),
    ];

    worksheet.getColumn(colIndex).values = values;
    column++;
  });

  const steps = [];

  steps.forEach((step) => {
    colIndex++;
    step.fileds.forEach((stepColumn) => {
      const values = [
        stepColumn,
        ...jobTemplates.forEach((temp) => temp[stepColumn]),
      ];

      worksheet.getColumn(colIndex).values = values;
      colIndex++;
    });
  });


};
