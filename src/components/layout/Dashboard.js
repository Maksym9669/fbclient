import React from "react";
import Sidebar from "./Sidebar";
import Clients from "../clients/Clients";
//Difference in path for Clients from Brad

export default function Dashboard() {
  return (
    <div className="row">
      <div className="col-md-10">
        <Clients />
      </div>
      <div className="col-md-2">
        <Sidebar />
      </div>
    </div>
  );
}
