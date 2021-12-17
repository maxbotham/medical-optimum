import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import SearchFormResults from "./searchFormResults";
import SelectedPatient from "./selectedPatient";
import "./styles/searchForm.css";
import baseURL from "../BaseURL";
import DatePicker from "react-datepicker";
const SearchForm = () => {
  const [name, setName] = useState(null);
  const [dob, setDOB] = useState(null);
  const [id, setID] = useState(null);
  const [isResults, setIsResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const changeDOB = (props) => {
    if (props.target.value === "") {
      setDOB(null);
    } else {
      setDOB(props.target.value);
    }
  };
  const changeName = (props) => {
    if (props.target.value === "") {
      setName(null);
    } else {
      setName(props.target.value);
    }
  };
  const changeID = (props) => {
    if (props.target.value === "") {
      setID(null);
    } else {
      setID(props.target.value);
    }
  };
  const submitForm = () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Query-Params": `${name === null ? "null" : name};${
          id === null ? "null" : id
        };${dob === null ? "null" : dob.toISOString().split("T")[0]}`,
      },
    };
    fetch(`${baseURL}/admin/patients/search`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data);
      });
    setIsResults(true);
  };
  return (
    <div>
      <div className="patient-search-form-title">Patient Information</div>
      <div className="search-patient-parameters">
        <div className="search-patient-input">
          <TextField
            id="outlined-basic"
            label="Full Name"
            variant="outlined"
            onChange={changeName}
          />
        </div>
        <div className="search-patient-input">
          <TextField
            id="outlined-basic"
            label="Patient ID"
            variant="outlined"
            onChange={changeID}
          />
        </div>
      </div>
      <div className="patient-register-input patient-date-pick">
        <div style={{ marginBottom: ".3rem" }}>Birthday</div>
        <DatePicker selected={dob} onChange={(date) => setDOB(date)}/>
      </div>
      <div className="submit-search-form">
        <Button
          variant="contained"
          onClick={submitForm}
          className="sign-out-button"
        >
          Search For Patient
        </Button>
      </div>
      {selectedPatient === null ? (
        isResults ? (
          <SearchFormResults
            {...{
              searchResults,
              setIsResults,
              setSearchResults,
              setSelectedPatient,
            }}
          />
        ) : (
          <></>
        )
      ) : (
        <SelectedPatient
          {...{ setSelectedPatient, searchResults, selectedPatient }}
        />
      )}
    </div>
  );
};

export default SearchForm;
