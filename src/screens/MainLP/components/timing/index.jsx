import React from "react";
import "./style.css";
import { Box } from "@mui/material";
import Text from "../../../../Components/Text";



const mobile = "/assets/Customer_Mobile/Currentflow.png";
const desktop = "/assets/Customer_PC/031023Currentworking.png";

// import { Slide } from "react-awesome-reveal";


const Timing = () => {
  return (
    <div className="main-div-timing container">
      {/* <Slide direction="up" duration="2000" triggerOnce={true}> */}

      <Box sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        marginTop: "5rem",
        marginBottom: "5rem",

      }}>
        <Box sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",

        }}>
          <Text color="#171a1fff" semibold fontSize={3}>
            timing is everything,
          </Text>
          <Text className="do-text" semibold fontSize={3}>
            &nbsp;don't get trapped in
          </Text>
          <br />

        </Box>

        <Text className="doo-text" semibold fontSize={3}>
          timeless web
        </Text>

      </Box>
      {/* </Slide>
      <Slide direction="up" duration="3000" triggerOnce={true}> */}

      <Box sx={{
        // 2 dynamic backgroud images based or orientation (landscape or portrait)
        // "@media screen and (orientation: landscape)": {
        "@media screen and (orientation: landscape)": {
          display: "none",
        },

        marginLeft: {
          sx: "0.5rem",
          md: "1rem",
          lg: "1rem",
          xl: "2rem"
        },

        marginRight: {
          sx: "0.5rem",
          md: "1rem",
          lg: "1rem",
          xl: "1.5rem"
        }
      }} >
        <img src={mobile} alt="" className="img-fluid mt-3 mar" style={{
          // full screen width in desktop with small margin horizontally
          width: "calc(100vw - 40px)",
          // 
          height: "auto",
          // 100px margin top in desktop
        }} />
      </Box>


      <Box sx={{

        "@media screen and (orientation: portrait)": {
          display: "none",
        },

        marginLeft: {
          sx: "1.5rem",
          md: "3rem",
          lg: "3rem",
          xl: "6rem"
        },

        marginRight: {
          sx: "1.5rem",
          md: "3rem",
          lg: "3rem",
          xl: "6rem"
        }


      }} >
        <img src={desktop} alt="" className="img-fluid mt-3 mar" style={{
          // full screen width in desktop with small margin horizontally
          width: "calc(100vw - 40px)",
          // 
          height: "auto",
          // 100px margin top in desktop
        }} />
      </Box>
    </div>
  );
};

export default Timing;
