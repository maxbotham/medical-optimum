import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import "./styles/searchFormResults.css";
const SearchFormResults = ({
  searchResults,
  setIsResults,
  setSearchResults,
  setSelectedPatient,
}) => {
  let patientsList = searchResults.map((item, index) => {
    const setSelectedPatientFunc = () => {
      setSelectedPatient(index);
    };
    return (
      <div onClick={setSelectedPatientFunc} className="patient-result-item">
        {item.FullName}
      </div>
    );
  });
  const clearResults = () => {
    setSearchResults([]);
    setIsResults(false);
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
      <div className="patient-result-list">{patientsList}</div>
    </div>
  );
};

export default SearchFormResults;
