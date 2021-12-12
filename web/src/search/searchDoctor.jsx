import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import "./styles/searchDoctor.css";
const SearchDoctor = ({ setSelectedDoctor }) => {
  const [name, setName] = useState(null);
  const [employeeID, setEmployeeID] = useState(null);
  const [birthDay, setBirthDay] = useState(null);
  const [birthMonth, setBirthMonth] = useState(null);
  const [birthYear, setBirthYear] = useState(null);
  const [department, setDepartment] = useState(null);
  const [didSearch, setDidSearch] = useState(false);
  const [selected, setSelected] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    setSelectedDoctor(selected);
  }, [selected]);

  const changeName = (props) => {
    setName(props.target.value);
  };
  const changeEmployeeID = (props) => {
    setEmployeeID(props.target.value);
  };
  const changeBirthDay = (props) => {
    setBirthDay(props.target.value);
  };
  const changeBirthMonth = (props) => {
    setBirthMonth(props.target.value);
  };
  const changeBirthYear = (props) => {
    setBirthYear(props.target.value);
  };
  const changeDepartment = (props) => {
    setDepartment(props.target.value);
  };
  const submitForm = () => {
    setSearchResults([
      "This is a search result.",
      "This is another search result.",
      "I am getting tired of typing examples",
      "I am done now.",
    ]);
    setDidSearch(true);
  };

  return (
    <div>
      <div className="doctor-search-form-title">Doctor Information</div>

      <div className="search-doctor-parameters">
        <div className="search-doctor-input">
          <TextField
            id="outlined-basic"
            label="Full Name"
            variant="outlined"
            onChange={changeName}
          />
        </div>
        <div className="search-doctor-input">
          <TextField
            id="outlined-basic"
            label="Employee ID"
            variant="outlined"
            onChange={changeEmployeeID}
          />
        </div>
        <div className="search-doctor-input">
          <TextField
            id="outlined-basic"
            label="Day of Birth"
            variant="outlined"
            onChange={changeBirthDay}
          />
        </div>
        <div className="search-doctor-input">
          <TextField
            id="outlined-basic"
            label="Month of Birth"
            variant="outlined"
            onChange={changeBirthMonth}
          />
        </div>
        <div className="search-doctor-input">
          <TextField
            id="outlined-basic"
            label="Year of Birth"
            variant="outlined"
            onChange={changeBirthYear}
          />
        </div>
        <div className="search-doctor-input">
          <TextField
            id="outlined-basic"
            label="Department"
            variant="outlined"
            onChange={changeDepartment}
          />
        </div>
      </div>
      <div className="submit-doctor-search">
        <Button
          variant="contained"
          onClick={submitForm}
          className="sign-out-button"
        >
          Search For Doctor
        </Button>
      </div>
      {selected === null ? (
        didSearch ? (
          <DoctorResults {...{ searchResults, setSelected, setDidSearch }} />
        ) : (
          <></>
        )
      ) : (
        <SelectedDoctor {...{ setSelected, selected }} />
      )}
    </div>
  );
};

const DoctorResults = ({ searchResults, setSelected, setDidSearch }) => {
  let medicineList = searchResults.map((item, index) => {
    const setSelectedFunc = () => {
      setSelected(item);
    };
    return (
      <div onClick={setSelectedFunc} className="doctor-result-item">
        {item}
      </div>
    );
  });

  const clearResults = () => {
    setSelected(null);
    setDidSearch(false);
  };
  return (
    <div>
      <div className="clear-search-button">
        <Button
          variant="contained"
          onClick={clearResults}
          className="sign-out-button"
        >
          Clear Search
        </Button>
      </div>
      <div className="doctor-result-list">{medicineList}</div>
    </div>
  );
};

const SelectedDoctor = ({ setSelected, selected }) => {
  const unselect = () => {
    setSelected(null);
  };
  return (
    <div className="selected-doctor-wrapper">
      <div className="selected-doctor-title">You have selected: {selected}</div>
      <Button
        variant="contained"
        onClick={unselect}
        className="sign-out-button"
      >
        Unselect
      </Button>
    </div>
  );
};

export default SearchDoctor;
