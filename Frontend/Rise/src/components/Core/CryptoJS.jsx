import CryptoJS from "crypto-js";

const secretKey = `${import.meta.env.SECRET_KEY}`;

export const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
};

export const decryptData = (encryptedUser) => {
  const bytes = CryptoJS.AES.decrypt(encryptedUser, secretKey);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};
