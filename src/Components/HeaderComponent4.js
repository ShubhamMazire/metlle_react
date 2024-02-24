import React, { Component } from "react";
import LogoNavigation from "./LogoNavigation";
class HeaderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          alignContent: "center",
          backgroundColor: "#ffffff",
          padding: "10px 50px",
        }}
      >
        <LogoNavigation />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            alignContent: "center",
            flexDirection: "row",
          }}
        >
          <div
            style={{
              margin: "0px 20px",
            }}
          >
            <span style={styles.headerLink}>Nilesh Mahajan</span>
            <span style={styles.headerLink}>conatct us</span>
            <span style={styles.headerLink}>logout</span>
          </div>
        </div>
      </div>
    );
  }
}

export default HeaderComponent;

const styles = {
  headerLink: {
    margin: "0px 20px",
  },
};
