import React from "react";
import { Grid, Typography,Box } from "@mui/material";
import "./style.css";
import Mark from "../images/Image 139.png";

const RunAt = () => {
  return (
    <Grid container className="run-main-bg">
      <Grid container item>
        <Grid item xs={12} md={6}>
          <Box className="contncr" sx={{

            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            

          }}> 
            <div className="center-colll">
            <h1 className="text-run bold center">run at fullest capacity</h1>
              <p className="text-run1 semi_bold center">
                with us,you will never run out of th capacity
              </p>
            </div>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className="center-colll">
            <img
              src={Mark}
              alt="abc"
              className="img-fluid"
              style={{
                width: "100%",
                height: "auto",
              }}
            />
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default RunAt;

