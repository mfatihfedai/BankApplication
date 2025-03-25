import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const GeneralTable = ({ data }) => {
  if (!data || data.length === 0) return <p>Veri bulunamadı</p>;

 

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
            <TableRow>
                {Object.keys(data[0]).map((header) => (
                <TableCell key={header}>{header}</TableCell>
                ))}
            </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              {Object.entries(row).map(([key, value]) => (
                <TableCell key={key}>
                  {typeof value === "object" ? JSON.stringify(value) : value}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GeneralTable;
