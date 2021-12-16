import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import RangePicker from "react-range-picker";
import InputLabel from "@mui/material/InputLabel";
import SearchDepartment from "../../../search/searchDepartment";
import "../inventory/styles/inventoryPage.css";
import "./styles/wardPage.css";
import baseURL from "../../../BaseURL";
const InventoryPage = ({ patient }) => {
  const [searchResults, setSearchResults] = useState(null);
  const [selected, setSelected] = useState(null);
  const [type, setType] = useState(null);
  const [id, setID] = useState(null);
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
        <SelectedWard {...{ setSelected, selected }} />
      ) : searchResults === null ? (
        <></>
      ) : (
        <SearchResults {...{ searchResults, setSelected, setSearchResults }} />
      )}
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

const SelectedWard = ({ setSelected, selected }) => {
  const defaultValue = selected;
  const [bedSelected, setBedSelected] = useState(null);
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
  let beds = tempBeds.map((item, index) => {
    const setSelectedFunc = () => {
      setBedSelected(item);
    };
    return (
      <div onClick={setSelectedFunc} className="bed-result-item">
        Bed number {item.bedNumber}. Status: {item.status}. Price: {item.price}
      </div>
    );
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
  const [price, setPrice] = useState(bedSelected.price);
  const [isPatient, setIsPatient] = useState(bedSelected.status === "Occupied");
  const unselect = () => {
    setBedSelected(null);
  };
  const save = () => {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Price: price,
        BedNumber: bedSelected.bedNumber
      })
    };
    fetch(`${baseURL}/admin/hospital/bed`, requestOptions)
      .then((response) => response.json())
  };
  const changePrice = (props) => {
    setPrice(props.target.value);
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
      {bedSelected.status !== "Vacant" ? (
        <div className="bed-patient-wrapper">
          <div className="view-patient-in-bed">
            {isPatient ? "Patient ID: " + bedSelected.patient : "No patient"}
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className="change-price-input">
        <TextField
          id="price"
          label="Price"
          variant="outlined"
          defaultValue={price}
          onChange={changePrice}
        />
      </div>
      <div className="submit-ward-search">
        <Button
          variant="contained"
          onClick={save}
          className="sign-out-button"
          disabled={price === "" || price === null}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default InventoryPage;
