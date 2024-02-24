import React from "react";
import "./style.css";
import Progress from "../../images/Image 45.png";
import Dot from "../../images/More horiz 4.png";
import CountUp from "react-countup";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

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
        <div
          className=""
          style={{
            position: "relative",
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginTop: "10px",
              fontWeight: "bold",
            }}
          >
            quote to order conversion
          </div>
          <Doughnut
            style={
              {
                // width: "100%",
                // height: "100px",
              }
            }
            data={doughnutData}
            options={{
              plugins: {
                legend: {
                  display: false,
                },
                tooltip: {
                  enabled: false,
                },
              },
              rotation: -90,
              circumference: 180,
              cutout: "70%",
              maintainAspectRatio: true,
              responsive: true,
            }}
          />

          <div
            style={{
              position: "absolute",
              bottom: "50px",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              color: "black",
            }}
          >
            <div className="mar-tp">
              <p className="pro-text">Progress</p>
              <p className="hun-text">{quoted_percentage}/100</p>
            </div>
          </div>

          {/* <img src={Dot} alt="" className="img-fluid" /> */}
        </div>
        {/* <img src={Progress} alt="" className="img-fluid" /> */}

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            width: "100%",
          }}
        >
          <div>
            <p className="qt-text">quoted</p>
            <p className="percent-text">{quoted_percentage}%</p>
          </div>
          <div>
            <p className="qt-text">ordered</p>
            <p className="percent-text">{ordered_percentage}%</p>
          </div>
        </div>
      </div>

      {/* Order completation status */}
      {(completed_percentage > 0 || in_progress_percentage > 0) && (
        <div
          className="box-saved"
          style={{
            display: "flex",
            flex: 1,
          }}
        >
          <div
            className=""
            style={{
              position: "relative",
            }}
          >
            <div
              style={{
                textAlign: "center",
                marginTop: "10px",
                fontWeight: "bold",
              }}
            >
              order completion status
            </div>
            <Doughnut
              style={
                {
                  // width: "100%",
                  // height: "100px",
                }
              }
              data={doughnut2Data}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                  tooltip: {
                    enabled: false,
                  },
                },
                rotation: -90,
                circumference: 180,
                cutout: "70%",
                maintainAspectRatio: true,
                responsive: true,
              }}
            />

            <div
              style={{
                position: "absolute",
                bottom: "50px",
                left: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
                color: "black",
              }}
            >
              <div className="mar-tp">
                <p className="pro-text">Progress</p>
                <p className="hun-text">{completed_percentage}/100</p>
              </div>
            </div>

            {/* <img src={Dot} alt="" className="img-fluid" /> */}
          </div>
          {/* <img src={Progress} alt="" className="img-fluid" /> */}

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              width: "100%",
            }}
          >
            <div>
              <p className="qt-text">completed</p>
              <p className="percent-text">{completed_percentage}%</p>
            </div>
            <div>
              <p className="qt-text">in Progress</p>
              <p className="percent-text">{in_progress_percentage}%</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RightSection;
