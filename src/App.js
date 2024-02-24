// import "./App.css";
import React, { Component } from "react";

import routes from "./routes";

import "bootstrap/dist/css/bootstrap.min.css";

import "./bootstrap";

import MainLP from "./screens/MainLP";
import MSASLandindPage from "./screens/Manufacturer_LP";
import Admin from "./screens/Admin";
import manufacturerRoutes from "./routes/manufacturer.routes";
import msaasRoutes from "./routes/msaas.routes";
import customerRoutes from "./routes/customer.routes";
import companyRoutes from "./routes/company.routes";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import redux from "./Common/Redux";
import { setAuthToken } from "./Common/API";
import Footer from "./screens/MainLP/components/footer";

import { Box, Typography, IconButton, Grid } from "@mui/material";

import forgotPass from "./screens/ForgotPassword";

import CloseIcon from "@mui/icons-material/Close";

import blogRoutes from "./routes/blog.routes";
import ContactUsForm from "./screens/Company/ContactUs";

// const axios = require("axios");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      animating: true,
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
      // this.props.history.push("/customer/dashboard");
    }

    this.setState({
      loaded: true,
    });

    setTimeout(() => {
      this.setState({
        animating: false,
      });
    }, 1000);

    setTimeout(() => {
      this.props.setBetaShow(false);
    }, 15000);
  }

  Beta = () => {
    return (
      <Box
        sx={{
          backgroundColor: "#535CE8FF",
          color: "white",
          fontWeight: "bold",
          border: "1px solid #535CE8FF",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
          padding: "10px",
          position: "fixed",
          zIndex: 1000000,
          top: 0,
          left: 0,
          width: "100%",
          
        }}
      >
        <div
          style={{
            flexGrow: 1,
            display: "flex",
            // flex: 1
          }}
        >
          This is our beta version of the website, prices may not align with
          your target value as we continuously update and refine our offerings.
          We will be grateful if you can send quotations for manual review.
        </div>

        {/* close icom */}

        <IconButton
          sx={{
            color: "white",
            display: "flex",
            flex: 1,
          }}
          aria-label="close"
          color="inherit"
          size="small"
          onClick={() => {
            this.props.setBetaShow(false);
          }}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      </Box>
    );
  };

  render() {
    const welcomeTextStyle = {
      fontSize: {
        xs: "4.5rem",
        sm: "6rem",
        md: "9rem",
        lg: "10rem",
        xl: "10rem",
      },
    };

    if (this.state.animating) {
      // return full screen overlay with text Building great things at center with bold text and loading icon

      return (
        <Box
          sx={{
            fontWeight: "bold",
            border: "1px solid #535CE8FF",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            padding: "10px",
            position: "fixed",
            zIndex: 100000,
            top: 0,
            left: 0,

            paddingLeft: {
              xs: "1.125rem",
              sm: "1.5rem",
              md: "2.25rem",
              lg: "3rem",
              xl: "3.75rem",
            },
            right: 0,
            bottom: 0,

            // background image

            backgroundImage: {
              xs: "url(/assets/welcombg2.jpeg)",
              sm: "url(/assets/welcombg2.jpeg)",
              md: "url(/assets/welcombg2.jpeg)",
              lg: "url(/assets/welcombg.jpeg)",
              xl: "url(/assets/welcombg.jpeg)",
            },
            //"url(/assets/welcombg.jpeg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Box
            className="extra_bold no_trans wow animation-delay-1s duration-3s  fadeIn animated"
            sx={welcomeTextStyle}
          >
            Build{" "}
          </Box>
          <br />
          <Box
            sx={welcomeTextStyle}
            className="extra_bold no_trans wow animation-delay-3s duration-3s fadeIn animated"
          >
            Greatness.
          </Box>

          {/* close icom */}

          {/* <IconButton
            sx={{
              color: "white",
              display: "flex",
              flex: 1,
            }}
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              this.props.setBetaShow(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton> */}
        </Box>
      );
    }

    if (!this.state.loaded) {
      return <div></div>;
    }

    return (
      <>
        {this.props.betaShow && <this.Beta />}
        <BrowserRouter>
          <div
            style={{
              // backgroundColor: "#f8f9fa",
              minHeight: "100vh",
            }}
          >
            {/* Navigation */}
            <Switch>
              <Route path={routes.admin.root + "*"} component={Admin} />
              {/* MSAAS */}
              <Route path={routes.msas.root + "*"} component={msaasRoutes} />
              {/* Manufacturer/ Partner */}

              <Route
                path={routes.manufacturer.root + "*"}
                component={manufacturerRoutes}
              />
              {/* Customer */}
              <Route
                path={routes.customer.root + "*"}
                component={customerRoutes}
              />

              <Route
                path={routes.company.contact}
                exact
                component={ContactUsForm}
              />

              {/* COmpany */}

              <Route path={routes.company.root} component={companyRoutes} />

              {/* blog routes */}

              <Route path={routes.blogs.root + "*"} component={blogRoutes} />

              <Route path={routes.forgotPass} component={forgotPass} />

              {/* Landing Page */}
              <Route exact path={routes.root} component={MainLP} />
            </Switch>
            {this.props.footerShow && <Footer />}
          </div>
        </BrowserRouter>
      </>
    );
  }
}

export default redux(App);
