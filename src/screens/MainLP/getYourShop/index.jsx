import React from "react";
import "./style.css";
import Tool from "../images/Image 136 (1).png";
import ToolOne from "../images/Image 137.png";
import ToolTwo from "../images/Image 138.png";
import { Row, Col, Rate } from "antd";

import Text from "../../../Components/Text"

const data = [
  {
    image: <img src={Tool} alt="abc" className="img-fluid" />,
    cnc: "cnc turning",
    order: "open order",
    rating: "as fast as 1 day",
  },
  {
    image: <img src={ToolOne} alt="abc" className="img-fluid" />,
    cnc: "cnc miling",
    order: "open order",
    rating: "as fast as 2 day",
  },
  {
    image: <img src={ToolTwo} alt="abc" className="img-fluid" />,
    cnc: "3d printing",
    order: "open order",
    rating: "as fast as 1 day",
  },
];

const Tools = () => {
  return (
    <div className="get-bg-div text-div-get pt-3">

      <Text
        className="text-clr" extrabold fontSize={4} style={{
          marginBottom: "2rem",
        }}
      >
        tap into our capabilities
      </Text>

     
        <Row justify="space-evenly" className="margin-top container">
          {data.map((item) => (
             <Col key={item.cnc}>
             <div className="center-col mt-2 mb-2">
               <div
                 className="tools"            
               >
                 <div
                   className="toolImgContainer"
                 >
                   {item.image}
                 </div>
                 <div className="space-between-div">
                   <p className="text-cnc mt-2 semi_bold">{item.cnc}</p>
                 </div>
                 <div className="space-between-div">
                   <p>
                     <Rate allowHalf defaultValue={4} />
                   </p>
                   <div>
                     <p className="order-text mt-2 semi_bold">{item.rating}</p>
                   </div>
                 </div>
               </div>
             </div>
           </Col>
          ))}
        </Row>
     
    </div>
  );
};

export default Tools;
