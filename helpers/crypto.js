// "use strict";

// const CryptoJS = require("crypto-js");

// module.exports = {
//   aesEncrypt: aesEncrypt,
//   aesDecrypt: aesDecrypt,
//   _decrypt: _decrypt,
// };

// var key_data = "##DISGHDIYSGIYgidfi8ygo##",
//   iv_data = "##DISGHDIYSGIojfng##";
// function aesEncrypt(content) {
//   const parsedkey = CryptoJS.enc.Utf8.parse("secret_key");
//   const iv = CryptoJS.enc.Utf8.parse("your_secret_iv");
//   const encrypted = CryptoJS.AES.encrypt(content, parsedkey, {
//     iv: iv,
//     mode: CryptoJS.mode.ECB,
//     padding: CryptoJS.pad.Pkcs7,
//   });
//   return encrypted.toString();
// }

// function aesDecrypt(word) {
//   var keys = CryptoJS.enc.Utf8.parse("secret_key");
//   let base64 = CryptoJS.enc.Base64.parse(word);
//   let src = CryptoJS.enc.Base64.stringify(base64);
//   var decrypt = CryptoJS.AES.decrypt(src, keys, {
//     mode: CryptoJS.mode.ECB,
//     padding: CryptoJS.pad.Pkcs7,
//   });
//   return decrypt.toString(CryptoJS.enc.Utf8);
// }

// function _decrypt(data) {
//   var decoURL, bytes;
//   decoURL = decodeURIComponent(data);
//   bytes = CryptoJS.AES.decrypt(decoURL, key_data, { iv: iv_data }).toString(
//     CryptoJS.enc.Utf8
//   );
//   return bytes;
// }
