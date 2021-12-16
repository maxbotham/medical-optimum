import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import AddService from "./patientActions/addService";
import ViewBill from "./patientActions/viewBill";
import EditPatient from "./patientActions/editPatient";
import SearchService from "./patientActions/searchService";
import AdmitPatient from "./patientActions/admitPatient.jsx";
import "./styles/selectedPatient.css";
import baseURL from "../BaseURL";
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
  let patient = searchResults[selectedPatient];

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
  const addVisit = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        VisitDate: new Date().toISOString().split("T")[0],
        PatientID: patient.PatientID,
      }),
    };
    fetch(`${baseURL}/admin/patients/addvisit`, requestOptions).then(
      (response) => response.json()
    );
  };
  const dischargePatient = () => {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        PatientStatus: "Discharged",
        DischargeDate: new Date().toISOString().split("T")[0],
        PatientID: patient.PatientID,
      }),
    };
    fetch(`${baseURL}/admin/patients/discharge`, requestOptions).then(
      (response) => response.json()
    );
  };
  const deceasePatient = () => {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        PatientStatus: "Deceased",
        DischargeDate: new Date().toISOString().split("T")[0],
        PatientID: patient.PatientID,
      }),
    };
    fetch(`${baseURL}/admin/patients/discharge`, requestOptions).then(
      (response) => response.json()
    );
  };

  const unselect = () => {
    setSelectedPatient(null);
  };
  return (
    <div>
      <div style={{ marginTop: ".5rem" }} className="unselect-patient-button">
        <Button
          variant="contained"
          onClick={unselect}
          className="sign-out-button"
        >
          Unselect Patient
        </Button>
      </div>
      <div className="patient-information">
        <div>Patient Selected: {patient.FullName}</div>
      </div>
      <div className="selected-patient-action-buttons">
        <Button
          variant="contained"
          onClick={setEditPatient}
          className="sign-out-button patient-action-button"
          style={{ marginTop: ".3rem" }}
        >
          Edit Patient
        </Button>
        <Button
          variant="contained"
          onClick={setViewBill}
          className="sign-out-button patient-action-button"
          style={{ marginTop: ".3rem" }}
        >
          View Bill
        </Button>
        <Button
          variant="contained"
          onClick={setSearchService}
          className="sign-out-button patient-action-button"
          style={{ marginTop: ".3rem" }}
        >
          Search Service
        </Button>
        <Button
          variant="contained"
          onClick={setAddService}
          className="sign-out-button patient-action-button"
          style={{ marginTop: ".3rem" }}
        >
          Add Service
        </Button>
        {patient.Inpatient === false ? (
          <>
            <Button
              variant="contained"
              onClick={setAdmitPatient}
              className="sign-out-button patient-action-button"
              style={{ marginTop: ".3rem" }}
            >
              Admit Patient
            </Button>
            <Button
              variant="contained"
              onClick={addVisit}
              className="sign-out-button patient-action-button"
              style={{ marginTop: ".3rem" }}
            >
              Add Visit
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="contained"
              onClick={dischargePatient}
              className="sign-out-button patient-action-button"
              style={{ marginTop: ".3rem" }}
            >
              Discharge Patient
            </Button>
            <Button
              variant="contained"
              onClick={deceasePatient}
              className="sign-out-button patient-action-button"
              style={{ marginTop: ".3rem" }}
            >
              Patient is Deceased
            </Button>
          </>
        )}
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
