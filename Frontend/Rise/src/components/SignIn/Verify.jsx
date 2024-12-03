import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const Verify = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = user.id;
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
        console.log(user);
        if (user.role === "ADMIN") {
          navigate(`/admin-dashboard`);
        }
        if (user.role === "USER") {
          navigate("/user-dashboard");
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
