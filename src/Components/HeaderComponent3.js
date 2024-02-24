import React, { Component } from "react";
import LogoNavigation from "./LogoNavigation";
import { Link } from "react-router-dom";
import routes from "../routes";
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
            <span style={styles.headerLink}>Our Solution</span>
            <span style={styles.headerLink}>Industries</span>
            <span style={styles.headerLink}>Resources</span>
            <Link to={routes.customer.login} style={styles.headerLink}>Sign In</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default HeaderComponent;

const styles = {
  headerLink: {
    color: "black",
    textDecoration: "none",
    fontWeight: 500,
    margin: "0 0.4rem",
    fontSize: "1.0625rem",
  },
};
