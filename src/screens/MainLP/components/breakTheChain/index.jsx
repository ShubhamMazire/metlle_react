import React from "react";
import "./style.css";

import { Box } from "@material-ui/core";

import Text from "../../../../Components/Text";
import Chain from "../../images/Image 126.png";

const mobile = "/assets/Customer_Mobile/boe.png"
const pc = "/assets/Customer_PC/break the chain.png"
const BreakTheChain = () => {
  return (
    <div className="main-break-div">

      <Box sx={{
        "@media screen and (orientation: landscape)": {
          display: "none",
        },
      }}>

        <img
          src={mobile}
          alt=""
          className="img-fluid "
          style={{
            // full screen width in desktop with small margin horizontally
            width: "100vw",
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
      }}>
        <img
          src={pc}
          alt=""
          className="img-fluid "
          style={{
            // full screen width in desktop with small margin horizontally
            width: "calc(100vw)",
            //
            height: "auto",
            // 100px margin top in desktop
          }}
        />
      </Box>
    </div>
  );
};

export default BreakTheChain;
