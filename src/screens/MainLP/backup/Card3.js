import React, { Component } from "react";

class Card3 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
           //height: "100vh",
            width: "100%",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <h1
          style={{
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "50px",
          }}
        >
          put our digital manufacturing platform into
          <br />
          work & launch your product,in just 3 steps,
          <br />
          <span style={{ color: "blue" }}>promtly</span>
        </h1>
        <img
          style={{ width: "100%", marginBottom: "50px" }}
          src={"/images/Image125.png"}
          alt="Tech"
        />
      </div>
    );
  }
}

export default Card3;
