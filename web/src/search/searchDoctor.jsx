import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import "./styles/searchDoctor.css";
import baseURL from "../BaseURL";
const SearchDoctor = ({ setSelectedDoctor }) => {
  const [name, setName] = useState(null);
  const [employeeID, setEmployeeID] = useState(null);
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
  const submitForm = () => {
    setDidSearch(true);
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Query-Params": `${
          employeeID === null || employeeID === "" ? "null" : employeeID
        };${name === null || name === "" ? "null" : name};null`,
      },
    };
    fetch(`${baseURL}/admin/hospital/employee/doctor`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSearchResults(data);
      });
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
        {item.DoctorName}
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
      <div className="selected-doctor-title">
        You have selected: {selected.DoctorName}
      </div>
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
