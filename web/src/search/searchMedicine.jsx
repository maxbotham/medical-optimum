import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import "./styles/searchMedicine.css";
const SearchMedicine = ({ setSelectedMedicine }) => {
  const [name, setName] = useState(null);
  const [medicineID, setMedicineID] = useState(null);
  const [didSearch, setDidSearch] = useState(false);
  const [selected, setSelected] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    setSelectedMedicine(selected);
  }, [selected]);
  const changeName = (props) => {
    setName(props.target.value);
  };
  const changeMedicineID = (props) => {
    setMedicineID(props.target.value);
  };
  const submitForm = () => {
    setDidSearch(true);
    setSearchResults(["Temporary", "Temp", "StillTemp", "Temp..."]);
  };
  return (
    <div>
      <div className="medicine-search-form-title">Medicine Information</div>
      <div className="search-medicine-parameters">
        <div className="search-medicine-input">
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            onChange={changeName}
          />
        </div>
        <div className="search-medicine-input">
          <TextField
            id="outlined-basic"
            label="Medicine ID"
            variant="outlined"
            onChange={changeMedicineID}
          />
        </div>
      </div>
      <div className="submit-medicine-search">
        <Button
          variant="contained"
          onClick={submitForm}
          className="sign-out-button"
        >
          Search For Medicine
        </Button>
      </div>
      {selected === null ? (
        didSearch ? (
          <MedicineResults {...{ setSelected, searchResults, setDidSearch }} />
        ) : (
          <></>
        )
      ) : (
        <SelectedMedicine {...{ setSelected, selected }} />
      )}
    </div>
  );
};

const MedicineResults = ({ searchResults, setSelected, setDidSearch }) => {
  let medicineList = searchResults.map((item, index) => {
    const setSelectedFunc = () => {
      setSelected(item);
    };
    return (
      <div onClick={setSelectedFunc} className="medicine-result-item">
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
      <div className="medicine-result-list">{medicineList}</div>
      <div className="clear-search-button">
        <Button
          variant="contained"
          onClick={clearResults}
          className="sign-out-button"
        >
          Clear Search
        </Button>
      </div>
    </div>
  );
};

const SelectedMedicine = ({ setSelected, selected }) => {
  const unselect = () => {
    setSelected(null);
  };
  return (
    <div className="selected-medicine-wrapper">
      <Button
        variant="contained"
        onClick={unselect}
        className="sign-out-button"
      >
        Unselect
      </Button>
      <div className="selected-medicine-title">
        You have selected: {selected}
      </div>
    </div>
  );
};

export default SearchMedicine;
