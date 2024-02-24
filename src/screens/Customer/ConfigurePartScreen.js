import React, { Component } from "react";
import axios from "axios";
import HeaderComponent from "../../Components/HeaderComponentMLP";
import routes from "../../routes";
import API, { URL_PATH } from "../../Common/API";
import LogoNavigation from "../../Components/LogoNavigation";
// import { StlViewer } from "react-stl-file-viewer";
import STLViewer from "../../Components/STLViewer";
// import { StlViewer } from "react-stl-viewer";
import { Row, Col } from "antd";
import CountUp from "react-countup";
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
  scales: {
    yAxes: [
      {
        barThickness: 100,
        categorySpacing: 20,
        barPercentage: 1.0,
        categoryPercentage: 1.0,
      },
    ],
    xAxes: [
      {
        barThickness: 100,
        categorySpacing: 20,
        barPercentage: 1.0,
        categoryPercentage: 1.0,
      },
    ],
  },
  responsive: true,
  indexAxis: "y",
  elements: {
    bar: {
      borderWidth: 2,
      barThickness: 100,
      categorySpacing: 20,
    },
  },
  plugins: {
    legend: {
      display: false,
      position: "right",
    },
  },
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

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bar_graph_data: null,
      avg_complexity: 0,
      cost: 0,
      quntity: 1, //5
      volume: 0, //54060.954
      area: 0, //11935.075
      bounding_box: "", //100 x 100 x 20
      price: 0, //60
      process: "3d", //cnc
      material: 1, //1
      sub_grade_material: 1, //1
      part_finish: 0, //1
      roughness: 0, //1
      tolerances: 0, //1
      inspection: 0, //2
      file_path: "",
      processing: true,
    };
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    console.log(id);
    this.setState({ id });

    this.getDataIfExist(id);
  }

  componentWillUnmount() {
    try {
      clearTimeout(this.tmr);
    } catch (error) {}
  }

  getDataIfExist = (id) => {
    this.getData(id);
  };

  getData = async (id) => {
    const fd = {
      id,
    };

    console.log(fd);

    const res = await API.post(URL_PATH.getQuotationDetails, fd);

    const { status, message, data } = res.data;

    const {
      absolute_path,
      file_path,
      cost_before_quantity,
      machine_cost,
      material_cost,
      overhead,
      final_cost,
      caq,
      surge,
      volume,
    } = data;

    this.setState(
      {
        file_path: absolute_path,
        file_name: file_path,
        cost_before_quantity,
        machine_cost,
        material_cost,
        overhead,
        final_cost,
        caq,
        surge,
      },
      async () => {
        if (file_path && volume) {
          this.getGraphData();
          this.setState({ processing: false });

          try {
            const kiri_value = await window.calculateCNC(absolute_path);
            if (kiri_value && kiri_value > 0) {
              const res2 = await API.post(URL_PATH.updateKiriValue, {
                id,
                kiri_value,
              });

              this.getCost();
            }
          } catch (e) {}
        } else {
          try {
            clearTimeout(this.tmr);
          } catch (error) {}

          this.tmr = setTimeout(() => {
            this.getDataIfExist(id);
          }, 2000);
        }
      }
    );
    // updateKiriValue
  };

  getCost = async () => {
    // this.setState({ final_cost: null });

    // return;
    const url =
      this.state.process == "cnc"
        ? "/customer/getcncCost"
        : "/customer/calculate3D";
    const {
      quntity, // 5
      volume, // 54060.954
      area, // 11935.075
      bounding_box, // 100 x 100 x 20
      process, // cnc
      material, // 1
      sub_grade_material, // 1
      part_finish, // 1
      roughness, // 1
      tolerances, // 1
      inspection, // 2
      infill_percentage, // 12
    } = this.state;

    const fd = {
      id: this.state.id,
      quntity, //5
      volume, //54060.954
      area, //11935.075
      bounding_box, //100 x 100 x 20
      process, //cnc
      material, //1
      sub_grade_material, //1
      part_finish, //1
      roughness, //1
      tolerances, //1
      inspection, //2
      infill_percentage,
    };

    const res = await API.post(url, fd);

    const { status, message, data } = res.data;

    console.log("DATA:::::::::" + JSON.stringify(data));

    const {
      final_cost,
      cost_before_quantity,
      machine_cost,
      material_cost,
      overhead,
      finalMaterialAfterQuantity,
      finalMachinCostAfterQuantity,
      caq
    } = data;

    this.setState({
      final_cost,
      cost_before_quantity,
      machine_cost,
      material_cost,
      overhead,
      finalMaterialAfterQuantity,
      finalMachinCostAfterQuantity,
      caq
    });
    this.getGraphData();
  };

  getGraphData = async () => {
    const { id } = this.props.match.params;

    const fd = {
      id,
    };

    const { data } = await API.post(URL_PATH.getPartGraphData, fd);

    const {
      goemetry_complexity,
      toleranceComplexity,
      part_length_complexity,
      roughness_complexity,
      material_complexity,
      avg_complexity,
    } = data.data;

    const bar_graph_data = {
      labels: ["goemetry", "tolerance", "part_length", "roughness", "material"],
      datasets: [
        {
          axis: "y",
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: [
            parseInt(goemetry_complexity),
            parseInt(toleranceComplexity),
            parseInt(part_length_complexity),
            parseInt(roughness_complexity),
            parseInt(material_complexity),
          ],
        },
      ],
    };

    this.setState({
      bar_graph_data,
      avg_complexity: parseInt(avg_complexity),
    });
  };

  getAvailableWidth = () => {
    // get width for bootstrap conmtiner anbd left side assisgned 7 out of 12

    const width = window.innerWidth;

    // if (width < 768) {
    //   return width - 100;
    // }
    return width * 0.5833;
  };

  ChargeRow = ({ label, value }) => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          color: "#5f6164",
        }}
      >
        <div style={{ display: "flex", flex: 2 }} className="semi_bold">
          {label}
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div className="semi_bold">-</div>
          <div className="semi_bold">{value}</div>
        </div>
      </div>
    );
  };

  render() {
    const {
      expanded = false,
      final_cost,
      cost_before_quantity,
      machine_cost,
      material_cost,
      overhead,
      process,
      eSurge = 50,
      bar_graph_data,
      avg_complexity,
      surge = 0,
      caq,
      processing = true,
      finalMachinCostAfterQuantity,
      finalMaterialAfterQuantity,
      quntity
    } = this.state;

    if (processing) {
      return (
        <div>
          <HeaderComponent section="man_login" theme="light" />
          <div className="container-fluid mt-4">
            <h2 className="bold center">Part is under process please wait</h2>
          </div>
        </div>
      );
    }

    return (
      <div>
        <HeaderComponent section="man_login" theme="light" />
        <div className="container-fluid mt-4">
          <div className="row">
            {/* left part */}
            <div className="col-md-7">
              {/* file upload */}
              <Row
                justify="center"
                className="shadow"
                style={{
                  marginBottom: "15px",
                  padding: "20px",
                }}
              >
                <Col lg={11} xs={24}>
                  <h4 className="text-dw ">Upload a .DWG, .DXF PDF files</h4>
                  <p
                    style={{
                      fontSize: "1rem",
                      color: "#b6b6b8",
                      marginTop: "15px",
                    }}
                  >
                    upload files should contain all the parameters such as
                    materials, features, finishes which is selected by user
                  </p>
                </Col>
                <Col lg={11} xs={24}>
                  <div
                    className="kn-text center"
                    style={{
                      color: "#b6b6b8",
                    }}
                  >
                    {/* {" "}
                    {this.state.file_name} uploaded{" "} */}
                  </div>

                  <div className="save-div">
                    <input type="file" name="file" className="form-control" accept="application/pdf"  style={{width:'70%'}}/>
                  </div>
                </Col>
              </Row>

              {/* STL Viewer */}
              <div
                style={{
                  border: "1px solid #000000",
                  borderRadius: "10px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  alignContent: "center",
                  // padding: "10px 0px 20px 0px",
                  overflow: "hidden",
                }}
              >
                {this.state.file_path != "" && (
                  // <StlViewer
                  //   width={this.getAvailableWidth()}
                  //   height={this.getAvailableWidth() * 0.5}
                  //   url={this.state.file_path}
                  //   groundColor="white"
                  //   objectColor="red"
                  //   skyboxColor="black"
                  //   gridLineColor="black"
                  //   lightColor="black"
                  //   volume={(vol) => this.setState({ volume: vol })}
                  // />

                  <STLViewer
                    file_path={
                      this.state.file_path ??
                      "https://storage.googleapis.com/ucloud-v3/ccab50f18fb14c91ccca300a.stl"
                    }
                    width={this.getAvailableWidth()}
                    height={this.getAvailableWidth() * 0.5}
                  />

                  //  <StlViewer style={style} orbitControls shadows url={this.state.file_path} />
                )}
              </div>
              {/* Graphs */}

              {this.state.process == "cnc" && bar_graph_data != null && (
                <div className="shadow mt-4">
                  <Row justify="center">
                    <Col lg={11} xs={24}>
                      <div className="center-col">
                        <div>
                          <Bar options={options} data={bar_graph_data} />
                        </div>
                      </div>
                    </Col>
                    <Col lg={11} xs={24}>
                      <div className="center-col">
                        <h6 className="center semi_bold">
                          DfM- overall Manufacturing complexity
                        </h6>
                        <div className="save-div2">
                          <h1 className="semi_bold">
                            <CountUp
                              start={0}
                              end={avg_complexity}
                              duration={2.75}
                              separator=" "
                              decimals={0}
                              decimal=","
                              prefix=""
                              suffix="%"
                            />
                          </h1>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              )}
            </div>
            {/* right part */}
            <div className="col-md-5 ">
              {/* calculated delivery charges */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                {/* expidate delivary */}
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "10px",
                    padding: "15px 25px",
                    margin: "10px 5px",
                  }}
                  className="shadow"
                >
                  <h5
                    style={{
                      color: "#16bc9c",
                    }}
                    className="semi_bold"
                  >
                    Expedite Delivery
                  </h5>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "10px",
                    }}
                  >
                    <span
                      style={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/1670/1670915.png"
                        style={{
                          width: "25px",
                          height: "25px",
                        }}
                      />
                      &nbsp;&nbsp;
                      <h6 className="semi_bold" style={{}}>
                        1 business day
                      </h6>
                    </span>
                    {this.state.process == "cnc" && expanded === true ? null : (
                      <div className="bold semi_bold extra_bold">
                        ₹ {parseInt(final_cost + surge) ?? "Preparing"}
                      </div>
                    )}
                  </div>

                  {this.state.process == "cnc" &&
                  expanded === false &&
                  final_cost ? (
                    <div
                      style={{
                        width: "100%",
                        color: "#1091F4FF",
                        cursor: "pointer",
                      }}
                      className=" mt-2"
                      onClick={() => {
                        this.setState({ expanded: true });
                      }}
                    >
                      View Break-up Cost
                    </div>
                  ) : (
                    this.state.process == "cnc" && (
                      <>
                        <this.ChargeRow
                          label="Machine cost"
                          value={Math.round(finalMachinCostAfterQuantity * quntity)}
                        />
                        <this.ChargeRow
                          label="Material cost"
                          value={Math.round(finalMaterialAfterQuantity *quntity)}
                        />
                        <this.ChargeRow label="overHead" value={Math.round(overhead)} />
                        <this.ChargeRow label="Expidate surge" value={Math.round(surge)} />

                        <div
                          style={{
                            marginTop: "16px",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            alignContent: "center",
                          }}
                        >
                          <div
                            className="semi_bold"
                            style={{
                              color: "#5f6164",
                            }}
                          >
                            {Math.round(caq + (overhead/quntity))} {" RS each"}
                          </div>
                          <h3
                            className="semi_bold"
                            style={{
                              borderTop: "2px solid #5f6164",
                              paddingTop: "15px",
                            }}
                          >
                            {parseInt(final_cost + surge)}
                          </h3>
                        </div>

                        <div
                          style={{
                            width: "100%",
                            color: "#1091F4FF",
                            cursor: "pointer",
                          }}
                          className=" mt-2"
                          onClick={() => {
                            this.setState({ expanded: false });
                          }}
                        >
                          Hide Break-up Cost
                        </div>
                      </>
                    )
                  )}
                </div>

                {/* standard delivary */}
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "10px",
                    padding: "15px 25px",
                    margin: "10px 5px",
                  }}
                  className="shadow"
                >
                  <h5
                    style={{
                      color: "#666eea",
                    }}
                    className="semi_bold"
                  >
                    standard Delivery
                  </h5>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "10px",
                    }}
                  >
                    <span
                      style={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/1670/1670915.png"
                        style={{
                          width: "25px",
                          height: "25px",
                        }}
                      />
                      &nbsp;&nbsp;
                      <h6 className="semi_bold" style={{}}>
                        1 business day
                      </h6>
                    </span>
                    {this.state.process == "cnc" && expanded === true ? null : (
                      <div className="bold semi_bold extra_bold">
                        ₹ {parseInt(final_cost) ?? "Preparing"}
                      </div>
                    )}
                  </div>

                  {this.state.process == "cnc" &&
                  expanded === false &&
                  final_cost ? (
                    <div
                      style={{
                        width: "100%",
                        color: "#1091F4FF",
                        cursor: "pointer",
                      }}
                      className=" mt-2"
                      onClick={() => {
                        this.setState({ expanded: true });
                      }}
                    >
                      View Break-up Cost
                    </div>
                  ) : (
                    this.state.process == "cnc" && (
                      <>
                        <this.ChargeRow
                          label="Machine cost"
                          value={Math.round(finalMachinCostAfterQuantity * quntity)}
                        />
                        <this.ChargeRow
                          label="Material cost"
                          value={Math.round(finalMaterialAfterQuantity *quntity)}
                        />
                        <this.ChargeRow label="overHead" value={Math.round(overhead)} />
                        <this.ChargeRow label="Expidate surge" value={"0"} />

                        <div
                          style={{
                            marginTop: "16px",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            alignContent: "center",
                          }}
                        >
                          <div
                            className="semi_bold"
                            style={{
                              color: "#5f6164",
                            }}
                          >
                            {Math.round(caq + (overhead/quntity))} {" RS each"}
                          </div>
                          <h3
                            className="semi_bold"
                            style={{
                              borderTop: "2px solid #5f6164",
                              paddingTop: "15px",
                            }}
                          >
                            {parseInt(final_cost)}
                          </h3>
                        </div>

                        <div
                          style={{
                            width: "100%",
                            color: "#1091F4FF",
                            cursor: "pointer",
                          }}
                          className=" mt-2"
                          onClick={() => {
                            this.setState({ expanded: false });
                          }}
                        >
                          Hide Break-up Cost
                        </div>
                      </>
                    )
                  )}
                </div>
              </div>

              {/* form */}
              <div
                style={{
                  borderRadius: "10px",
                  padding: "15px 25px",
                  maxHeight: "77vh",
                  overflowY: "auto",
                }}
                className="shadow"
              >
                {/* quantity */}
                <div>
                  <div>part quantity</div>
                  <div className="white-div">
                    <button
                      className="minus-button"
                      disabled={this.state.quntity == 1}
                      onClick={() => {
                        this.setState(
                          {
                            quntity: this.state.quntity - 1,
                          },
                          () => {
                            this.getCost();
                          }
                        );
                      }}
                      onDoubleClick={() => {
                        if (this.state.quntity > 2) {
                          this.setState(
                            {
                              quntity: this.state.quntity - 2,
                            },
                            () => {
                              this.getCost();
                            }
                          );
                        }
                      }}
                    >
                      -
                    </button>
                    <div>{this.state.quntity}</div>
                    <button
                      className="plus-button"
                      onDoubleClick={() => {
                        this.setState(
                          {
                            quntity: this.state.quntity + 2,
                          },
                          () => {
                            this.getCost();
                          }
                        );
                      }}
                      onClick={() => {
                        this.setState(
                          {
                            quntity: this.state.quntity + 1,
                          },
                          () => {
                            this.getCost();
                          }
                        );
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
                <hr />

                {/* process */}
                <h3 className="semi_bold">process/ material</h3>
                <div className="input-group  d-flex flex-column">
                  <div
                    style={{ margin: "0px 5px" }}
                    for="exampleFormControlSelect1"
                  >
                    Process
                  </div>
                  <select
                    className="select-input"
                    value={process}
                    onChange={(e) => {
                      this.setState({ process: e.target.value }, () => {
                        this.getCost();
                      });
                    }}
                  >
                    <option value="cnc">CNC Machining</option>
                    <option value="3d">3D</option>
                  </select>
                </div>

                {/* material */}
                <div className="input-group  d-flex flex-column">
                  <div
                    style={{ margin: "0px 5px" }}
                    for="exampleFormControlSelect1"
                  >
                    Material
                  </div>
                  <select
                    className="select-input"
                    onChange={(e) => {
                      this.setState({ material: e.target.value }, () => {
                        this.getCost();
                      });
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
                  <div className="input-group  d-flex flex-column">
                    <div
                      style={{ margin: "0px 5px" }}
                      for="exampleFormControlSelect1"
                    >
                      Color
                    </div>
                    <select
                      className="select-input"
                      onChange={(e) => {
                        this.setState({ color: e.target.value }, () => {
                          this.getCost();
                        });
                      }}
                    >
                      {colors.map((color, index) => {
                        return <option value={index + 1}>{color}</option>;
                      })}
                    </select>
                  </div>
                )}

                {/* Infill Percentage */}
                {this.state.process == "3d" && (
                  <div className="input-group  d-flex flex-column">
                    <div
                      style={{ margin: "0px 5px" }}
                      for="exampleFormControlSelect1"
                    >
                      Infill Percentage
                    </div>
                    <select
                      className="select-input"
                      onChange={(e) => {
                        this.setState(
                          { infill_percentage: e.target.value },
                          () => {
                            this.getCost();
                          }
                        );
                      }}
                    >
                      {[
                        { label: "25% (Normal)", value: 25 },
                        { label: "50% (Dense)", value: 50 },
                      ].map((item, index) => {
                        return <option value={item.value}>{item.label}</option>;
                      })}
                    </select>
                  </div>
                )}

                {this.state.process != "3d" && (
                  <>
                    {/* Sub-grade material */}
                    <div className="input-group  d-flex flex-column">
                      <div
                        style={{ margin: "0px 5px" }}
                        for="exampleFormControlSelect1"
                      >
                        Sub-grade material
                      </div>
                      <select
                        className="select-input"
                        onChange={(e) => {
                          this.setState(
                            { sub_grade_material: e.target.value },
                            () => {
                              this.getCost();
                            }
                          );
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
                    <div className="input-group  d-flex flex-column">
                      <div
                        style={{ margin: "0px 5px" }}
                        for="exampleFormControlSelect1"
                      >
                        Part Finish
                      </div>
                      <select
                        className="select-input"
                        onChange={(e) => {
                          this.setState({ part_finish: e.target.value }, () => {
                            this.getCost();
                          });
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
                    <div className="input-group  d-flex flex-column">
                      <div
                        style={{ margin: "0px 5px" }}
                        for="exampleFormControlSelect1"
                      >
                        Thread and Tapped Holes
                      </div>
                      <input
                        className="select-input"
                        type="number"
                        onChange={(e) => {
                          this.setState({ thread: e.target.value }, () => {
                            this.getCost();
                          });
                        }}
                      />
                    </div>

                    {/*  tolerance */}
                    <div className="input-group  d-flex flex-column">
                      <div
                        style={{ margin: "0px 5px" }}
                        for="exampleFormControlSelect1"
                      >
                        Tolerances Value
                      </div>
                      <select
                        className="select-input"
                        onChange={(e) => {
                          this.setState({ tolerances: e.target.value }, () => {
                            this.getCost();
                          });
                        }}
                      >
                        <option value="1">0.125</option>
                        <option value="2">0.1</option>
                        <option value="3">0.075</option>
                        <option value="4">0.05</option>
                        <option value="5">0.025</option>
                      </select>
                    </div>

                    {/*Roughness Value */}
                    <div className="input-group  d-flex flex-column">
                      <div
                        style={{ margin: "0px 5px" }}
                        for="exampleFormControlSelect1"
                      >
                        Roughness Value
                      </div>
                      <select
                        className="select-input"
                        onChange={(e) => {
                          this.setState({ roughness: e.target.value }, () => {
                            this.getCost();
                          });
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
                <div className="input-group  d-flex flex-column">
                  <div
                    style={{ margin: "0px 5px" }}
                    for="exampleFormControlSelect1"
                  >
                    Inspection
                  </div>
                  <select
                    className="select-input"
                    onChange={(e) => {
                      this.setState({ inspection: e.target.value }, () => {
                        this.getCost();
                      });
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
                  <div className="input-group  d-flex flex-column">
                    <div
                      style={{ margin: "0px 5px" }}
                      for="exampleFormControlSelect1"
                    >
                      Certificate
                    </div>
                    <select
                      className="select-input"
                      onChange={(e) => {
                        this.setState({ certificate: e.target.value }, () => {
                          this.getCost();
                        });
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
                <div className="input-group  d-flex flex-column">
                  <div
                    style={{ margin: "0px 5px" }}
                    for="exampleFormControlSelect1"
                  >
                    Note
                  </div>
                  <input className="select-input" type="text" />
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
                    paddingVertical: "10px",
                  }}
                  onClick={() => {
                    this.props.history.push(routes.customer.quotation);
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
                    paddingVertical: "10px",
                  }}
                  onClick={() => {
                    this.props.history.push(routes.customer.quotation);
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
