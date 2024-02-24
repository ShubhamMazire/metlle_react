import React from "react";
import "./style.css";
import Image1 from "../../images/Image 125.png";
// import { Slide } from "react-awesome-reveal";

import { Box } from "@material-ui/core";

import Text from "../../../../Components/Text";

const Platfrom = () => {
  return (
    <div className="main-div-timing container">


      <Box sx={{
        margin: {
          xs: "0.25rem",
          sm: "0.3rem",
          md: "0.5rem",
          lg: "1rem",
          xl: "1rem",

        }
      }}>
        <Text className="text-color" semibold fontSize={3} >
          put our digital manufacturing platform into work & <br />
          launch your product, in just 3 steps,&nbsp;
          <Text className="text-pro" semibold fontSize={3} >promptly!</Text>
        </Text>
      </Box>


      <Box sx={{
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
      }}>

        <img src={"/assets/Customer_Mobile/our flow.png"} alt="" className="img-fluid"
          style={{
            // full screen width in desktop with small margin horizontally
            width: "calc(100vw - 40px)",
            // 
            height: "auto",
            // 100px margin top in desktop
          }}
        />
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
      }}>

        <img src={"/assets/031023 MTL.png"} alt="" className="img-fluid"
          style={{
            // full screen width in desktop with small margin horizontally
            width: "calc(100vw - 40px)",
            // 
            height: "auto",
            // 100px margin top in desktop
          }}
        />
      </Box>



    </div>
  );
};

export default Platfrom;
