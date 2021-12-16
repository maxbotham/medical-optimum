import React, { useState } from "react";
import LoginPage from "./loginPage";
import HomePage from "../home/homePage";
const LoginWrapper = () => {
  const [isValidated, setIsValidated] = useState(false);
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);

  if (!isValidated) {
    return <LoginPage {...{ setIsValidated, setUser, setUserType }} />;
  }
  return <HomePage {...{ setIsValidated, user, setUser, userType }} />;
};

export default LoginWrapper;
