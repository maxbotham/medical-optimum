import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import DatePicker from "react-datepicker";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SearchDepartment from "../../../search/searchDepartment";
import "../inventory/styles/inventoryPage.css";
import "./styles/employeePage.css";
const EmployeePage = ({ patient }) => {
  const [type, setType] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [selected, setSelected] = useState(null);
  const [addOrEdit, setAddOrEdit] = useState(null);
  const handleChange = (event) => {
    setSelected(null);
    setSearchResults(null);
    setType(event.target.value);
  };
  const handleAddEditChange = (event) => {
    setSelected(null);
    setSearchResults(null);
    setAddOrEdit(event.target.value);
  };
  return (
    <div>
      <div style={{ marginTop: "1rem", marginBottom: "-1rem" }}>
        Employee Page
      </div>
      <div className="choose-service-type-and-date">
        <div className="choose-add-service-type add-or-edit">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Add or Edit</InputLabel>
            <Select
              size="medium"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={addOrEdit}
              label="Add or Edit"
              onChange={handleAddEditChange}
            >
              <MenuItem value={"Add"}>Add</MenuItem>
              <MenuItem value={"Edit"}>Edit</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="choose-add-service-type">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Type of Employee
            </InputLabel>
            <Select
              size="medium"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={type}
              label="Type of Inventory"
              onChange={handleChange}
            >
              <MenuItem value={"Doctor"}>Doctor</MenuItem>
              <MenuItem value={"Receptionist"}>Receptionist</MenuItem>
              <MenuItem value={"Admin"}>Admin</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      {type !== null && addOrEdit === "Edit" ? (
        <>
          <InputForm {...{ type, setSearchResults }} />
          {searchResults === null ? (
            <></>
          ) : selected === null ? (
            <SearchResults
              {...{ searchResults, setSelected, setSearchResults }}
            />
          ) : (
            <Selected {...{ setSelected, selected, type }} />
          )}
        </>
      ) : type !== null && addOrEdit === "Add" ? (
        <AddEmployee {...{ type }} />
      ) : (
        <></>
      )}
    </div>
  );
};

const AddEmployee = ({ type }) => {
  const [department, setDepartment] = useState(null);
  const [name, setName] = useState(null);
  const [salary, setSalary] = useState(null);
  const [specialty, setSpecialty] = useState(null);
  const [dob, setDob] = useState(null);
  const [password, setPassword] = useState(null);
  const [username, setUsername] = useState(null);
  const changeName = (props) => {
    setName(props.target.value);
  };
  const changeSalary = (props) => {
    setSalary(props.target.value);
  };
  const changeSpecialty = (props) => {
    setSpecialty(props.target.value);
  };
  const changePassword = (props) => {
    setPassword(props.target.value);
  };
  const changeUsername = (props) => {
    setUsername(props.target.value);
  };
  const add = () => {
    //add this medicine/equipment to api
  };
  const defaultValue = null;
  return (
    <>
      <div className="add-values-title">{type} Information</div>
      <div className="edit-selected-values">
        <TextField
          id="name"
          className="inventory-edit-input"
          label="Full Name"
          variant="outlined"
          onChange={changeName}
        />
        <TextField
          id="salary"
          label="Salary"
          className="inventory-edit-input"
          variant="outlined"
          onChange={changeSalary}
        />
        <div className="add-employee-dob">
          <div className="add-employee-dob-title">Birthday</div>
          <DatePicker selected={dob} onChange={(date) => setDob(date)} />
        </div>
        {type === "Doctor" ? (
          <TextField
            id="specialty"
            className="inventory-edit-input"
            label="Specialty"
            variant="outlined"
            onChange={changeSpecialty}
          />
        ) : (
          <></>
        )}
        {type === "Receptionist" || type === "Admin" ? (
          <>
            <TextField
              id="dbUsername"
              className="inventory-edit-input"
              label="DB Access Username"
              variant="outlined"
              onChange={changeUsername}
            />
            <TextField
              id="dbPassword"
              className="inventory-edit-input"
              label="DB Access Password"
              variant="outlined"
              type="password"
              onChange={changePassword}
            />
          </>
        ) : (
          <></>
        )}
      </div>
      {type === "Doctor" ? (
        <SearchDepartment {...{ setDepartment, defaultValue }} />
      ) : (
        <></>
      )}
      <div className=""></div>
      <Button
        variant="contained"
        onClick={add}
        disabled={
          dob === "" ||
          salary === "" ||
          name === "" ||
          name === null ||
          salary === null ||
          dob === null ||
          ((specialty === null || specialty === "") && type === "Doctor") ||
          (department === null && type === "Doctor")
        }
        className="sign-out-button search-service-save-service"
      >
        Add {type}
      </Button>
    </>
  );
};

const InputForm = ({ type, setSearchResults }) => {
  const [name, setName] = useState(null);
  const [id, setID] = useState(null);
  const [dayOfBirth, setDayOfBirth] = useState(null);
  const [monthOfBirth, setMonthOfBirth] = useState(null);
  const [yearOfBirth, setYearOfBirth] = useState(null);
  const [specialty, setSpecialty] = useState(null);

  const onChange = (props) => {
    if (props.target.id === "name") {
      setName(props.target.value);
    } else if (props.target.id === "id") {
      setID(props.target.value);
    } else if (props.target.id === "dayOfBirth") {
      setDayOfBirth(props.target.value);
    } else if (props.target.id === "monthOfBirth") {
      setMonthOfBirth(props.target.value);
    } else if (props.target.id === "yearOfBirth") {
      setYearOfBirth(props.target.value);
    } else if (props.target.id === "specialty") {
      setSpecialty(props.target.value);
    }
  };
  const submitForm = () => {
    //connect to API here
    setSearchResults(["Test", "test", "test", "test2", "test5"]);
  };
  return (
    <div>
      <div className="doctor-search-form-title">{type} Information</div>

      <div className="search-doctor-parameters">
        <div className="search-doctor-input">
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            onChange={onChange}
          />
        </div>
        <div className="search-doctor-input">
          <TextField
            id="dayOfBirth"
            label="Day of Birth"
            variant="outlined"
            onChange={onChange}
          />
        </div>
        <div className="search-doctor-input">
          <TextField
            id="monthOfBirth"
            label="Month of Birth"
            variant="outlined"
            onChange={onChange}
          />
        </div>
        <div className="search-doctor-input">
          <TextField
            id="yearOfBirth"
            label="Year of Birth"
            variant="outlined"
            onChange={onChange}
          />
        </div>
        <div className="search-doctor-input">
          <TextField
            id="id"
            label="ID"
            variant="outlined"
            onChange={onChange}
          />
        </div>
        {type === "Doctor" ? (
          <div className="search-doctor-input">
            <TextField
              id="specialty"
              label="Specialty"
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
          Search For {type}
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

const Selected = ({ setSelected, selected, type }) => {
  const [name, setName] = useState("Temp");
  //useState(selected.name);
  const [salary, setSalary] = useState("30,000");
  const [username, setUsername] = useState("maxTemp");
  const [password, setPassword] = useState("asdfasdf");
  const [specialty, setSpecialty] = useState("Temp");
  const [department, setDepartment] = useState("Temporary");
  const defaultValue = selected;
  const unselect = () => {
    setSelected(null);
  };
  const save = () => {
    //connect to API and save state
  };

  const changeSpecialty = (props) => {
    setSpecialty(props.target.value);
  };
  const changeUsername = (props) => {
    setUsername(props.target.value);
  };
  const changePassword = (props) => {
    setPassword(props.target.value);
  };
  const changeSalary = (props) => {
    setSalary(props.target.value);
  };
  const changeName = (props) => {
    setName(props.target.value);
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
      <div className="edit-selected-values">
        <TextField
          id="name"
          className="inventory-edit-input"
          label="Name"
          variant="outlined"
          defaultValue={name}
          onChange={changeName}
        />
        <TextField
          id="salary"
          className="inventory-edit-input"
          label="Salary"
          variant="outlined"
          defaultValue={salary}
          onChange={changeSalary}
        />
        {type === "Admin" || type === "Receptionist" ? (
          <>
            <TextField
              id="username"
              className="inventory-edit-input"
              label="DB Access Username"
              variant="outlined"
              defaultValue={username}
              onChange={changeUsername}
            />
            <TextField
              id="password"
              className="inventory-edit-input"
              label="DB Access Password"
              type="password"
              variant="outlined"
              defaultValue={password}
              onChange={changePassword}
            />
          </>
        ) : type === "Doctor" ? (
          <TextField
            id="specialty"
            className="inventory-edit-input"
            label="Specialty"
            variant="outlined"
            defaultValue={specialty}
            onChange={changeSpecialty}
          />
        ) : (
          <></>
        )}
      </div>
      {type === "Doctor" ? (
        <SearchDepartment {...{ setDepartment, defaultValue }} />
      ) : (
        <></>
      )}
      <div className=""></div>
      <Button
        variant="contained"
        onClick={save}
        disabled={
          salary === "" ||
          name === "" ||
          name === null ||
          salary === null ||
          ((type === "Admin" || type === "Receptionist") &&
            (username === null || username === "")) ||
          ((type === "Admin" || type === "Receptionist") &&
            (password === null || password === "")) ||
          (type === "Doctor" && (specialty === null || specialty === "")) ||
          (department === null && type === "Doctor")
        }
        className="sign-out-button search-service-save-service"
      >
        Save Changes
      </Button>
    </div>
  );
};

export default EmployeePage;
