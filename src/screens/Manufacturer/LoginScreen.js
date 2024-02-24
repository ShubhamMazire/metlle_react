import React, { Component } from "react";
import { Link } from "react-router-dom";
import HeaderComponent from "../../Components/HeaderComponentMLP";
import API, { setAuthToken } from "../../Common/API";
import routes from "../../routes";

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  signIn = async (e) => {
    if (e) e.preventDefault();
    const fd = new FormData(document.querySelector("form"));
    const result = await API.post("/partner/login", fd);
    const {
      status,
      message = "Something went wrong",
      token,
      user,
    } = result.data;

    if (status === "success") {
      this.props.history.push({ pathname: "/customer/dashboard" });
      setAuthToken(token);
    } else alert(message);
  };

  render() {
    return (
      <div
        style={{
          backgroundColor: "#f8f9fa",
        }}
      >
        <HeaderComponent section="man_login" theme="light" />

        <div style={styles.loginPopup}>
          <div style={styles.loginPopupContent}>
            <h2
              style={{
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              sign in
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                this.signIn(e);
              }}
            >
              {/* email input with label email and email icon at left with inputbox */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "20px 0px",
                }}
              >
                <div className="label">email</div>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <i className="input-group-text fa fa-envelope"></i>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    id="email"
                    name="email"
                  />
                </div>
              </div>
              {/* Password input with label email and email icon at left with inputbox */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "20px 0px",
                }}
              >
                <div className="label">password</div>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <i className="input-group-text fa fa-lock"></i>
                  </div>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    id="password"
                    name="password"
                  />
                </div>
              </div>

              {/* Rememebr me checkbox at left and forgot password at rigth */}

              {/* <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  alignContent: "center",
                  margin: "20px 0px",
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
                  <input type="checkbox" name="rememberMe" id="rememberMe" />
                  <span
                    style={{
                      margin: "0px 10px",
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
              <span
                className="mt-2 btn btn-primary d-flex flex-row justify-content-center"
                type="submit"
                onClick={() => {
                  this.signIn();
                }}
              >
                Sign In
              </span>
            </form>
            {/* dont have accont?signup at center signup text color blue */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
                margin: "20px 0px",
              }}
            >
              <div>Don't have an account?</div>
              <Link
                style={{
                  cursor: "pointer",
                }}
                className="text-primary"
                to={routes.manufacturer.register}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginScreen;

const styles = {
  loginPopup: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "80vh",
  },
  loginPopupContent: {
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "6px 5px 10px rgba(0, 0, 0, 0.5)",
    padding: "20px",
    // textAlign: "center",
    minWidth: "30%",
  },
};
