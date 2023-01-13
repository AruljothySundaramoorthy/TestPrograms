/**
 *
 * npm i crypto-js
 * */

var CryptoJS = require("crypto-js");
const secretKey = "ARULJOTHY";
function genRandonString(length = 256) {
  const chars =
    "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890";
  const randomArray = Array.from(
    { length },
    () => chars[Math.floor(Math.random() * chars.length)]
  );

  const randomString = randomArray.join("");
  return randomString;
}

const generatedString = genRandonString(256);
const description = generatedString.slice(-4).padStart(256,'*')
console.log("Original String ", description);

// // Encrypt
// var ciphertext = CryptoJS.AES.encrypt(generatedString, secretKey).toString();
// console.log("Encrypted ", ciphertext);

// // Decrypt
// var bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
// var originalText = bytes.toString(CryptoJS.enc.Utf8);

// console.log("Decrypted ", originalText); // 'my message'

// function getRandomInt(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
// }

// const gerKeys = (lenghth = 255) => {
//   return Array.from({ length }).map(() =>
//     String.fromCharCode(getRandomInt(48))
//   );
// };
