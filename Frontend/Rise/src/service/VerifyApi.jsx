import axios from "axios";

const API_URL = `${import.meta.env.VITE_BASE_URL}`;

export const verifyUser = async (otp, id) => {

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `${API_URL}/auth/verify-otp?otp=${otp}&id=${id}`,
        null,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      return response;
    } catch (err) {
        console.error("Verification failed:", err.message);
    }
}

export const demoOtp = async (id) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        `${API_URL}/auth/demo-otp?id=${id}`,
        null,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      return response;
    } catch (err) {
        console.error("Demo OTP request failed:", err.message);
    }
}