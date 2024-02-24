import React from "react";
import image2 from "./images/bgimage2.png";

const Midle = () => {
  return (
    <div>
      <div style={{ height: "100vh" }}>
        <div style={{ display: "flex", height: "50%", position: "relative" }}>
          <img
            src={image2}
            alt="image1"
            style={{
              width: "50%",
              height: "100vh",
              objectFit: "cover",
              transform: "scaleY(-1)",
            }}
          />
          <img
            src={image2}
            alt="image2"
            style={{
              width: "50%",
              height: "100vh",
              objectFit: "cover",
              transform: "scaleX(-1) scaleY(-1)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "20%",
              left: "50%",
              transform: "translate(-50%, -80%)",
            }}
          >
            <h2
              style={{ fontSize: "2.3rem", color: "white", fontWeight: "bold" }}
            >
              Get that all, what your shop needs
            </h2>
          </div>
        </div>
        {/*
      
      add 5 white square boxes in a single row and space evenly . Write different text outside each box at the bottom of each box . Write a  responsive code in reactjs and bootstrap with inline css
      */}

        <div style={{ display: "flex", height: "25%" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              width: "100%",
              padding: "20px",
              transform: "translate(-0%, -100%)",
            }}
          >
            {[...Array(5)].map((_, i) => (
              <div key={i} style={{ width: "20%", textAlign: "center" }}>
                <h4
                  style={{
                    fontSize: "2rem",
                    lineHeight: "1.2",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Box {i + 1}
                </h4>
                <p style={{ fontSize: "1rem", color: "white" }}>
                  Become a partner with
                  <br />
                  metlle and get the vast <br /> acess to hastle freework
                </p>
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "25%",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              padding: "20px",
              borderRadius: "50px",
              textAlign: "center",
            }}
          >
            <h4
              style={{
                fontSize: "3rem",
                color: "white",
                fontWeight: "bold",
                alignItems: "center",
                transform: "translate(-0%, -150%)",
              }}
            >
              chase your <span style={{ color: "blue" }}>successor</span>,{" "}
              <br /> not the purchaser
            </h4>
            <p
              style={{
                fontSize: "1.2rem",
                color: "white",
                transform: "translate(-0%, -400%)",
              }}
            >
              {" "}
              we are your supporting partner to grow your business. Don't chase
              the purchaser to get paid , chase your own sucess{" "}
            </p>
          </div>
          <button
            style={{
              backgroundColor: "#007bff",
              color: "white",
              fontSize: "1rem",
              padding: "10px 30px",
              borderRadius: "10px",
              border: "none",
              transform: "translate(0%, -200%)",
            }}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Midle;
