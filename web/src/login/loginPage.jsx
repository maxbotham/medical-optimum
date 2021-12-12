import { TextField, Button } from "@mui/material";
import Logo from "./logo";
import React, { useState } from "react";
import "./styles/loginPage.css";
const LoginPage = ({ setIsValidated, setUser }) => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const onPasswordChange = (props) => {
    setPassword(props.target.value);
  };
  const onUsernameChange = (props) => {
    setUsername(props.target.value);
  };
  const validate = () => {
    if (username === "Max" && password === "temp") {
      setUser(username);
      setIsValidated(true);
    }
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
    </>
  );
};

export default LoginPage;
