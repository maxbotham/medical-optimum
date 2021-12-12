import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import "./styles/viewBill.css";
const ViewBill = ({ patient }) => {
  const tempBillItems = {
    unpaidItems: [
      { name: "Example Prescription", amount: 99.99 },
      { name: "Example Prescription 2", amount: 80.99 },
      { name: "Example Procedure 3", amount: 44.99 },
      { name: "Example Procedure 4", amount: 39.99 },
      { name: "Example Consultation 5", amount: 38.99 },
    ],
    paidItems: [
      { name: "Example Prescription", amount: 99.99 },
      { name: "Example Prescription", amount: 99.99 },
      { name: "Example Prescription", amount: 99.99 },
      { name: "Example Prescription", amount: 99.99 },
    ],
  };
  let itemList = tempBillItems.unpaidItems.map((item, index) => {
    return (
      <div className="bill-item-wrapper">
        <div className="bill-item">
          Name: {item.name}, Amount Owed: {item.amount}
        </div>
      </div>
    );
  });
  return <div>{itemList}</div>;
};

export default ViewBill;
