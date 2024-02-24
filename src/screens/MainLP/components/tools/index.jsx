import React from "react";
import "./style.css";
import { Row, Col, Rate } from "antd";

import { Grid, Box } from "@mui/material";
import Text from "../../../../Components/Text";




const Tool = "/assets/CNC turning.png";
const ToolOne = "/assets/CNC Milling .png";
const ToolTwo = "/assets/3dp.png";


const data = [
  {
    image: <img src={Tool} alt="abc" style={{
      width: "100%",
      aspectRatio: "1/1",
    }} />,
    cnc: "cnc turning",
    order: "open order",
    rating: "as fast as 1 day",
  },
  {
    image: <img src={ToolOne} alt="abc" style={{
      width: "100%",
      aspectRatio: "1/1",
    }} />,
    cnc: "cnc miling",
    order: "open order",
    rating: "as fast as 1 day",
  },
  {
    image: <img src={ToolTwo} alt="abc" style={{
      width: "100%",
      aspectRatio: "1/1",
    }} />,
    cnc: "3d printing",
    order: "open order",
    rating: "as fast as 1 day",
  },
];

const Tools = () => {
  return (
    <div className="text-div-get mt-4 pt-3 container">
      <Text
        className="text-clr" extrabold fontSize={4} style={{
          marginBottom: "2rem",
        }}
      >
        tap into our capabilities
      </Text>

      <Grid container spacing={3}

        justifyContent="center"
      >
        {data.map((item) => (
          <Grid key={item.cnc} item xs={10} sm={5} md={4} lg={4} xl={4}>
            <div className="mt-2 mb-2">
              <Box
                className="tools"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "0.5rem",
                  borderRadius: "10px",
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                  backgroundColor: "#ffffff",
                  // maxWidth: "100%",
                  "@media screen and (orientation: landscape)": {
                  aspectRatio: "304/355",
                  },
                  // "@media screen and (orientation: portrait)": {
                  //   aspectRatio: "304/355",
                  // },
                }}

              >
                <Box
                  className="toolImgContainer"
                  sx={{

                    // width: "100%",
                    "@media screen and (orientation: portrait)": {
                      // width: "100%",
                      height: "auto",


                    },

                    "@media screen and (orientation: landscape)": {
                      aspectRatio: "1/1",
                    
                    },

                  }}
                >
                  {item.image}
                </Box>
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
              </Box>
            </div>
          </Grid>
        ))}
      </Grid>

    </div>
  );
};

export default Tools;
