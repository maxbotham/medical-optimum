import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SearchDepartment from "../../../search/searchDepartment";
import "./styles/inventoryPage.css";

const InventoryPage = ({ patient }) => {
  const [type, setType] = useState(null);
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
              {...{ type, searchResults, setSelected, setSearchResults }}
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
    let bodyParams = {};
    if (type === "Equipment") {
      bodyParams = {
        Quantity: quantity,
        Price: price,
        EquipmentName: name,
      };
    } else {
      bodyParams = {
        Quantity: quantity,
        Price: price,
        MedicineName: name,
      };
    }
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyParams),
    };
    fetch(
      `http://127.0.0.1:5000/admin/hospital/${type.toLowerCase()}`,
      requestOptions
    ).then((response) => response.json());
  };
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
          quantity === null
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
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Query-Params": `${searchInput?.name ?? "null"};${
          searchInput?.id ?? "null"
        }`,
      },
    };
    fetch(
      `http://127.0.0.1:5000/admin/hospital/${type.toLowerCase()}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data);
      });
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
        {type === "Medicine" ? item.MedicineName : item.EquipmentName}
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
  let initialName = "";
  type === "Equipment"
    ? (initialName = selected.EquipmentName)
    : (initialName = selected.MedicineName);

  const [name, setName] = useState(initialName);
  //useState(selected.name);
  const [quantity, setQuantity] = useState(selected.Quantity);
  const [price, setPrice] = useState(selected.Price);
  const unselect = () => {
    setSelected(null);
  };
  const save = () => {
    let paramsBody = {};
    if (type === "Equipment") {
      paramsBody = {
        Quantity: quantity,
        Price: price,
        EquipmentName: name,
        EquipmentID: selected.EquipmentID,
      };
    } else {
      paramsBody = {
        Quantity: quantity,
        Price: price,
        MedicineName: name,
        MedicineID: selected.MedicineID,
      };
    }
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paramsBody),
    };
    fetch(
      `http://127.0.0.1:5000/admin/hospital/${type.toLowerCase()}`,
      requestOptions
    ).then((response) => response.json());
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
      <div className="selected-service-desc">
        You have selected:{" "}
        {type === "Equipment" ? selected.EquipmentName : selected.MedicineName}
      </div>
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
          quantity === null
        }
        className="sign-out-button search-service-save-service"
      >
        Save Changes
      </Button>
    </div>
  );
};

export default InventoryPage;
