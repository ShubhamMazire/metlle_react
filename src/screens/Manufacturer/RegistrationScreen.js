import React, { Component } from "react";
import HeaderComponent2 from "../../Components/HeaderComponent2";
import API, { setAuthToken } from "../../Common/API";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import routes from "../../routes";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

class RegistrationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 1,
      stepCount: 4,
      processes: [{}],
      machinaries: [
        {
          material: [],
        },
      ],
      activeMachinary: -1,
      files: [],
    };
  }
  Steps = () => {
    const stepCount = this.state.stepCount;
    const activeStep = this.state.activeStep;

    // steps with check round box and line connecting to step
    const steps = [];
    for (let i = 1; i <= stepCount; i++) {
      steps.push({
        id: i,
        active: i === activeStep,
        completed: i < activeStep,
      });
    }

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          margin: "20px 0px",
        }}
      >
        {steps.map((step) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  backgroundColor: step.completed
                    ? "#28a745"
                    : step.active
                    ? "#007bff"
                    : "#ffffff",
                  border: step.completed
                    ? "2px solid #28a745"
                    : step.active
                    ? "2px solid #007bff"
                    : "2px solid #6c757d",

                  color: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {step.completed ? (
                  <i className="fa fa-check"></i>
                ) : (
                  <span></span>
                )}
              </div>
              {step.id !== steps.length && (
                <div
                  style={{
                    width: "50px",
                    height: "2px",
                    backgroundColor: step.completed
                      ? "#28a745"
                      : step.active
                      ? "#007bff"
                      : "#6c757d",
                  }}
                ></div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  // 1
  companyDetails = () => {
    return (
      <div>
        <h4 className="bold mb-3" style={{ textAlign: "center" }}>
          Company Registration
        </h4>
        {/* form */}
        <div>
          {/* name last name */}
          <div className="row mb-3">
            <div className="col-lg-6 form-group">
              <label className="semi_bold" htmlFor="firstName">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                className="form-control"
                defaultValue="John"
              />
            </div>
            <div className="col-lg-6 form-group">
              <label className="semi_bold" htmlFor="lastName">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                className="form-control"
                defaultValue="Doe"
              />
            </div>
          </div>

          {/* Company name, gst number */}
          <div className="row mb-3">
            <div className="col-lg-6 form-group">
              <label className="semi_bold" htmlFor="companyName">
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                className="form-control"
                defaultValue="ABC Corporation"
              />
            </div>
            <div className="col-lg-6 form-group">
              <label className="semi_bold" htmlFor="gstNumber">
                GST Number
              </label>
              <input
                type="text"
                id="gstNumber"
                className="form-control"
                defaultValue="ABC1234XYZ"
              />
            </div>
          </div>

          {/* Company address */}
          <div className="form-group mb-3">
            <label className="semi_bold" htmlFor="companyAddress">
              Company Address
            </label>
            <input
              type="text"
              id="companyAddress"
              className="form-control"
              defaultValue="123, Main Street, City"
            />
          </div>

          {/* pin code, contact number */}
          <div className="form-group mb-3 row">
            <div className="col-lg-6 form-group">
              <label className="semi_bold" htmlFor="pinCode">
                Pin Code
              </label>
              <input
                type="text"
                id="pinCode"
                className="form-control"
                defaultValue="123456"
              />
            </div>
            <div
              className="col-lg-6 form-group"
              title="mention WhatsApp account number"
            >
              <label className="semi_bold" htmlFor="contactNumber">
                Contact Number
              </label>
              <input
                type="text"
                id="contactNumber"
                className="form-control"
                defaultValue="+1234567890"
              />
            </div>
          </div>

          {/* email input with label email and email icon at left with input box */}
          <div
            className="form-group mb-3"
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label className="semi_bold label">
              Email
              <span
                style={{
                  fontSize: "12px",
                }}
              >
                &nbsp;&nbsp; (you will receive order notification on this mail
                id)
              </span>
            </label>
            <div className="input-group">
              <div className="input-group-prepend">
                <i className="input-group-text fa fa-envelope"></i>
              </div>
              <input
                type="text"
                id="email"
                className="form-control"
                defaultValue="john.doe@example.com"
                placeholder="Enter your email"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
          </div>

          {/* password, confirm password */}
          <div className="row mb-3">
            <div className="col-lg-6 form-group">
              <label className="semi_bold" htmlFor="password">
                Password
              </label>
              <div className="input-group">
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  defaultValue="password123"
                  placeholder="Enter at least 8+ characters"
                />
                <div className="input-group-prepend">
                  <i className="input-group-text fa fa-eye"></i>
                </div>
              </div>
            </div>
            <div className="col-lg-6 form-group">
              <label className="semi_bold" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <div className="input-group">
                <input
                  type="password"
                  id="confirmPassword"
                  className="form-control"
                  defaultValue="password123"
                  placeholder="Enter at least 8+ characters"
                />
                <div className="input-group-prepend">
                  <i className="input-group-text fa fa-eye"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <span
          className="d-flex flex-row justify-content-end"
          onClick={() => {
            this.handleCompanyDetails();
          }}
        >
          <span
            className=" semi_bold"
            style={{
              margin: "0px 10px",
              padding: "10px 30px",
              backgroundColor: "#0d6efd",
              color: "white",
              borderRadius: "0.3rem",
            }}
          >
            next
          </span>
        </span>
      </div>
    );
  };

  // handle company/personal details

  handleCompanyDetails = async () => {
    const formData = new FormData();

    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const companyName = document.getElementById("companyName").value;
    const gstNumber = document.getElementById("gstNumber").value;
    const companyAddress = document.getElementById("companyAddress").value;
    const pinCode = document.getElementById("pinCode").value;
    const contactNumber = document.getElementById("contactNumber").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (firstName == "") return alert("Please enter first name");

    if (lastName == "") return alert("Please enter last name");

    if (companyName == "") return alert("Please enter company name");

    if (contactNumber == "") return alert("Please enter contact number");

    if (email == "") return alert("Please enter email");

    if (password == "" || password.length < 8)
      return alert("Please enter password of atleast 8 characters");

    if (password != confirmPassword)
      return alert("Password and confirm password do not match");

    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("companyName", companyName);
    formData.append("gstNumber", gstNumber);
    formData.append("companyAddress", companyAddress);
    formData.append("pinCode", pinCode);
    formData.append("contactNumber", contactNumber);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);

    const result = await API.post("/partner/register", formData);

    const {
      status,
      message = "Something went wrong",
      token,
      user,
    } = result.data;

    if (status === "success") {
      setAuthToken(token);
      this.setState({
        activeStep: 2,
      });
    } else alert(message);
  };

  handleChange = (index, field, value) => {
    const { processes } = this.state;
    const updatedProcesses = [...processes];
    updatedProcesses[index][field] = value;
    this.setState({ processes: updatedProcesses });
  };

  RenderProcessCapab = () => {
    let arr = [];

    return this.state.processes.map((item, index) => {
      return (
        <div
          key={index}
          style={{
            // shadow style
            boxShadow: "4px 4px 8px #bebebe, -4px -4px 8px #ffffff",
            borderRadius: "10px",
            padding: "20px",
            margin: "15px 0px",
          }}
        >
          {/* crposs to remove  */}
          {this.state.processes.length != 1 && (
            <div
              className="d-flex flex-row justify-content-end"
              onClick={() => {
                if (this.state.processes.length === 1) return;

                const { processes } = this.state;
                const updatedProcesses = [...processes];
                updatedProcesses.splice(index, 1);
                this.setState({ processes: updatedProcesses });
              }}
              style={{
                cursor: "pointer",
              }}
            >
              <i className="fa fa-times"></i>
            </div>
          )}

          {/* process */}
          <div className="row mb-3 align-item-center justify-content-end">
            <div className="col-lg-6 form-group">
              <label className="semi_bold" htmlFor={`process${index}`}>
                Process
              </label>
              {/* dropdown with values 
              1. CNC machining
              2. 3D printing
              3. Conventional lathe machining
              4. Finishing
              5. Inspection
              
              */}

              <select
                className="form-control"
                id={`process${index}`}
                value={item.process}
                onChange={(e) =>
                  this.handleChange(index, "process", e.target.value)
                }
                defaultValue={"CNC"}
              >
                <option value="CNC">CNC machining</option>
                <option value="3D_printing">3D printing</option>
                <option value="Conventional_lathe_machining">
                  Conventional lathe machining
                </option>
                <option value="Finishing">Finishing</option>
                <option value="Inspection">Inspection</option>
              </select>
            </div>
            <div
              className="col-lg-6 form-group"
              onClick={() => {
                this.addOneMoreProcess();
              }}
              style={{
                cursor: "pointer",
              }}
            >
              + Add more than one processes
            </div>
          </div>

          {/* sub process */}
          <div className="col-lg-12 form-group mt-2 mb-1">
            <label className="semi_bold" htmlFor={`subProcess${index}`}>
              Sub processes
            </label>
            <input
              type="text"
              className="form-control"
              id={`subProcess${index}`}
              value={item.subProcess}
              placeholder="Ex. CNC Milling, CNC Turning, etc."
              onChange={(e) =>
                this.handleChange(index, "subProcess", e.target.value)
              }
              defaultValue={"CNC"}
            />
          </div>
        </div>
      );
    });
  };

  handleProcessCapab = async () => {
    const formData = new FormData();
    const processes = this.state.processes;

    processes.forEach((item, index) => {
      if (item.process === "") {
        return alert(`Please select process for process ${index + 1}`);
      }
      if (item.subProcess === "") {
        return alert(`Please enter sub process for process ${index + 1}`);
      }
    });

    const industry = document.getElementById("industry").value;
    const experience = document.getElementById("experience").value;
    const certification = document.getElementById("certification").value;
    const otherProcesses = document.getElementById("otherProcesses").value;
    formData.append("industry", industry);
    formData.append("experience", experience);
    formData.append("certification", certification);
    formData.append("otherProcesses", otherProcesses);
    formData.append("processes", JSON.stringify(processes));

    // return console.log(formData);

    const result = await API.post("/partner/processes", formData);

    const {
      status,
      message = "Something went wrong",
      token,
      user,
    } = result.data;

    if (status === "success") {
      this.setState({
        activeStep: 3,
      });
    } else alert(message);
  };

  addOneMoreProcess = () => {
    this.setState({ processes: [...this.state.processes, {}] });
  };
  // 2
  processCapab = () => {
    return (
      <div>
        <h4
          className="bold mb-3"
          style={{
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Process Capability
        </h4>
        {/* form */}
        <div>
          {/* name last name */}
          {/* process capablities */}

          {this.RenderProcessCapab()}

          {/* Company address */}
          <div className="form-group mb-3">
            <label className="semi_bold" for="exampleInputEmail1">
              Industry
            </label>
            <select name="industry" className="form-control select">
              <option value="Aerospace and Defense">
                Aerospace and Defense
              </option>
              <option value="Automation">Automation</option>
              <option value="Automotive">Automotive</option>
              <option value="Consumer Products">Consumer Products</option>
              <option value="Design Services">Design Services</option>
              <option value="Drone">Drone</option>
              <option value="Education">Education</option>
              <option value="Electronics and Semiconductors">
                Electronics and Semiconductors
              </option>
              <option value="Energy">Energy</option>
              <option value="FMCG">FMCG</option>
              <option value="General Engineering">General Engineering</option>
              <option value="Hardware Startups">Hardware Startups</option>
              <option value="Industrial">Industrial</option>
              <option value="Oil & Gas">Oil & Gas</option>
              <option value="Medical and Dental">Medical and Dental</option>
              <option value="Robotics">Robotics</option>
              <option value="Supply Chain and Purchasing">
                Supply Chain and Purchasing
              </option>
            </select>
          </div>

          {/* pin code, contact number */}

          <div className=" mb-3 col-lg-12 form-group">
            <label className="semi_bold" for="exampleInputEmail1">
              Experience (in years)
            </label>
            <input
              type="text"
              className="form-control"
              id="experience"
              defaultValue={"5"}
            />
          </div>
          <div className="col-lg-12 form-group mb-3">
            <label className="semi_bold" for="exampleInputEmail1">
              Certification
            </label>
            <input
              type="text"
              className="form-control"
              id="certification"
              defaultValue={"ISO 9001:2015"}
            />
          </div>

          <div className="col-lg-12 form-group mb-3">
            <label className="semi_bold" for="exampleInputEmail1">
              Please mention any other processes you can do
              <span
                style={{
                  fontSize: "12px",
                }}
              >
                &nbsp; &nbsp; (It will be preferrable if you can do other
                processes as well)
              </span>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="example. we can do finishing or inspection through our connections"
              id="otherProcesses"
              defaultValue={"Xerox, Printing"}
            />
          </div>
        </div>
        {/* actions */}
        <div className=" d-flex flex-row justify-content-between my-4">
          <span
            className=" semi_bold"
            style={{
              margin: "0px 10px",
              padding: "10px 30px",
              backgroundColor: "#0d6efd",
              color: "white",
              borderRadius: "0.3rem",
            }}
            onClick={() => {
              this.setState({
                activeStep: 1,
              });
            }}
          >
            back
          </span>

          <span
            className=" semi_bold"
            style={{
              margin: "0px 10px",
              backgroundColor: "#F1F2FDFF",
              color: "#535CE8FF",
              borderWidth: 0,
              padding: "10px 30px",
            }}
            onClick={() => {
              this.setState({
                activeStep: 3,
              });
            }}
          >
            save for later
          </span>
          <span
            className=" semi_bold"
            style={{
              margin: "0px 10px",
              padding: "10px 30px",
              backgroundColor: "#0d6efd",
              color: "white",
              borderRadius: "0.3rem",
            }}
            onClick={() => {
              this.setState({
                activeStep: 3,
              });

              this.handleProcessCapab();
            }}
          >
            next
          </span>
          {/* <i className="fa fa-arrow-right"></i> */}
        </div>
      </div>
    );
  };

  handleMachinaryChange = (index, field, value) => {
    const { machinaries } = this.state;
    const updatedMachinaries = [...machinaries];
    updatedMachinaries[index][field] = value;
    this.setState({ machinaries: updatedMachinaries });
  };

  handleMachinaries = async () => {
    const url = "/partner/machines";
    const formData = new FormData();
    const machinaries = this.state.machinaries;
    formData.append("machines", JSON.stringify(machinaries));

    console.log(formData);

    const result = await API.post(url, formData);

    const { status, message = "Something went wrong", data } = result.data;

    if (status === "success") {
      this.setState({
        activeStep: 4,
      });
    } else alert(message);
  };
  // 3
  RenderMachinaries = (item, index) => {
    return (
      <div
        style={{
          // shadow style
          boxShadow: "4px 4px 8px #bebebe, -4px -4px 8px #ffffff",
          borderRadius: "10px",
        }}
        className="p-3 mb-3"
      >
        {/* form */}

        <h3 className="semi_bold">Machine {index + 1}</h3>
        <div>
          {/* process and model make */}
          <div className="row mb-3">
            <div className="col-lg-6 form-group">
              <label
                style={{ fontSize: "1rem" }}
                className="semi_bold"
                for="exampleInputEmail1"
              >
                Process
              </label>

              <select
                className="form-control"
                id={`process${index}`}
                value={item.process}
                onChange={(e) =>
                  this.handleMachinaryChange(index, "process", e.target.value)
                }
                defaultValue={"cnc_turning"}
              >
                <option value="cnc_turning">cnc turning</option>
                <option value="cnc_milling">cnc milling</option>
                <option value="conventional_lathe_machining">
                  conventional lathe machining
                </option>
                <option value="fused_deposition_modeling">
                  fused deposition modeling
                </option>
                <option value="stereolithography">stereolithography</option>
                <option value="selective_laser_sintering">
                  selective laser sintering
                </option>
                <option value="metal_3d_printing">metal 3d printing</option>
                <option value="finishing">finishing</option>
                <option value="co_ordinate_measuring_machine">
                  co ordinate measuring machine
                </option>
              </select>
            </div>
            <div className="col-lg-6 form-group">
              <label
                style={{ fontSize: "1rem" }}
                className="semi_bold"
                for="exampleInputEmail1"
              >
                Model/make
              </label>
              <input
                type="text"
                className="form-control"
                value={item.model}
                onChange={(e) =>
                  this.handleMachinaryChange(index, "model", e.target.value)
                }
              />
            </div>
          </div>

          {/* max allowable part size */}
          <div className="row mb-3">
            <div className="col-lg-6 form-group">
              <label
                style={{ fontSize: "1rem" }}
                className="semi_bold"
                for="exampleInputEmail1"
              >
                max. allowable part size(mm)
              </label>
              <input
                type="text"
                className="form-control"
                value={item.maxAllowablePartSize}
                onChange={(e) =>
                  this.handleMachinaryChange(
                    index,
                    "maxAllowablePartSize",
                    e.target.value
                  )
                }
                placeholder="Ex. 1000x1000x1000"
              />
            </div>
            <div className="col-lg-6 form-group">
              <label
                style={{ fontSize: "1rem" }}
                className="semi_bold"
                for="exampleInputEmail1"
              >
                min. allowable part size(mm)
              </label>
              <input
                type="text"
                className="form-control"
                value={item.minAllowablePartSize}
                onChange={(e) =>
                  this.handleMachinaryChange(
                    index,
                    "minAllowablePartSize",
                    e.target.value
                  )
                }
                placeholder="Ex. 10x10x10"
              />
            </div>
          </div>

          {/* fine surface roghy */}
          <div className="row mb-3">
            <div className="col-lg-6 form-group">
              <label
                style={{ fontSize: "1rem" }}
                className="semi_bold no_trans"
                for="exampleInputEmail1"
              >
                finest surface roughness(Ra)
              </label>
              <input
                type="text"
                className="form-control no_trans"
                value={item.finestSurfaceRoughness}
                onChange={(e) =>
                  this.handleMachinaryChange(
                    index,
                    "finestSurfaceRoughness",
                    e.target.value
                  )
                }
                placeholder="ex. 1.6 Ra"
              />
            </div>
            <div className="col-lg-6 form-group">
              <label
                style={{ fontSize: "1rem" }}
                className="semi_bold"
                for="exampleInputEmail1"
              >
                finest achievable tolerance(mm)
              </label>
              <input
                type="text"
                className="form-control"
                value={item.finestAchievableTolerance}
                onChange={(e) =>
                  this.handleMachinaryChange(
                    index,
                    "finestAchievableTolerance",
                    e.target.value
                  )
                }
                placeholder="ex. ±0.125"
              />
            </div>
          </div>

          {/* max allowable part size */}
          <div className="row mb-3">
            <div className="col-lg-6 form-group">
              <label
                style={{ fontSize: "1rem" }}
                className="semi_bold"
                for="exampleInputEmail1"
              >
                max. machinable hardness(hrc)
              </label>
              <input
                type="text"
                className="form-control"
                value={item.maxMachinableHardness}
                onChange={(e) =>
                  this.handleMachinaryChange(
                    index,
                    "maxMachinableHardness",
                    e.target.value
                  )
                }
              />
            </div>
            <div className="col-lg-6 form-group">
              <label
                style={{ fontSize: "1rem" }}
                className="semi_bold"
                for="exampleInputEmail1"
              >
                maximum speed(rpm)
              </label>
              <input
                type="text"
                className="form-control"
                value={item.maximumSpeed}
                onChange={(e) =>
                  this.handleMachinaryChange(
                    index,
                    "maximumSpeed",
                    e.target.value
                  )
                }
              />
            </div>
          </div>

          <FormControl className="form-group" sx={{ width: "100%" }}>
            <label style={{ fontSize: "1rem" }} className="semi_bold">
              {" "}
              material (more variety of materials, more probability of order)
            </label>
            {/* <InputLabel id="demo-multiple-checkbox-label">
              material (more variety of materials, more probability of order)
            </InputLabel> */}
            <Select
              // labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={item.material}
              onChange={(e) => {
                this.handleMachinaryChange(index, "material", e.target.value);
              }}
              // input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {[
                {
                  key: "aluminium",
                  value: "Aluminium",
                },
                {
                  key: "plain_carbon_steel",
                  value: "Plain Carbon Steel",
                },
                {
                  key: "alloy_steel",
                  value: "Alloy Steel",
                },
                {
                  key: "tool_steel",
                  value: "Tool Steel",
                },
                {
                  key: "stainless_steel",
                  value: "Stainless Steel",
                },
                {
                  key: "copper_alloy",
                  value: "Copper Alloy",
                },
                {
                  key: "titanium",
                  value: "Titanium",
                },
                {
                  key: "super_alloys",
                  value: "Super Alloys",
                },
                {
                  key: "engineering_plastics",
                  value: "Engineering Plastics",
                },
                {
                  key: "pla",
                  value: "Pla",
                },
                {
                  key: "ptfe",
                  value: "Ptfe",
                },
                {
                  key: "petg",
                  value: "Petg",
                },
                {
                  key: "abs",
                  value: "Abs",
                },
                {
                  key: "nylon",
                  value: "Nylon",
                },
                {
                  key: "other",
                  value: "Other",
                },
              ].map((item2) => (
                <MenuItem key={item2.key} value={item2.key}>
                  <Checkbox checked={item.material.indexOf(item2.key) > -1} />
                  <ListItemText primary={item2.value} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* Save */}

        <div className=" d-flex flex-row justify-content-center my-4">
          <span
            className=" semi_bold"
            style={{
              margin: "0px 10px",
              padding: "10px 30px",
              backgroundColor: "#0d6efd",
            }}
            onClick={() => {
              this.setState({
                activeMachinary: -1,
              });
            }}
          >
            save
          </span>
        </div>
      </div>
    );
  };

  machinaries = () => {
    return (
      <div>
        <div className="d-flex flex-row justify-content-between align-items-center">
          <h4
            className="mb-3 bold"
            style={{
              flex: 1,
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            machineries
          </h4>

          {/* hide on user adding machine open */}
          {this.state.activeMachinary === -1 && (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                width: "30px",
                height: "30px",
                color: "gray",
                fontWeight: "bold",
                cursor: "pointer",

                marginRight: "10px",
              }}
              onClick={() => {
                // add one more machinary
                this.setState({
                  machinaries: [...this.state.machinaries, { material: [] }],
                });
              }}
            >
              <i
                style={{
                  fontSize: "15px",
                }}
                className="fa fa-plus"
              ></i>{" "}
              <span
                style={{
                  fontSize: "1rem",
                }}
              >
                &nbsp;Add
              </span>
            </div>
          )}
        </div>

        {/* form */}

        {/* this.state. */}

        {this.state.activeMachinary === -1
          ? this.state.machinaries.map((item, index) => {
              return (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "row",

                    // shadow style
                    boxShadow: "4px 4px 8px #bebebe, -4px -4px 8px #ffffff",
                    borderRadius: "10px",
                    padding: "20px",
                    margin: "15px 0px",
                  }}
                >
                  <div
                    className="semi_bold"
                    style={{
                      cursor: "pointer",
                      flex: 1,
                      fontSize: "1.2rem",
                    }}
                  >
                    machine {index + 1}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "30px",
                        height: "30px",

                        color: "gray",
                        fontWeight: "bold",
                        cursor: "pointer",
                        marginRight: "10px",
                        fontSize: "25px",
                      }}
                      onClick={() => {
                        this.setState({
                          activeMachinary: index,
                        });
                      }}
                    >
                      <i className="fa fa-edit"> </i>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "30px",
                        height: "30px",
                        color: "gray",
                        cursor: "pointer",
                        fontSize: "25px",
                      }}
                      onClick={() => {
                        const { machinaries } = this.state;
                        const updatedMachinaries = [...machinaries];
                        updatedMachinaries.splice(index, 1);
                        this.setState({ machinaries: updatedMachinaries });
                      }}
                    >
                      <i className="fa fa-trash"></i>
                    </div>
                  </div>
                </div>
              );
            })
          : this.RenderMachinaries(
              this.state.machinaries[this.state.activeMachinary],
              this.state.activeMachinary
            )}

        <div className=" d-flex flex-row justify-content-between my-4">
          <span
            className=" semi_bold"
            style={{
              margin: "0px 10px",
              padding: "10px 30px",
              backgroundColor: "#0d6efd",
              color: "white",
              borderRadius: "0.3rem",
            }}
            onClick={() => {
              this.setState({
                activeStep: 2,
              });
            }}
          >
            back
          </span>

          <span
            className=" semi_bold"
            style={{
              margin: "0px 10px",
              backgroundColor: "#F1F2FDFF",
              color: "#535CE8FF",
              borderWidth: 0,
              padding: "10px 30px",
            }}
            onClick={() => {
              // this.setState({
              //   activeStep: 3,
              // });
            }}
          >
            save for later
          </span>
          <span
            className=" semi_bold"
            style={{
              margin: "0px 10px",
              padding: "10px 30px",
              backgroundColor: "#0d6efd",
              color: "white",
            }}
            onClick={() => {
              this.handleMachinaries();
            }}
          >
            next
          </span>
          {/* <i className="fa fa-arrow-right"></i> */}
        </div>
      </div>
    );
  };

  dragenter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      this.setState({
        dragActive: true,
      });
    } else if (e.type === "dragleave") {
      this.setState({
        dragActive: false,
      });
    }
  };
  dragleave = (e) => {
    e.stopPropagation();
    this.setState({ dragOver: false });
    e.preventDefault();
  };
  dragover = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  drop = (e) => {
    e.stopPropagation();
    e.preventDefault();
    var dt = e.dataTransfer;
    var files = dt.files;
    this.handleFiles(files);
  };

  handleFiles = async (files) => {
    this.setState({ dragActive: false });
    const dropbox = document.getElementById("dropbox");

    for (var i = 0; i < files.length; i++) {
      var file = files[i];

      // Only images alowed check extemnsion match with image formats
      const filename = file.name;
      const extension = filename.split(".").pop();
      if (extension !== "jpg" && extension !== "jpeg" && extension !== "png") {
        alert("only images are allowed");
        return;
      }

      // let reader = new FileReader();

      // reader.onload = async (e) => {
      //   // console.log(e.target.result);
      //   // this.setState({
      //   //   image: e.target.result,
      //   // });

      //   // var div = document.createElement("div");
      //   // div.style.position = "relative";

      //   // // cross button
      //   // var cross = document.createElement("div");
      //   // cross.innerHTML = "X";
      //   // cross.style.position = "absolute";
      //   // cross.style.top = "0px";
      //   // cross.style.right = "0px";
      //   // cross.style.padding = "5px 10px";
      //   // cross.style.cursor = "pointer";
      //   // cross.style.color = "white";
      //   // cross.style.backgroundColor = "red";
      //   // cross.style.borderRadius = "50%";
      //   // cross.onclick = () => {
      //   //   // remove image from array
      //   //   var { files } = this.state;
      //   //   files.splice(i, 1);
      //   //   this.setState({ files: [...files] });
      //   //   // remove image from dom
      //   //   dropbox.removeChild(div);
      //   // };

      //   // div.appendChild(cross);
      //   // // image

      //   // var image = document.createElement("img");
      //   // image.src = e.target.result;
      //   // image.style.width = "150px";
      //   // image.style.height = "150px";
      //   // image.style.objectFit = "cover";
      //   // image.style.borderRadius = "10px";
      //   // image.style.margin = "10px";
      //   // image.style.cursor = "pointer";
      //   // image.onclick = () => {};
      //   // div.appendChild(image);
      //   // dropbox.appendChild(div);
      // };

      // reader.readAsDataURL(file);
    }

    // is

    this.setState({ files: [...this.state.files, ...files] }, () => {
      console.log(this.state.files);
    });
  };

  getFiles = () => {
    const { files } = this.state;
    return files.map((file, i) => {
      return (
        <div
          style={{
            width: "150px",
            height: "150px",
            objectFit: "cover",
            borderRadius: "10px",
            margin: "10px",
            cursor: "pointer",
            position: "relative",
          }}
        >
          {/* cross */}
          <div
            style={{
              position: "absolute",
              top: "0px",
              right: "0px",
              padding: "5px 10px",
              cursor: "pointer",
              color: "white",
              backgroundColor: "red",
              borderRadius: "50%",
            }}
            onClick={() => {
              var { files } = this.state;
              files.splice(i, 1);
              this.setState({ files: [...files] });
            }}
          >
            X
          </div>

          <img
            src={URL.createObjectURL(file)}
            style={{
              width: "150px",
              height: "150px",
              objectFit: "cover",
              borderRadius: "10px",
              margin: "10px",
              cursor: "pointer",
            }}
          />
        </div>
      );
    });
  };

  uploadImageFiles = async () => {
    const { files } = this.state;

    this.setState({ uploading: true });
    var formdata = new FormData();

    for (var i = 0; i < files.length; i++) {
      const file = files[i];
      formdata.append("file", file);
    }

    const result = await API.post("/partner/upload", formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const { status, message, data } = result.data;

    if (status === "success") {
      this.props.history.push({
        pathname: routes.manufacturer.login,
        state: {
          data: data,
        },
      });
    }
  };

  // 4
  uploads = () => {
    return (
      <div>
        <h4
          style={{
            textAlign: "center",
          }}
          className="mb-3 bold"
        >
          Uploads
        </h4>
        {/* form main container*/}
        <div
          style={{
            padding: "25px 35px",
            // shaddow style
            boxShadow: "4px 4px 8px #bebebe, -4px -4px 8px #ffffff",
            borderRadius: "10px",

            Width: "50vh",
            maxWidth: "80%",
            margin: "auto",
            marginBottom: "20px",
            marginTop: "20px",
          }}
        >
          <div
            style={{
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            upload photos of your company premises and machinaries you have
            mentioned in the eariler steps
          </div>

          {/* dropdown area with dashed rounded radius with gray background upload logo and relevant text such as browse file and also it support drop files */}
          <div
            style={{
              backgroundColor: this.state.dragActive ? "green" : "#f8f9fa",
              borderRadius: "10px",
              padding: "20px",
              margin: "15px 0px",
              border: "2px dashed #007bff",
            }}
            onDragEnter={this.dragenter}
            onDragLeave={this.dragleave}
            onDragOver={this.dragover}
            onDrop={this.drop}
          >
            <div
              id="dropbox"
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              {this.getFiles()}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              {/* upload logo */}
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "gray",
                  fontWeight: "bold",
                  fontSize: "50px",
                }}
              >
                <i className="fa fa-upload"></i>
              </div>
              <h3 style={{ marginTop: "10px" }}>drop files here</h3>
              <div style={{ marginTop: "10px" }}>
                supported formats are jpg, jpeg, png
              </div>

              {/* or */}
              <div style={{ marginTop: "10px" }}>or</div>
              {/* browse file */}

              <input
                type="file"
                id="input-file-upload"
                multiple={true}
                style={{
                  display: "none",
                }}
                onChange={(e) => {
                  this.handleFiles(e.target.files);
                }}
                required
              />

              <div
                style={{
                  color: "#007bff",
                  padding: "5px 20px",
                  marginTop: "10px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  document.getElementById("input-file-upload").click();
                }}
              >
                browse files
              </div>
            </div>

            {this.state.dragActive && (
              <div
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  borderRadius: "1rem",
                  top: "0px",
                  right: "0px",
                  bottom: "0px",
                  left: "0px",
                }}
                id="drag-file-element"
                onDragEnter={this.handleDrag}
                onDragLeave={this.handleDrag}
                onDragOver={this.handleDrag}
                onDrop={this.handleDrop}
              ></div>
            )}
          </div>
        </div>

        <div className=" d-flex flex-row justify-content-between my-4">
          <div style={{ flex: 1, display: "flex" }}>
            <span
              className=" semi_bold"
              style={{
                margin: "0px 10px",
                padding: "10px 30px",
                backgroundColor: "#0d6efd",
                color: "white",
                borderRadius: "0.3rem",
              }}
              onClick={() => {
                this.setState({
                  activeStep: 3,
                });
              }}
            >
              back
            </span>
          </div>
          <div
            style={{
              flex: 1,

              display: "flex",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              className=" semi_bold"
              style={{
                margin: "0px 10px",
                backgroundColor: "#F1F2FDFF",
                color: "#535CE8FF",
                borderWidth: 0,
                padding: "10px 30px",
                borderRadius: "0.3rem",
              }}
              onClick={() => {
                // this.setState({
                //   activeStep: 3,
                // });
              }}
            >
              save for later
            </span>
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              alignContent: "flex-end",
              alignItems: "flex-end",
              justifyContent: "flex-end",
            }}
          >
            <span
              className=" semi_bold"
              style={{
                margin: "0px 10px",
                padding: "10px 30px",
                backgroundColor: "#0d6efd",
                color: "white",
                borderRadius: "0.3rem",
              }}
              onClick={() => {
                // this.setState({
                //   activeStep: 3,
                // });

                this.uploadImageFiles();
              }}
            >
              submit your profile
            </span>
          </div>
          {/* <i className="fa fa-arrow-right"></i> */}
        </div>
      </div>
    );
  };
  render() {
    const { activeStep } = this.state;
    return (
      <div
        style={{
          backgroundColor: "#f8f9fa",
        }}
      >
        <HeaderComponent2 />

        <div style={styles.loginPopup}>
          <div style={styles.loginPopupContent}>
            {/* Steps */}
            {this.Steps()}

            {/* Form content */}

            {activeStep === 1 && this.companyDetails()}
            {activeStep === 2 && this.processCapab()}
            {activeStep === 3 && this.machinaries()}
            {activeStep === 4 && this.uploads()}
          </div>
        </div>
      </div>
    );
  }
}

export default RegistrationScreen;

const styles = {
  loginPopup: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "80vh",
  },
  loginPopupContent: {
    backgroundColor: "white",
    // borderRadius: "10px",
    // boxShadow: "6px 5px 10px rgba(0, 0, 0, 0.5)",
    padding: "20px 60px",
    // textAlign: "center",
    minWidth: "70%",

    borderRadius: "14px",
    // background: "#e0e0e0",
    boxShadow: "4px 4px 8px #bebebe, -4px -4px 8px #ffffff",
  },
};
