import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import "./styles/hospitalPage.css";
import EmployeePage from "./pages/employee/employeePage";
import InventoryPage from "./pages/inventory/inventoryPage";
import WardPage from "./pages/ward/wardPage.jsx";
const HospitalPage = ({ setHospitalSelected }) => {
  const [type, setType] = useState(null);
  
  const setInventory = () => {
    setType("Inventory");
  };
  const setWard = () => {
    setType("Ward");
  };
  const setEmployee = () => {
    setType("Employee");
  };
  const unselect = () => {
    setHospitalSelected(false);
  };
  return (
    <>
      <div className="hospital-page-header">
        <div className="hospital-select-button">
          <Button
            variant="contained"
            onClick={unselect}
            className="sign-out-button"
          >
            Go Back
          </Button>
        </div>
        <div className="hospital-select-button">
          <Button
            variant="contained"
            onClick={setInventory}
            className="sign-out-button"
          >
            Inventory
          </Button>
        </div>
        <div className="hospital-select-button">
          <Button
            variant="contained"
            onClick={setEmployee}
            className="sign-out-button"
          >
            Employee
          </Button>
        </div>
        <div className="hospital-select-button">
          <Button
            variant="contained"
            onClick={setWard}
            className="sign-out-button"
          >
            Wards
          </Button>
        </div>
      </div>
      {type === "Employee" ? (
        <EmployeePage />
      ) : type === "Inventory" ? (
        <InventoryPage />
      ) : type === "Ward" ? (
        <WardPage />
      ) : (
        <></>
      )}
    </>
  );
};
export default HospitalPage;
