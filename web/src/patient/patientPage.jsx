import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import RegisterForm from './registerForm.jsx'
import SearchForm from './searchForm.jsx'
import "./styles/patientPage.css";
const PatientPage = ({ setPatientSelected }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const registerPatient = () => {
    setIsRegistering(true);
    setIsSearching(false);
  };
  const searchPatient = () => {
    setIsRegistering(false);
    setIsSearching(true);
  };
  const unselect = () => {
    setPatientSelected(false);
  };
  return (
    <>
      <div className="patient-page-header">
        <div className="patient-go-back-button">
          <Button
            variant="contained"
            onClick={unselect}
            className="sign-out-button"
          >
            Go Back
          </Button>
        </div>
        <div className="patient-search-button">
          <Button
            variant="contained"
            onClick={searchPatient}
            className="sign-out-button"
          >
            Search Patients
          </Button>
        </div>
        <div className="patient-register-button">
          <Button
            variant="contained"
            onClick={registerPatient}
            className="sign-out-button"
          >
            Register Patient
          </Button>
        </div>
      </div>
      {isRegistering ? (
        <RegisterForm/>
      ) : (
        <></>
      )}
      {isSearching ? (
        <SearchForm/>
      ) : (
        <></>
      )}
    </>
  );
};
export default PatientPage;
