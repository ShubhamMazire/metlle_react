import { Row, Col, Rate } from "antd";
import React from "react";
import "./style.css";
import Tool from "../images/Image 136 (1).png";
import ToolOne from "../images/Image 137.png";
import ToolTwo from "../images/Image 138.png";
import { Container } from "react-bootstrap";
const data = [
  {
    image: <img src={Tool} alt="abc" className="img-fluid" />,
    cnc: "cnc turning",
    order: "open order",
    rating: "128",
  },
  {
    image: <img src={ToolOne} alt="abc" className="img-fluid" />,
    cnc: "cnc miling",
    order: "open order",
    rating: "340",
  },
  {
    image: <img src={ToolTwo} alt="abc" className="img-fluid" />,
    cnc: "3d printing",
    order: "open order",
    rating: "40",
  },
];
const GetYourShop = () => {
  return (
    <div className="get-bg-div">
      <div className="text-div-get">
        <h1 className="text-clr">get your shop on-boarded with us</h1>
        <p className="text-clr1">
          register your shop with following technologies, start receiving
          business,
          <br /> completely free
        </p>
        <div>
          <Container>
            <Row justify="center">
              {data.map((item) => (
                <Col lg={7} md={10} xs={24}>
                  <div className="center-col">
                    <div className="box-div">
                      <div className="inside-box ">{item.image}</div>
                      <div className="space-between-div">
                        <p className="text-cnc mt-2">{item.cnc}</p>
                        <p className="order-text mt-2">{item.order}</p>
                      </div>
                      <div className="space-between-div">
                        <p>
                          <Rate allowHalf defaultValue={2.5} />
                        </p>
                        <div>
                          <p className="text-cnc">{item.rating}</p>
                        </div>
                      </div>
                    </div>
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

export default GetYourShop;
