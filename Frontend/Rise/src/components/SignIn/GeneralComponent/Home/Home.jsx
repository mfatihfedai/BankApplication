import React, { useEffect, useState } from "react";
import { useUser } from "../../../../context/UserContext";
import { getUserById, getTransactionsByDate } from "../../../../service/UserApi";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import Calendar from "react-calendar";  
import "react-calendar/dist/Calendar.css";  
import "./Home.style.css"

function Home() {
  const { user, newUser } = useUser();
  const [balance, setBalance] = useState(user?.balance || 0);
  const [selectedDate, setSelectedDate] = useState(new Date());  
  const [transactions, setTransactions] = useState([]);  

  const fetchData = async () => {
    try {
      const response = await getUserById(user.id);
      setBalance(response.data.balance);
      newUser(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchTransactions = async (date) => {
    try {
      const formattedDate = date.toISOString().split("T")[0]; 
      const response = await getTransactionsByDate(user.id, formattedDate);
      setTransactions(response.data);  
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchData();
      fetchTransactions(selectedDate);  
    }
  }, [user?.id, selectedDate]); 

  const handleDateChange = (date) => {
    setSelectedDate(date);  
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "50px" }}>
      <div style={{ width: "60%", display: "flex", flexDirection: "column", alignItems: "center" }}>
      

        {/* Kullanıcı hesap bilgileri tablosu */}
        <TableContainer component={Paper} style={{ maxWidth: "600px", boxShadow: "none" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "bold", backgroundColor: "white", borderBottom: "2px solid #ccc" }}>Hesap Türü</TableCell>
                <TableCell style={{ fontWeight: "bold", backgroundColor: "white", borderBottom: "2px solid #ccc" }}>Hesap No</TableCell>
                <TableCell style={{ fontWeight: "bold", backgroundColor: "white", borderBottom: "2px solid #ccc" }}>Net Bakiye</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow style={{ backgroundColor: "transparent" }}>
                <TableCell>Vadesiz TL</TableCell>
                <TableCell>{user?.account_no || "N/A"}</TableCell>
                <TableCell>{balance} TL</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Hesap hareketlerini göster */}
        <div style={{ marginTop: "30px", width: "100%" }}>
          <h3>Hesap Hareketleri ({selectedDate.toLocaleDateString()})</h3>
          <TableContainer component={Paper} style={{ maxWidth: "600px", boxShadow: "none" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: "bold", backgroundColor: "white", borderBottom: "2px solid #ccc" }}>Tarih</TableCell>
                  <TableCell style={{ fontWeight: "bold", backgroundColor: "white", borderBottom: "2px solid #ccc" }}>Açıklama</TableCell>
                  <TableCell style={{ fontWeight: "bold", backgroundColor: "white", borderBottom: "2px solid #ccc" }}>Tutar</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.length > 0 ? (
                  transactions.map((transaction, index) => (
                    <TableRow key={index}>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell>{transaction.amount} TL</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3}>No transactions available for this day.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>

      {/* Takvim */}
      <div style={{ width: "35%", display: "flex", justifyContent: "center" }}>
        <Calendar
          onChange={handleDateChange} 
          value={selectedDate}  
          tileClassName="custom-tile" 
        />
      </div>
    </div>
  );
}

export default Home;
