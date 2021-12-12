import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import RangePicker from "react-range-picker";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SearchDepartment from "../../../search/searchDepartment";
import "./styles/inventoryPage.css";

const InventoryPage = ({ patient }) => {
  const [type, setType] = useState(null);
  const [didSearch, setDidSearch] = useState(false);
  const [searchInput, setSearchInput] = useState(null);
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
        Inventory Page
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
              Type of Inventory
            </InputLabel>
            <Select
              size="medium"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={type}
              label="Type of Inventory"
              onChange={handleChange}
            >
              <MenuItem value={"Medicine"}>Medicine</MenuItem>
              <MenuItem value={"Equipment"}>Equipment</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      {(type === "Medicine" || type === "Equipment") && addOrEdit === "Edit" ? (
        <>
          <InputForm
            {...{ type, setSearchInput, searchInput, setSearchResults }}
          />
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
      ) : (type === "Medicine" || type === "Equipment") &&
        addOrEdit === "Add" ? (
        <AddInventory {...{ type }} />
      ) : (
        <></>
      )}
    </div>
  );
};

const AddInventory = ({ type }) => {
  const [department, setDepartment] = useState(null);
  const [name, setName] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [price, setPrice] = useState(null);
  const changeName = (props) => {
    setName(props.target.value);
  };
  const changeQuantity = (props) => {
    setQuantity(props.target.value);
  };
  const changePrice = (props) => {
    setPrice(props.target.value);
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
          label="Name"
          variant="outlined"
          onChange={changeName}
        />
        <TextField
          id="quantity"
          className="inventory-edit-input"
          label="Quantity"
          variant="outlined"
          onChange={changeQuantity}
        />
        <TextField
          id="price"
          className="inventory-edit-input"
          label="Price"
          variant="outlined"
          onChange={changePrice}
        />
      </div>
      {type === "Equipment" ? (
        <SearchDepartment {...{ setDepartment, defaultValue }} />
      ) : (
        <></>
      )}
      <div className=""></div>
      <Button
        variant="contained"
        onClick={add}
        disabled={
          quantity === "" ||
          price === "" ||
          name === "" ||
          name === null ||
          price === null ||
          quantity === null ||
          (department === null && type === "Equipment")
        }
        className="sign-out-button search-service-save-service"
      >
        Add {type}
      </Button>
    </>
  );
};

const InputForm = ({ type, setSearchInput, searchInput, setSearchResults }) => {
  const onChange = (props) => {
    if (props.target.id === "name") {
      setSearchInput({ name: props.target.value, id: searchInput?.id ?? null });
    } else if (props.target.id === "id") {
      setSearchInput({
        name: searchInput?.name ?? null,
        id: props.target.value,
      });
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
            id="id"
            label="ID"
            variant="outlined"
            onChange={onChange}
          />
        </div>
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
  const [quantity, setQuantity] = useState("3");
  const [price, setPrice] = useState("39.99");
  const [department, setDepartment] = useState("Temporary");
  const defaultValue = selected;
  const unselect = () => {
    setSelected(null);
  };
  const save = () => {
    //connect to API and save state
  };

  const changePrice = (props) => {
    setPrice(props.target.value);
  };
  const changeQuantity = (props) => {
    setQuantity(props.target.value);
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
          id="quantity"
          className="inventory-edit-input"
          label="Quantity"
          variant="outlined"
          defaultValue={quantity}
          onChange={changeQuantity}
        />
        <TextField
          id="price"
          className="inventory-edit-input"
          label="Price"
          variant="outlined"
          defaultValue={price}
          onChange={changePrice}
        />
      </div>
      {type === "Equipment" ? (
        <SearchDepartment {...{ setDepartment, defaultValue }} />
      ) : (
        <></>
      )}
      <div className=""></div>
      <Button
        variant="contained"
        onClick={save}
        disabled={
          quantity === "" ||
          price === "" ||
          name === "" ||
          name === null ||
          price === null ||
          quantity === null ||
          (department === null && type === "Equipment")
        }
        className="sign-out-button search-service-save-service"
      >
        Save Changes
      </Button>
    </div>
  );
};

export default InventoryPage;
