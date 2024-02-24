import { Col, Row } from "antd";
import React, { useEffect } from "react";
import "./style.css";
// import { Slide } from "react-awesome-reveal";
import CountUp, { useCountUp } from 'react-countup';

import { Grid } from "@mui/material";

import Text from "../../../../Components/Text";


const data = [
  {
    type: "%",
    detial: "reduced lead time",
    val: 42,
  },
  {
    type: "%",
    detial: "direct cost saving",
    val: 28,
  },
  {
    type: "%",
    detial: "Po cycle time reduced",
    val: 91,
  },
  {
    type: " hrs",
    detial: "saved per user / month",
    val: 114,
  },
];

const Index = (props) => {

  useCountUp({
    ref: 'counter',
    end: 1234567,
    enableScrollSpy: true,
    scrollSpyDelay: 1000,
  });


  useEffect(() => {


}, []);


  return (
    <div className="main-bg-team" >

      <div>
        {/* <Slide direction="up" duration="2000" triggerOnce={true}> */}
        <div
          style={{
            // 25px font size in desktop

            fontSize: "3.5rem",
            // lineHeight:
            //   "calc(25px + (40 - 25) * ((100vw - 300px) / (1600 - 300)))",
            fontWeight: "bold",
          }}
          className="team-text mb-4 bold"
        >
          {props.title ?? "Team move faster with metlle.com"}
        </div>
        {/* </Slide> */}
        <Grid container justify="center" className="mt-5" flexWrap="wrap" allign="middle">
          {data.map((item) => (
            <Grid item xl={3} lg={3} md={6} sm={12} xs={12} sx={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "2rem",

            }}>
              {/* <Slide direction="up" duration="3000" triggerOnce={true}> */}

              <CountUp className="bold h1" end={item.val} delay={1} enableScrollSpy/>
              {/* <Text h1 style={{
                fontSize: {
                  xs: "1.4rem",
                  sm: "1.6rem",
                  md: "1.8rem",
                  lg: "2.2rem",
                  xl: "2.5rem",
                }
              }} bold >{item.val}{item.type}</Text> */}
              <br />
              {/* <Slide direction="up" duration="4000" triggerOnce={true}> */}
              <Text h7 regular className="save-text" style={{
                fontSize: {
                  xs: "0.7rem",
                  sm: "0.75rem",
                  md: "0.8rem",
                  lg: "0.9rem",
                  xl: "1rem",
                }
              }}>{item.detial}</Text>

            </Grid>
          ))}
        </Grid>

        {props.button && (<div className="my-3 center">

          <button className="btn btn-primary btn-lg" onClick={() => props.button.link}>
            {props.button.text}
          </button>

        </div>)}

      </div>

    </div>
  );

}

export default Index;
