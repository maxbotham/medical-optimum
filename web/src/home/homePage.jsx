import { TextField, Button } from "@mui/material";
import React, { useState } from "react";
import "./styles/homepage.css";
import HospitalPage from '../hospital/hospitalPage.jsx';
import PatientPage from '../patient/patientPage.jsx';

const HomePage = ({ setIsValidated, user, setUser }) => {
  const [hospitalSelected, setHospitalSelected] = useState(false);
  const [patientSelected, setPatientSelected] = useState(false);

  const unvalidate = () => {
    setUser(null);
    setIsValidated(false);
  };
  const selectPatient = () => {
    setPatientSelected(true);
  };
  const selectHospital = () => {
    setHospitalSelected(true);
  };
  if (hospitalSelected) {
    return <HospitalPage {...{ setHospitalSelected }} />;
  }

  if (patientSelected) {
    return <PatientPage {...{ setPatientSelected }} />;
  }
  return (
    <div className="home-page-wrapper">
      <div className="home-page-header">
        <div className="sign-out-button-wrapper">
          <Button
            variant="contained"
            onClick={unvalidate}
            className="sign-out-button"
          >
            Sign-Out
          </Button>
        </div>
        <div className="home-page-title">Medical Optimum</div>
      </div>
      <div className="home-page-content-wrapper">
        <div className="home-page-select-patient" onClick={selectPatient}>
          Patient
        </div>
        <div className="home-page-select-hospital" onClick={selectHospital}>
          Hospital
        </div>
      </div>
    </div>
  );
};

export default HomePage;
