const express = require("express");
const app = express();
const CryptoJS = require("crypto-js");

app.use(express.json());
// Encryption key and initialization vector
const key = CryptoJS.enc.Utf8.parse("myEncryptionKey123");
const iv = CryptoJS.enc.Utf8.parse("myInitializationVector");

app.post("/api/data", (req, res) => {
  // const responseData = {
  //   message: "Hello, world!",
  // };

  // Encrypt the response data
  // const encryptedData = CryptoJS.AES.encrypt(
  //   JSON.stringify(responseData),
  //   key,
  //   { iv: iv }
  // ).toString();

  // res.send(encryptedData);
  console.log(req.body.data);
  
  // 
  const decryptedData = CryptoJS.AES.decrypt(encryptedData, key, { iv: iv }).toString(CryptoJS.enc.Utf8);

  const responseData = JSON.parse(decryptedData);
  // const responseData = JSON.parse(decryptedData.message);
  res.send(responseData);
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
