import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import "./styles/admitPatient.css";
import DatePicker from "react-datepicker";
const InventoryPage = ({ patient }) => {
  const [searchResults, setSearchResults] = useState(null);
  const [selected, setSelected] = useState(null);
  const [type, setType] = useState(null);
  const [id, setID] = useState(null);
  const [discharge, setDischarge] = useState(null);
  const [status, setStatus] = useState(null);
  const [bedSelected, setBedSelected] = useState(null);
  const changeType = (props) => {
    setType(props.target.value);
  };
  const changeID = (props) => {
    setID(props.target.value);
  };
  const changeStatus = (props) => {
    if (props.target.value === "") {
      setStatus(null);
    } else {
      setStatus(props.target.value);
    }
  };
  const submitForm = () => {
    setSearchResults([
      "Ward One",
      "Ward Two",
      "Ward Temp",
      "Test Ward",
      "Temp Ward",
    ]);
  };
  const submitAdmitPatient = () => {
    //connect to api and admit patient
  };
  return (
    <div>
      <div style={{ marginTop: "1rem", marginBottom: ".5rem" }}>
        Discharge Date
      </div>
      <DatePicker
        selected={discharge}
        onChange={(date) => setDischarge(date)}
      />
      <div
        style={{ marginTop: "1rem", marginBottom: "1rem" }}
        className="search-ward-input"
      >
        <TextField
          id="status"
          label="Status"
          variant="outlined"
          onChange={changeStatus}
        />
      </div>

      <div style={{ marginTop: "1rem" }}>Ward Information</div>
      <div className="search-ward-parameters">
        <div className="search-ward-input">
          <TextField
            id="type"
            label="Type"
            variant="outlined"
            onChange={changeType}
          />
        </div>
        <div className="search-ward-input">
          <TextField
            id="id"
            label="ID"
            variant="outlined"
            onChange={changeID}
          />
        </div>
      </div>
      <div className="submit-ward-search">
        <Button
          variant="contained"
          onClick={submitForm}
          className="sign-out-button"
        >
          Search for Ward
        </Button>
      </div>
      {selected !== null ? (
        <SelectedWard
          {...{ bedSelected, setBedSelected, setSelected, selected }}
        />
      ) : searchResults === null ? (
        <></>
      ) : (
        <SearchResults {...{ searchResults, setSelected, setSearchResults }} />
      )}
      <div
        style={{ marginTop: "1rem", marginBottom: "1rem" }}
        className="submit-admit-patient"
      >
        <Button
          variant="contained"
          onClick={submitAdmitPatient}
          className="sign-out-button"
          disabled={
            bedSelected === null || status === null || discharge === null
          }
        >
          Admit Patient
        </Button>
      </div>
    </div>
  );
};

const SearchResults = ({ searchResults, setSelected, setSearchResults }) => {
  let wardList = searchResults.map((item, index) => {
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
    setSearchResults(null);
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
      <div className="doctor-result-list ward-result-list">{wardList}</div>
    </div>
  );
};

const SelectedWard = ({
  bedSelected,
  setBedSelected,
  setSelected,
  selected,
}) => {
  const defaultValue = selected;
  const unselect = () => {
    setSelected(null);
  };
  const tempBeds = [
    { bedNumber: "0", status: "Vacant", price: "49", patient: "Madeup Name" },
    {
      bedNumber: "1",
      status: "Occupied",
      price: "39",
      patient: "Mango Habanero",
    },
    {
      bedNumber: "2",
      status: "Occupied",
      price: "39",
      patient: "Chocolate Cream",
    },
    { bedNumber: "4", status: "Vacant", price: "99", patient: "Cinnamon Bun" },
    {
      bedNumber: "5",
      status: "Occupied",
      price: "79",
      patient: "Chocolate Mousse",
    },
  ];
  //const beds = selected.beds.map(...)
  let beds = tempBeds.map((item, index) => {
    const setSelectedFunc = () => {
      setBedSelected(item);
    };
    if (item.status === "Vacant") {
      return (
        <div onClick={setSelectedFunc} className="bed-result-item">
          Bed number {item.bedNumber}. Status: {item.status}. Price:{" "}
          {item.price}
        </div>
      );
    } else {
      return <></>;
    }
  });
  return (
    <div className="selected-ward-bed-list">
      <div className="unselect-ward-button">
        <Button
          variant="contained"
          onClick={unselect}
          className="sign-out-button"
        >
          Unselect Ward
        </Button>
      </div>

      {bedSelected === null ? (
        <>
          <div className="selected-ward-bed-list-title">
            List of Beds in {selected}
          </div>
          <div className="bed-list">{beds}</div>
        </>
      ) : (
        <SelectedBed {...{ bedSelected, setBedSelected }} />
      )}
    </div>
  );
};

const SelectedBed = ({ bedSelected, setBedSelected }) => {
  const unselect = () => {
    setBedSelected(null);
  };
  return (
    <div className="selected-bed-info">
      <div className="selected-bed-number">
        You have selected: Bed number {bedSelected.bedNumber}
      </div>
      <div className="unselect-bed-button">
        <Button
          variant="contained"
          onClick={unselect}
          className="sign-out-button"
        >
          Unselect Bed
        </Button>
      </div>
    </div>
  );
};

export default InventoryPage;
