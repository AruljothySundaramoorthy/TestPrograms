try {
  const express = require("express");
  const ExcelJS = require("exceljs");
  const app = express();
  const port = 3002;
  /**
   * Autofit columns by width
   *
   * @param worksheet {ExcelJS.Worksheet}
   * @param minimalWidth
   */
  const autoWidth = (worksheet, minimalWidth = 10) => {
    worksheet.columns.forEach((column) => {
      let maxColumnLength = 0;
      column.eachCell({ includeEmpty: true }, (cell) => {
        maxColumnLength = Math.max(
          maxColumnLength,
          minimalWidth,
          cell.value ? cell.value.toString().length : 0
        );
      });
      column.width = maxColumnLength + 10;
    });
  };

    const isEmptyObject = (data) => {
    for (const prop in data)
      if (!prop) {
        return false;
      } else {
        return true;
      }
  };
  
  const validatekeyFromObject = (objectval, keyval) => {
    if (objectval && isEmptyObject(objectval)) {
      return Object.keys(objectval).findIndex((x) => x == keyval) !== -1
        ? true
        : false;
    } else {
      return false;
    }
  };

  const devicedataval = [
    {
      planttimestamp: "2022-11-01 00:00",
      "62fe0939e9e59c5abf8b9cce_kwhExportTotal": 0,
      "62fe0939e9e59c5abf8b9cce_kwhImportTotal": 0,
      "62fe0939e9e59c5abf8b9cce_kwhNetExportTotal": 0,
      "62fe0939e9e59c5abf8b9cd6_kwhExportTotal": 0,
      "62fe0939e9e59c5abf8b9cd6_kwhImportTotal": 0,
      "62fe0939e9e59c5abf8b9cd6_kwhNetExportTotal": 0,
      "62fe0939e9e59c5abf8b9cfe_kwhExportTotal": 0,
      "62fe0939e9e59c5abf8b9cfe_kwhImportTotal": 0,
      "62fe0939e9e59c5abf8b9cfe_kwhNetExportTotal": 0,
      "62fe0939e9e59c5abf8b9cf7_kwhExportTotal": 0,
      "62fe0939e9e59c5abf8b9cf7_kwhImportTotal": 0,
      "62fe0939e9e59c5abf8b9cf7_kwhNetExportTotal": 0,
      "62fe0939e9e59c5abf8b9d1f_kwhExportTotal": 0,
      "62fe0939e9e59c5abf8b9d1f_kwhImportTotal": 0,
      "62fe0939e9e59c5abf8b9d1f_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d45_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d45_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d45_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d26_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d26_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d26_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d4c_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d4c_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d4c_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d53_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d53_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d53_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d74_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d74_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d74_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d79_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d79_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d79_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d80_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d80_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d80_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d85_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d85_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d85_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d8c_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d8c_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d8c_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d91_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d91_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d91_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9db2_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9db2_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9db2_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9dbe_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9dbe_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9dbe_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9db7_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9db7_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9db7_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9de7_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9de7_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9de7_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9dc3_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9dc3_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9dc3_kwhNetExportTotal": 0,
    },
    {
      planttimestamp: "2022-11-02 00:00",
      "62fe0939e9e59c5abf8b9cce_kwhExportTotal": 0,
      "62fe0939e9e59c5abf8b9cce_kwhImportTotal": 0,
      "62fe0939e9e59c5abf8b9cce_kwhNetExportTotal": 0,
      "62fe0939e9e59c5abf8b9cd6_kwhExportTotal": 0,
      "62fe0939e9e59c5abf8b9cd6_kwhImportTotal": 0,
      "62fe0939e9e59c5abf8b9cd6_kwhNetExportTotal": 0,
      "62fe0939e9e59c5abf8b9cfe_kwhExportTotal": 0,
      "62fe0939e9e59c5abf8b9cfe_kwhImportTotal": 0,
      "62fe0939e9e59c5abf8b9cfe_kwhNetExportTotal": 0,
      "62fe0939e9e59c5abf8b9cf7_kwhExportTotal": 0,
      "62fe0939e9e59c5abf8b9cf7_kwhImportTotal": 0,
      "62fe0939e9e59c5abf8b9cf7_kwhNetExportTotal": 0,
      "62fe0939e9e59c5abf8b9d1f_kwhExportTotal": 0,
      "62fe0939e9e59c5abf8b9d1f_kwhImportTotal": 0,
      "62fe0939e9e59c5abf8b9d1f_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d45_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d45_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d45_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d26_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d26_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d26_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d4c_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d4c_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d4c_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d53_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d53_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d53_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d74_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d74_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d74_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d79_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d79_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d79_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d80_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d80_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d80_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d85_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d85_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d85_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d8c_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d8c_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d8c_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d91_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d91_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d91_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9db2_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9db2_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9db2_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9dbe_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9dbe_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9dbe_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9db7_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9db7_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9db7_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9de7_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9de7_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9de7_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9dc3_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9dc3_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9dc3_kwhNetExportTotal": 0,
    },
    {
      planttimestamp: "2022-11-03 00:00",
      "62fe0939e9e59c5abf8b9cce_kwhExportTotal": 0,
      "62fe0939e9e59c5abf8b9cce_kwhImportTotal": 0,
      "62fe0939e9e59c5abf8b9cce_kwhNetExportTotal": 0,
      "62fe0939e9e59c5abf8b9cd6_kwhExportTotal": 0,
      "62fe0939e9e59c5abf8b9cd6_kwhImportTotal": 0,
      "62fe0939e9e59c5abf8b9cd6_kwhNetExportTotal": 0,
      "62fe0939e9e59c5abf8b9cfe_kwhExportTotal": 0,
      "62fe0939e9e59c5abf8b9cfe_kwhImportTotal": 0,
      "62fe0939e9e59c5abf8b9cfe_kwhNetExportTotal": 0,
      "62fe0939e9e59c5abf8b9cf7_kwhExportTotal": 0,
      "62fe0939e9e59c5abf8b9cf7_kwhImportTotal": 0,
      "62fe0939e9e59c5abf8b9cf7_kwhNetExportTotal": 0,
      "62fe0939e9e59c5abf8b9d1f_kwhExportTotal": 0,
      "62fe0939e9e59c5abf8b9d1f_kwhImportTotal": 0,
      "62fe0939e9e59c5abf8b9d1f_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d45_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d45_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d45_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d26_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d26_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d26_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d4c_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d4c_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d4c_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d53_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d53_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d53_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d74_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d74_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d74_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d79_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d79_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d79_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d80_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d80_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d80_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d85_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d85_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d85_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d8c_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d8c_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d8c_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d91_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d91_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d91_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9db2_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9db2_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9db2_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9dbe_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9dbe_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9dbe_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9db7_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9db7_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9db7_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9de7_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9de7_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9de7_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9dc3_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9dc3_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9dc3_kwhNetExportTotal": 0,
    },
    {
      planttimestamp: "2022-11-04 00:00",
      "62fe0939e9e59c5abf8b9cce_kwhExportTotal": 0,
      "62fe0939e9e59c5abf8b9cce_kwhImportTotal": 0,
      "62fe0939e9e59c5abf8b9cce_kwhNetExportTotal": 0,
      "62fe0939e9e59c5abf8b9cd6_kwhExportTotal": 0,
      "62fe0939e9e59c5abf8b9cd6_kwhImportTotal": 0,
      "62fe0939e9e59c5abf8b9cd6_kwhNetExportTotal": 0,
      "62fe0939e9e59c5abf8b9cfe_kwhExportTotal": 0,
      "62fe0939e9e59c5abf8b9cfe_kwhImportTotal": 0,
      "62fe0939e9e59c5abf8b9cfe_kwhNetExportTotal": 0,
      "62fe0939e9e59c5abf8b9cf7_kwhExportTotal": 0,
      "62fe0939e9e59c5abf8b9cf7_kwhImportTotal": 0,
      "62fe0939e9e59c5abf8b9cf7_kwhNetExportTotal": 0,
      "62fe0939e9e59c5abf8b9d1f_kwhExportTotal": 0,
      "62fe0939e9e59c5abf8b9d1f_kwhImportTotal": 0,
      "62fe0939e9e59c5abf8b9d1f_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d45_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d45_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d45_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d26_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d26_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d26_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d4c_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d4c_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d4c_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d53_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d53_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d53_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d74_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d74_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d74_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d79_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d79_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d79_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d80_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d80_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d80_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d85_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d85_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d85_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d8c_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d8c_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d8c_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d91_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d91_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d91_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9db2_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9db2_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9db2_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9dbe_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9dbe_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9dbe_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9db7_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9db7_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9db7_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9de7_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9de7_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9de7_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9dc3_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9dc3_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9dc3_kwhNetExportTotal": 0,
    },
    {
      planttimestamp: "2022-11-05 00:00",
      "62fe0939e9e59c5abf8b9cce_kwhExportTotal": 0,
      "62fe0939e9e59c5abf8b9cce_kwhImportTotal": 0,
      "62fe0939e9e59c5abf8b9cce_kwhNetExportTotal": 0,
      "62fe0939e9e59c5abf8b9cd6_kwhExportTotal": 0,
      "62fe0939e9e59c5abf8b9cd6_kwhImportTotal": 0,
      "62fe0939e9e59c5abf8b9cd6_kwhNetExportTotal": 0,
      "62fe0939e9e59c5abf8b9cfe_kwhExportTotal": 0,
      "62fe0939e9e59c5abf8b9cfe_kwhImportTotal": 0,
      "62fe0939e9e59c5abf8b9cfe_kwhNetExportTotal": 0,
      "62fe0939e9e59c5abf8b9cf7_kwhExportTotal": 0,
      "62fe0939e9e59c5abf8b9cf7_kwhImportTotal": 0,
      "62fe0939e9e59c5abf8b9cf7_kwhNetExportTotal": 0,
      "62fe0939e9e59c5abf8b9d1f_kwhExportTotal": 0,
      "62fe0939e9e59c5abf8b9d1f_kwhImportTotal": 0,
      "62fe0939e9e59c5abf8b9d1f_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d45_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d45_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d45_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d26_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d26_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d26_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d4c_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d4c_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d4c_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d53_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d53_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d53_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d74_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d74_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d74_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d79_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d79_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d79_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d80_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d80_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d80_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d85_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d85_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d85_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d8c_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d8c_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d8c_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d91_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d91_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d91_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9db2_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9db2_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9db2_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9dbe_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9dbe_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9dbe_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9db7_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9db7_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9db7_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9de7_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9de7_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9de7_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9dc3_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9dc3_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9dc3_kwhNetExportTotal": 0,
    },
    {
      planttimestamp: "2022-11-06 00:00",
      "62fe0939e9e59c5abf8b9cce_kwhExportTotal": 0,
      "62fe0939e9e59c5abf8b9cce_kwhImportTotal": 0,
      "62fe0939e9e59c5abf8b9cce_kwhNetExportTotal": 0,
      "62fe0939e9e59c5abf8b9cd6_kwhExportTotal": 0,
      "62fe0939e9e59c5abf8b9cd6_kwhImportTotal": 0,
      "62fe0939e9e59c5abf8b9cd6_kwhNetExportTotal": 0,
      "62fe0939e9e59c5abf8b9cfe_kwhExportTotal": 0,
      "62fe0939e9e59c5abf8b9cfe_kwhImportTotal": 0,
      "62fe0939e9e59c5abf8b9cfe_kwhNetExportTotal": 0,
      "62fe0939e9e59c5abf8b9cf7_kwhExportTotal": 0,
      "62fe0939e9e59c5abf8b9cf7_kwhImportTotal": 0,
      "62fe0939e9e59c5abf8b9cf7_kwhNetExportTotal": 0,
      "62fe0939e9e59c5abf8b9d1f_kwhExportTotal": 0,
      "62fe0939e9e59c5abf8b9d1f_kwhImportTotal": 0,
      "62fe0939e9e59c5abf8b9d1f_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d45_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d45_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d45_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d26_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d26_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d26_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d4c_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d4c_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d4c_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d53_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d53_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d53_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d74_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d74_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d74_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d79_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d79_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d79_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d80_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d80_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d80_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d85_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d85_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d85_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d8c_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d8c_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d8c_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d91_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d91_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d91_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9db2_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9db2_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9db2_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9dbe_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9dbe_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9dbe_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9db7_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9db7_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9db7_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9de7_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9de7_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9de7_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9dc3_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9dc3_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9dc3_kwhNetExportTotal": 0,
    },
    {
      planttimestamp: "2022-11-07 00:00",
      "62fe0939e9e59c5abf8b9cce_kwhExportTotal": 0,
      "62fe0939e9e59c5abf8b9cce_kwhImportTotal": 0,
      "62fe0939e9e59c5abf8b9cce_kwhNetExportTotal": 0,
      "62fe0939e9e59c5abf8b9cd6_kwhExportTotal": 0,
      "62fe0939e9e59c5abf8b9cd6_kwhImportTotal": 0,
      "62fe0939e9e59c5abf8b9cd6_kwhNetExportTotal": 0,
      "62fe0939e9e59c5abf8b9cfe_kwhExportTotal": 0,
      "62fe0939e9e59c5abf8b9cfe_kwhImportTotal": 0,
      "62fe0939e9e59c5abf8b9cfe_kwhNetExportTotal": 0,
      "62fe0939e9e59c5abf8b9cf7_kwhExportTotal": 0,
      "62fe0939e9e59c5abf8b9cf7_kwhImportTotal": 0,
      "62fe0939e9e59c5abf8b9cf7_kwhNetExportTotal": 0,
      "62fe0939e9e59c5abf8b9d1f_kwhExportTotal": 0,
      "62fe0939e9e59c5abf8b9d1f_kwhImportTotal": 0,
      "62fe0939e9e59c5abf8b9d1f_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d45_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d45_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d45_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d26_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d26_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d26_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d4c_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d4c_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d4c_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d53_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d53_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d53_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d74_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d74_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d74_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d79_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d79_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d79_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d80_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d80_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d80_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d85_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d85_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d85_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d8c_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d8c_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d8c_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d91_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d91_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d91_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9db2_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9db2_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9db2_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9dbe_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9dbe_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9dbe_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9db7_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9db7_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9db7_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9de7_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9de7_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9de7_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9dc3_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9dc3_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9dc3_kwhNetExportTotal": 0,
    },
    {
      planttimestamp: "2022-11-08 00:00",
      "62fe0939e9e59c5abf8b9cce_kwhExportTotal": 0,
      "62fe0939e9e59c5abf8b9cce_kwhImportTotal": 0,
      "62fe0939e9e59c5abf8b9cce_kwhNetExportTotal": 0,
      "62fe0939e9e59c5abf8b9cd6_kwhExportTotal": 0,
      "62fe0939e9e59c5abf8b9cd6_kwhImportTotal": 0,
      "62fe0939e9e59c5abf8b9cd6_kwhNetExportTotal": 0,
      "62fe0939e9e59c5abf8b9cfe_kwhExportTotal": 0,
      "62fe0939e9e59c5abf8b9cfe_kwhImportTotal": 0,
      "62fe0939e9e59c5abf8b9cfe_kwhNetExportTotal": 0,
      "62fe0939e9e59c5abf8b9cf7_kwhExportTotal": 0,
      "62fe0939e9e59c5abf8b9cf7_kwhImportTotal": 0,
      "62fe0939e9e59c5abf8b9cf7_kwhNetExportTotal": 0,
      "62fe0939e9e59c5abf8b9d1f_kwhExportTotal": 0,
      "62fe0939e9e59c5abf8b9d1f_kwhImportTotal": 0,
      "62fe0939e9e59c5abf8b9d1f_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d45_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d45_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d45_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d26_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d26_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d26_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d4c_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d4c_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d4c_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d53_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d53_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d53_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d74_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d74_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d74_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d79_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d79_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d79_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d80_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d80_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d80_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d85_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d85_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d85_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d8c_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d8c_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d8c_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d91_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d91_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d91_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9db2_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9db2_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9db2_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9dbe_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9dbe_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9dbe_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9db7_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9db7_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9db7_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9de7_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9de7_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9de7_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9dc3_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9dc3_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9dc3_kwhNetExportTotal": 0,
    },
    {
      planttimestamp: "2022-11-09 00:00",
      "62fe0939e9e59c5abf8b9cce_kwhExportTotal": 0,
      "62fe0939e9e59c5abf8b9cce_kwhImportTotal": 0,
      "62fe0939e9e59c5abf8b9cce_kwhNetExportTotal": 0,
      "62fe0939e9e59c5abf8b9cd6_kwhExportTotal": 0,
      "62fe0939e9e59c5abf8b9cd6_kwhImportTotal": 0,
      "62fe0939e9e59c5abf8b9cd6_kwhNetExportTotal": 0,
      "62fe0939e9e59c5abf8b9cfe_kwhExportTotal": 0,
      "62fe0939e9e59c5abf8b9cfe_kwhImportTotal": 0,
      "62fe0939e9e59c5abf8b9cfe_kwhNetExportTotal": 0,
      "62fe0939e9e59c5abf8b9cf7_kwhExportTotal": 0,
      "62fe0939e9e59c5abf8b9cf7_kwhImportTotal": 0,
      "62fe0939e9e59c5abf8b9cf7_kwhNetExportTotal": 0,
      "62fe0939e9e59c5abf8b9d1f_kwhExportTotal": 0,
      "62fe0939e9e59c5abf8b9d1f_kwhImportTotal": 0,
      "62fe0939e9e59c5abf8b9d1f_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d45_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d45_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d45_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d26_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d26_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d26_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d4c_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d4c_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d4c_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d53_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d53_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d53_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d74_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d74_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d74_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d79_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d79_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d79_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d80_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d80_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d80_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d85_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d85_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d85_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d8c_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d8c_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d8c_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d91_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d91_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d91_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9db2_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9db2_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9db2_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9dbe_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9dbe_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9dbe_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9db7_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9db7_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9db7_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9de7_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9de7_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9de7_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9dc3_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9dc3_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9dc3_kwhNetExportTotal": 0,
    },
    {
      planttimestamp: "2022-11-10 00:00",
      "62fe0939e9e59c5abf8b9cce_kwhExportTotal": 0,
      "62fe0939e9e59c5abf8b9cce_kwhImportTotal": 0,
      "62fe0939e9e59c5abf8b9cce_kwhNetExportTotal": 0,
      "62fe0939e9e59c5abf8b9cd6_kwhExportTotal": 0,
      "62fe0939e9e59c5abf8b9cd6_kwhImportTotal": 0,
      "62fe0939e9e59c5abf8b9cd6_kwhNetExportTotal": 0,
      "62fe0939e9e59c5abf8b9cfe_kwhExportTotal": 0,
      "62fe0939e9e59c5abf8b9cfe_kwhImportTotal": 0,
      "62fe0939e9e59c5abf8b9cfe_kwhNetExportTotal": 0,
      "62fe0939e9e59c5abf8b9cf7_kwhExportTotal": 0,
      "62fe0939e9e59c5abf8b9cf7_kwhImportTotal": 0,
      "62fe0939e9e59c5abf8b9cf7_kwhNetExportTotal": 0,
      "62fe0939e9e59c5abf8b9d1f_kwhExportTotal": 0,
      "62fe0939e9e59c5abf8b9d1f_kwhImportTotal": 0,
      "62fe0939e9e59c5abf8b9d1f_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d45_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d45_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d45_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d26_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d26_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d26_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d4c_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d4c_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d4c_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d53_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d53_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d53_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d74_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d74_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d74_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d79_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d79_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d79_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d80_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d80_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d80_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d85_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d85_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d85_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d8c_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d8c_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d8c_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d91_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d91_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d91_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9db2_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9db2_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9db2_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9dbe_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9dbe_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9dbe_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9db7_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9db7_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9db7_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9de7_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9de7_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9de7_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9dc3_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9dc3_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9dc3_kwhNetExportTotal": 0,
    },
    {
      planttimestamp: "2022-11-11 00:00",
      "62fe0939e9e59c5abf8b9cce_kwhExportTotal": 0,
      "62fe0939e9e59c5abf8b9cce_kwhImportTotal": 0,
      "62fe0939e9e59c5abf8b9cce_kwhNetExportTotal": 0,
      "62fe0939e9e59c5abf8b9cd6_kwhExportTotal": 0,
      "62fe0939e9e59c5abf8b9cd6_kwhImportTotal": 0,
      "62fe0939e9e59c5abf8b9cd6_kwhNetExportTotal": 0,
      "62fe0939e9e59c5abf8b9cfe_kwhExportTotal": 0,
      "62fe0939e9e59c5abf8b9cfe_kwhImportTotal": 0,
      "62fe0939e9e59c5abf8b9cfe_kwhNetExportTotal": 0,
      "62fe0939e9e59c5abf8b9cf7_kwhExportTotal": 0,
      "62fe0939e9e59c5abf8b9cf7_kwhImportTotal": 0,
      "62fe0939e9e59c5abf8b9cf7_kwhNetExportTotal": 0,
      "62fe0939e9e59c5abf8b9d1f_kwhExportTotal": 0,
      "62fe0939e9e59c5abf8b9d1f_kwhImportTotal": 0,
      "62fe0939e9e59c5abf8b9d1f_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d45_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d45_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d45_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d26_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d26_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d26_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d4c_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d4c_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d4c_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d53_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d53_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d53_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d74_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d74_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d74_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d79_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d79_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d79_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d80_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d80_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d80_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d85_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d85_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d85_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d8c_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d8c_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d8c_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9d91_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9d91_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9d91_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9db2_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9db2_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9db2_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9dbe_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9dbe_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9dbe_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9db7_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9db7_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9db7_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9de7_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9de7_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9de7_kwhNetExportTotal": 0,
      "62fe093ae9e59c5abf8b9dc3_kwhExportTotal": 0,
      "62fe093ae9e59c5abf8b9dc3_kwhImportTotal": 0,
      "62fe093ae9e59c5abf8b9dc3_kwhNetExportTotal": 0,
    },
  ];
  // let deviceRowName = [
  //   "Planttimestamp",
  //   // "CSBPL250MW IS1 Aux MFM import",
  //   // "CSBPL250MW IS1 Aux MFM export",
  //   // "CSBPL250MW IS1 Aux MFM net export",
  // ];

  let deviceRowName = Object.values(devicedataval[0]);
  let deviceColumns = Object.keys(devicedataval[0]).map((x) => {
    return {
      key: x,
    };
  });

  // deviceRowName  = [...deviceRowName,Object.keys()]
  devicedata = [
    {
      planttimestamp: "2022-01-02",
      "62fe0939e9e59c5abf8b9cce_import": 1,
      "62fe0939e9e59c5abf8b9cce_export": 1,
      "62fe0939e9e59c5abf8b9cce_netexport": 1,
    },
    {
      planttimestamp: "2022-01-03",
      "62fe0939e9e59c5abf8b9cce_import": 23,
      "62fe0939e9e59c5abf8b9cce_export": 25,
      "62fe0939e9e59c5abf8b9cce_netexport": 26,
    },
  ];
  devices = {
    "62fe0939e9e59c5abf8b9cce": "CSBPL250MW IS1 Aux MFM",
    "62fe0939e9e59c5abf8b9cd6": "CSBPL250MW IS2 Aux MFM",
    "62fe0939e9e59c5abf8b9cfe": "CSBPL250MW IS4 Aux MFM",
    "62fe0939e9e59c5abf8b9cf7": "CSBPL250MW IS3 Aux MFM",
    "62fe0939e9e59c5abf8b9d1f": "CSBPL250MW IS5 Aux MFM",
    "62fe093ae9e59c5abf8b9d45": "CSBPL250MW IS7 Aux MFM",
    "62fe093ae9e59c5abf8b9d26": "CSBPL250MW IS6 Aux MFM",
    "62fe093ae9e59c5abf8b9d4c": "CSBPL250MW IS8 Aux MFM",
    "62fe093ae9e59c5abf8b9d53": "CSBPL250MW IS9 Aux MFM",
    "62fe093ae9e59c5abf8b9d74": "CSBPL250MW IS10 Aux MFM",
    "62fe093ae9e59c5abf8b9d79": "CSBPL250MW IS11 Aux MFM",
    "62fe093ae9e59c5abf8b9d80": "CSBPL250MW IS12 Aux MFM",
    "62fe093ae9e59c5abf8b9d85": "CSBPL250MW IS13 Aux MFM",
    "62fe093ae9e59c5abf8b9d8c": "CSBPL250MW IS14 Aux MFM",
    "62fe093ae9e59c5abf8b9d91": "CSBPL250MW IS15 Aux MFM",
    "62fe093ae9e59c5abf8b9db2": "CSBPL250MW IS16 Aux MFM",
    "62fe093ae9e59c5abf8b9dbe": "CSBPL250MW IS18 Aux MFM",
    "62fe093ae9e59c5abf8b9db7": "CSBPL250MW IS17 Aux MFM",
    "62fe093ae9e59c5abf8b9de7": "CSBPL250MW IS20 Aux MFM",
    "62fe093ae9e59c5abf8b9dc3": "CSBPL250MW IS19 Aux MFM",
  };
  const numberToAlphabets = (num) => {
    let columnLetter = "";

    let modValue = 0;

    while (num > 0) {
      modValue = (num - 1) % 26;

      columnLetter = String.fromCharCode(65 + modValue) + columnLetter;

      num = ((num - modValue) / 26) | 0;
    }

    return columnLetter || undefined;
  };

  const addBorder = () => {
    return {
      border: {
        top: { style: "thin" },
        bottom: { style: "thin" },
        left: { style: "thin" },
        right: { style: "thin" },
      },
    };
  };
  const createOuterBorder = (worksheet, start = {row: 1, col: 1}, end = {row: 1, col: 1}, borderWidth = 'medium') => {

    const borderStyle = {
        style: borderWidth
    };
    for (let i = start.row; i <= end.row; i++) {
        const leftBorderCell = worksheet.getCell(i, start.col);
        const rightBorderCell = worksheet.getCell(i, end.col);
        leftBorderCell.border = {
            ...leftBorderCell.border,
            left: borderStyle
        };
        rightBorderCell.border = {
            ...rightBorderCell.border,
            right: borderStyle
        };
    }

    for (let i = start.col; i <= end.col; i++) {
        const topBorderCell = worksheet.getCell(start.row, i);
        const bottomBorderCell = worksheet.getCell(end.row, i);
        topBorderCell.border = {
            ...topBorderCell.border,
            top: borderStyle
        };
        bottomBorderCell.border = {
            ...bottomBorderCell.border,
            bottom: borderStyle
        };
    }
};
  const generateecel = (req, res) => {
    const workbook = new ExcelJS.Workbook();

    workbook.creator = "Me";
    workbook.lastModifiedBy = "Her";
    workbook.created = new Date(1985, 8, 30);
    workbook.modified = new Date();
    workbook.lastPrinted = new Date(2016, 9, 27);

    const sheet = workbook.addWorksheet("My Users"); // New Worksheet
    // /*TITLE*/
    // sheet.getCell("A1").value = "Report Name";
    // sheet.getCell("A1").style = addBorder();
    // sheet.getCell("A2").value = "Date of Report Start Time";
    // sheet.getCell("A2").style = addBorder();
    // sheet.getCell("A3").value = "Date of Report End Time";
    // sheet.getCell("A3").style = addBorder();
    // sheet.getCell("B1").value = "Daily generation report";
    // sheet.getCell("B1").style = addBorder();
    // sheet.getCell("B2").value = "27/10/2022 00:00AM";
    // sheet.getCell("B2").style = addBorder();
    // sheet.getCell("B3").value = "28/10/2022 00:00AM";
    // sheet.getCell("B3").style = addBorder();

    // sheet.mergeCells("C1", "I3");
    // sheet.getCell("C1").value = "Azure Power";
    // sheet.getCell("C1").style = {
    //   font: { bold: true, color: "black", size: 24 },
    //   alignment: { horizontal: "center", vertical: "middle" },
    //   fill: {
    //     type: "pattern",
    //     pattern: "solid",
    //     fgColor: {
    //       argb: "f8cbad",
    //     },
    //   },
    // };

    // createOuterBorder(sheet,{row:sheet.getCell("C1").row,col:sheet.getCell("C1").col},{row:sheet.getCell("I1").row,col:sheet.getCell("I1").col},'thin')
    // const cellRange = numberToAlphabets((Object.keys(devices).length + 1) * 3);

   
    // sheet.mergeCells("A4", `${cellRange}4`);
    // sheet.getCell("A4").value = "Daily Metring";
    // sheet.getCell("A4").style = {
    //   font: { bold: true, color: "black", size: 14 },
    //   alignment: { horizontal: "center", vertical: "middle" },
    //   fill: {
    //     type: "pattern",
    //     pattern: "solid",
    //     fgColor: {
    //       argb: "c6e0b4",
    //     },
    //   },
    // };

    // createOuterBorder(sheet,{row:sheet.getCell("A4").row,col:sheet.getCell("A4").col},{row:sheet.getCell(`${cellRange}4`).row,col:sheet.getCell(`${cellRange}4`).col})
    // sheet.mergeCells("A5", "A6");
    // sheet.getCell("A5").value = "Date";
    // sheet.getCell(`"A5"`).style = {
    //   font: { bold: true },
    //   alignment: { horizontal: "center", vertical: "middle" },
    // };

    // createOuterBorder(sheet,{row:sheet.getCell('A5').row,col:sheet.getCell('A5').col},{row:sheet.getCell('A6').row,col:sheet.getCell('A6').col})
   
    

    // let prentRowNumber = 2;
    // Object.keys(devices).forEach((deviceid, index) => {
    //   const startcell = `${numberToAlphabets(prentRowNumber)}5`;
    //   const endcell = `${numberToAlphabets(prentRowNumber + 2)}5`;
    //   sheet.mergeCells(`${startcell}:${endcell}`);
    //   sheet.getCell(`${startcell}`).value = devices[deviceid];
    //   sheet.getCell(`${startcell}`).style = {
    //     font: { bold: true },
    //     alignment: { horizontal: "center", vertical: "middle" },
    //   };

    //   createOuterBorder(sheet,{row:sheet.getCell(startcell).row,col:sheet.getCell(startcell).col},{row:sheet.getCell(endcell).row,col:sheet.getCell(endcell).col})
   
    //   for (let i = 0; i <= prentRowNumber + 2; i++) {
    //     const parentcolumnnumber = `${numberToAlphabets(prentRowNumber + i)}6`;
    //     if (i == 0) {
    //       sheet.getCell(parentcolumnnumber).value =
    //         "Export";
    //     }
    //     if (i == 1) {
    //       sheet.getCell(parentcolumnnumber).value =
    //         "Import";
    //     }
    //     if (i == 2) {
    //       sheet.getCell(parentcolumnnumber).value =
    //         "Net Export";
    //     }
    //     sheet.getCell(parentcolumnnumber).style = {
    //       font: { bold: true },
    //       alignment: { horizontal: "center", vertical: "middle" },
    //     };
    //     createOuterBorder(sheet,{row:sheet.getCell(parentcolumnnumber).row,col:sheet.getCell(parentcolumnnumber).col},{row:sheet.getCell(parentcolumnnumber).row,col:sheet.getCell(parentcolumnnumber).col})
    //   }

    //   prentRowNumber = prentRowNumber + 3;
    // });

    // autoWidth(sheet);

    // // sheet.getRow(9).values = deviceRowName;

    // // sheet.columns = deviceColumns;
    // const rowInfo = Object.keys(devicedataval[0]);
    // // const parmeterInfo = {
    // //   planttimestamp: "Planttimestamp",
    // //   kwhExportTotal: "Import",
    // //   kwhImportTotal: "Export",
    // //   kwhNetExportTotal: "Net Export",
    // // };

    // arrData = devicedataval;
    // // /* Now we use the keys we defined earlier to insert your data by iterating through arrData and calling worksheet.addRow()
    // //  */
    // arrData.forEach(function (item, index) {
    //   let temprowdata = [];
    //   rowInfo.map((row) => {
    //     let splitinder = row=='planttimestamp'?'planttimestamp' :  row.split('_')[1]
    //     if (validatekeyFromObject(item,row)) {
    //       // Object.assign(temprowdata, { [parmeterInfo[splitinder]]: item[row] });
    //       temprowdata.push(item[row])
    //     } else {
    //       // Object.assign(temprowdata, { [parmeterInfo[splitinder]]: '-' });
    //       temprowdata.push('-')
    //     }
    //     // console.log(row,item)
    //   });
    //   sheet.addRow(temprowdata);
    //   sheet.lastRow._cells.forEach((cell)=>{cell.style={border: {
    //     top: { style: "thin" },
    //     bottom: { style: "thin" },
    //     left: { style: "thin" },
    //     right: { style: "thin" },
    //   }}})
    // });
    
    //   // sheet.addRow([1,2,1233123,123,12,312,312,31,23123,123123]);
    // autoWidth(sheet);

    sheet.columns = [
      { header: 'Id', key: 'id', width: 10 },
      { header: 'Name', key: 'name', width: 32 },
      { header: 'D.O.B.', key: 'DOB', width: 10, outlineLevel: 1 }
    ];
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=" + "Report.xlsx"
    );
    workbook.xlsx.write(res).then(function (data) {
      res.end();
      console.log("File write done........");
    });
  };
  // const {plantavailabilityreport}=require('./pareport_ACME')

  app.get("/", (req, res) => {
    // plantavailabilityreport(req, res);
    generateecel(req, res);
  });

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
} catch (e) {
  console.log(e);
}
