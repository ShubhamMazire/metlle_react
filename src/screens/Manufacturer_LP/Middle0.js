import React, { Component } from "react";
import "./Middle/style.css";
class Middle0 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="main-bg">
        <div className="center-col">
          <h1 className="tex-cahse bold" style={{
            fontSize: "4rem",
          }}>
            chase your{" "}
            <span className="bold" style={{ color: "blue", alignItems: "center" }}>
              successor
            </span>
            , <br /> not the purchaser
          </h1>
          <p className="suport-text regular">
            we are your supporting partner to grow your business. Don't chase
            the purchaser to get paid , chase your own sucess.
          </p>
          <button

            className="getsatrted2"
           
          >
            Get Started
          </button>
        </div>
      </div>
    );
  }
}

export default Middle0;
