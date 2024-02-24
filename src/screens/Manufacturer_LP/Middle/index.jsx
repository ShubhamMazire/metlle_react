import React from "react";
import { Row, Col } from "antd";
import "./style.css";
import Hastle from "../images/Work history 1.png";
import Hastle1 from "../images/Webhook 1.png";
import Hastle2 from "../images/Credit score 1.png";
import Hastle3 from "../images/Calendar today 1.png";
import Hastle4 from "../images/Center focus strong 1.png";
import { Container } from "react-bootstrap";
const data = [
  {
    key: 1,
    det: "get hastlefree work",
    subde:
      "become a partner with metle and get the vast acess to hastle freework",
    icon: <img src={Hastle} alt="abc" />,
  },
  {
    key: 2,
    det: "get futuristic technology",
    subde:
      "by partnering with metlle you will become the part of the tech -first community",
    icon: <img src={Hastle1} alt="" />,
  },
  {
    key: 3,
    det: "get insured payment",
    subde:
      "become a partner with metle and get the vast acess to hastle freework",
    icon: <img src={Hastle2} alt="" />,
  },
];
const data1 = [
  {
    key: 1,
    det: "get unparelled flexibilty",
    subde:
      "become a partner with metle and get the vast acess to hastle freework",
    icon: <img src={Hastle3} alt="" />,
  },
  {
    key: 2,
    det: "get lasership focus",
    subde:
      "become a partner with metle and get the vast acess to hastle freework",
    icon: <img src={Hastle4} alt="" />,
  },
];
const Middle = () => {
  return (
    <div className="main-bg">
      <div>
        <h2 className="text-center semi_bold">get that all, what your shop needs</h2>
        <div className="mar-top">
          <Row justify="ceneter">
            {data.map((item) => (
              <Col lg={8} md={8} xs={24}>
                <div className="center-col">
                  <div>{item.icon}</div>
                  <h4 className="get-text semi_bold">{item.det}</h4>
                  <p className="get-text-small">{item.subde}</p>
                </div>
              </Col>
            ))}
          </Row>
        </div>
        <div className="mar-top">
          <Container>
            <Row justify="ceneter">
              {data1.map((item, index) => (
                <Col key={index} lg={12} md={12} xs={24}>
                  <div className="center-col">
                    <div>{item.icon}</div>
                    <h4 className="get-text semi_bold">{item.det}</h4>
                    <p className="get-text-small">{item.subde}</p>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Middle;
