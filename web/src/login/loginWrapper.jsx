import React, { useState } from "react";
import LoginPage from "./loginPage";
import HomePage from "../home/homePage";
const LoginWrapper = () => {
  const [isValidated, setIsValidated] = useState(false);
  const [user, setUser] = useState(null);
  if (!isValidated) {
    return <LoginPage {...{ setIsValidated, setUser }} />;
  }
  return <HomePage {...{ setIsValidated, user, setUser }} />;
};

export default LoginWrapper;
