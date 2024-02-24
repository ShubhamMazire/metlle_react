import React, { Component } from "react";
class Card2 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      //height: "100vh",
        justifyContent: "center",
        alignContent: "center",
      }}>
        <h1
          style={{
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "50px",
          }}
        >
          timing is everything,
          <br />
          <span style={{ color: "grey" }}>don't get trapped in</span>
          <br />
          <span style={{ color: "blueviolet" }}>timeless web</span>
        </h1>
        <img
          style={{ width: "100%", marginBottom: "50px" }}
          src={"/images/Image124.png"}
          alt="Tech"
        />


         
      </div>
    );
  }
}

export default Card2;
