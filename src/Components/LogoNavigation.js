import React, { Component } from "react";
import { Link } from "react-router-dom";
class LogoNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {


    const {logo=null,dark=null} = this.props;

    const logoSrc = logo ? logo : (dark ? "/assets/logo_dark.png" : "/assets/logo.png");


    return (
      <Link to="/">
        <img
          src={logoSrc}
          alt="logo"
          className="logo"
        />
      </Link>
    );
  }
}

export default LogoNavigation;
