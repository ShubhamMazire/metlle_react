import React, { Component } from "react";
import { Link } from "react-router-dom";

import HeaderComponent from "../../Components/HeaderComponentMLP";

import "./loginstyle.css";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
// password mui icon
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import lock icon
import LockIcon from "@mui/icons-material/Lock";
// email icon
import EmailIcon from "@mui/icons-material/Email";

import API, { setAuthToken } from "../../Common/API";

import Box from "@mui/material/Box";

import redux from "../../Common/Redux";
import routes from "../../routes";
class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordVisible: false,
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token && this.props.isAuth && this.props.userData.user_role === "customer") {
      this.props.history.push(routes.customer.quotation);
    }
  }

  login = async (e) => {
    if (e) e.preventDefault();
    const fd = new FormData(document.querySelector("form"));
    const result = await API.post("/customer/login", fd);

    const {
      status,
      message = "Something went wrong",
      token,
      user,
    } = result.data;

    if (status === "success") {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      API.defaults.headers.common["authorization"] = token;
      API.defaults.headers.common["role"] = `customer`;

      const ids = this.props.guestUserModelId;

      if (ids.length > 0) {
        const result = await API.post("customer/map_guest_file_to_user", {
          files:JSON.stringify(ids),
        });
        this.props.vanishGuestUserModelId();
      }

      this.props.setUser(user);
      this.props.setAuth(true);

      // this.props.history.push("/user/profile");
      // this.props.history.push(baseUri);
      // setAuthToken(token);
      // this.props.history.push({ pathname: "/customer/dashboard" });
    } else alert(message);
  };

  render() {
    const { passwordVisible } = this.state;

    return (
      <div
        style={{
          backgroundColor: "#f8f9fa",
        }}
      >
        <HeaderComponent section="login" theme="light" />
        <div style={styles.loginPopup}>
          <Box
            // component="form"
            sx={{
              "& .MuiTextField-root": { m: 1 },
              display: "block",
              backgroundColor: "white",
              borderRadius: "10px" ,
              boxShadow:
                "0px 0px 10px rgba(255,255,255, 0.5)" ,
              padding: "20px" ,
              minWidth: "30%" /* Multiply 30% by 0.64 */,
              fontSize: "1.78rem" /* Multiply 1.78rem by 0.64 */,
            }}
            noValidate
            autoComplete="off"
          >
            <div
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "2rem" /* Multiply 2rem by 0.64 */,
              }}
            >
              sign in
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                this.login(e);
              }}
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* email input with label email and email icon at left with inputbox */}

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                // label="Phone Number"
                name="user_email_id"
                autoFocus
                // onChange={handlePhoneNumberChange}
                // className={classes.textField}
                placeholder="Enter your email"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />

              {/* Password input with label email and email icon at left with inputbox */}
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="phoneNumber"
                label="Password"
                // label="Phone Number"
                name="user_password"
                type={passwordVisible ? "text" : "password"}
                // onChange={handlePhoneNumberChange}
                // className={classes.textField}
                placeholder="Enter your password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment
                      onClick={() =>
                        this.setState({ passwordVisible: !passwordVisible })
                      }
                    >
                      {passwordVisible ? <Visibility /> : <VisibilityOff />}
                    </InputAdornment>
                  ),
                }}
              />

              {/* Rememebr me checkbox at left and forgot password at rigth */}
              {/* <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  alignContent: "center",
                  margin: "12.8px 0px" ,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    alignContent: "center",
                  }}
                >
                  <input
                    type="checkbox"
                    name="rememberMe"
                    id="rememberMe"
                    style={{
                      backgroundColor: "#f3f4f6",
                    }}
                  />
                  <span
                    style={{
                      margin: "0px 10.24px" ,
                      fontSize: "1rem" ,
                    }}
                    htmlFor="rememberMe"
                  >
                    Remember me
                  </span>
                </div>
                <div className="text-primary" onClick={() => {
                    this.props.history.push({ pathname: routes.forgotPass });
                  }}>Forgot Password</div>
              </div> */}

              {/* Full width */}
              {/* <button> */}
              <span
                onClick={() => {
                  this.login();
                }}
                className="mt-2 btn btn-primary d-flex flex-row justify-content-center"
                style={{
                  fontSize: "1rem" ,
                  padding: "7px 0px" /* Multiply 7px by 0.64 */,
                }}
              >
                Sign In
              </span>
              {/* </button> */}
            </form>
            {/* dont have accont?signup at center signup text color blue */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
                margin: "12.8px 0px" ,
                fontSize: "0.96rem" /* Multiply 1.5rem by 0.64 */,
              }}
            >
              <div>Don't have an account?</div>
              <Link
                style={{
                  cursor: "pointer",
                  marginLeft: "6.4px" ,
                  textDecoration: "none",
                }}
                className="text-primary"
                to={"/customer/register"}
              >
                Sign Up
              </Link>
            </div>
          </Box>
        </div>
      </div>
    );
  }
}

export default redux(LoginScreen);

const styles = {
  loginPopup: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "80vh" /* Multiply 80vh by 0.64 */,
    fontSize: "1.1424rem" /* Multiply 1.78rem by 0.64 */,
    backgroundColor: "#f8f9fa",
  },
};
