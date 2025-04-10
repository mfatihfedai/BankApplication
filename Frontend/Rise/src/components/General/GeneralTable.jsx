import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const GeneralTable = ({ data }) => {
  if (!data || data.length === 0) return <p>Veri bulunamadı</p>;

  console.log(data);

  return (
    <TableContainer component={Paper}>
      <DataGrid
        rows={data.map((item, index) => ({
          id: index,
          ...item,
        }))}
       
        columns={Object.keys(data[0]).map((header) =>
          header === "id"
            ? { field: header, headerName: header, flex: 1 }
            : { field: header, headerName: header, flex: 1 }
        )}
        pagination
        paginationMode="server"
        rowCount={10}
        disableColumnResize
        disableColumnMenu
        disableSelectionOnClick
        disableRowSelectionOnClick
        disableVirtualization
        sortingOrder={["asc", "desc"]}
        // initialState={{
        //   sorting: {
        //     sortModel: [{ field: { data }, sort: "desc" }],
        //   },
        // }}
        sx={{
          height: "100%",
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#00333D !important",
            color: "#ffffff",
            fontFamily:"Montserrat",
            fontSize: "16px",
            fontWeight: "bold",
            textAlign: "center",
            "& .MuiDataGrid-columnHeaderTitleContainer": {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            },
          },
          "& .MuiDataGrid-cell": {
            textAlign: "center",
            fontSize: "18px",
          },
          "& .MuiDataGrid-row:nth-of-type(odd)": {
            backgroundColor: "#f1f9ff",
          },
          "& .MuiDataGrid-row:nth-of-type(even)": {
            backgroundColor: "#ffffff",
          },
          "& .MuiDataGrid-footerContainer": {
            display: "none",
          },
          "& .MuiDataGrid-sortIcon": {
            color: "#ffffff",
          },
        }}
      />
      {/* <Table>
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
      </Table> */}
    </TableContainer>
  );
};

export default GeneralTable;
