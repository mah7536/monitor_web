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
} from "@material-ui/core";

const usePanelStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const useCardStyles = makeStyles({
  root: {
    minWidth: 275,
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

const momentFormat = "HH:mm:ss";
const InfoPage = () => {
  const Global = React.useContext(GlobalContext);
  const [ws, setWs] = React.useState(null);
  const [webData, setWebData] = React.useState(null);
  const [webUpdateTime, setwebUpdateTime] = React.useState(
    moment().format(momentFormat)
  );
  const [rsData, setrsData] = React.useState(null);
  const [rsUpdateTime, setrsUpdateTime] = React.useState(
    moment().format(momentFormat)
  );
  const [dbData, setDbData] = React.useState(null);
  const [dbUpdateTime, setdbUpdateTime] = React.useState(
    moment().format(momentFormat)
  );
  const panelClasses = usePanelStyles();
  const cardClasses = useCardStyles();

  const connectWebSocket = () => {
    var url = process.env.Websocket_Host + "/monitor/" + Global.loginId;
    setWs(new websocket(url));
  };

  const GetWebInfo = () => {
    var info = [];
    for (var key in webData) {
      info.push(
        <Card className={cardClasses.root} variant="outlined" key={key}>
          <CardContent>
            <Typography
              className={cardClasses.title}
              color="textSecondary"
              gutterBottom
              component={"div"}
            >
              {webData[key].webname}
            </Typography>
            <Typography component={"div"}>
              網址: {webData[key].domain}
            </Typography>
            <Typography
              className={cardClasses.pos}
              color="textSecondary"
              component={"div"}
            >
              回應時間: {webData[key].responsetime} ms
            </Typography>
            <Typography variant="body2" component={"div"}>
              Http Code: {webData[key].status}
            </Typography>
          </CardContent>
        </Card>
      );
    }
    return info;
  };

  const GetRsInfo = () => {
    var info = [];
    for (var key in rsData) {
      info.push(
        <Card className={cardClasses.root} variant="outlined" key={key}>
          <CardContent>
            <Typography
              className={cardClasses.title}
              color="textSecondary"
              gutterBottom
              component={"div"}
            >
              {rsData[key].redisname}
            </Typography>
            <Typography component={"div"}>
              位置: {rsData[key].ip}:{rsData[key].port}
            </Typography>
            <Typography
              className={cardClasses.pos}
              color="textSecondary"
              component={"div"}
            >
              回應時間: {rsData[key].responsetime} ms
            </Typography>
            <Typography variant="body2" component={"div"}>
              狀態: {rsData[key].status == 1 ? "正常" : "不正常"}
            </Typography>
          </CardContent>
        </Card>
      );
    }
    return info;
  };

  const GetDbInfo = () => {
    var info = [];
    for (var key in dbData) {
      if (!dbData[key].status && !dbData[key].notify) {
        Global.message("warning", dbData[key].name + " " + dbData[key].message);
      }
      info.push(
        <Card className={cardClasses.root} variant="outlined" key={key}>
          <CardContent>
            <Typography
              className={cardClasses.title}
              color="textSecondary"
              gutterBottom
              component={"div"}
            >
              {dbData[key].name}
            </Typography>
            <Typography component={"div"}>群組: {dbData[key].group}</Typography>
            <Typography component={"div"}>角色: {dbData[key].rule}</Typography>
            <Typography component={"div"}>
              位置: {dbData[key].ip}:{dbData[key].port}
            </Typography>

            {dbData[key].status ? (
              <>
                <Typography
                  className={cardClasses.pos}
                  color="textSecondary"
                  component={"div"}
                >
                  連線數: {dbData[key].thread}
                </Typography>
                {dbData[key].rule == "Slave" ? (
                  <Typography
                    className={cardClasses.pos}
                    color="textSecondary"
                    component={"div"}
                  >
                    主從延遲: {dbData[key].slave}
                  </Typography>
                ) : null}
              </>
            ) : (
              <Typography variant="body2" component={"div"}>
                錯誤訊息: {dbData[key].message}
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
  }, [ws]);

  const initWebSocket = () => {
    ws.onopen = () => {
      ws.send("1qaz2wsx#EDCXZASWQ@!!");
    };
    ws.onmessage = (response) => {
      var data = JSON.parse(response.data);
      if (data) {
        for (var key in data) {
          if (data[key].type == "db") {
            setdbUpdateTime(moment().format(momentFormat));
            setDbData(data);
          } else if (data[key].type == "rs") {
            setrsUpdateTime(moment().format(momentFormat));
            setrsData(data);
          } else if (data[key].type == "web") {
            setwebUpdateTime(moment().format(momentFormat));
            setWebData(data);
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
          <Typography className={panelClasses.heading} component={"span"}>
            Web區 最後更新:{webUpdateTime}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography component={"div"}>
            {webData ? GetWebInfo() : null}
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          bid="panel2a-header"
        >
          <Typography className={panelClasses.heading} component={"span"}>
            DB區 最後更新:{dbUpdateTime}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography component={"div"}>
            {webData ? GetDbInfo() : null}
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          cid="panel3a-header"
        >
          <Typography className={panelClasses.heading} component={"span"}>
            Redis區 最後更新:{rsUpdateTime}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography component={"div"}>
            {rsData ? GetRsInfo() : null}
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </>
  );
};

export default InfoPage;
