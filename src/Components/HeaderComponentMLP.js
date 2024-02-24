import React, { Component } from "react";
import LogoNavigation from "./LogoNavigation";
import "./headerStyle.css";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import navItems from "../menus";
import Text from "../Components/Text";
import redux from "../Common/Redux";
const drawerWidth = window.innerWidth;

const Beta = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#535CE8FF",
        color: "white",
        fontWeight: "bold",
        border: "1px solid #535CE8FF",
      }}
    >
      This is our beta version of the website, prices may not align with your
      target value as we continuously update and refine our offerings. We will
      be grateful if you can send quotations for manual review.
    </Box>
  );
};

class HeaderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
      deviceType: "desktop",
      industriesShow: false,
    };

    this.container =
      props.window !== undefined
        ? () => props.window().document.body
        : undefined;
  }

  componentDidMount() {
    // calcualte is it mobile screen or not
    if (window.innerWidth < 600) {
      this.setState({ deviceType: "mobile" });
    } else {
      this.setState({ deviceType: "desktop" });
    }
    window.addEventListener("resize", () => {
      if (window.innerWidth < 600) {
        this.setState({ deviceType: "mobile" });
      } else {
        this.setState({ deviceType: "desktop" });
      }
    });
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  drawer = () => {
    return (
      <Box
        onClick={this.handleDrawerToggle}
        sx={{
          padding: "1rem 0rem",
          position: "relative",
        }}
      >
        {/* cross icon to close drawer */}
        <Box
          sx={{
            position: "fixed",
            top: "10px",
            right: "10px",
            cursor: "pointer",
            padding: "0.5rem",
            border: "1px solid white",
            // onhover change background color
            "&:hover": {
              // border: "1px solid #000000",
              backgroundColor: "rgba(0, 0, 0, 0.1)",
            },
          }}
          onClick={this.handleDrawerToggle}
        >
          <img
            src={"https://cdn-icons-png.flaticon.com/512/1828/1828774.png"}
            alt="cross"
            style={{ width: "2rem", height: "2rem" }}
          />
        </Box>

        <Typography
          variant="h3"
          sx={{
            flex: 1,
            fontWeight: "bold",
            paddingLeft: "1rem",
            paddingRight: "1rem",
            borderBottomWidth: "0.1rem",
            borderBottomColor: "#000000",
            borderBottomStyle: "solid",
            paddingBottom: "0.5rem",
          }}
        >
          Menu
        </Typography>

        <Divider />
        <List>
          {navItems[this.props.section].left.map((item) => (
            <ListItem
              key={item}
              disablePadding
              sx={{
                borderWidth: "0 0 0.1rem 0",
                borderColor: "rgba(0, 0, 0, 0.1)",
                borderStyle: "solid",
              }}
            >
              <ListItemButton>
                <Link
                  to={item.link}
                  className={
                    "bold " +
                    "headerLink " +
                    (item.extraClass ? " " + item.extraClass : "")
                  }
                  style={
                    item.style ?? {
                      textDecoration: "none",
                      fontWeight: "300",
                    }
                  }
                  onClick={() => {
                    item.action && item.action();

                    if (item.label == "Industries") {
          
                      this.setState({
                        industriesShow: !this.state.industriesShow,
                      });
                    }
                    else this.setState({ industriesShow: false });
                  }}
                >
                  {item.label}
                </Link>
              </ListItemButton>
            </ListItem>
          ))}

          {navItems[this.props.section].greenNav && (
            <ListItem
              key={navItems[this.props.section].greenNav}
              disablePadding
              sx={{
                borderWidth: "0 0 0.1rem 0",
                borderColor: "rgba(0, 0, 0, 0.1)",
                borderStyle: "solid",
              }}
            >
              <ListItemButton>
                <Link
                  to={navItems[this.props.section].greenNav.link}
                  style={{ textDecoration: "none", fontWeight: "300" }}
                  className="bold headerLink"
                  onClick={() => {
                    navItems[this.props.section].greenNav.action &&
                      navItems[this.props.section].greenNav.action();
                  }}
                >
                  {navItems[this.props.section].greenNav.label}
                </Link>
              </ListItemButton>
            </ListItem>
          )}

          {navItems[this.props.section].blueBtn && (
            <ListItem
              disablePadding
              sx={{
                borderWidth: "0 0 0.1rem 0",
                borderColor: "rgba(0, 0, 0, 0.1)",
                borderStyle: "solid",
              }}
            >
              <ListItemButton>
                <Link
                  to={navItems[this.props.section].blueBtn.link}
                  // style={{ textDecoration: "none" }}
                  className="semi_bold headerLink"
                  style={{
                    backgroundColor: `#535CE8FF`,
                    fontWeight: "300",
                    padding: "0.5rem 1rem",
                    textAlign: "center",
                    color: "white",
                    borderRadius: "0.5rem",
                  }}
                  onClick={() => {
                    navItems[this.props.section].blueBtn.action &&
                      navItems[this.props.section].blueBtn.action();
                  }}
                >
                  {navItems[this.props.section].blueBtn.label}
                </Link>
              </ListItemButton>
            </ListItem>
          )}

          {navItems[this.props.section].right.map((item) => (
            <ListItem
              key={item}
              disablePadding
              sx={{
                borderWidth: "0 0 0.1rem 0",
                borderColor: "rgba(0, 0, 0, 0.1)",
                borderStyle: "solid",
              }}
            >
              <ListItemButton>
                <Link
                  to={item.link}
                  style={{ textDecoration: "none" }}
                  className="headerLink semi_bold"
                  onClick={() => {
                    item.action && item.action();

                    if (item.label == "Industries") {
                    
                      this.setState({
                        industriesShow: !this.state.industriesShow,
                      });
                    }
                    else this.setState({ industriesShow: false });
                  }}
                >
                  {item.label}
                </Link>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    );
  };

  getUserName = () => {
    if (this.props.isAuth) {
      return this.props.userData.user_name;
    } else return "Sign in";
  };

  render() {
    const { mobileOpen, deviceType } = this.state;
    const { theme = "dark" } = this.props;

    const navBgColor = theme == "dark" ? "#1E1E1E" : "#FFFFFF";

    return (
      <Box>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            alignContent: "center",
            padding: "0px 0px",
            // height: "80px",
          }}
        >
          <AppBar
            component="nav"
            sx={{
              // background: "transparent",
              backgroundColor: navBgColor,
              boxShadow: "none",
              position: "relative",
              zIndex: "100",
            }}
          >
            <Toolbar>
              {deviceType == "mobile" ? (
                <>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={this.handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: "none" }, cursor: "pointer" }}
                  >
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/56/56763.png"
                      style={
                        theme == "dark"
                          ? styles.menuBarLight
                          : styles.menuBarDark
                      }
                      alt="menu"
                    />
                  </IconButton>
                  <IconButton sx={{ mr: 2, display: { sm: "none" } }}>
                    <LogoNavigation
                      dark={theme === "dark"}
                      logo={navItems[this.props.section].logo}
                    />
                  </IconButton>
                </>
              ) : (
                <>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      flexGrow: 1,
                      direction: "row",
                      alignItems: "center",
                      display: { xs: "none", sm: "flex" },
                    }}
                  >
                    <LogoNavigation
                      dark={theme == "dark"}
                      logo={navItems[this.props.section].logo}
                    />
                    <div className="headerLinks">
                      {navItems[this.props.section].left.map((item) => (
                        <button
                          style={{
                            background: "transparent",
                            border: "none",
                            outline: "none",
                            cursor: "pointer",
                          }}
                        >
                          <Link
                            to={item.link}
                            className={
                              "semi_bold " +
                              "headerLink2" +
                              (item.extraClass ? " " + item.extraClass : "")
                            }
                            style={
                              item.style ?? {
                                color: theme == "dark" ? "white" : "black",
                              }
                            }
                            onClick={() => {
                              item.action && item.action();

                              if (item.label == "Industries") {
                               
                                this.setState({
                                  industriesShow: !this.state.industriesShow,
                                });
                              }
                              else this.setState({ industriesShow: false });
                            }}
                          >
                            {item.label}
                          </Link>
                        </button>
                      ))}
                    </div>
                  </Typography>
                  <Box sx={{ display: { xs: "none", sm: "block" } }}>
                    <div className="headerActions">
                      {navItems[this.props.section].greenNav && (
                        <Link
                          to={navItems[this.props.section].greenNav.link}
                          className="semi_bold orderStatus"
                          onClick={() => {
                            navItems[this.props.section].greenNav.action &&
                              navItems[this.props.section].greenNav.action();
                          }}
                        >
                          {navItems[this.props.section].greenNav.label}
                        </Link>
                      )}

                      {navItems[this.props.section].blueBtn && (
                        <Link
                          to={navItems[this.props.section].blueBtn.link}
                          className="semi_bold instantQuotation"
                          onClick={() => {
                            navItems[this.props.section].blueBtn.action &&
                              navItems[this.props.section].blueBtn.action();
                          }}
                        >
                          {navItems[this.props.section].blueBtn.label}
                        </Link>
                      )}
                      {navItems[this.props.section].right.map((item) => (
                        <Link
                          to={item.link}
                          className="headerLink2 semi_bold"
                          style={{
                            color: theme == "dark" ? "white" : "black",
                          }}
                          onClick={() => {
                            item.action && item.action();
                          }}
                        >
                          {item.type == "auth"
                            ? this.getUserName()
                            : item.label}
                        </Link>
                      ))}
                    </div>
                  </Box>
                </>
              )}
            </Toolbar>

            <Box
              sx={{
                display: this.state.industriesShow ? "block" : "none",
                // width: "100%",
                backgroundColor: theme == "dark" ? "#1E1E1E" : "#FFFFFF",
                padding: "1rem",
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
              }}
            >
              <h3 style={{ color: theme == "dark" ? "white" : "black" }}>Industries</h3>
              {[
                "Automotive",
                "Aerospace",
                "Medical",
                "Consumer Electronics",
                "Industrial",
                "Others",
              ].map((item) => {
                return (
                  <Text
                    className="headerLink2 semi_bold"
                    style={{ color: theme == "dark" ? "white" : "black" }}
                  >
                    {item}
                  </Text>
                );
              })}
            </Box>
          </AppBar>

          {/* mobile drawer */}
          <Box component="nav">
            <Drawer
              container={this.container}
              variant="temporary"
              open={mobileOpen}
              onClose={this.handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                display: { xs: "block", sm: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                  //     background: "transparent",
                  // boxShadow: "none",
                },
                backgroundImage: 'url("../../images/Image 158.png")',
              }}
            >
              {this.drawer()}
            </Drawer>
          </Box>
        </div>
      </Box>
    );
  }
}

export default redux(HeaderComponent);
const styles = {
  menuBarLight: {
    width: "2rem",
    height: "2rem",
    // invert image color
    filter: "invert(1)",
  },
  menuBarDark: {
    width: "2rem",
    height: "2rem",
    // invert image color
  },
};
