import React, { Component } from "react";
import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import "./loginstyle.css";
import TextField from "@mui/material/TextField";
import HeaderComponent from "../../Components/HeaderComponentMLP";
import API, { URL_PATH } from "../../Common/API";

class RegistrationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 1,
      stepCount: 4,
      industries: [],
      passwordVisible: false,
      confirmPasswordVisible: false,
    };
  }

  componentDidMount() {
    this.getIndustries();
  }

  getIndustries = async () => {
    const result = await API.get("/customer/getIndustryList");
    const { data } = result.data;
    this.setState({
      industries: data,
    });
  };

  register = async (e = null) => {
    if (e) e.preventDefault();
    var formData = null;
    if (e == null) {
      formData = new FormData(document.getElementsByTagName("form")[0]);
    } else {
      formData = new FormData(e.target);
    }
    const result = await API.post("/customer/register", formData);
    const { status, message = "Something went wrong" } = result.data;
    if (status === "success") {
      alert(message);
      this.props.history.push({ pathname: "/customer/login" });
    } else alert(message);
  };

  render() {
    const { passwordVisible, confirmPasswordVisible } = this.state;

    return (
      <Box
        style={{
          backgroundColor: "#f8f9fa",
          fontSize: "1.13rem", // Updated font size to 1.13rem
        }}
        className="container-fluid"
      >
        <HeaderComponent
          section="signup"
          theme="light"
          bgColor={`rgba(255,255,255,0.9)`}
        />
        <div
          className=" container-fluid d-flex flex-row justify-content-center row"
          style={{
            marginTop: "5rem", // Updated margin top to 5rem
          }}
        >
          <div className="col-lg-6 " id="registerForm">
            <form onSubmit={this.register} className="px-4 py-2">
              <h3
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "2.72rem", // Updated font size to 2.72rem
                }}
              >
                Create an account
              </h3>
              {/* form */}
              <div>
                {/* name last name */}
                <div className="row">
                  <div className="col-lg-6 form-group mb-3">
                    <label>full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="user_full_name"
                      style={{ fontSize: "1.088rem" }} // Updated font size to 1.088rem
                    />
                  </div>
                  <div className="col-lg-6 form-group mb-3 ">
                    <label>company Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="company_name"
                      style={{ fontSize: "1.088rem" }} // Updated font size to 1.088rem
                    />
                  </div>
                </div>

                {/* Country, state */}
                <div className="row">
                  <div className="col-lg-6 form-group mb-3">
                    <label>country</label>
                    <input
                      type="text"
                      className="form-control"
                      name="country"
                      style={{ fontSize: "1.088rem" }} // Updated font size to 1.088rem
                    />
                  </div>
                  <div className="col-lg-6 form-group mb-3">
                    <label>state</label>
                    <input
                      type="text"
                      className="form-control"
                      name="state"
                      style={{ fontSize: "1.088rem" }} // Updated font size to 1.088rem
                    />
                  </div>
                </div>

                {/* City, Pincode */}
                <div className="row">
                  <div className="col-lg-6 form-group mb-3">
                    <label>city</label>
                    <input
                      type="text"
                      className="form-control"
                      name="city"
                      style={{ fontSize: "1.088rem" }} // Updated font size to 1.088rem
                    />
                  </div>
                  <div className="col-lg-6 form-group mb-3">
                    <label>pincode</label>
                    <input
                      type="text"
                      className="form-control"
                      name="pincode"
                      style={{ fontSize: "1.088rem" }} // Updated font size to 1.088rem
                    />
                  </div>
                </div>

                {/* Contact number, Industry */}
                <div className="row">
                  <div className="col-lg-6 form-group mb-3">
                    <label>contact number</label>
                    <input
                      type="text"
                      className="form-control"
                      name="contact_number"
                      style={{ fontSize: "1.088rem" }} // Updated font size to 1.088rem
                    />
                  </div>
                  <div className="col-lg-6 form-group mb-3">
                    <label>industry</label>
                    <select
                      className="form-control"
                      id="exampleFormControlSelect1"
                      name="industry_id"
                      style={{ fontSize: "1.088rem" }} // Updated font size to 1.088rem
                    >
                      <option value="Aerospace and Defense">
                        Aerospace and Defense
                      </option>
                      <option value="Automation">Automation</option>
                      <option value="Automotive">Automotive</option>
                      <option value="Consumer Products">
                        Consumer Products
                      </option>
                      <option value="Design Services">Design Services</option>
                      <option value="Drone">Drone</option>
                      <option value="Education">Education</option>
                      <option value="Electronics and Semiconductors">
                        Electronics and Semiconductors
                      </option>
                      <option value="Energy">Energy</option>
                      <option value="FMCG">FMCG</option>
                      <option value="General Engineering">
                        General Engineering
                      </option>
                      <option value="Hardware Startups">
                        Hardware Startups
                      </option>
                      <option value="Industrial">Industrial</option>
                      <option value="Oil & Gas">Oil & Gas</option>
                      <option value="Medical and Dental">
                        Medical and Dental
                      </option>
                      <option value="Robotics">Robotics</option>
                      <option value="Supply Chain and Purchasing">
                        Supply Chain and Purchasing
                      </option>
                    </select>
                  </div>
                </div>
                {/* work email */}
                <div className="form-group mb-3">
                  <label>work email</label>
                  <input
                    type="text"
                    className="form-control"
                    name="user_email_id"
                    style={{ fontSize: "1.088rem" }} // Updated font size to 1.088rem
                  />
                </div>

                {/* password */}
                <div className="row">
                  <div className="col-lg-6 form-group mb-3">
                    <label>password</label>
                    <div className="input-group">
                      <input
                        type={passwordVisible ? "text" : "password"}
                        className="form-control"
                        placeholder="Enter at least 8+ characters"
                        name="user_password"
                        style={{ fontSize: "1.088rem" }} // Updated font size to 1.088rem
                      />
                      <div
                        className="input-group-prepend"
                        onClick={() =>
                          this.setState({ passwordVisible: !passwordVisible })
                        }
                      >
                        {passwordVisible ? (
                          <i className="input-group-text fa fa-eye-slash"></i>
                        ) : (
                          <i className="input-group-text fa fa-eye"></i>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 form-group mb-3">
                    <label>confirm password</label>
                    <div className="input-group">
                      <input
                        type={confirmPasswordVisible ? "text" : "password"}
                        className="form-control"
                        placeholder="Enter at least 8+ characters"
                        name="user_password_2"
                        style={{ fontSize: "1.088rem" }} // Updated font size to 1.088rem
                      />
                      <div
                        className="input-group-prepend"
                        onClick={() =>
                          this.setState({
                            confirmPasswordVisible: !confirmPasswordVisible,
                          })
                        }
                      >
                        {confirmPasswordVisible ? (
                          <i className="input-group-text fa fa-eye-slash"></i>
                        ) : (
                          <i className="input-group-text fa fa-eye"></i>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Full width */}
              <span
                className="btn btn-primary d-flex flex-row justify-content-center mt-4 mb-3 noramtext"
                type="submit"
                onClick={() => {
                  this.register();
                }}
                style={{
                  fontSize: "1rem", // Updated font size to 1.78rem
                  padding: "0.7rem 0rem", // Updated padding to 0.5rem 1.5rem
                }}
              >
                Sign up
              </span>
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
                <div>already have an account? </div>
                <Link
                  style={{
                    cursor: "pointer",
                    marginLeft: 10,
                  }}
                  className="text-primary"
                  to={"/customer/login"}
                >
                  log in
                </Link>
              </div>
            </form>
          </div>
          <div className="col-lg-4">
            <img
              src="/assets/customerLogin.png"
              alt=""
              width="auto"
              height="92%"
            />
          </div>
        </div>
      </Box>
    );
  }
}

export default RegistrationScreen;
