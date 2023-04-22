import React from "react";
import "./componets/css/App.css";
import Header from "./componets/header";
import OrderTable from "./componets/OrderTable";
import ControlBar from "./componets/ControlBar";
import DataTable from "./componets/DataTable";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();

function App(){
    return (
        <QueryClientProvider client={queryClient}>
        <div>
        <Header />
        {/* <ControlBar /> */}
        <DataTable />
        </div>
        </QueryClientProvider>
    )
}

export default App;