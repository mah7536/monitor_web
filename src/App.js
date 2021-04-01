/** @format */

import React from "react";
import "antd/dist/antd.css";
import ReactDOM from "react-dom";
import "./App.css";
import { GlobalContext } from "Path/Global";
import Leftmenu from "Path/page/Leftmenu";
import LoginPage from "Path/page/LoginPage";
import InfoPage from "Path/page/InfoPage";
import DashBoard from "Path/page/DashBoard";
import Wedding from "Path/page/Wedding";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { createBrowserHistory } from "history";
function App() {
  const Global = React.useContext(GlobalContext);
  const history = createBrowserHistory();
  let current_path = history.location.pathname;
  return (
    <Router>
      {/* {!Global.isLogin ? (
        current_path == "/login" ? (
          <></>
        ) : (
          <Redirect to="/login" />
        )
      ) : (
        <Redirect to="/users" />
      )}

      <Switch>
        {!Global.isLogin ? (
          <Route path="/login">
            <LoginPage />
          </Route>
        ) : (
          <>
            <Leftmenu />
            <Route path="/about">
              <DashBoard />
            </Route>
            <Route path="/users">
              <InfoPage />
            </Route>
          </>
        )}
      </Switch> */}

      {!Global.isLogin ? (
        current_path == "/login" ? (
          <></>
        ) : (
          <Redirect to="/" />
        )
      ) : (
        <Redirect to="/" />
      )}
      <Switch>
        {!Global.isLogin ? (
          <Route path="/">
            <Wedding />
          </Route>
        ) : (
          <>
            <Leftmenu />
            <Route path="/">
              <DashBoard />
            </Route>
            <Route path="/">
              <InfoPage />
            </Route>
          </>
        )}
      </Switch>
    </Router>
  );
}

export default App;
