import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import baseURL from "../../BaseURL";
import "./styles/viewBill.css";
const ViewBill = ({ patient }) => {
  const [billItems, setBillItems] = useState(null);
  if (billItems === null) {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Query-Params": `${patient.PatientID}`,
      },
    };
    fetch(`${baseURL}/admin/patients/viewbill`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setBillItems(data);
      });
  }
  if (billItems !== null) {
    const unpaidItems = billItems.filter((item) => {
      return !item.Paid;
    });
    let itemList = unpaidItems.map((item, index) => {
      return (
        <div className="bill-item-wrapper">
          <div className="bill-item">
            Name: {item.Item}, Amount Owed: {item.Total}, Date: {item.BillDate}
          </div>
        </div>
      );
    });

    const printBill = () => {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Query-Params": `${patient.PatientID}`,
        },
      };
      fetch(`${baseURL}/admin/patients/printbill`, requestOptions).then(
        (response) => response.json()
      );
    };

    let totalOwed = 0;
    for (let i = 0; i < unpaidItems.length; i++) {
      totalOwed += unpaidItems[i].Total;
    }
    return (
      <>
        <Button
          variant="contained"
          onClick={printBill}
          className="sign-out-button patient-action-button"
          style={{ marginTop: ".3rem" }}
        >
          Print Bill
        </Button>
        <div>{itemList}</div>
        <div style={{ marginTop: ".6rem" }}>{"Total owed: " + totalOwed.toFixed(2)}</div>
      </>
    );
  } else {
    return <></>;
  }
};

export default ViewBill;
