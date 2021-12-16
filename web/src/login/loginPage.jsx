import { TextField, Button } from "@mui/material";
import Logo from "./logo";
import React, { useState } from "react";
import "./styles/loginPage.css";
import baseURL from "../BaseURL";

const LoginPage = ({ setIsValidated, setUser, setUserType }) => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [didFail, setDidFail] = useState(false);
  const onPasswordChange = (props) => {
    setPassword(props.target.value);
  };
  const onUsernameChange = (props) => {
    setUsername(props.target.value);
  };
  const validate = () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Query-Params": `${
          username === null || username === "" ? "null" : username
        };${password === null || password === "" ? "null" : password}`,
      },
    };
    fetch(`${baseURL}/login`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data === "Unsuccessful") {
          setDidFail(true);
        } else {
          setUser(username);
          setUserType(data);
          setIsValidated(true);
        }
      });
  };
  return (
    <>
      <Logo />
      <div className="login-details-wrapper">
        <div className="login-details">
          <div className="username-input-wrapper">
            <TextField
              className="username-input"
              id="standard-basic"
              label="Username"
              variant="standard"
              onChange={onUsernameChange}
            />
          </div>
          <div className="password-input-wrapper">
            <TextField
              className="password-input"
              id="standard-basic"
              type="password"
              label="Password"
              variant="standard"
              onChange={onPasswordChange}
            />
          </div>
          <Button
            variant="contained"
            onClick={validate}
            className="sign-in-button"
          >
            Sign-In
          </Button>
        </div>
      </div>
      {didFail ? (
        <div style={{ marginTop: ".7rem", fontSize: "1.2rem" }}>
          Please try again
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default LoginPage;
