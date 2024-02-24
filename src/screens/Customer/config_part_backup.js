import React, { Component } from "react";
import axios from "axios";
import HeaderComponent from "../../Components/HeaderComponentMLP";
import routes from "../../routes";
import API, { URL_PATH } from "../../Common/API";
import LogoNavigation from "../../Components/LogoNavigation";
import { StlViewer } from "react-stl-file-viewer";
import { Row, Col } from "antd";
import "./style.css";
// CChart
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  registerables,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(...registerables);
export const options = {
  responsive: true,
  indexAxis: 'y',
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      axis: 'y',
      label: "My First dataset",
      backgroundColor: "rgba(255,99,132,0.2)",
      borderColor: "rgba(255,99,132,1)",
      borderWidth: 1,
      hoverBackgroundColor: "rgba(255,99,132,0.4)",
      hoverBorderColor: "rgba(255,99,132,1)",
      data: [65, 59, 80, 81, 56, 55, 40],
    },
  ],
};

const url =
  "https://storage.googleapis.com/ucloud-v3/ccab50f18fb14c91ccca300a.stl";
const style = {
  top: 0,
  left: 0,
  width: "100vw",
  //height: "100vh",
};
const materials = [
  "Aluminum",
  "Carbon Steel",
  "Stainless Steel",
  "Alloy steel",
  "Tool Steel",
  "Copper",
  "Brass",
  "Titanium",
  "super aloy",
];

const material3D = ["PLA", "ABS", "PET-G"];

const colors = ["white", "black"];

const subgrade = [
  [
    "Al 6065-T6",
    "Al 7075-T6",
    "Al 6061",
    "Al6082",
    "Al 6063",
    "AMPCOLOY 45",
    "Al 2014",
  ],
  [
    "1018.0 ",
    "1040.0 ",
    "EN8",
    "A36",
    "EN1A",
    "1045.0 ",
    "IS2062",
    "EN9",
    "EN3B",
    "1010.0 ",
    "1020.0 ",
    "1024.0 ",
    "1527.0 ",
    "1035.0 ",
    "1042.0 ",
    "1080.0 ",
    "129.0 ",
  ],
  [
    "SS304",
    "SS316",
    "SS310",
    "SS304L",
    "SS303",
    "SS316L",
    "SS416",
    "SS420",
    "17-4 PH",
    "SS430",
    "Super duplex",
  ],
  [
    "EN-19/ 4140",
    "EN-24/ 4340",
    "1215.0 ",
    "4145.0 ",
    "8620.0 ",
    "4130.0 ",
    "4150.0 ",
    "4320.0 ",
    "5150.0 ",
    "16MNCR5 ",
    "20MNCR5 ",
    "830006.0 ",
  ],
  ["A1", "A2", "OHNS O1", "OHNS O2", "D2", "D3", "M2", "M42", "W1"],
  ["C110", "C101", "C17200"],
  ["ASTM B16", "C36000", "CZ121", "Navel brass UNS 46400"],
  ["Grade 1", "Grade 2", "Grade 5"],
  [
    "Hstelloy c276",
    "inconel 718",
    "incoloy 925",
    "Inconel 625",
    "Monel 400",
    "Monel 500",
  ],
];

const partFinish = [
  [
    "Bead Blast",
    "Black anodize",
    "Blue anodize",
    "Clear Anodize",
    "Powder coating",
    "Electro plating",
  ],
  [
    "Black oxide",
    "Nickel plating",
    "Powder coating",
    "Silver plating",
    "Through harden",
  ],
  [
    "Black oxide",
    "Nickel plating",
    "Powder coating",
    "Silver plating",
    "Through harden",
  ],
  [
    "Black oxide",
    "Nickel plating",
    "Powder coating",
    "Silver plating",
    "Through harden",
  ],
  [],
  ["Powder coating", "Shot blasting", "Silver plating"],
  ["Powder coating", "Shot blasting", "Silver plating]"],
  [],
  [],
];

// cnc

//
//
//
var expected = 0;
var gcode_ = "",
  filament_used = "",
  mode,
  sliceShells,
  sliceFillSparse,
  sliceTopLayers,
  sliceBottomLayers;
function display_message(msg) {
  console.log(msg);
  // document.getElementById("msg").innerText +="<br/>"+ msg
  //   ? Object.keys(msg).join(" - ")
  //   : "";
}

function display_gcode(gcode) {
  console.log(gcode);
  gcode_ = gcode.split("\n");
  //extract the gcode from the gcode text
  filament_used = gcode_[gcode_.length - 2];
  filament_used = filament_used.slice(filament_used.search("[0-9]"));
  filament_used = filament_used.split(" "); //"2044.21", "mm",
  filament_used = {
    length: filament_used[0],
    unit: filament_used[1],
  };

  console.log(filament_used);

  // console.log(gcode)

  document.getElementById("gt").innerText = "OP:" + filament_used.length; // JSON.stringify(filament_used);
  document.getElementById("error").innerText =
    "Diff:" + (expected - filament_used.length);
  // display_message();
  // $('dfoot').style.display = 'block';
  // $('gfoot').style.display = '';
}

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cost: 0,
      quntity: 1, //5
      volume: 0, //54060.954
      area: 0, //11935.075
      bounding_box: "", //100 x 100 x 20
      price: 0, //60
      process: "cnc", //cnc
      material: 1, //1
      sub_grade_material: 1, //1
      part_finish: 0, //1
      roughness: 0, //1
      tolerances: 0, //1
      inspection: 0, //2
      file_path: "",
    };
  }
  componentDidMount() {
    const volume = 54060.954;
    //    this.props.location.state.volume;
    const area = 11935.075; //this.props.location.state.area;
    // const bounding_box = this.props.location.state.bounding_box;
    const price = 60; //this.props.location.state.price;
    this.setState({
      volume, //54060.954
      area, //11935.075
      // bounding_box, //100 x 100 x 20
      price, //60
    });

    const { id } = this.props.match.params;
    console.log(id);
    this.setState({ id });
    this.getData(id);
  }

  getData = async (id) => {
    const fd = {
      id,
    };

    console.log(fd);

    const res = await API.post(URL_PATH.getQuotationDetails, fd);

    const { status, message, data } = res.data;

    const { absolute_path } = data;

    this.setState({ file_path: absolute_path, process: "cnc" });
    const kiri_value = await window.calculateCNC(absolute_path);

    const res2 = await API.post(URL_PATH.updateKiriValue, {
      id,
      kiri_value,
    });

    // updateKiriValue
  };

  getCost = async () => {
    // return;
    const url = "/customer/getCost";
    const {
      quntity, //5
      volume, //54060.954
      area, //11935.075
      bounding_box, //100 x 100 x 20
      price, //60
      process, //cnc
      material, //1
      sub_grade_material, //1
      part_finish, //1
      roughness, //1
      tolerances, //1
      inspection, //2
    } = this.state;

    const fd = {
      quntity, //5
      volume, //54060.954
      area, //11935.075
      bounding_box, //100 x 100 x 20
      price, //60
      process, //cnc
      material, //1
      sub_grade_material, //1
      part_finish, //1
      roughness, //1
      tolerances, //1
      inspection, //2
    };

    const res = await API.post(url, fd);

    const { status, message, data } = res.data;

    console.log("DATA:::::::::" + JSON.stringify(data));

    const {
      machineCost,
      weight_of_the_part,
      materialCost,
      c1,
      c2,
      c3,
      c4,
      c5,
      c6,
      costBeforeQuntity,
      costAfterQuntity,
      overHead,
      finalCost,
    } = data;

    this.setState({
      machineCost,
      weight_of_the_part,
      materialCost,
      c1,
      c2,
      c3,
      c4,
      c5,
      c6,
      costBeforeQuntity,
      costAfterQuntity,
      overHead,
      finalCost,
    });
  };
  render() {
    const {
      machineCost = "",
      weight_of_the_part = "",
      materialCost = "",
      c1 = "",
      c2 = "",
      c3 = "",
      c4 = "",
      c5 = "",
      c6 = "",
      costBeforeQuntity = "",
      costAfterQuntity = "",
      overHead = "",
      finalCost = "",
      expanded = false,
    } = this.state;

    return (
      <div>
        <HeaderComponent section="man_login" theme="light"/>
        <div className="container mt-4">
          <h1>welcome back, Nilesh!</h1>
          <div className="row">
            {/* left part */}
            <div className="col-md-8">
              <div className="div-box">
                <Row justify="center">
                  <Col lg={11} xs={24}>
                    <div className="center-col">
                      <div>
                        <h4 className="text-dw ">
                          Upload a .DWG, .DXF PDF files
                        </h4>
                        <p className="upload-text">
                          upload files should contain all the parameters such as
                          <br /> materials, features, finishes which is selected
                          by user
                        </p>
                      </div>
                    </div>
                  </Col>
                  <Col lg={11} xs={24}>
                    <div className="center-col">
                      <div>
                        <p className="kn-text"> Knuckle.dwg uploaded </p>
                        <div className="save-div">
                          <button className="save-btn">upload</button>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>

              {/* uplaod drop box */}
              <div
                style={{
                  border: "1px solid #000000",
                  borderRadius: "10px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  alignContent: "center",
                  padding: "10px 0px 20px 0px",
                }}
              >
                {this.state.file_path != "" && (
                  <StlViewer
                    width={700}
                    height={700}
                    url={this.state.file_path}
                    groundColor="rgb(255, 255, 255)"
                    objectColor="rgb(137, 137, 137)"
                    skyboxColor="rgb(255, 255, 255)"
                    gridLineColor="rgb(0, 0, 0)"
                    lightColor="rgb(255, 255, 255)"
                    volume={(vol) => this.setState({ volume: vol })}
                  />
                )}

                {/* <StlViewer style={style} orbitControls shadows url={url} /> */}
              </div>
              {/* recent uploads */}
              <div className="d-flex flex-row justify-content-between">
                {this.state.process == "cnc" && (
                  <div className="div-box-two">
                    <Row justify="center">
                      <Col lg={11} xs={24}>
                        <div className="center-col">
                          <div>
                            <Bar
                              options={options}
                              data={data}
                              // options={{
                              //   indexAxis: "y",
                              //   // plugins: {
                              //   //   title: {
                              //   //     display: false,
                              //   //     // text: currText,
                              //   //     font: { size: 12, family: "rubik" },
                              //   //   },
                              //   //   legend: { display: false, position: "right" },
                              //   // },
                              //   // maintainAspectRatio: false,
                              // }}
                            />
                          </div>
                        </div>
                      </Col>
                      <Col lg={11} xs={24}>
                        <div className="center-col">
                          <p className="text-dw ">
                            DfM- overall Manufacturing complexity
                          </p>
                          <div className="save-div2">
                            <h1>65%</h1>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                )}
              </div>
            </div>
            {/* right part */}
            <div className="col-md-4" style={{ height: "100vh" }}>
              {/* calculated */}
              

          <div style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            backgroundColor:'red'
          }}>
            <div className="main-box123">
              <h3 className="exp-text">expedite delivery</h3>
              <div className="row-flex">
                <div className="bus-div">
                  {/* <img src={Commute} alt="" /> */}
                  <p className="busi-text">1 business day</p>
                </div>
                <div>
                  <p className="money-text">₹150</p>
                  <p className="break-text">view break-up cost</p>
                </div>
              </div>
            </div>
            <div className="main-box123">
              <h3 className="stan-text">standard delivery</h3>
              <div className="row-flex">
                <div className="bus-div">
                  {/* <img src={Commute} alt="" /> */}
                  <p className="busi-text">1 business day</p>
                </div>
                <div>
                  <p className="money-text">₹100</p>
                  <p className="break-text">view break-up cost</p>
                </div>
              </div>
            </div>
          </div>


              {/* form */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  alignContent: "center",
                  borderRadius: "5px",
                  padding: "15px 25px",
                }}
                className="shadow"
              >
                {/* quantity */}
                <div className="input-group mb-3">
                  <label
                    style={{ margin: "0px 5px" }}
                    for="exampleFormControlSelect1"
                  >
                    Quantity
                  </label>

                  <div
                    className="input-group-prepend"
                    onClick={() => {
                      this.getCost();
                      this.setState({ quntity: this.state.quntity - 1 });
                    }}
                  >
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa fa-minus"></i>
                    </span>
                  </div>

                  <input
                    type="number"
                    className="form-control"
                    placeholder="Quantity"
                    aria-label="Quantity"
                    aria-describedby="basic-addon2"
                    value={this.state.quntity}
                    id="quantity"
                    style={{
                      border: "none",
                      borderRadius: "5px",
                      width: "100px",
                    }}
                    onChange={(e) => {
                      this.getCost();
                      this.setState({ quntity: e.target.value });
                    }}
                  />

                  <div
                    className="input-group-append"
                    onClick={() => {
                      this.getCost();
                      this.setState({ quntity: this.state.quntity + 1 });
                    }}
                  >
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa fa-plus"></i>
                    </span>
                  </div>
                </div>

                {/* process */}
                <div className="input-group mb-3">
                  <label
                    style={{ margin: "0px 5px" }}
                    for="exampleFormControlSelect1"
                  >
                    Process
                  </label>
                  <select
                    className="form-control"
                    onChange={(e) => {
                      this.getCost();
                      this.setState({ process: e.target.value });
                    }}
                  >
                    <option value="cnc">CNC Machining</option>
                    <option value="3d">3D</option>
                  </select>
                </div>

                {/* material */}
                <div className="input-group mb-3">
                  <label
                    style={{ margin: "0px 5px" }}
                    for="exampleFormControlSelect1"
                  >
                    Material
                  </label>
                  <select
                    className="form-control"
                    onChange={(e) => {
                      this.getCost();
                      this.setState({ material: e.target.value });
                    }}
                  >
                    {this.state.process == "cnc"
                      ? materials.map((material, index) => {
                          return <option value={index + 1}>{material}</option>;
                        })
                      : material3D.map((material, index) => {
                          return <option value={index + 1}>{material}</option>;
                        })}
                  </select>
                </div>

                {/* 3d- Color */}

                {this.state.process != "cnc" && (
                  <div className="input-group mb-3">
                    <label
                      style={{ margin: "0px 5px" }}
                      for="exampleFormControlSelect1"
                    >
                      Color
                    </label>
                    <select
                      className="form-control"
                      onChange={(e) => {
                        this.getCost();
                        this.setState({ color: e.target.value });
                      }}
                    >
                      {colors.map((color, index) => {
                        return <option value={index + 1}>{color}</option>;
                      })}
                    </select>
                  </div>
                )}

                {this.state.process != "3d" && (
                  <>
                    {/* Sub-grade material */}
                    <div className="input-group mb-3">
                      <label
                        style={{ margin: "0px 5px" }}
                        for="exampleFormControlSelect1"
                      >
                        Sub-grade material
                      </label>
                      <select
                        className="form-control"
                        onChange={(e) => {
                          this.getCost();
                          this.setState({ sub_grade_material: e.target.value });
                        }}
                      >
                        {subgrade[this.state.material - 1].map(
                          (material, index) => {
                            return (
                              <option value={index + 1}>{material}</option>
                            );
                          }
                        )}
                      </select>
                    </div>

                    {/* Part Finish */}
                    <div className="input-group mb-3">
                      <label
                        style={{ margin: "0px 5px" }}
                        for="exampleFormControlSelect1"
                      >
                        Part Finish
                      </label>
                      <select
                        className="form-control"
                        onChange={(e) => {
                          this.getCost();
                          this.setState({ part_finish: e.target.value });
                        }}
                      >
                        <option value="0">As Machined</option>
                        {partFinish[this.state.material - 1].map(
                          (material, index) => {
                            return (
                              <option value={index + 1}>{material}</option>
                            );
                          }
                        )}
                      </select>
                    </div>
                    {/* No Of Threads */}
                    <div className="input-group mb-3">
                      <label
                        style={{ margin: "0px 5px" }}
                        for="exampleFormControlSelect1"
                      >
                        Thread and Tapped Holes
                      </label>
                      <input
                        className="form-control"
                        type="number"
                        onChange={(e) => {
                          this.getCost();
                          this.setState({ thread: e.target.value });
                        }}
                      />
                    </div>

                    {/*  tolerance */}
                    <div className="input-group mb-3">
                      <label
                        style={{ margin: "0px 5px" }}
                        for="exampleFormControlSelect1"
                      >
                        Tolerances Value
                      </label>
                      <select
                        className="form-control"
                        onChange={(e) => {
                          this.getCost();
                          this.setState({ tolerances: e.target.value });
                        }}
                      >
                        <option value="1">0.125</option>
                        <option value="2">0.1</option>
                        <option value="3">0.075</option>
                        <option value="4">0.05</option>
                        <option value="4">0.025</option>
                      </select>
                    </div>

                    {/*Roughness Value */}
                    <div className="input-group mb-3">
                      <label
                        style={{ margin: "0px 5px" }}
                        for="exampleFormControlSelect1"
                      >
                        Roughness Value
                      </label>
                      <select
                        className="form-control"
                        onChange={(e) => {
                          this.getCost();
                          this.setState({ roughness: e.target.value });
                        }}
                      >
                        <option value="1">3.2</option>
                        <option value="2">1.6</option>
                        <option value="3">0.8</option>
                        <option value="4">0.4</option>
                      </select>
                    </div>
                  </>
                )}

                {/*  Inspection */}
                <div className="input-group mb-3">
                  <label
                    style={{ margin: "0px 5px" }}
                    for="exampleFormControlSelect1"
                  >
                    Inspection
                  </label>
                  <select
                    className="form-control"
                    onChange={(e) => {
                      this.getCost();
                      this.setState({ inspection: e.target.value });
                    }}
                  >
                    {this.state.process == "cnc"
                      ? [
                          "Standard Inspection",
                          "inspection with dimensional report",
                          "CMM Inspection",
                        ].map((material, index) => {
                          return <option value={index}>{material}</option>;
                        })
                      : [
                          "Standard Inspection",
                          "inspection with dimensional report",
                        ].map((material, index) => {
                          return <option value={index}>{material}</option>;
                        })}
                  </select>
                </div>

                {/*  Certificate */}
                {this.state.process == "cnc" && (
                  <div className="input-group mb-3">
                    <label
                      style={{ margin: "0px 5px" }}
                      for="exampleFormControlSelect1"
                    >
                      Certificate
                    </label>
                    <select
                      className="form-control"
                      onChange={(e) => {
                        this.getCost();
                        this.setState({ certificate: e.target.value });
                      }}
                    >
                      {[
                        "material test certificate",
                        "confirmation certificate",
                        "calibration certificate",
                      ].map((material, index) => {
                        return <option value={index}>{material}</option>;
                      })}
                    </select>
                  </div>
                )}

                {/*  Note */}
                <div className="input-group mb-3">
                  <label
                    style={{ margin: "0px 5px" }}
                    for="exampleFormControlSelect1"
                  >
                    Note
                  </label>
                  <input className="form-control" type="text" />
                </div>
              </div>

              {/* action buttons cancel save properties */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "10px 0px",
                }}
              >
                <button
                  className="btn"
                  style={{
                    flex: 1,
                    borderColor: "#535CE8FF",
                    backgroundColor: "white",
                    color: "black",
                    marginRight: "10px",
                  }}
                  onClick={() => {
                    this.setState({ showProperties: false });
                  }}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-success"
                  style={{
                    flex: 1,
                    backgroundColor: "#535CE8FF",
                    marginLeft: "10px",
                  }}
                  onClick={() => {
                    this.setState({ showProperties: false });
                  }}
                >
                  Save property
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
