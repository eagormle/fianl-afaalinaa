import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import "./css/table.css";
import "./css/ControlBar.css";
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColumns,
  GridRowParams,
  MuiEvent,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
} from "@mui/x-data-grid";

const columns: GridColumns = [
  {
    field: "id",
    headerName: "ID",
  },
  {
    field: "orderType",
    headerName: "Order Type",
    width: 300,
    editable: true,
  },
  {
    field: "customerName",
    headerName: "Customer Name",
    width: 300,
    editable: true,
  },
  {
    field: "date",
    headerName: "Date",
    width: 300,
    editable: true,
  },
  {
    field: "createdbyUser",
    headerName: "Created By User",
    width: 300,
    editable: true,
  },
];

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    setRows((oldRows) => [
      ...oldRows,
      { id: " ", name: "", age: "", isNew: true },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      //[id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

const OrderTable = () => {
  <div className="ControlBar">
    <button onClick={DeleteOrder}>Delete Order</button>
  </div>;

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetch("https://localhost:7274/api/Order")
      .then((data) => data.json())
      .then((data) => setTableData(data));
  }, []);

  console.log(tableData);

  const [selectionModel, setSelectionModel] = React.useState<any[]>([]);

  function DeleteOrder() {
    console.log(selectionModel);
    selectionModel.forEach(function (value) {
      fetch(`https://localhost:7274/api/Order/` + value, {
        method: "DELETE",
      });
    });
  }

  console.log(selectionModel);
  return (
    <div style={{ height: 630, width: 1920 }}>
      <DataGrid
        rows={tableData}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        checkboxSelection
        onSelectionModelChange={(newSelectionModel) => {
          setSelectionModel(newSelectionModel);
        }}
        selectionModel={selectionModel}
        experimentalFeatures={{ newEditingApi: true }}
      />
    </div>
  );
};

export default OrderTable;
