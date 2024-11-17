import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getUserById } from "../../service/UserApi";

const Verify = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = 1;
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `http://localhost:8080/auth/verify-otp?otp=${otp}&id=${id}`,
        null,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (response.status == 200) {
        const data = await response.json();

        // Kullanıcı rolüne göre yönlendirme
        if (response.data.role === "ADMIN") {
          navigate("/dashboard");
        } else {
          navigate("/dashboard");
        }
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (err) {
      console.error("Verification failed:", err.message);
      setError("An error occurred while verifying OTP.");
    }
  };

  return (
    <div>
      <h1>Enter OTP</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>OTP:</label>
          <input
            type="text"
            name="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Verify</button>
      </form>
    </div>
  );
};

export default Verify;
