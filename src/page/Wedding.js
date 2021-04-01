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
import { Typography, Row, Col, Space } from "antd";

const EachImage = ({ background, content }) => {
  const imageStyle = {
    color: "#fff",
    width: "100vw",
    height: "100vh",
    backgroundImage: background,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
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
  const imageStyle = {
    width: "100vw",
    height: "100vh",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
  };
  return (
    <div className="App">
      <Card>
        <Title style={goldText}>Arther & Ninny's</Title>
        <Title style={goldText}>Wedding</Title>
        <Text></Text>
      </Card>
      <Carousel autoplay>
        <EachImage background={i1} />
        <EachImage background={i2} />
        <EachImage background={i3} />
      </Carousel>
      <Card style={{ ...imageStyle, backgroundImage: i7 }}>
        <Title>Wedding Information</Title>
        <Row>
          <Col span={11}>
            <Paragraph>啥時呢? </Paragraph>
            <Paragraph>2021/9/18</Paragraph>
          </Col>
          <Col span={2}></Col>
          <Col span={11}>
            <Paragraph>在哪? </Paragraph>
            <Paragraph>好運來大大大大飯店</Paragraph>
          </Col>
        </Row>
      </Card>
      <Carousel autoplay>
        <EachImage background={{ i4 }} />
        <EachImage background={{ i5 }} />
        <EachImage background={{ i6 }} />
      </Carousel>
      <Card style={{ ...imageStyle, background: "silver" }}>
        <Title style={goldText}>心裡的話</Title>
        <Space direction="vertical">
          <Text strong style={pinkText}>
            很感謝這段時間
          </Text>
          <Text strong style={pinkText}>
            陪在我們身旁的親朋好友
          </Text>
          <Text strong style={pinkText}>
            也開心可以跟妳們起分享這個喜悅
          </Text>
          <Text strong style={pinkText}>
            Arther & Ninny誠摯邀請您
          </Text>
        </Space>
      </Card>
    </div>
  );
};

export default Wedding;
