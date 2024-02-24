import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import routes from "../routes";
import LoginScreen from "../screens/MSAAS/LoginScreen";
import RegisterScreen from "../screens/MSAAS/RegistrationScreen";
import MSASLandindPage from "../screens/Manufacturer_LP";
import DashBoardScreen from "../screens/MSAAS/DashBoardScreen/screens";
import ConfigurationScreen from "../screens/MSAAS/ConfigurationScreen";
import PriceMatchingScreen from "../screens/MSAAS/PriceMatchingScreen.js";


import redux from "../Common/Redux";

class ManufacturerRoutes extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }


  componentDidMount() {
    this.props.setFooterShow(false)
  }

  componentWillUnmount() {
    this.props.setFooterShow(true)
  }


  render() {
    if (this.props.isAuth && this.props.userData.user_role === "msas") {
      return (
        <Switch>
          <Route path={routes.msas.priceMatching(":id")} component={PriceMatchingScreen} />
          <Route path={routes.msas.configurePart(":id")} component={ConfigurationScreen} />
          {/* <Route path={routes.msas.dashboard} component={DashBoardScreen} /> */}
          <Route path={routes.msas.root + "*"} component={DashBoardScreen} />
        </Switch>
      );
    }

    return (
      <Switch>
        <Route path={routes.msas.login} component={LoginScreen} />
        <Route path={routes.msas.register} component={RegisterScreen} />
        <Route path={routes.msas.root + "*"} component={LoginScreen} />
      </Switch>
    );
  }
}

export default redux(ManufacturerRoutes);
