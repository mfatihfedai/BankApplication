import CryptoJS from "crypto-js";

const secretKey = "a2b4c6d8e10f12g14h16i18j20k22";

export const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
};

export const decryptData = (encryptedUser) => {
  const bytes = CryptoJS.AES.decrypt(encryptedUser, secretKey);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};
