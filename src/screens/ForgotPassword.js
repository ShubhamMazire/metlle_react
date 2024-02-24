import React, { Component } from "react";
import { Link } from "react-router-dom";

import HeaderComponent from "../Components/HeaderComponentMLP";

// import "./loginstyle.css";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
// password mui icon
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import lock icon
import LockIcon from "@mui/icons-material/Lock";
// email icon
import EmailIcon from "@mui/icons-material/Email";

import API, { URL_PATH, setAuthToken } from "../Common/API";

import Box from "@mui/material/Box";

import redux from "../Common/Redux";
import routes from "../routes";

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordVisible: false,

      otp_sent: false,
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (
      token &&
      this.props.isAuth &&
      this.props.userData.user_role === "msas"
    ) {
      this.props.history.push("/msaas/dashboard");
    }
  }

  login = async (e) => {
    if (e) e.preventDefault();
    const fd = new FormData(document.querySelector("form"));
    const result = await API.post(URL_PATH.msaas_login, fd);

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
          files: JSON.stringify(ids),
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

  verify_otp = async (e) => {
    const value = document.getElementById("email").value;

    window.alert({
      title: "Invalid OTP",
      text: "Please enter a valid OTP",
      icon: "error",
      timer: 3000,
    });
  };

  reset = async (e) => {
    if (this.state.otp_sent) return this.verify_otp();

    this.setState({ otp_sent: true });

    const value = document.getElementById("email").value;

    document.querySelector("form").reset();

    // const result = await API.post(URL_PATH.msaas_reset_password, {user_email_id:value});
  };

  render() {
    const { passwordVisible, otp_sent } = this.state;

    return (
      <Box
        sx={{
          backgroundColor: "#f8f9fa",
        }}
      >
        <HeaderComponent section="msas_login" theme="light" />
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
              className="bold"
            >
              {otp_sent ? "Enter OTP" : "Reset Password"}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                this.reset();
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
                label={otp_sent ? "OTP" : "Email"}
                // label="Phone Number"
                name="user_email_id"
                autoFocus
                // onChange={handlePhoneNumberChange}
                // className={classes.textField}
                placeholder={otp_sent ? "Enter OTP" : "Enter your email"}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />

              {/* resend otp */}
              {otp_sent && (
                <div
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "1rem" /* Multiply 2rem by 0.64 */,
                  }}
                >
                  <span
                    onClick={() => {}}
                    className=" d-flex flex-row flex-end bold"
                    style={{
                      fontSize: "1rem" ,
                      padding: "7px 0px" /* Multiply 7px by 0.64 */,
                      color: "blue",
                    }}
                  >
                    Resend OTP
                  </span>
                </div>
              )}

              {/* Full width */}
              {/* <button> */}
              <span
                onClick={() => {
                  this.reset();
                }}
                className="btn btn-primary d-flex flex-row justify-content-center bold"
                style={{
                  fontSize: "1rem" ,
                  padding: "7px 0px" /* Multiply 7px by 0.64 */,
                }}
              >
                {otp_sent ? "Submit" : "Send OTP"}
              </span>
              {/* </button> */}
            </form>
          </Box>
        </div>
      </Box>
    );
  }
}

export default redux(LoginScreen);

const styles = {
  loginPopup: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh" /* Multiply 80vh by 0.64 */,
    fontSize: "1.1424rem" /* Multiply 1.78rem by 0.64 */,
    backgroundColor: "#f8f9fa",
  },
};
