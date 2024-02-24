import React, { Component } from "react";
import LogoNavigation from "./LogoNavigation";
import "./customerLoginNavHeaderStyle.css";

class HeaderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() {
    return (
      <div className="header2">
        <LogoNavigation className="logo2" />
        <div className="headerContent2" style={{
          justifyContent: "flex-end",
        }}>
          <div className="headerLinks2">
            <span className="headerLink2">Our Solution</span>
            <span className="headerLink2">Industries</span>
            <span className="headerLink2">Resources</span>

          </div>
          <div className="headerActions2">
            <div className="instantQuotation2">new quote</div>
          </div>
        </div>
      </div>
    );
  }
}

export default HeaderComponent;