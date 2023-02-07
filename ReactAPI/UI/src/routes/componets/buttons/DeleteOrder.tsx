import React, { useEffect, useState } from "react";
import "./buttoncss/button.css";
import OrderTable from "../OrderTable";
import selectionModel from "../OrderTable";
import DeleteOrder from "../OrderTable";


function DeleteItem() {
  return (
    <div className="DeleteItem">
      <button onClick={DeleteOrder}>Delete Order</button>
    </div>
  );
}

export default DeleteItem;
