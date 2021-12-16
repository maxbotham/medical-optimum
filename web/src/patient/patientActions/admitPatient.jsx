import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import "./styles/admitPatient.css";
import DatePicker from "react-datepicker";
import baseURL from "../../BaseURL";
const InventoryPage = ({ patient }) => {
  const [searchResults, setSearchResults] = useState(null);
  const [selected, setSelected] = useState(null);
  const [type, setType] = useState(null);
  const [id, setID] = useState(null);
  const [bedSelected, setBedSelected] = useState(null);
  const changeType = (props) => {
    if (props.target.value === "") {
      setType(null);
    } else {
      setType(props.target.value);
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
        "Query-Params": `${id === null ? "null" : id};${
          type === null ? "null" : type
        }`,
      },
    };
    fetch(`${baseURL}/admin/hospital/ward`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data);
      });
  };
  const submitAdmitPatient = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        PatientID: patient.PatientID,
        BedNumber: bedSelected.bedNumber,
        BedTotal: bedSelected.price,
        BillDate: new Date().toISOString().split("T")[0],
      }),
    };
    fetch(`${baseURL}/admin/patients/admit`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data);
      });
  };
  return (
    <div>
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
          disabled={bedSelected === null}
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
        {item.WardType}
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
  const tempBeds = selected.Beds.map((item, index) => {
    return {
      bedNumber: item.BedNumber,
      status: item.PatientID === null ? "Empty" : "Occupied",
      price: item.Price,
      patient: item.PatientID,
    };
  });
  //const beds = selected.beds.map(...)
  let beds = tempBeds.map((item, index) => {
    const setSelectedFunc = () => {
      setBedSelected(item);
    };
    if (item.status === "Empty") {
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
            List of Beds in {selected.WardType}
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
