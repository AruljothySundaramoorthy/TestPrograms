const express = require("express");
const app = express();

const fs = require("fs");
// const  = require("docx@6.0.0")
const { Document, Packer, Paragraph, TextRun } = require("docx");
// const template = fs.readFileSync(`${__dirname}\\template.docx`);
// const docx = new Docxtemplater({});
// docx.loadFromFile(`${__dirname}\\template.docx`);

var cors = require("cors");
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(cors());

app.use(express.json());

// const genereateDoc = async () => {
//   const document =   new docx({
//     sections: [
//         {
//             properties: {},
//             children: [
//                 new Paragraph({
//                     children: [
//                         new TextRun("Hello World"),
//                         new TextRun({
//                             text: "Foo Bar",
//                             bold: true,
//                             size: 40,
//                         }),
//                         new TextRun({
//                             children: [new Tab(), "Github is the best"],
//                             bold: true,
//                         }),
//                     ],
//                 }),
//             ],
//         },
//     ],
// });
//   // document.
//   // document
//   // const paragraph = new docx.Paragraph("Hello, World!");
//   // const heading = new docx.Heading1("My Heading");
//   // document.addParagraph(paragraph);
//   const buffer = await docx.Packer.toBuffer(document);

//   res.writeHead(200, [["Content-Type"]]);
//   res.end(new Buffer(buffer, "base64"));
// };

const constructPageInformation = async (value, type) => {
  if (type == "variable") {
    return new Paragraph({
      children: [new TextRun(`${value} - {{{${value}}}}`)],
    });
  } else {
    return  new Paragraph({
      children: [new TextRun(`${value}`)],
    })
  }
};

app.get("/", async (req, res) => {
  try {
    const tempvariables = ["arul", "aaron", "kavi", "king", "keen"];

    const promisemap = tempvariables.map((x) =>
      constructPageInformation(x, "variable")
    );
    const result = await Promise.all(promisemap);
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [...result],
        },
      ],
    });

    const b64string = await Packer.toBase64String(doc);

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=My Document.docx"
    );
    res.send(Buffer.from(b64string, "base64"));
  } catch (e) {
    console.log(e);
  }
});

app.listen(3003, () => {
  console.log("Server started on port 3000");
});
