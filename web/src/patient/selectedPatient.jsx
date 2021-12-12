import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import AddService from "./patientActions/addService";
import ViewBill from "./patientActions/viewBill";
import EditPatient from "./patientActions/editPatient";
import SearchService from "./patientActions/searchService";
import AdmitPatient from "./patientActions/admitPatient.jsx";
import "./styles/selectedPatient.css";
const SelectedPatient = ({
  setSelectedPatient,
  searchResults,
  selectedPatient,
}) => {
  const [isAddService, setIsAddService] = useState(false);
  const [isSearchService, setIsSearchService] = useState(false);
  const [isEditPatient, setIsEditPatient] = useState(false);
  const [isViewBill, setIsViewBill] = useState(false);
  const [isAdmitPatient, setIsAdmitPatient] = useState(false);
  const setAddService = () => {
    setIsSearchService(false);
    setIsEditPatient(false);
    setIsViewBill(false);
    setIsAddService(true);
    setIsAdmitPatient(false);
  };
  const setViewBill = () => {
    setIsSearchService(false);
    setIsEditPatient(false);
    setIsViewBill(true);
    setIsAddService(false);
    setIsAdmitPatient(false);
  };
  const setSearchService = () => {
    setIsSearchService(true);
    setIsEditPatient(false);
    setIsViewBill(false);
    setIsAddService(false);
    setIsAdmitPatient(false);
  };
  const setEditPatient = () => {
    setIsSearchService(false);
    setIsEditPatient(true);
    setIsViewBill(false);
    setIsAddService(false);
    setIsAdmitPatient(false);
  };
  const setAdmitPatient = () => {
    setIsSearchService(false);
    setIsEditPatient(false);
    setIsViewBill(false);
    setIsAddService(false);
    setIsAdmitPatient(true);
  };
  let patient = searchResults[selectedPatient];
  const unselect = () => {
    setSelectedPatient(null);
  };
  return (
    <div>
      <div className="unselect-patient-button">
        <Button
          variant="contained"
          onClick={unselect}
          className="sign-out-button"
        >
          Unselect Patient
        </Button>
      </div>
      <div className="patient-information">
        <div>Patient Selected: {patient}</div>
      </div>
      <div className="selected-patient-action-buttons">
        <Button
          variant="contained"
          onClick={setEditPatient}
          className="sign-out-button patient-action-button"
        >
          Edit Patient
        </Button>
        <Button
          variant="contained"
          onClick={setViewBill}
          className="sign-out-button patient-action-button"
        >
          View Bill
        </Button>
        <Button
          variant="contained"
          onClick={setSearchService}
          className="sign-out-button patient-action-button"
        >
          Search Service
        </Button>
        <Button
          variant="contained"
          onClick={setAddService}
          className="sign-out-button patient-action-button"
        >
          Add Service
        </Button>
        <Button
          variant="contained"
          onClick={setAdmitPatient}
          className="sign-out-button patient-action-button"
        >
          Admit Patient
        </Button>
      </div>
      {isViewBill ? (
        <ViewBill {...{ patient }} />
      ) : isSearchService ? (
        <SearchService {...{ patient }} />
      ) : isEditPatient ? (
        <EditPatient {...{ patient }} />
      ) : isAddService ? (
        <AddService {...{ patient }} />
      ) : isAdmitPatient ? (
        <AdmitPatient {...{ patient }} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default SelectedPatient;
