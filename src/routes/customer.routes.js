import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import routes from "../routes";

import CustomerLoginScreen from "../screens/Customer/LoginScreen";
import CustomerRegistrationScreen from "../screens/Customer/RegistrationScreen";
import CustomerConfigurePartScreen from "../screens/Customer/ConfigurePartScreen";
import CustomerQuotationScreen from "../screens/Customer/QuotationPage";
import CustomerDashBoardScreen from "../screens/Customer/customer_dashboard/screens";
import CustomerShipingScreen from "../screens/Customer/ShipingScreen";
import ListQuotationsScreen from "../screens/Customer/quoteHistory/ListQuoteHistory";
import ListOrderHistory from "../screens/Customer/orderHistory/ListOrderHistory";
import redux from "../Common/Redux";

class ManufacturerRoutes extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    if (this.props.isAuth && this.props.userData.user_role === "customer") {
      return (
        <Switch>
          <Route
            path={routes.customer.quotation}
            component={CustomerQuotationScreen}
          />
          <Route
            path={routes.customer.configurePart(":id")}
            component={CustomerConfigurePartScreen}
          />

          {/* shippingPage */}
          <Route
            path={routes.customer.shippingPage(":id")}
            component={CustomerShipingScreen}
          />

          {/* order history screen */}
          <Route
            path={routes.customer.orderHistory}
            component={ListOrderHistory}
          />

          <Route
            path={routes.customer.dashboard}
            component={CustomerDashBoardScreen}
          />

          <Route
            path={routes.customer.root}
            component={CustomerDashBoardScreen}
          />
          
        </Switch>
      );
    }


    
    return (
      <Switch>
        {/* <Route
          path={routes.customer.quotation}
          component={CustomerQuotationScreen}
        /> */}
        <Route path={routes.customer.login} component={CustomerLoginScreen} />
        {/* quote listing screen */}
        <Route
            path={routes.customer.quotationListing}
            component={ListQuotationsScreen}
          />
        <Route
          path={routes.customer.register}
          component={CustomerRegistrationScreen}
        />
         
        <Route
          path={routes.customer.root}
          component={
            this.props.isAuth && this.props.userData.user_role === "customer"
              ? CustomerDashBoardScreen
              : CustomerLoginScreen
          }
        />

         
      </Switch>
    );
  }
}

export default redux(ManufacturerRoutes);
