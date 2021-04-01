/** @format */
import React from "react";
import logo from "Path/logo.svg";
import "Path/App.css";
import { GlobalContext } from "Path/Global";
import { Input, Button } from "@material-ui/core";
import { Login } from "Path/api/api";


const DashBoard = () => {
  const Global = React.useContext(GlobalContext);
  const setAccount = (event) => {
    Global.setAccount(event.target.value);
  };

  const setPassword = (event) => {
    Global.setPassword(event.target.value);
  };

  const userLogin = () => {
    if (Global.account == "" || Global.password == "") {
      Global.message("error", "帳號密碼填一下");
      return;
    }
    Login({
      account: Global.account,
      password: Global.password,
    }).then((res) => {
      if (res.code != 0) {
        Global.message("error", res.message);
        return;
      }
      Global.setLoginId(res.loginId);
      Global.message("info", res.message);
      Global.setLogin(!Global.isLogin);
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        ></a>

        <br></br>
      </header>
    </div>
  );
};

export default DashBoard;
