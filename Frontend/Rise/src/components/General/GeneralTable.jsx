import React from "react";
import { TableContainer, Paper, Button, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const GeneralTable = ({ data, columns, onEdit, onDelete }) => {
  const { t } = useTranslation();

  if (!data || data.length === 0) return <p>{t("VeriBulunamadi")}</p>;
  // Eğer onEdit veya onDelete varsa, actions sütununu ekle
  const enhancedColumns = [...columns];
  if (onEdit || onDelete) {
    enhancedColumns.push({
      field: "actions",
      headerName: t("Islemler"),
      flex: 1,
      renderCell: (params) => (
        <div style={{ display: "flex", gap: "10px", fontSize: "14px" }}>
          {onEdit && (
            <IconButton
              onClick={() => onEdit(params.row)}
            >
              <EditIcon />
            </IconButton>
          )}
          {onDelete && (
            <IconButton
              onClick={() => onDelete(params.row)}
            >
              <DeleteIcon />
            </IconButton>
          )}
        </div>
      ),
    });
  }

  return (
    <TableContainer component={Paper}>
      <DataGrid
        rows={data.map((item, index) => ({
          id: index,
          ...item,
        }))}
        columns={enhancedColumns}
        // columns={Object.keys(data[0]).map((header) =>
        //   header === "id"
        //     ? { field: header, headerName: header, flex: 1 }
        //     : { field: header, headerName: header, flex: 1 }
        // )}
        pagination
        paginationMode="server"
        rowCount={10}
        disableColumnResize
        disableColumnMenu
        disableSelectionOnClick
        disableRowSelectionOnClick
        disableVirtualization
        sortingOrder={["asc", "desc"]}
      />
    </TableContainer>
  );
};

export default GeneralTable;