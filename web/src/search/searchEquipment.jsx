import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import "./styles/searchEquipment.css";
const SearchEquipment = ({ setSelectedEquipment }) => {
  const [name, setName] = useState(null);
  const [equipmentID, setEquipmentID] = useState(null);
  const [didSearch, setDidSearch] = useState(false);
  const [selected, setSelected] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    setSelectedEquipment(selected);
  }, [selected]);
  const changeName = (props) => {
    setName(props.target.value);
  };
  const changeEquipmentID = (props) => {
    setEquipmentID(props.target.value);
  };
  const submitForm = () => {
    setDidSearch(true);
    setSearchResults(["Temporary", "Temp", "StillTemp", "Temp..."]);
  };
  return (
    <div>
      <div className="equipment-search-form-title">Equipment Information</div>
      <div className="search-equipment-parameters">
        <div className="search-equipment-input">
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            onChange={changeName}
          />
        </div>
        <div className="search-equipment-input">
          <TextField
            id="outlined-basic"
            label="Equipment ID"
            variant="outlined"
            onChange={changeEquipmentID}
          />
        </div>
      </div>
      <div className="submit-doctor-search">
        <Button
          variant="contained"
          onClick={submitForm}
          className="sign-out-button"
        >
          Search For Equipment
        </Button>
      </div>
      {selected === null ? (
        didSearch ? (
          <EquipmentResults {...{ setSelected, searchResults, setDidSearch }} />
        ) : (
          <></>
        )
      ) : (
        <SelectedEquipment {...{ setSelected, selected }} />
      )}
    </div>
  );
};

const EquipmentResults = ({ searchResults, setSelected, setDidSearch }) => {
  let equipmentList = searchResults.map((item, index) => {
    const setSelectedFunc = () => {
      setSelected(item);
    };
    return (
      <div onClick={setSelectedFunc} className="equipment-result-item">
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
      <div className="equipment-result-list">{equipmentList}</div>
    </div>
  );
};

const SelectedEquipment = ({ setSelected, selected }) => {
  const unselect = () => {
    setSelected(null);
  };
  return (
    <div className="selected-equipment-wrapper">
      <div className="selected-equipment-title">
        You have selected: {selected}
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

export default SearchEquipment;
