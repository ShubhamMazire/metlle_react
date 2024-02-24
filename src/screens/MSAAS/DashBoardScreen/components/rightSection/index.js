import React from "react";
import "./style.css";
import Progress from "../../images/Image 45.png";
import Dot from "../../images/More horiz 4.png";
import CountUp from "react-countup";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import { Typography, TextField, Grid, Button, Box } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  datasets: [
    {
      data: [70, 30],
      backgroundColor: ["#336699", "#99CCFF"],
      display: true,
      borderColor: "#D1D6DC",
    },
  ],
};

const RightSection = ({ data }) => {
  const {
    total_time_saved_in_minutes = 0,
    quote_to_order_conversion = {},
    order_completion_status = {},
  } = data;

  const { quoted_percentage = 0, ordered_percentage = 0 } =
    quote_to_order_conversion;

  const { completed_percentage = 0, in_progress_percentage = 0 } =
    order_completion_status;

  const doughnutData = {
    datasets: [
      {
        data: [quoted_percentage, ordered_percentage],
        backgroundColor: ["#336699", "#99CCFF"],
        display: true,
        borderColor: "#D1D6DC",
      },
    ],
  };

  const doughnut2Data = {
    datasets: [
      {
        data: [completed_percentage, in_progress_percentage],
        backgroundColor: ["#336699", "#99CCFF"],
        display: true,
        borderColor: "#D1D6DC",
      },
    ],
  };

  return (
    <div className="container-fluid mr-4">
      {/* saved time */}
      <div className="box-saved">
        <h3 className="you-text">you saved total</h3>
        <h1 className="min-text "><CountUp end={total_time_saved_in_minutes} delay={0} /> mins</h1>
        <p className="you-text">
          before actual
          <br /> production starts
        </p>
      </div>

      {/* quote to order */}
      <div
        className="box-saved"
        style={{
          display: "flex",
          flex: 1,
        }}
      >
        <img src={"/images/msaasDashboardWoments.png"} height="auto" alt="" className="img-fluid" />
        <Typography variant="h6" style={{
          fontWeight: "bold",
          color: "#535CE8FF"
        }}>
          Do consectetur
        </Typography>
        <Typography variant="body1" style={{ fontWeight: "bold" }}>
          Aliqua lrure Tempor lorem Occaecat Volup
        </Typography>

      </div>

      {/* Order completation status */}

      <div
        className="box-saved"
        style={{
          display: "flex",
          flex: 1,
        }}
      >

        {/* <img src={Progress} alt="" className="img-fluid" /> */}

        <div style={{
          padding: "15px"
        }}>
          <Typography variant="h5" className="bold" gutterBottom>
            Request to Add
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h7" style={{
                marginBottom: "10px"
              }}>material/sumeterial for your quotation</Typography>
              <TextField
                fullWidth
                variant="outlined"
                // label="material/sumeterial for your quotation"
                placeholder="e.g. SSS316L, Al6065"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h7"
                style={{
                  marginBottom: "10px"
                }}
              >any other feature in software or in process</Typography>
              <TextField
                fullWidth
                variant="outlined"
                // label="any other feature in software or in process"
                placeholder="e.g. post processing is required"



              />
            </Grid>
          </Grid>

          {/* center  */}


          <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginTop: "20px"
          }}>

            <Button variant="contained" style={{
              backgroundColor: "#535CE8FF",
              color: "#fff",
              marginTop: "20px"
            }}>
              Submit
            </Button>

          </Box>

        </div>


      </div>

    </div>
  );
};

export default RightSection;
