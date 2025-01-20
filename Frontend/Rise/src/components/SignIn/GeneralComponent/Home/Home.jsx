import React, { useEffect, useState } from "react";
import { useUser } from "../../../../context/UserContext";
import { getUserById } from "../../../../service/UserApi";

function Home() {
  const { user, newUser } = useUser();
  const [balance, setBalance] = useState(user.balance);

  const fetchData = async (id) => {
    try {
      const response = await getUserById(user.id);
      setBalance(response.data.balance);
      newUser(response.data);
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      hellöööö
      {user.name}
      {user.surname}
      {balance}
    </div>
  );
}

export default Home;
