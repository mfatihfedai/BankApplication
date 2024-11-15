import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getUserById } from "../../service/UserApi";

const Verify = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  // useEffect(() => {
  //   async function fetchData(){
  //     try{
  //       const user = await getUserById();
  //       console.log(user);
  //     }catch(err){
  //       console.log(err.message);
  //     }
  //   }
  //   fetchData();
  // },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8080/auth/verify-otp?otp=${otp}&id=${1}`, //1 yazan yere contextApi den id gelecek. State yönetimi önemli.
        {},
        { withCredentials: true }
      );
      // console.log(response);

      if (response.status === 200) {
        const { data } = response;

        setTimeout(() => {
          async function fetchData(){
                try{
                  const user = await getUserById();
                  console.log(user);
                  setUser(user)
                }catch(err){
                  console.log(err.message);
                }
              }
              fetchData();

              if (user.role === "ADMIN") {
                navigate("/swagger-ui/index.html");
              } else {
                navigate("/dashboard");
              }

        }, 3000)
        // giriş başarıysa kullanıcı verisi çekme
        // Check if the user is an admin and navigate accordingly
        // if (data.role === "ADMIN") {
        //   navigate("/swagger-ui/index.html");
        // } else {
        //   navigate("/dashboard"); 
        // }
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
