/** @format */
import React from "react";
import logo from "Path/logo.svg";
import "Path/App.css";
import { GlobalContext } from "Path/Global";
import { w3cwebsocket as websocket } from "websocket";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  Card,
  CardContent,
  Badge,
} from "@material-ui/core";
import { Global } from "../Global";
import { Test } from "Path/component/test";

// panel style
const usePanelStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

// card in panel style
const useCardStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  root_danger: {
    minWidth: 275,
    "background-color": "red",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

// moment format
const momentFormat = "HH:mm:ss";

// all of state for info page
const reducer = (state, action) => {
  switch (action.type) {
    case "WebData":
      var error = false;
      for (var key in action.webData) {
        if (!action.webData[key].status) {
          error = !error;
        }
      }
      return {
        ...state,
        webError: error,
        webData: action.webData,
        webUpdateTime: moment().format(momentFormat),
      };
    case "RsData":
      var error = false;
      for (var key in action.rsData) {
        if (!action.rsData[key].status) {
          error = !error;
        }
      }
      return {
        ...state,
        rsError: error,
        rsData: action.rsData,
        rsUpdateTime: moment().format(momentFormat),
      };
    case "DbData":
      var error = false;
      for (var key in action.dbData) {
        if (!action.dbData[key].status) {
          error = !error;
        }
      }
      return {
        ...state,
        dbError: error,
        dbData: action.dbData,
        dbUpdateTime: moment().format(momentFormat),
      };
  }
};

const InfoPage = () => {
  const [ws, setWs] = React.useState(null);
  const Global = React.useContext(GlobalContext);
  const [state, setState] = React.useReducer(reducer, {
    webError: false,
    webData: null,
    webUpdateTime: moment().format(momentFormat),
    rsError: false,
    rsData: null,
    rsUpdateTime: moment().format(momentFormat),
    dbError: false,
    dbData: null,
    dbUpdateTime: moment().format(momentFormat),
  });
  const panelClasses = usePanelStyles();
  const cardClasses = useCardStyles();

  const connectWebSocket = () => {
    var url = process.env.Websocket_Host + "/monitor/" + Global.loginId;
    setWs(new websocket(url));
  };

  const GetWebInfo = () => {
    var info = [];
    for (var key in state.webData) {
      info.push(
        <Card
          className={
            state.webData[key].status == 200
              ? cardClasses.root
              : cardClasses.root_danger
          }
          variant="outlined"
          key={key}
        >
          <CardContent>
            <Typography
              className={cardClasses.title}
              color="textSecondary"
              gutterBottom
              component={"div"}
            >
              {state.webData[key].webname}
            </Typography>
            <Typography component={"div"}>
              網址: {state.webData[key].domain}
            </Typography>
            <Typography
              className={cardClasses.pos}
              color="textSecondary"
              component={"div"}
            >
              回應時間: {state.webData[key].responsetime} ms
            </Typography>
            <Typography variant="body2" component={"div"}>
              Http Code: {state.webData[key].status}
            </Typography>
          </CardContent>
        </Card>
      );
    }
    return info;
  };

  const GetRsInfo = () => {
    var info = [];
    for (var key in state.rsData) {
      info.push(
        <Card
          className={
            state.rsData[key].status == 1
              ? cardClasses.root
              : cardClasses.root_danger
          }
          variant="outlined"
          key={key}
        >
          <CardContent>
            <Test
              Click={() => {
                console.log("我是帥哥");
              }}
            />
            <Typography
              className={cardClasses.title}
              color="textSecondary"
              gutterBottom
              component={"div"}
            >
              {state.rsData[key].redisname}
            </Typography>
            <Typography component={"div"}>
              位置: {state.rsData[key].ip}:{state.rsData[key].port}
            </Typography>
            <Typography
              className={cardClasses.pos}
              color="textSecondary"
              component={"div"}
            >
              回應時間: {state.rsData[key].responsetime} ms
            </Typography>
            <Typography variant="body2" component={"div"}>
              狀態: {state.rsData[key].status == 1 ? "正常" : "不正常"}
            </Typography>
          </CardContent>
        </Card>
      );
    }
    return info;
  };

  const GetDbInfo = () => {
    var info = [];
    for (var key in state.dbData) {
      info.push(
        <Card
          className={
            state.dbData[key].status
              ? cardClasses.root
              : cardClasses.root_danger
          }
          variant="outlined"
          key={key}
        >
          <CardContent>
            <Typography
              className={cardClasses.title}
              color="textSecondary"
              gutterBottom
              component={"div"}
            >
              {state.dbData[key].name}
            </Typography>
            <Typography component={"div"}>
              群組: {state.dbData[key].group}
            </Typography>
            <Typography component={"div"}>
              角色: {state.dbData[key].rule}
            </Typography>
            <Typography component={"div"}>
              位置: {state.dbData[key].ip}:{state.dbData[key].port}
            </Typography>

            {state.dbData[key].status ? (
              <>
                <Typography
                  className={cardClasses.pos}
                  color="textSecondary"
                  component={"div"}
                >
                  連線數: {state.dbData[key].thread}
                </Typography>
                {state.dbData[key].rule == "Slave" ? (
                  <Typography
                    className={cardClasses.pos}
                    color="textSecondary"
                    component={"div"}
                  >
                    主從延遲: {state.dbData[key].slave}
                  </Typography>
                ) : null}
              </>
            ) : (
              <Typography variant="body2" component={"div"}>
                錯誤訊息: {state.dbData[key].message}
              </Typography>
            )}
          </CardContent>
        </Card>
      );
    }
    return info;
  };

  React.useEffect(() => {
    if (Global.loginId != "" && ws == null) {
      connectWebSocket();
    }
    if (ws) {
      initWebSocket();
    }
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [ws]);

  const initWebSocket = () => {
    ws.onopen = () => {
      ws.send("1qaz2wsx#EDCXZASWQ@!!");
    };
    ws.onclose = () => {
      Global.setLogout();
    };
    ws.onmessage = (response) => {
      var data = JSON.parse(response.data);
      if (data) {
        for (var key in data) {
          if (data[key].type == "db") {
            setState({
              type: "DbData",
              dbData: data,
            });
            for (var key in data) {
              if (!data[key].status) {
                Global.message("error", data[key].name);
              }
            }
          } else if (data[key].type == "rs") {
            setState({
              type: "RsData",
              rsData: data,
            });
          } else if (data[key].type == "web") {
            setState({
              type: "WebData",
              webData: data,
            });
          }

          break;
        }
      }
    };
  };

  return (
    <>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          aid="panel1a-header"
        >
          {state.webError ? (
            <Badge badgeContent={""} color="error"></Badge>
          ) : null}
          <Typography className={panelClasses.heading} component={"span"}>
            Web區 最後更新:{state.webUpdateTime}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography component={"div"}>
            {state.webData ? GetWebInfo() : null}
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          bid="panel2a-header"
        >
          {state.dbError ? (
            <Badge badgeContent={""} color="error"></Badge>
          ) : null}
          <Typography className={panelClasses.heading} component={"span"}>
            DB區 最後更新:{state.dbUpdateTime}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography component={"div"}>
            {state.dbData ? GetDbInfo() : null}
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          cid="panel3a-header"
        >
          {state.rsError ? (
            <Badge badgeContent={""} color="error"></Badge>
          ) : null}
          <Typography className={panelClasses.heading} component={"span"}>
            Redis區 最後更新:{state.rsUpdateTime}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography component={"div"}>
            {state.rsData ? GetRsInfo() : null}
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </>
  );
};

export default InfoPage;
