/** @format */

import React, { useContext, createContext } from "react";

import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

const GlobalContext = createContext();

// all of state for info page

const Global = (props) => {
  const [isLogin, setLogin] = React.useState(false);
  const [account, setAccount] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loginId, setLoginId] = React.useState("");

  // 作為message box
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("發生錯誤");
  const [type, setType] = React.useState("error");

  const handleClick = (type, info) => {
    if (type != "") {
      setType(type);
    }
    if (message != "") {
      setMessage(info);
    }
    if (!open) {
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 3000);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <GlobalContext.Provider
        value={{
          isLogin: isLogin,
          account: account,
          password: password,
          loginId: loginId,
          setAccount: (account) => {
            setAccount(account);
          },
          setPassword: (passwd) => {
            setPassword(passwd);
          },
          setLogin: () => {
            setLogin(true);
          },
          setLoginId: (loginId) => {
            setLoginId(loginId);
          },
          setLogout: () => {
            setAccount("");
            setPassword("");
            setLoginId("");
            setLogin(false);
          },
          message: (type, message) => {
            handleClick(type, message);
          },
        }}
      >
        {props.children}
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          open={open}
          autoHideDuration={3000}
        >
          <Alert onClose={handleClose} severity={type}>
            {message}
          </Alert>
        </Snackbar>
      </GlobalContext.Provider>
    </>
  );
};

export { GlobalContext, Global };
