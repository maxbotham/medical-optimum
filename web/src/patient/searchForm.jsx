import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import SearchFormResults from "./searchFormResults";
import SelectedPatient from "./selectedPatient";
import "./styles/searchForm.css";
const SearchForm = () => {
  const [name, setName] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [isResults, setIsResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const changeBirthMonth = (props) => {
    setBirthMonth(props.target.value);
  };
  const changeBirthDay = (props) => {
    setBirthDay(props.target.value);
  };
  const changeBirthYear = (props) => {
    setBirthYear(props.target.value);
  };
  const changeName = (props) => {
    setName(props.target.value);
  };
  const submitForm = () => {
    setSearchResults([
      "Test",
      "Test1",
      "Test2",
      "Test3",
      "Test4",
      "Test5",
      "Tits",
    ]);
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
            label="Year of Birth"
            variant="outlined"
            onChange={changeBirthYear}
          />
        </div>
        <div className="search-patient-input">
          <TextField
            id="outlined-basic"
            label="Day of Birth"
            variant="outlined"
            onChange={changeBirthDay}
          />
        </div>
        <div className="search-patient-input">
          <TextField
            id="outlined-basic"
            label="Month of Birth"
            variant="outlined"
            onChange={changeBirthMonth}
          />
        </div>
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
