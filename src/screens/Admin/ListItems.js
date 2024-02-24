import React, { Component } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
// import blog similar icon
import BlogIcon from "@mui/icons-material/Book";


import Divider from "@mui/material/Divider";
// setting icon
import SettingsIcon from "@mui/icons-material/Settings";

import { Link } from "react-router-dom";

import routes from "../../routes";

// logout icon

const mainMenuItems = [
  {
    name: "Dashboard",
    icon: <DashboardIcon />,
    path: routes.admin.dashboard,
  },

  {
    name: "Contact Us Leads",
    icon: <PeopleIcon />,
    path: routes.admin.contactUsList,
  },


  {
    name: "RFQ List",
    icon: <ShoppingCartIcon />,
    path: routes.admin.rfqList,
  },

  {
    name: "Orders",
    icon: <ShoppingCartIcon />,
    path: routes.admin.orders,
  },
  {
    name: "Customers",
    icon: <PeopleIcon />,
    path: routes.admin.customers,
  },
  {
    name: "Manufacturers",
    icon: <PeopleIcon />,
    path: routes.admin.manufacturers,
  },
  {
    name: "MSaaS Users",
    icon: <PeopleIcon />,
    path: routes.admin.msaasUsers,
  },

  // blogs
  {
    name: "Blogs",
    icon: <BlogIcon />,
    path: routes.admin.blogs.root
  },

  {
    name: "Settings",
    icon: <SettingsIcon />,
    path: routes.admin.settings,
  },
];

const secondaryMenuItems = [
  // {
  //   name: "Current month",
  //   icon: <AssignmentIcon />,
  //   path: routes.admin.currentMonth,
  // },
  // {
  //   name: "Last quarter",
  //   icon: <AssignmentIcon />,
  //   path: routes.admin.lastQuarter,
  // },
  // {
  //   name: "Year-end sale",
  //   icon: <AssignmentIcon />,
  //   path: routes.admin.yearEndSale,
  // },
];

class ListItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: "",
    };
  }

  componentDidMount() {
    this.setState({ focused: window.location.pathname });
  }

  render() {
    return (
      <div>
        {mainMenuItems.map((item, index) => {
          return (
            <Link
              to={item.path}
              key={index}
              className="text-decoration-none text-black"
              onClick={() => {
                this.setState({ focused: item.path });
              }}
            >
              <ListItemButton
                key={index}
                style={{
                  backgroundColor:
                    this.state.focused === item.path ? "#535ce8" : "",
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </Link>
          );
        })}
        <Divider sx={{ my: 1 }} />
        {secondaryMenuItems.map((item, index) => {
          return (
            <Link
              to={item.path}
              key={index}
              className="text-decoration-none"
              onClick={() => {
                this.setState({ focused: item.path });
              }}
            >
              <ListItemButton
                key={index}
                style={{
                  backgroundColor: this.state.focused.includes(item.path)
                    ? "#535ce8"
                    : "",
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} className="text-black " />
              </ListItemButton>
            </Link>
          );
        })}
      </div>
    );
  }
}

export default ListItems;
