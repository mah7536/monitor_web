/** @format */

import React from "react";

import "./App.css";
import { GlobalContext } from "Path/Global";
import Leftmenu from "Path/page/Leftmenu";
import LoginPage from "Path/page/LoginPage";
import InfoPage from "Path/page/InfoPage";

function App() {
  const Global = React.useContext(GlobalContext);
  return (
    <>
      {Global.isLogin ? (
        <>
          <Leftmenu />
          <InfoPage />
        </>
      ) : (
        <LoginPage />
      )}
    </>
  );
}

export default App;
