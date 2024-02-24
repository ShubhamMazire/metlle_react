import React from "react";
import HeaderComponent from "../../Components/HeaderComponentMLP";
const Header = (props) => {
  return (
    <div
      style={{
        backgroundImage: `url("/images/headerimage.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        // alignItems: "center",
      }}
    >
      <div
        style={{
          position: props.direction==="up"?"fixed":"absolute",
          top: "0",
          left: "0",
          width: "100%",
        }}
        className="slider-wrapper wow delay-2s  fadeInDown animated"
      >
        <HeaderComponent />
      </div>
      <div
        className="container"
        style={{
          marginLeft: "30px",
          color: "whitesmoke",
          padding: "20px",
          // textAlign:"center",
          maxWidth: "800px",
        }}
      >
        <h1
          style={{
            fontWeight: "bold",
            fontSize: "66px",
            marginBottom: "20px",
            lineHeight: "86px",
          }}
        >
          procure custom parts.
          <br />
          hassle free!
        </h1>
        <h3
          style={{
            fontWeight: "bold",
            fontSize: "150%",
            marginBottom: "20px",
          }}
        >
          manufacturing, where speed matters, at your fingertips
        </h3>
        <p style={{ marginBottom: "30px", fontWeight: "normal" }}>
          get a hyper-quick quote of your high quality parts within seconds not
          in days
          <br /> & release for the production within minutes not in weeks, on
          demand.
        </p>
        <button className="btn btn-primary">Get Started</button>
      </div>
    </div>
  );
};

export default Header;
