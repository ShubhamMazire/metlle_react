import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import routes from "../routes";
import LoginScreen from "../screens/Manufacturer/LoginScreen";
import RegisterScreen from "../screens/Manufacturer/RegistrationScreen";
import MSASLandindPage from "../screens/Manufacturer_LP";

class ManufacturerRoutes extends Component {
  constructor(props) {
    super(props);
    this.state = {};

  }
  render() {    

    return (
      <Switch>
        <Route path={routes.manufacturer.login} component={LoginScreen} />
        <Route path={routes.manufacturer.register} component={RegisterScreen} />
        <Route path={routes.manufacturer.root+ "*"} component={MSASLandindPage} />
      </Switch>
    );
  }
}

export default ManufacturerRoutes;
