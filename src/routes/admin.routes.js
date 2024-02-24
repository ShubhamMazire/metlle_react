import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import routes from "../routes";
import Dashboard from "../screens/Admin";
import redux from "../Common/Redux";

import Chart from "../screens/Admin/Chart";
import Deposite from "../screens/Admin/Deposits";

import Orders from "../screens/Admin/Orders";
import LoginScreen from "../screens/Admin/LoginScreen";
import Title from "../screens/Admin/Title";
import CustomersScreen from "../screens/Admin/CustomersScreen";
import ManufacturersScreen from "../screens/Admin/ManufacturersScreen";
import MsaasUsersScreen from "../screens/Admin/MsaasUsersScreen";
import RFQList from "../screens/Admin/RFQList";
import OrdersList from "../screens/Admin/OrdersList";
import DashBoard from "../screens/Admin/DashBoard.js";
import RfqDetailScreen from "../screens/Admin/RfqDetailScreen";
import contactUsList from "../screens/Admin/ContactUsList";

import SettingScreen from "../screens/Admin/SettingScreen";

import BlogRoutes from "./adminBlog.routes";

const All = () => {
  return (
    <div style={{ flex: 1 }}>
      <Title />
      {/* <Chart /> */}
      {/* <Deposite /> */}
      {/* <mainListItems /> */}
      {/* <secondaryListItems /> */}
      <Orders />
    </div>
  );
};

class AdminRoutes extends Component {
  constructor(props) {
    super(props);

    this.state = {};


    this.props.setBetaShow(false)
    this.props.setFooterShow(false)

  }
  render() {


    if (this.props.isAuth && this.props.userData.user_role === "admin") {

      return (
        <Switch>
          <Route path={routes.admin.dashboard} component={DashBoard} />
          <Route path={routes.admin.orders} component={OrdersList} />
          <Route path={routes.admin.settings} component={SettingScreen} />
          <Route path={routes.admin.contactUsList} component={contactUsList} />
          {/* blog routes */}

          <Route path={routes.admin.blogs.root + "*"} component={BlogRoutes} />


          {/* RFQList.js */}
          <Route path={routes.admin.rfqList} component={RFQList} />

          <Route
            path={routes.admin.rfqDetails(":id")}
            component={RfqDetailScreen}
          />

          <Route path={routes.admin.customers} component={CustomersScreen} />
          <Route
            path={routes.admin.manufacturers}
            component={ManufacturersScreen}
          />
          <Route path={routes.admin.msaasUsers} component={MsaasUsersScreen} />
          
          <Route path={routes.admin.currentMonth} component={All} />
          <Route path={routes.admin.lastQuarter} component={All} />
          <Route path={routes.admin.yearEndSale} component={All} />

          <Route path={routes.admin.login} component={All} />
          <Route path={routes.admin.register} component={All} />

          <Route path={routes.admin.root + "*"} component={All} />
        </Switch>
      );
    }

    return (
      <Switch>
        <Route path={routes.admin.login} component={LoginScreen} />
      </Switch>
    );
  }
}

export default redux(AdminRoutes);
