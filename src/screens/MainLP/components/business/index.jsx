import React from "react";
import "./style.css";
import routes from "../../../../routes";

import { Box } from "@mui/system";

// import { Slide } from "react-awesome-reveal";
const Business = () => {
  return (
    <Box className="main-bg-busi" sx={{
      // background image


      "@media screen and (orientation: landscape)": {

        backgroundImage: `url("/assets/last globe.png")`,
      },

      "@media screen and (orientation: portrait)": {

        backgroundImage: `url("/assets/lastglobemobile.png")`,
      },

      // lastglobemobile.png

      position: "relative",
    }}>
      {/* <Slide direction="up" duration="2000" triggerOnce={true}> */}

      {/* <h1
          style={{
            color: "white",
            fontSize: "4rem",
            textAlign: "center",
          }}
          className="extra_bold mt-3"
        >
          we are all in a business of <br />
          creating a legacy
        </h1> */}

      <Box

        sx={{

          "@media screen and (orientation: landscape)": {

            position: "absolute",


            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            color: "white",
          },

          "@media screen and (orientation: portrait)": {
            position: "absolute",
            bottom: "3%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            color: "white",
          },


        }}

      >
        <button
          className="btn btn-primary mt-5 bold "
          style={{
            fontSize: "1rem",
          }}
          onClick={() => {
            this.props.history.push(routes.customer.login);
          }}
        >
          build now
        </button>
      </Box>
    </Box>
  );
};

export default Business;
