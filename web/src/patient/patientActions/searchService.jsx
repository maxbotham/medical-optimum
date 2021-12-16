import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DatePicker from "react-datepicker";
import "./styles/searchService.css";
import baseURL from "../../BaseURL";
const SearchService = ({ patient }) => {
  const [type, setType] = useState(null);
  const [didSearch, setDidSearch] = useState(false);
  const [searchInput, setSearchInput] = useState({
    doctorName: "",
    medicineName: "",
    equipmentName: "",
  });
  const [searchResults, setSearchResults] = useState(null);
  const [selected, setSelected] = useState(null);
  const handleChange = (event) => {
    setSelected(null);
    setSearchResults(null);
    setType(event.target.value);
  };
  return (
    <div>
      <div className="choose-service-type-and-date">
        <div className="choose-add-service-type">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Type of Service
            </InputLabel>
            <Select
              size="medium"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={type}
              label="Type of Service"
              onChange={handleChange}
            >
              <MenuItem value={"Consultation"}>Consultation</MenuItem>
              <MenuItem value={"Procedure"}>Procedure</MenuItem>
              <MenuItem value={"Prescription"}>Prescription</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      {type === "Prescription" ||
      type === "Consultation" ||
      type === "Procedure" ? (
        <InputForm
          {...{ patient, type, setSearchInput, searchInput, setSearchResults }}
        />
      ) : (
        <></>
      )}
      {searchResults === null ? (
        <></>
      ) : selected === null ? (
        <SearchResults
          {...{ type, searchResults, setSelected, setSearchResults }}
        />
      ) : (
        <Selected {...{ type, setSelected, selected }} />
      )}
    </div>
  );
};

const InputForm = ({
  patient,
  type,
  setSearchInput,
  searchInput,
  setSearchResults,
}) => {
  const onChange = (props) => {
    if (type === "Consultation") {
      if (props.target.id === "doctor-full-name") {
        setSearchInput({ doctorName: props.target.value });
      }
    } else if (type === "Procedure") {
      if (props.target.id === "doctor-full-name") {
        setSearchInput({
          equipmentName: searchInput?.equipmentName ?? null,
          doctorName: props.target.value,
        });
      } else if (props.target.id === "equipment-name") {
        setSearchInput({
          doctorName: searchInput?.doctorName ?? null,
          equipmentName: props.target.value,
        });
      }
    } else if (type === "Prescription") {
      if (props.target.id === "doctor-full-name") {
        setSearchInput({
          medicineName: searchInput?.medicineName ?? null,
          doctorName: props.target.value,
        });
      } else if (props.target.id === "medicine-name") {
        setSearchInput({
          doctorName: searchInput?.doctorName ?? null,
          medicineName: props.target.value,
        });
      }
    }
  };
  const submitForm = () => {
    let queryParams = "";
    if (type === "Prescription") {
      queryParams = `${
        searchInput.doctorName === null || searchInput.doctorName === ""
          ? "null"
          : searchInput.doctorName
      };${
        searchInput.medicineName === null || searchInput.medicineName === ""
          ? "null"
          : searchInput.medicineName
      };${patient.PatientID}`;
    } else if (type === "Consultation") {
      queryParams = `${
        searchInput.doctorName === null || searchInput.doctorName === ""
          ? "null"
          : searchInput.doctorName
      };${patient.PatientID}`;
    } else {
      queryParams = `${
        searchInput.doctorName === null || searchInput.doctorName === ""
          ? "null"
          : searchInput.doctorName
      };${
        searchInput.equipmentName === null || searchInput.equipmentName === ""
          ? "null"
          : searchInput.equipmentName
      };${patient.PatientID}`;
    }
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Query-Params": queryParams,
      },
    };
    fetch(
      `${baseURL}/admin/patients/search${type.toLowerCase()}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => setSearchResults(data));
  };
  return (
    <div>
      <div className="doctor-search-form-title">Search Parameters</div>

      <div className="search-doctor-parameters">
        <div className="search-doctor-input">
          <TextField
            id="doctor-full-name"
            label="Doctor Name"
            variant="outlined"
            onChange={onChange}
          />
        </div>
        {type === "Procedure" ? (
          <div className="search-equipment-input">
            <TextField
              id="equipment-name"
              label="Equipment Name"
              variant="outlined"
              onChange={onChange}
            />
          </div>
        ) : type === "Prescription" ? (
          <div className="search-medicine-input">
            <TextField
              id="medicine-name"
              label="Medicine Name"
              variant="outlined"
              onChange={onChange}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="submit-doctor-search">
        <Button
          variant="contained"
          onClick={submitForm}
          className="sign-out-button"
        >
          Search For Service
        </Button>
      </div>
    </div>
  );
};

const SearchResults = ({
  type,
  searchResults,
  setSelected,
  setSearchResults,
}) => {
  let medicineList = searchResults.map((item, index) => {
    const setSelectedFunc = () => {
      setSelected(item);
    };
    return (
      <div onClick={setSelectedFunc} className="doctor-result-item">
        {type === "Procedure"
          ? "Item: " + item.EquipmentName
          : type === "Prescription"
          ? "Item: " + item.MedicineName
          : "Doctor: " + item.DoctorName}
        {type === "Procedure"
          ? ". Date: " + item.ProcedureDate
          : type === "Prescription"
          ? ". Date: " + item.PrescriptionDate
          : ". Date: " + item.ConsultationDate}
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
      <div className="doctor-result-list">{medicineList}</div>
    </div>
  );
};

const Selected = ({ type, setSelected, selected }) => {
  const unselect = () => {
    setSelected(null);
  };

  const [] = useState(false);
  return (
    <div className="selected-doctor-wrapper">
      <Button
        variant="contained"
        onClick={unselect}
        className="sign-out-button"
      >
        Unselect
      </Button>
      <div className="selected-service-values">
        {type === "Procedure" ? (
          <></>
        ) : (
          <div className="selected-service-value">
            {type === "Consultation"
              ? "Price: $" + selected.Price
              : "Quantity: " + selected.Quantity}
          </div>
        )}
        <div className="selected-service-value">
          Doctor: {selected.DoctorName}
        </div>
        <div className="selected-service-value">
          {type === "Procedure"
            ? "Date: " + selected.ProcedureDate
            : type === "Prescription"
            ? "Date: " + selected.PrescriptionDate
            : "Date: " + selected.ConsultationDate}{" "}
        </div>
        {type === "Procedure" ? (
          <div className="selected-service-value">
            Equipment: {selected.EquipmentName}
          </div>
        ) : type === "Prescription" ? (
          <div className="selected-service-value">
            Medicine: {selected.MedicineName}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default SearchService;
