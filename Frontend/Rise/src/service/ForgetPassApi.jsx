import axios from "axios";
import FORGET_PASS from "./RestApis";

export const forgetPass = async (email) => {
    try {
        const response = await axios.post(FORGET_PASS, email)
        return response;
    } catch (error) {
        console.error("Could not send email ", error.message);
        throw error;
    }
}