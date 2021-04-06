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
import { Typography, Row, Col, Space, Divider, Button } from "antd";
import FlipCountdown from "@rumess/react-flip-countdown";
import { useInViewport } from "react-in-viewport";
import QueueAnim from "rc-queue-anim";
import Texty from "rc-texty";

const ViewportBlock = (props) => {
  const myRef = React.useRef();
  const [visible, setVisible] = React.useState(false);
  const { inViewport } = useInViewport(
    myRef,
    {},
    { disconnectOnLeave: false },
    props
  );
  if (!visible) {
    if (inViewport) {
      setVisible(true);
    }
  }
  return (
    <div ref={myRef} style={{ width: "100%", height: "100%" }}>
      <QueueAnim type={["right", "left"]} delay={200}>
        {visible ? <div key="a">{props.children}</div> : null}
      </QueueAnim>
    </div>
  );
};

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
    lat: 24.1986014716835,
    lng: 120.68464568202751,
  };

  const cardSetting = {
    bordered: false,
  };
  React.useEffect(() => {}, []);
  return (
    <div className="App">
      <Card
        {...cardSetting}
        title={
          <>
            <Title style={goldText}>
              <Texty>Arther & Ninny's</Texty>
            </Title>
            <Title style={goldText}>
              <Texty>Wedding</Texty>
            </Title>
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
        <ViewportBlock>
          <Card style={borderStyle}>
            <Title style={goldText}>
              <Texty>心裡的話</Texty>
            </Title>
            <Space direction="vertical">
              <Text strong>
                <Texty>很感謝這段時間</Texty>
              </Text>
              <Text strong>
                <Texty>陪在我們身旁的親朋好友</Texty>
              </Text>
              <Text strong>
                <Texty>也開心可以跟妳們起分享這個喜悅</Texty>
              </Text>
              <Text strong>
                <Texty>Arther & Ninny誠摯邀請您</Texty>
              </Text>
            </Space>
          </Card>
        </ViewportBlock>
      </Card>
      <ViewportBlock>
        <Card
          style={{ ...imageStyle, backgroundImage: `url(${i7})` }}
          {...cardSetting}
        ></Card>
      </ViewportBlock>

      <Card style={borderStyle} {...cardSetting}>
        <ViewportBlock>
          <Title style={goldText}>
            <Texty>Wedding Information</Texty>
          </Title>
          <Row>
            <Col span={11}>
              <Title level={2}>
                <Texty>啥時呢?</Texty>
              </Title>
              <Title level={2}>
                <Texty>2021/9/18</Texty>
              </Title>
            </Col>
            <Col span={2}>
              <Divider type="vertical" />
            </Col>
            <Col span={11}>
              <Title level={2}>
                <Texty>在哪?</Texty>
              </Title>
              <Title level={2}>
                <Texty>好運來洲際宴展中心</Texty>
              </Title>
            </Col>
          </Row>
          <Row
            style={{
              height: "45vh",
              width: "100%",
            }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1081.9517723767697!2d120.68400020253702!3d24.19846142402587!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346917a229893087%3A0xde1e7eb1d38a26ca!2z5aW96YGL5L6G5rSy6Zqb5a605bGV5Lit5b-D!5e0!3m2!1szh-TW!2stw!4v1617633987580!5m2!1szh-TW!2stw"
              width="100%"
              height="100%"
              style={{ marginRight: 0 + "em" }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </Row>

          <Row style={{ paddingTop: "5px" }}>
            <Col span={12} offset={6}>
              <Button
                type="primary"
                href={"https://goo.gl/maps/EFuyTPHj9V2X2qDN8"}
              >
                直接開google map看
              </Button>
            </Col>
            <Col span={6} />
          </Row>
        </ViewportBlock>
      </Card>
      <Card style={{ ...imageStyle }} {...cardSetting}>
        <ViewportBlock>
          <Title style={goldText}>Wedding倒數</Title>
          <FlipCountdown
            size="large" // Options (Default: medium): large, medium, small, extra-small.
            titlePosition="top"
            hideYear
            monthTitle="月"
            dayTitle="日"
            hourTitle="時"
            minuteTitle="分"
            secondTitle="秒"
            endAt={"2021-09-18 18:00:00"} // Date/Time
          />
        </ViewportBlock>
      </Card>
    </div>
  );
};

export default Wedding;
