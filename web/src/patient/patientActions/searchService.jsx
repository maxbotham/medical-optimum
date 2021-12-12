import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import RangePicker from "react-range-picker";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DatePicker from "react-datepicker";
import "./styles/searchService.css";
const SearchService = ({ patient }) => {
  const [type, setType] = useState(null);
  const [didSearch, setDidSearch] = useState(false);
  const [searchInput, setSearchInput] = useState(null);
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
        <div className="add-service-date-range">
          {/*todo connect this to state and also figure out how to change year?*/}
          <RangePicker />
        </div>
      </div>
      {type === "Prescription" ||
      type === "Consultation" ||
      type === "Procedure" ? (
        <InputForm
          {...{ type, setSearchInput, searchInput, setSearchResults }}
        />
      ) : (
        <></>
      )}
      {searchResults === null ? (
        <></>
      ) : selected === null ? (
        <SearchResults {...{ searchResults, setSelected, setSearchResults }} />
      ) : (
        <Selected {...{ setSelected, selected }} />
      )}
    </div>
  );
};

const InputForm = ({ type, setSearchInput, searchInput, setSearchResults }) => {
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
    setSearchResults(["Test", "test", "test", "test2", "test5"]);
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

const SearchResults = ({ searchResults, setSelected, setSearchResults }) => {
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

const Selected = ({ setSelected, selected }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  //useState(selected.selectedDate);

  const unselect = () => {
    setSelected(null);
  };
  const save = () => {
    //connect to API and save state
  };
  const remove = () => {
    //delete record from API
  };

  const [] = useState(false);
  return (
    <div className="selected-doctor-wrapper">
      <div className="selected-service-desc">You have selected: {selected}</div>
      <Button
        variant="contained"
        onClick={unselect}
        className="sign-out-button"
      >
        Unselect
      </Button>
      <div className="selected-service-edit-date">Edit Date</div>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
      />
      <Button
        variant="contained"
        onClick={save}
        className="sign-out-button search-service-save-service"
      >
        Save Changes
      </Button>
      <Button
        variant="contained"
        onClick={remove}
        className="sign-out-button search-service-delete-service"
      >
        Delete Service
      </Button>
    </div>
  );
};

export default SearchService;
