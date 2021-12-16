import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import Box from "@mui/material/Box";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./styles/registerForm.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import baseURL from "../BaseURL";
const RegisterForm = () => {
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [address, setAddress] = useState(null);
  const [emergName, setEmergName] = useState(null);
  const [emergAddress, setEmergAddress] = useState(null);
  const [emergPhone, setEmergPhone] = useState(null);
  const [emergEmail, setEmergEmail] = useState(null);
  const [emergRelation, setEmergRelation] = useState(null);
  const [birthday, setBirthday] = useState(null);
  const [type, setType] = useState(null);
  const [insurance, setInsurance] = useState(null);
  const [paymentEmail, setPaymentEmail] = useState(null);
  const [gender, setGender] = useState(null);
  const [insuranceList, setInsuranceList] = useState(null);
  if (insuranceList === null) {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(`${baseURL}/admin/patients/insurance`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setInsuranceList(data);
      });
  }
  const changePaymentEmail = (props) => {
    if (props.target.value === "") {
      setPaymentEmail(null);
    } else {
      setPaymentEmail(props.target.value);
    }
  };
  const changeIsurance = (props) => {
    if (props.target.value === "") {
      setInsurance(null);
    } else {
      setInsurance(props.target.value);
    }
  };
  const changePaymentType = (props) => {
    setInsurance(null);
    setPaymentEmail(null);
    if (props.target.value === "") {
      setType(null);
    } else {
      setType(props.target.value);
    }
  };
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
  const changeGender = (props) => {
    if (props.target.value === "") {
      setGender(null);
    } else {
      setGender(props.target.value);
    }
  };

  const submitForm = () => {
    let bodyParams = {
      Gender: gender,
      FullName: name,
      PhoneNumber: phone,
      HomeAddress: address,
      DOB: birthday.toISOString().split("T")[0],
      PayerType: type,
      Email: paymentEmail,
      Insurance: insurance,
      ECFullName: emergName,
      ECEmail: emergEmail,
      ECHomeAddress: emergAddress,
      ECPhoneNumber: emergPhone,
      ECRelation: emergRelation,
      VisitDate: new Date().toISOString().split("T")[0],
    };
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyParams),
    };
    fetch(`${baseURL}/admin/patients/register`, requestOptions).then(
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
        />
      </div>
      <div className="patient-register-input">
        <TextField
          id="outlined-basic"
          label="Phone Number"
          variant="outlined"
          onChange={changePhone}
        />
      </div>
      <div className="patient-register-input">
        <TextField
          onChange={changeAddress}
          id="outlined-basic"
          label="Address"
          variant="outlined"
        />
      </div>
      <div className="patient-register-input">
        <TextField
          onChange={changeGender}
          id="outlined-basic"
          label="Gender"
          variant="outlined"
        />
      </div>
      <div className="patient-register-input patient-date-pick">
        <div style={{ marginBottom: ".3rem" }}>Birthday</div>
        <DatePicker
          selected={birthday}
          onChange={(date) => setBirthday(date)}
        />
      </div>
      <div className="emergency-contact-title">Payment Information</div>
      <div className="emergency-contact-information">
        <div className="type-of-payer-register">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Type of Payer</InputLabel>
            <Select
              size="medium"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={type}
              label="Type of Payer"
              onChange={changePaymentType}
            >
              <MenuItem value={"Insurance"}>Insurance</MenuItem>
              <MenuItem value={"Direct"}>Direct</MenuItem>
            </Select>
          </FormControl>
        </div>
        {type === "Insurance" ? (
          <div className="type-of-payer-register">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Insurance Provider
              </InputLabel>
              <Select
                size="medium"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={insurance}
                label="Insurance Provider"
                onChange={changeIsurance}
              >
                {insuranceList.map((item) => {
                  return <MenuItem value={item.PayerID}>{item.Name}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </div>
        ) : type === "Direct" ? (
          <>
            <div className="patient-register-emergency">
              <TextField
                onChange={changePaymentEmail}
                id="outlined-basic"
                label="Payment Email"
                variant="outlined"
              />
            </div>
          </>
        ) : (
          <></>
        )}
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
          />
        </div>
        <div className="patient-register-emergency">
          <TextField
            onChange={changeEmergEmail}
            id="outlined-basic"
            label="Email Address"
            variant="outlined"
          />
        </div>
        <div className="patient-register-emergency">
          <TextField
            onChange={changeEmergAddress}
            id="outlined-basic"
            label="Address"
            variant="outlined"
          />
        </div>
        <div className="patient-register-emergency">
          <TextField
            onChange={changeEmergPhone}
            id="outlined-basic"
            label="Phone Number"
            variant="outlined"
          />
        </div>
        <div className="patient-register-emergency">
          <TextField
            onChange={changeEmergRelation}
            id="outlined-basic"
            label="Relation"
            variant="outlined"
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
            emergAddress === null ||
            emergPhone === null ||
            emergEmail === null ||
            emergRelation === null ||
            birthday === null ||
            gender === null ||
            type === null ||
            (type === "Insurance" && insurance === null) ||
            (type === "Direct" && paymentEmail === null)
          }
        >
          Register Patient
        </Button>
      </div>
    </div>
  );
};
export default RegisterForm;
