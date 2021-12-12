import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import Box from "@mui/material/Box";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EditPatient = () => {
  const [name, setName] = useState("Temporary");
  const [phone, setPhone] = useState("Temporary");
  const [address, setAddress] = useState("Temporary");
  const [status, setStatus] = useState("Temporary");
  const [visitDate, setVisitDate] = useState(null);
  const [emergName, setEmergName] = useState("Temporary");
  const [emergAddress, setEmergAddress] = useState("Temporary");
  const [emergPhone, setEmergPhone] = useState("Temporary");
  const [emergEmail, setEmergEmail] = useState("Temporary");
  const [emergRelation, setEmergRelation] = useState("Temporary");
  const [value, setValue] = useState(null);
  const [birthday, setBirthday] = useState(null);
  const changeAddress = (props) => {
    if (props.target.value === "") {
      setAddress(null);
    } else {
      setAddress(props.target.value);
    }
  };
  const changeStatus = (props) => {
    if (props.target.value === "") {
      setStatus(null);
    } else {
      setStatus(props.target.value);
    }
  };
  const changePhone = (props) => {
    if (props.target.value === "") {
      setPhone(null);
    } else {
      setPhone(props.target.value);
    }
  };
  const changeName = (props) => {
    if (props.target.value === "") {
      setName(null);
    } else {
      setName(props.target.value);
    }
  };
  const changeEmergName = (props) => {
    if (props.target.value === "") {
      setEmergName(null);
    } else {
      setEmergName(props.target.value);
    }
  };
  const changeEmergAddress = (props) => {
    if (props.target.value === "") {
      setEmergAddress(null);
    } else {
      setEmergAddress(props.target.value);
    }
  };
  const changeEmergEmail = (props) => {
    if (props.target.value === "") {
      setEmergEmail(null);
    } else {
      setEmergEmail(props.target.value);
    }
  };
  const changeEmergPhone = (props) => {
    if (props.target.value === "") {
      setEmergPhone(null);
    } else {
      setEmergPhone(props.target.value);
    }
  };
  const changeEmergRelation = (props) => {
    if (props.target.value === "") {
      setEmergRelation(null);
    } else {
      setEmergRelation(props.target.value);
    }
  };

  const submitForm = () => {};
  return (
    <div className="register-patient-form">
      <div className="patient-title">Patient Information</div>
      <div className="patient-register-input">
        <TextField
          id="outlined-basic"
          label="Full Name"
          variant="outlined"
          onChange={changeName}
          defaultValue="Temporary"
        />
      </div>
      <div className="patient-register-input">
        <TextField
          id="outlined-basic"
          label="Phone Number"
          variant="outlined"
          onChange={changePhone}
          defaultValue="Temporary"
        />
      </div>
      <div className="patient-register-input">
        <TextField
          onChange={changeAddress}
          id="outlined-basic"
          label="Address"
          variant="outlined"
          defaultValue="Temporary"
        />
      </div>
      <div className="patient-register-input">
        <TextField
          onChange={changeStatus}
          id="outlined-basic"
          label="Status"
          variant="outlined"
          defaultValue="Temporary"
        />
      </div>
      <div className="patient-register-input patient-date-pick">
        <div style={{ marginBottom: ".3rem" }}>Birthday</div>
        <DatePicker
          selected={birthday}
          onChange={(date) => setBirthday(date)}
          defaultValue="temporary"
        />
      </div>
      <div className="patient-register-input patient-date-pick">
        <div style={{ marginBottom: ".3rem" }}>Visit Date</div>
        <DatePicker
          selected={visitDate}
          onChange={(date) => setVisitDate(date)}
          defaultValue="temporary"
        />
      </div>
      <div className="emergency-contact-title">
        Emergency Contact Information
      </div>
      <div className="emergency-contact-information">
        <div className="patient-register-emergency">
          <TextField
            onChange={changeEmergName}
            id="outlined-basic"
            label="Full Name"
            variant="outlined"
            defaultValue="Temporary"
          />
        </div>
        <div className="patient-register-emergency">
          <TextField
            onChange={changeEmergEmail}
            id="outlined-basic"
            label="Email Address"
            variant="outlined"
            defaultValue="Temporary"
          />
        </div>
        <div className="patient-register-emergency">
          <TextField
            onChange={changeEmergAddress}
            id="outlined-basic"
            label="Address"
            variant="outlined"
            defaultValue="Temporary"
          />
        </div>
        <div className="patient-register-emergency">
          <TextField
            onChange={changeEmergPhone}
            id="outlined-basic"
            label="Phone Number"
            variant="outlined"
            defaultValue="Temporary"
          />
        </div>
        <div className="patient-register-emergency">
          <TextField
            onChange={changeEmergRelation}
            id="outlined-basic"
            label="Relation"
            variant="outlined"
            defaultValue="Temporary"
          />
        </div>
      </div>
      <div className="submit-register-form">
        <Button
          variant="contained"
          onClick={submitForm}
          className="sign-out-button"
          disabled={
            name === null ||
            address === null ||
            status === null ||
            visitDate === null ||
            emergName === null ||
            emergAddress === null ||
            emergPhone === null ||
            emergEmail === null ||
            emergRelation === null ||
            birthday === null
          }
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};
export default EditPatient;
