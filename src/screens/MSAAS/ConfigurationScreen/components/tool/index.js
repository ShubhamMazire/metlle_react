import React from "react";
import tool from "../../image/tool.jpeg";
// import "./style.css";
import Grid from "@mui/material/Grid";

import { Box } from "@material-ui/core";
import Quantity from "../../../../../Components/Quantity";
import STLViewer from "../../../../../Components/STLViewer";
import { assetBaseUrl } from "../../../../../Common/API";
import Button from "@mui/material/Button";
import api, { URL_PATH } from "../../../../../Common/API";

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

class Tool extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      machines: [],

      machine: 0,
      quntity: 1,
      numberOfThread: 1,
      cost: 0,
      numberOfWorkingSHifts: 1,
      numberOfWorkingHours: 1,
      numberOfWeeklyOffDays: 1,
      targetLeadTimeInDays: 1,
      material: 1, //1
      sub_grade_material: 1, //1
      part_finish: 0, //1
      roughness: 0, //1
      tolerances: 0, //1
      inspection: 0, //2
    };
  }

  componentDidMount() {
    this.getMachines();

    const {
      parts_quantity,
      number_of_threads,
      number_of_working_shifts,
      number_of_working_hours,
      number_of_weekly_off_days,
      target_lead_time_in_days,
      material,
      sub_grade_material,
      part_finish,
      roughness,
      costBeforeQuntity,
      tolerances,
      inspection,
    } = this.props.data;

    this.setState({
      quntity: parts_quantity ?? 1,
      numberOfThread: number_of_threads ?? 1,
      material: material ?? 1,
      sub_grade_material: sub_grade_material ?? 1,
      part_finish: part_finish ?? 0,
      roughness: roughness ?? 0,
      tolerances: tolerances ?? 0,
      inspection: inspection ?? 0,
    });
  }

  getMachines = async () => {
    const response = await api.get(URL_PATH.msaas_get_machines);
    if (response.status == 200) {
      const data = response.data.data.map((item) => {
        const [
          maxAllowablePartSizeX,
          maxAllowablePartSizeY,
          maxAllowablePartSizeZ,
        ] = JSON.parse(item.max_allowed_part_size);

        const [
          minAllowablePartSizeX,
          minAllowablePartSizeY,
          minAllowablePartSizeZ,
        ] = JSON.parse(item.min_allowed_part_size);

        return {
          maxAllowablePartSizeX,
          maxAllowablePartSizeY,
          maxAllowablePartSizeZ,
          minAllowablePartSizeX,
          minAllowablePartSizeY,
          minAllowablePartSizeZ,
          ...item,
        };
      });

      console.log(
        "**********************************************" + JSON.stringify(data)
      );

      this.setState({
        machines: data,
      });
      this.setState({
        machine: this.state.machines[0].id,
      });
    }
  };

  getCost = () => {
    
    this.props.syncData({
      machine:this.state.machine,
      quntity: this.state.quntity,
      numberOfThread: this.state.numberOfThread,
      numberOfWorkingSHifts: this.state.numberOfWorkingSHifts,
      numberOfWorkingHours: this.state.numberOfWorkingHours,
      numberOfWeeklyOffDays: this.state.numberOfWeeklyOffDays,
      targetLeadTimeInDays: this.state.targetLeadTimeInDays,
      material: this.state.material,
      sub_grade_material: this.state.sub_grade_material,
      part_finish: this.state.part_finish,
      roughness: this.state.roughness,
      tolerances: this.state.tolerances,
      inspection: this.state.inspection,
    });
  };
  
  getCycleTime = async  () =>{
    this.props.syncData({
      machine:this.state.machine,
      quntity: this.state.quntity,
      numberOfThread: this.state.numberOfThread,
      numberOfWorkingSHifts: this.state.numberOfWorkingSHifts,
      numberOfWorkingHours: this.state.numberOfWorkingHours,
      numberOfWeeklyOffDays: this.state.numberOfWeeklyOffDays,
      targetLeadTimeInDays: this.state.targetLeadTimeInDays,
      material: this.state.material,
      sub_grade_material: this.state.sub_grade_material,
      part_finish: this.state.part_finish,
      roughness: this.state.roughness,
      tolerances: this.state.tolerances,
      inspection: this.state.inspection,
    });

  };

  render() {
    const { machines } = this.state;

    const {
      file_path,
      bounding_box = "",
      bounding_box_volume,
      surface_area,
    } = this.props.data;

    const boundingBox =
      bounding_box.replace(/[\[\]']+/g, "").replace(/[,]+/g, " X ") + "mm";

    const absolute_path = assetBaseUrl + file_path;

    return (
      <Box
        sx={{
          padding: "20px",
          backgroundColor: "#F8F9FAFF",
          margin: "10px",
        }}
        className="shaddow"
      >
        {/* 3d view */}
        <Box
          className="border"
          sx={{
            maxHeight: "40vh",
            overflow: "hidden",
            minHeight: "40vh",
          }}
        >
          {/* <iframe
            title="stl viewer"
            src={`https://www.viewstl.com/?embedded=true&url=${absolute_path}`}
            width="100%"
            height="500px"
            frameBorder="0"
            allowFullScreen
          ></iframe> */}
          <STLViewer
            file_path={
              absolute_path ??
              "https://storage.googleapis.com/ucloud-v3/ccab50f18fb14c91ccca300a.stl"
            }
          />
        </Box>

        <Box
          sx={{
            minHeight: "60vh",
            maxHeight: "60vh",
            height: "60vh",
            overflow: "auto",
          }}
        >
          <div className="d-flex flex-row ">
            <p className="bold h7 m-2">
              bounding box : <span className=" h7">{boundingBox}</span>
            </p>
            <p className="bold h7 m-2">
              volume : <span className="h7">{bounding_box_volume} mm3</span>
            </p>
            <p className="bold h7 m-2">
              surface area : <span className="h7">{surface_area} mm2</span>
            </p>
          </div>
          <hr />
          <div>
            <div>part quantity</div>
            <Quantity
              quntity={this.state.quntity}
              onValueChange={(value) => {
                this.setState({ quntity: value }, () => {
                  this.getCost();
                });
              }}
            />
          </div>
          <hr />
          <div>
            <div className="h5 bold mb-3">process/ material</div>
            <div className="center-div-mbl">
              <div>
                <label>machine</label>
                <form>
                  <select
                    className="select-input"
                    onChange={(e) => {
                      this.setState({ machine: e.target.value }, () => {
                        this.getCost();
                      });
                    }}
                  >
                    {machines.map((machine, index) => {
                      return <option value={machine.id}>{machine.machine}</option>;
                    })}
                  </select>
                </form>
              </div>
              <div>
                <label>materials</label>
                <form>
                  <select
                    className="select-input"
                    onChange={(e) => {
                      this.setState({ material: e.target.value }, () => {
                        this.getCost();
                      });
                    }}
                  >
                    {machines.length > 0 && machines.find(machine => machine.id == this.state.machine) &&
                      machines.find(machine => machine.id == this.state.machine).materials.map((material, index) => (
                        <option key={index} value={material.machine_material_id +1}>
                          {materials[material.machine_material_id]}
                        </option>
                      ))
                    }
                  </select>
                </form>
              </div>
              <div>
                <label>sub-grade materials</label>
                <form>
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
                    {console.log('machine_name',this.state.machine)}
                    {subgrade[this.state.material - 1]?.map((material, index) => {
                        const selectedMachine = machines.find(machine => machine.id === parseInt(this.state.machine));
                        if (!selectedMachine) {
                          console.error("Invalid machine or material data.");
                          return null;
                        }
                        console.log('material_name1',this.state.material);
                        const subGradeMaterials = selectedMachine.materials.find(mat => mat.machine_material_id === (this.state.material-1)).subGrade;
                        
                        if (!subGradeMaterials) {
                          console.error("subGradeMaterials is undefined or empty.");
                          return null;
                        }
                        console.log('material_name',subGradeMaterials);
                        const uniqueValuesSet = new Set();

                        const options = subGradeMaterials
                          .filter(mt => mt.machine_sub_material_id === index)
                          .map((mt, ind) => {
                            const value = mt.machine_sub_material_id; // or use mt.someOtherProperty if it's the value you want to avoid repeating
                            if (!uniqueValuesSet.has(value)) {
                              uniqueValuesSet.add(value);
                              return (
                                <option key={ind + 1} value={index}>
                                  {material}
                                </option>
                              );
                            }
                            return null;
                          });
                        
                        return options.length > 0 ? options : null;
                      })}
                    {/* {subgrade[this.state.material-1].map((material, index) => {
                      return <option value={index + 1}>{material}</option>;
                    })} */}
                  </select>
                </form>
              </div>
            </div>
            <hr />

            {/* number of threads */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div className="h5 bold mb-1">part features</div>
              <span className="h7">
                Used to specify threads, tapped holes, surface roughness
              </span>
              <span className="h6 bold">threads and tapped holes</span>
              <span className="h7">
                specify the number of threads on the part
              </span>
              <Quantity
                quntity={this.state.numberOfThread}
                onValueChange={(value) => {
                  this.setState({ numberOfThread: value });
                }}
              />
            </Box>

            {/* tolerance */}

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span className="h6 bold">tolerance</span>

              <div className="form-group">
                <label className="h7 bold">tightest tolerance</label>
                <select
                  className="select-input form-control"
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

              <span className="h6 bold">surface roughness</span>
              <span className="h7 no-trans">
                tolerance will be held to 125uin/3.2um Ra in accordance with ISO
                2768 unless otherwise specified.
              </span>

              <div className="form-group">
                <label className="h7 bold">finest roughness</label>
                <select
                  className="select-input form-control"
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
            </Box>

            <hr />

            {/* shop params */}

            <Box sx={{}}>
              <div className="h5 bold mb-1">shop parameters</div>
              <span className="h7">
                Lead time and cost will vary based on these factors
              </span>

              <Box className="form-group mt-2">
                <label className="h6 bold">no of working shifts per day</label>
                <Quantity
                  quntity={this.state.numberOfWorkingSHifts}
                  onValueChange={(value) => {
                    this.setState({ numberOfWorkingSHifts: value });
                  }}
                />
              </Box>

              <Box className="form-group mt-2">
                <label className="h6 bold">
                  no of working hours in one shift
                </label>
                <Quantity
                  quntity={this.state.numberOfWorkingHours}
                  onValueChange={(value) => {
                    this.setState({ numberOfWorkingHours: value });
                  }}
                />
              </Box>

              <Box className="form-group mt-2">
                <label className="h6 bold">no of weekly offs</label>
                <Quantity
                  quntity={this.state.numberOfWeeklyOffDays}
                  onValueChange={(value) => {
                    this.setState({ numberOfWeeklyOffDays: value });
                  }}
                />
              </Box>
            </Box>

            <hr />
            {/* constraint */}

            <Box sx={{}}>
              <div className="h5 bold mb-1">constraints</div>
              <Box className="form-group mt-2">
                <label className="h6 bold">
                  target lead time given by customer (in days)
                </label>
                <Quantity
                  quntity={this.state.targetLeadTimeInDays}
                  onValueChange={(value) => {
                    this.setState({ targetLeadTimeInDays: value });
                  }}
                />
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "5px 10px",
              }}
            >
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#7B48CCFF",
                  color: "#ffffff",
                  borderRadius: "5px",
                  padding: "10px 20px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  textTransform: "none",
                }}
                type="submit"
                onClick={this.getCycleTime}
              >
                Save
              </Button>
            </Box>
          </div>
        </Box>
      </Box>
    );
  }
}
export default Tool;
