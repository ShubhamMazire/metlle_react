import React, { Component } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItems from "./ListItems";
import LogoNavigation from "../../Components/LogoNavigation";
import redux from "../../Common/Redux";
import AdminRoutes from "../../routes/admin.routes";
import LoginScreen from "./LoginScreen";

import { logOut } from "../../Common/API";


const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      printing: false, // Assuming you have some logic to determine printing status
      currency: "USD", // Assuming you have a currency code
    };
  }

  toggleDrawer = () => {
    this.setState((prevState) => ({
      open: !prevState.open,
    }));
  };

  render() {
    if (this.props.isAuth && this.props.userData.user_role === "admin") {
      return (
        <ThemeProvider theme={defaultTheme}>
          <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar
              position="absolute"
              open={this.state.open}
              style={{
                backgroundColor: "#535ce8",
              }}
            >
              <Toolbar
                sx={{
                  pr: "24px", // keep right padding when drawer closed
                }}
              >
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={this.toggleDrawer}
                  sx={{
                    marginRight: "36px",
                    ...(this.state.open && { display: "none" }),
                  }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography
                  component="h1"
                  variant="h6"
                  color="inherit"
                  noWrap
                  sx={{ flexGrow: 1 }}
                >
                  Admin Dashboard
                </Typography>
                <IconButton color="inherit">
                  <LogoutIcon  onClick={()=>{


logOut()

                  }}/>
                </IconButton>
              </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={this.state.open}>
              <Toolbar
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  px: [1],
                }}
              >
                <LogoNavigation />
                <IconButton onClick={this.toggleDrawer}>
                  <ChevronLeftIcon />
                </IconButton>
              </Toolbar>
              <Divider />
              <List component="nav">
                <ListItems />
              </List>
            </Drawer>
            <Box
              component="main"
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === "light"
                    ? theme.palette.grey[100]
                    : theme.palette.grey[900],
                flexGrow: 1,
                height: "100vh",
                overflow: "auto",
              }}
            >
              <Toolbar />
              <Box sx={{ mt: 4, mb: 4, ml: 3, mr: 3 }}>
                <AdminRoutes />
              </Box>
            </Box>
          </Box>
        </ThemeProvider>
      );
    }

    return <LoginScreen {...this.props} />;
  }
}

export default redux(Dashboard);
