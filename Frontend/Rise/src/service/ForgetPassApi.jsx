import axios from "axios";
import FORGET_PASS from "./RestApis";
const apiUrl = `http://localhost:8080/dev/v1/user/forgetPass`;

export const forgetPass = async (email) => {
  try {
    const response = await axios.post(apiUrl, email);
    return response;
  } catch (error) {
    console.error("Could not send email ", error.message);
    throw error;
  }
};
