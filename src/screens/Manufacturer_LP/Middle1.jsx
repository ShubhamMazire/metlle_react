import React from "react";
import mobileimg from "./images/Group 2(1).png";
import { Row, Col } from "antd";
import "./style.css"
const Middle1 = () => {
  return (
    <div className="middle1-container">
      <Row className="justify-content-center align-items-center">
        <Col lg={10}>
          <div className="middle1-content">
            <img
              src={mobileimg}
              alt="placeholder"
              className="img-fluid middle1-image"
            />
          </div>
        </Col>
        <Col lg={12} className="middle1-text">
          <div className="middle1-content">
            <h3 className="mb-4 middle1-heading semi_bold">
              amount of time you may have wasted this week
            </h3>
            <h4 className="mb-2 regular">
              In traditional flow of manufacturing you lost almost 47 hours just to calculate the quote which anyhow gets rejected add your shop as a partner with metlle and put your shop work for you.
            </h4>
            <br />
            <br />
            <h3 className="mb-4 middle1-heading mt-5 semi_bold"  style={{
              // ignore global text transform
              textTransform: "none",
            }}>
              Get orders, not RFQs
            </h3>
            <button className="middle1-button">
              Get Started
            </button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Middle1;
