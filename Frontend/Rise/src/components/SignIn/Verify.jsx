import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

const Verify = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8080/auth/verify-otp?otp=${otp}&id=${1}`, //1 yazan yere contextApi den id gelecek.
        {},
        {withCredentials: true}
      );
      console.log(response);
  
      if (response.status === 200) {
        const { data } = response;
        // Check if the user is an admin and navigate accordingly
        if (data.role === "ADMIN") {
          navigate("/swagger-ui/index.html");
        } else {
          navigate("/dashboard");
        }
      }
    } catch (err) {
      setError("Invalid OTP. Please try again.");
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
