import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import Box from "@mui/material/Box";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import baseURL from "../../BaseURL";
const EditPatient = ({ patient }) => {
  const [name, setName] = useState(patient.FullName);
  const [phone, setPhone] = useState(patient.PhoneNumber);
  const [address, setAddress] = useState(patient.HomeAddress);
  const [emergName, setEmergName] = useState(patient.emergContact[0].FullName);
  const [emergAddress, setEmergAddress] = useState(
    patient.emergContact[0].HomeAddress
  );
  const [emergPhone, setEmergPhone] = useState(
    patient.emergContact[0].PhoneNumber
  );
  const [emergEmail, setEmergEmail] = useState(patient.emergContact[0].Email);
  const [emergRelation, setEmergRelation] = useState(
    patient.emergContact[0].Relation
  );
  const [gender, setGender] = useState(patient.Gender);

  const changeAddress = (props) => {
    if (props.target.value === "") {
      setAddress(null);
    } else {
      setAddress(props.target.value);
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
  const changeGender = (props) => {
    if (props.target.value === "") {
      setGender(null);
    } else {
      setGender(props.target.value);
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

  const submitForm = () => {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Gender: gender,
        FullName: name,
        PhoneNumber: phone,
        HomeAddress: address,
        PatientID: patient.PatientID,
      }),
    };
    fetch(`${baseURL}/admin/patients/update`, requestOptions).then((response) =>
      response.json()
    );
    const secondReqOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        FullName: emergName,
        Email: emergEmail,
        PhoneNumber: emergPhone,
        HomeAddress: emergAddress,
        Relation: emergRelation,
        PatientID: patient.PatientID,
      }),
    };
    fetch(`${baseURL}/admin/patients/updateec`, secondReqOptions).then(
      (response) => response.json()
    );
  };
  return (
    <div className="register-patient-form">
      <div className="patient-title">Patient Information</div>
      <div className="patient-register-input">
        <TextField
          id="outlined-basic"
          label="Full Name"
          variant="outlined"
          onChange={changeName}
          defaultValue={name}
        />
      </div>
      <div className="patient-register-input">
        <TextField
          id="outlined-basic"
          label="Phone Number"
          variant="outlined"
          onChange={changePhone}
          defaultValue={phone}
        />
      </div>
      <div className="patient-register-input">
        <TextField
          onChange={changeAddress}
          id="outlined-basic"
          label="Address"
          variant="outlined"
          defaultValue={address}
        />
      </div>
      <div className="patient-register-input">
        <TextField
          onChange={changeGender}
          id="outlined-basic"
          label="Gender"
          variant="outlined"
          defaultValue={gender}
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
            defaultValue={emergName}
          />
        </div>
        <div className="patient-register-emergency">
          <TextField
            onChange={changeEmergEmail}
            id="outlined-basic"
            label="Email Address"
            variant="outlined"
            defaultValue={emergEmail}
          />
        </div>
        <div className="patient-register-emergency">
          <TextField
            onChange={changeEmergAddress}
            id="outlined-basic"
            label="Address"
            variant="outlined"
            defaultValue={emergAddress}
          />
        </div>
        <div className="patient-register-emergency">
          <TextField
            onChange={changeEmergPhone}
            id="outlined-basic"
            label="Phone Number"
            variant="outlined"
            defaultValue={emergPhone}
          />
        </div>
        <div className="patient-register-emergency">
          <TextField
            onChange={changeEmergRelation}
            id="outlined-basic"
            label="Relation"
            variant="outlined"
            defaultValue={emergRelation}
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
            emergName === null ||
            gender === null ||
            emergAddress === null ||
            emergPhone === null ||
            emergEmail === null ||
            emergRelation === null
          }
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default EditPatient;
