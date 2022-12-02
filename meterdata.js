const data = [
  {
    data: {
      meters: {
        "62fe093ae9e59c5abf8b9deb": {
          activepower: 0,
          peakpower: 254302.9938,
          kwhExport: 1803933,
          kwhImport: 4533,
          kwhNetExport: 1799400,
          kwhExportTotal: 242292952,
          kwhImportTotal: 585133,
          kwhNetExportTotal: 241707819,
        },
        "62fe093ae9e59c5abf8b9deb": {
          activepower: 0,
          peakpower: 254302.1,
          kwhExport: 1,
          kwhImport: 1,
          kwhNetExport: 1,
          kwhExportTotal: 1,
          kwhImportTotal: 1,
          kwhNetExportTotal: 1,
        },
      },
    },
  },
];


const a = data.map((x)=>Object.values(x.data.meters))
console.log(a)