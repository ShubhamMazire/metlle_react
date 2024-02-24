import React, { Component } from "react";
class Midle3 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div
        className="container-fluid"
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",

          flexDirection: "column",
          alignContent: "center",
        }}
      >
        <h1
          style={{
            color: "black",
            fontWeight: "bold",
            display: "flex",
            justifyContent: "center",
            fontSize: "50px",
            marginBottom: "30px",
            marginTop: "30px",
            textAlign: "center",
            // transform:"translate(0%,-180%)"
          }}
        >
          manufacturing
          <br />
          made (incredibly) easy
        </h1>
        <div
          style={{
            color: "black",
            display: "flex",
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            alignContent: "center",
            fontWeight: "bold",
            fontSize: "40px",
            margin: "50px",
            textAlign: "left",
          }}
        >
          <div style={{ flex: 1 }} key={this.props.imganim}  className={this.props.imganim}>
            <img src={this.props.data.image} width="100%" height="auto" />
          </div>
          <div style={{ flex: 1, margin: "15px" }} key={this.props.anim}>
           <h1 
              className={this.props.anim}
              style={{
                fontWeight: "bold",
                fontSize: "66px",
                visibility: "visible"
              }}
            >
              {this.props.data.lines[0]}
            </h1>

            <p
           
            className={this.props.anim}
              style={{
                fontSize: "20px",
              }}
            >
              {this.props.data.subText}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Midle3;
