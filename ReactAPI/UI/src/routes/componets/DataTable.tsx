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
import {
  randomCreatedDate,
  randomTraderName,
  randomUpdatedDate,
  randomId,
} from "@mui/x-data-grid-generator";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { call } from "../../../api/callWrapper";
import { GetOrder, OrdersApi } from "../../../api/src";

type OrderInfo = {
  isNew: boolean;
} & GetOrder;

const DataTable = () => {
  const [tableData, setTableData] = useState([]);
  const [rows, setRows] = React.useState<OrderInfo[]>([]);
  const queryClient = useQueryClient();

  // function refresh() {
  //   fetch("https://localhost:7283/Orders/Filtered", {
  //     method: "POST",
  //     body: JSON.stringify({})
  //   })
  //     .then((data) => data.json())
  //     .then((data) =>
  //       setRows(
  //         data.map((t: OrderInfo) => ({
  //           id: t.id,
  //           orderType: t.orderType,
  //           customerName: t.customerName,
  //           date: t.date,
  //           createdbyUser: t.createdbyUser,
  //           isNew: false,
  //         }))
  //       )
  //     );
  // }
  const {} = useQuery(
    ["orders"],
    async () => {
      const result = await call(OrdersApi).ordersFilteredPost({orderFilter: {}});
      setRows(result.map((o) => ({
        id: o.id,
        orderType: o.orderType,
        customerName: o.customerName,
        date: o.date,
        createdbyUser: o.createdbyUser,
        isNew: false
      })))
    },
    {
      refetchOnWindowFocus: false,
    }
  )

  //   const initalRows: GridRowsProp = [

  //     {
  //       id: randomId(),
  //       orderType: tableData,
  //       customerName: tableData,
  //       date: tableData,
  //       createdbyUser: tableData.map,
  //     },
  //   ];
  console.log("Created inital table");

  interface EditToolbarProps {
    setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
    setRowModesModel: (
      newModel: (oldModel: GridRowModesModel) => GridRowModesModel
    ) => void;
  }

  function EditToolbar(props: EditToolbarProps) {
    const { setRows, setRowModesModel } = props;

    const newRecord = () => {
      const id = randomId();
      setRows((oldRows) => [
        ...oldRows,
        {
          id,
          OrderType: "",
          customerName: "",
          date: "",
          createdbyUser: "",
          isNew: true,
        },
      ]);
      console.log("cereated soemthign");
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [id]: { mode: GridRowModes.Edit, fieldToFocus: "orderType" },
      }));
    };

    return (
      <GridToolbarContainer>
        <Button color="primary" startIcon={<AddIcon />} onClick={newRecord}>
          Add record
        </Button>
        <Button
          color="primary"
          startIcon={<DeleteIcon />}
          onClick={() => deleteOrder()}
        >
          Delete Selected
        </Button>
      </GridToolbarContainer>
    );
  }

  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );

  const handleRowEditStart = (
    params: GridRowParams,
    event: MuiEvent<React.SyntheticEvent>
  ) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    fetch(`https://localhost:7274/api/Order/` + id, {
      method: "DELETE",
    });
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: OrderInfo) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  //   const [tableData, setTableData] = useState([]);

  //   useEffect(() => {
  //     fetch("https://localhost:7274/api/Order")
  //       .then((data) => data.json())
  //       .then((data) => setTableData(data));
  //   }, []);

  const columns: GridColumns = [
    {
      field: "id",
      headerName: "ID",
      width: 300,
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
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 300,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const [selectionModel, setSelectionModel] = React.useState<any[]>([]);

  // function DeleteOrder() {
  //   console.log(selectionModel);
  //   const promises = selectionModel.map(function (value) {
  //     return fetch(`https://localhost:7274/api/Order/` + value, {
  //       method: "DELETE",
  //     });
  //   });
  //   Promise.all(promises).then(() => queryClient.invalidateQueries("orders"));
  // }

  const {mutate: deleteOrder } = useMutation(
    async () => {
      for (let i = 0; i < selectionModel.length; i++) {
        await call(OrdersApi).ordersIdDelete({id: selectionModel[i]});
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("orders");
        setSelectionModel([])
      }
    }
  )

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <div style={{ height: 630, width: 1920 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
          onRowEditStart={handleRowEditStart}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          checkboxSelection
          components={{
            Toolbar: EditToolbar,
          }}
          componentsProps={{
            toolbar: { setRows, setRowModesModel },
          }}
          onSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel);
          }}
          selectionModel={selectionModel}
          experimentalFeatures={{ newEditingApi: true }}
        />
      </div>
    </Box>
  );
};
export default DataTable;
