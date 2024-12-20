import axios from "axios";
import FORGET_PASS from "./RestApis";



export const forgetPass = async (email) => {
    try {
        const response = await axios.post("http://localhost:8080/dev/v1/user/forgetPass", email, {
            headers: { "Content-Type": "text/plain" },
        });
        return response;
    } catch (error) {
        console.error("Could not send email ", error.message);
        throw error;
    }
}