import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import Box from "@mui/material/Box";
import DatePicker from "react-datepicker";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SearchDoctor from "../../search/searchDoctor";
import SearchMedicine from "../../search/searchMedicine";
import SearchEquipment from "../../search/searchEquipment";
import "./styles/addService.css";
import baseURL from "../../BaseURL";
const AddService = ({ patient }) => {
  const [type, setType] = React.useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [price, setPrice] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const changePrice = (props) => {
    setPrice(props.target.value);
  };
  const changeQuantity = (props) => {
    setQuantity(props.target.value);
  };

  const addService = () => {
    let bodyParams = {};
    if (type === "Procedure") {
      bodyParams = {
        DoctorEmployeeID: selectedDoctor.DoctorID,
        PatientID: patient.PatientID,
        EquipmentID: selectedEquipment.EquipmentID,
        ProcedureDate: new Date().toISOString().split("T")[0],
      };
    } else if (type === "Prescription") {
      bodyParams = {
        DoctorEmployeeID: selectedDoctor.DoctorID,
        PatientID: patient.PatientID,
        MedicineID: selectedMedicine.MedicineID,
        Quantity: selectedMedicine.Quantity,
        UsedQuantity: quantity,
        PrescriptionDate: new Date().toISOString().split("T")[0],
      };
    } else {
      bodyParams = {
        DoctorEmployeeID: selectedDoctor.DoctorID,
        PatientID: patient.PatientID,
        Price: price,
        ConsultationDate: new Date().toISOString().split("T")[0],
      };
    }
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyParams),
    };
    fetch(
      `${baseURL}/admin/patients/add${type.toLowerCase()}`,
      requestOptions
    ).then((response) => response.json());
  };
  const handleChange = (event) => {
    setType(event.target.value);
  };
  return (
    <div>
      <div className="choose-service-type-and-date">
        <div className="choose-add-service-type">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Type of Service
            </InputLabel>
            <Select
              size="medium"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={type}
              label="Type of Service"
              onChange={handleChange}
            >
              <MenuItem value={"Consultation"}>Consultation</MenuItem>
              <MenuItem value={"Procedure"}>Procedure</MenuItem>
              <MenuItem value={"Prescription"}>Prescription</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      {type === "Consultation" ? (
        <div className="adding-service-params">
          <div className="consultation-price-input">
            <TextField
              id="outlined-basic"
              label="Price"
              variant="outlined"
              onChange={changePrice}
            />
          </div>
          <div className="add-service-search-item-full">
            <SearchDoctor {...{ setSelectedDoctor }} />
          </div>
          <div className="add-service-submit-button">
            <Button
              variant="contained"
              onClick={addService}
              className="sign-out-button"
              disabled={
                selectedDoctor === null || price === null || price === ""
              }
            >
              Add Consultation
            </Button>
          </div>
        </div>
      ) : type === "Procedure" ? (
        <div className="adding-service-params">
          <div className="add-service-search-item-half">
            <SearchDoctor {...{ setSelectedDoctor }} />
          </div>
          <div className="add-service-search-item-half">
            <SearchEquipment {...{ setSelectedEquipment }} />
          </div>
          <div className="add-service-submit-button">
            <Button
              variant="contained"
              onClick={addService}
              className="sign-out-button"
              disabled={selectedDoctor === null || selectedEquipment === null}
            >
              Add Procedure
            </Button>
          </div>
        </div>
      ) : type === "Prescription" ? (
        <div className="adding-service-params">
          <div className="add-service-search-item-half">
            <SearchDoctor {...{ setSelectedDoctor }} />
          </div>
          <div className="add-service-search-item-half">
            <SearchMedicine {...{ setSelectedMedicine }} />
          </div>
          <div className="consultation-price-input">
            <TextField
              id="outlined-basic"
              label="Medicine Quantity"
              variant="outlined"
              onChange={changeQuantity}
            />
          </div>
          <div className="add-service-submit-button">
            <Button
              size="large"
              variant="contained"
              onClick={addService}
              className="sign-out-button"
              disabled={
                selectedDoctor === null ||
                selectedMedicine === null ||
                quantity === null ||
                quantity === ""
              }
            >
              Add Prescription
            </Button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default AddService;
