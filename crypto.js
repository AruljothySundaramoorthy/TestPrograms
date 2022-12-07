
// npm i crypto-js

var CryptoJS = require("crypto-js");
const secretKey = 'ARULJOTHY'
function genRandonString(length) {
   var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
   var charLength = chars.length;
   var result = '';
   for ( var i = 0; i < length; i++ ) {
      result += chars.charAt(Math.floor(Math.random() * charLength));
   }
   return result;
}
 
const generatedString=genRandonString(256)
console.log('Original String ',generatedString);



// Encrypt
var ciphertext = CryptoJS.AES.encrypt(generatedString, secretKey).toString();
console.log('Encrypted ',ciphertext)

// Decrypt
var bytes  = CryptoJS.AES.decrypt(ciphertext,secretKey);
var originalText = bytes.toString(CryptoJS.enc.Utf8);

console.log('Decrypted ',originalText); // 'my message'

 
 
