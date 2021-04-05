/** @format */

import React from "react";
import { Carousel } from "antd";
import i1 from "./1.jpg";
import i2 from "./2.jpg";
import i3 from "./3.jpg";
import i4 from "./4.jpg";
import i5 from "./5.jpg";
import i6 from "./6.jpg";
import i7 from "./7.jpg";
import "Path/App.css";
import { Card } from "antd";
import { Typography, Row, Col, Space, Divider, Image } from "antd";
import GoogleMapReact from "google-map-react";
import { HeartTwoTone } from "@ant-design/icons";
import Countdown from "react-countdown";

const EachImage = ({ background, content }) => {
  const imageStyle = {
    color: "#fff",
    width: "100vw",
    height: "100vh",
    backgroundImage: background,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundBlendMode: "multiply",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  };
  const contentStyle = {
    color: "#fff",
    verticalAlign: "bottom",
    paddingTop: "90%",
    fontSize: "16px",
    fontFamily: "Times New Roman",
  };

  return (
    <>
      <div style={imageStyle}>
        <div style={contentStyle}>{content}</div>
      </div>
    </>
  );
};
const Wedding = () => {
  const { Title, Paragraph, Text } = Typography;
  const goldText = {
    color: "#D5C63D",
  };
  const pinkText = {
    color: "#F9B3C8",
  };
  const whiteText = {
    color: "#FDEEF3",
  };
  const imageStyle = {
    width: "100vw",
    height: "100vh",
    backgroundSize: "auto",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
  };
  const borderStyle = {
    borderWidth: "10px",
    borderColor: "rgba(241,39,69,0.38)",
    padding: "3px",
    borderWidth: "15px",
  };
  const resLocation = {
    lat: 24.198784185885813,
    lng: 120.68469027244092,
  };

  const cardSetting = {
    bordered: false,
  };
  const AnyReactComponent = ({ text }) => (
    <div>
      <HeartTwoTone style={{ fontSize: "25px", color: "white" }} />
      {text}
    </div>
  );
  React.useEffect(() => {}, []);
  return (
    <div className="App">
      <Card
        {...cardSetting}
        title={
          <>
            <Title style={goldText}>Arther & Ninny's</Title>
            <Title style={goldText}>Wedding</Title>
          </>
        }
      >
        <Carousel autoplay dots={false}>
          <EachImage background={`url(${i1})`} />
          <EachImage background={`url(${i2})`} />
          <EachImage background={`url(${i3})`} />
          <EachImage background={`url(${i4})`} />
          <EachImage background={`url(${i5})`} />
          <EachImage background={`url(${i6})`} />
        </Carousel>
      </Card>
      <Card {...cardSetting}>
        <Card style={borderStyle}>
          <Title style={goldText}>心裡的話</Title>
          <Space direction="vertical">
            <Text strong>很感謝這段時間</Text>
            <Text strong>陪在我們身旁的親朋好友</Text>
            <Text strong>也開心可以跟妳們起分享這個喜悅</Text>
            <Text strong>Arther & Ninny誠摯邀請您</Text>
          </Space>
        </Card>
      </Card>
      <Card
        style={{ ...imageStyle, backgroundImage: `url(${i7})` }}
        {...cardSetting}
      ></Card>
      <Card style={borderStyle} {...cardSetting}>
        <Title style={goldText}>Wedding Information</Title>
        <Row>
          <Col span={11}>
            <Paragraph style={goldText}>啥時呢? </Paragraph>
            <Paragraph style={goldText}>2021/9/18</Paragraph>
          </Col>
          <Col span={2}>
            <Divider type="vertical" />
          </Col>
          <Col span={11}>
            <Paragraph style={goldText}>在哪? </Paragraph>
            <Paragraph style={goldText}>好運來洲際宴展中心</Paragraph>
          </Col>
        </Row>
        <div
          style={{
            height: "45vh",
            width: "100%",
          }}
        >
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyCcvVl1Lkd4VOix9h6bueAm0keXPQsLZYQ",
            }}
            defaultCenter={resLocation}
            defaultZoom={15}
          >
            <AnyReactComponent
              lat={resLocation.lat}
              lng={resLocation.lng}
              text="Ninny與Arther在這等你們喔"
            />
          </GoogleMapReact>
        </div>
      </Card>
      <Card style={{ ...imageStyle }} {...cardSetting}>
        <Countdown
          date={new Date("2021/09/18 18:00:00")}
          intervalDelay={1000}
          precision={3}
          renderer={({ days, hours, minutes, seconds }) => (
            <div>
              倒數 {days} 天: {hours} 小時: {minutes} 分鐘 :{seconds} 秒
            </div>
          )}
        />
      </Card>
    </div>
  );
};

export default Wedding;
