import React from "react";
import { Row, Col, Switch, Select, Input } from "antd";
// import "./style.css";
import { DeleteFilled } from "@ant-design/icons";
import InstantCycle from "../instantCycle";
import Grid from '@mui/material/Grid';

import { Box } from "@material-ui/core";
import { Button } from "@mui/material";

import { Link } from "react-router-dom";
import routes from "../../../../../routes";
import api, { URL_PATH } from "../../../../../Common/API";

const allMaterials = [
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

const machineCarbonCopy = {
  machine_status: 1,
  machine: "machine Name",
  process: "cnc",
  per_hr_machine_rate_inr: "200",
  maxAllowablePartSizeX: "100",
  maxAllowablePartSizeY: "100",
  maxAllowablePartSizeZ: "100",
  finest_surface_roughness: "6.4",
  max_machinable_hardness: "10",
  max_power: "10",
  model_make: "xyz",
  machine_age: "7",
  minAllowablePartSizeX: "10",
  minAllowablePartSizeY: "10",
  minAllowablePartSizeZ: "10",
  finest_acheivable_tolerance: "0.125",
  tooling_id: "0",
  max_rpm: "10000",
  materials: [],
};

const { Option } = Select;
class MachineOne extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      machines: [machineCarbonCopy],
      activeMachine: -1,
      activeMachineTab: 0,
      activeMachineMaterial: -1,
    };
  }


  componentDidMount() {
    this.getMachines();
  }





  getMachines = async () => {
    const response = await api.get(URL_PATH.msaas_get_machines);
    if (response.status == 200) {
      const data = response.data.data.map(item => {

        const [maxAllowablePartSizeX, maxAllowablePartSizeY, maxAllowablePartSizeZ] = JSON.parse(item.max_allowed_part_size)

        const [minAllowablePartSizeX, minAllowablePartSizeY, minAllowablePartSizeZ] = JSON.parse(item.min_allowed_part_size)

        return { maxAllowablePartSizeX, maxAllowablePartSizeY, maxAllowablePartSizeZ, minAllowablePartSizeX, minAllowablePartSizeY, minAllowablePartSizeZ, ...item }
      })


      console.log("**********************************************" + JSON.stringify(data));

      this.setState({
        machines: data,
      })
    }

  }

  onChange = (key, value) => {

    const { activeMachine, activeMachineTab } = this.state;

    let temp = [...this.state.machines];
    temp[activeMachine][key] = value;
    this.setState({
      machines: temp,
    });

  }


  selectMaterial = (index) => {

    const { activeMachine } = this.state;
    let temp = [...this.state.machines];


    // push object of material if not present

    const { materials } = temp[activeMachine];

    // check is tehre item in materials whose index is index

    const searchindex = materials.findIndex(item => item.machine_material_id == index);


    if (searchindex == -1) {

      temp[activeMachine].materials.push({
        machine_material_id: index,
        subGrade: [],
      });
      this.setState({ activeMachineMaterial: index });
    }
    else {
      temp[activeMachine].materials.splice(searchindex, 1);
    }


    this.setState({
      machines: temp,
    });


    console.log(JSON.stringify(temp));

  }

  selectSubMaterial = (index) => {

    const { activeMachine, activeMachineMaterial } = this.state;
    let temp = [...this.state.machines];

    const { materials } = temp[activeMachine];

    const subgradeIndex = materials.findIndex(item => item.machine_material_id == activeMachineMaterial);

    const { subGrade = [] } = subgradeIndex != -1 ? materials[subgradeIndex] : []



    // check is tehre item in materials whose index is index

    const searchindex = subGrade.findIndex(item => item.machine_sub_material_id == index);


    if (searchindex == -1) {

      temp[activeMachine].materials[subgradeIndex].subGrade.push({
        machine_sub_material_id: index,
        sub_material_price_per_kg: "",
      });
    }
    else {
      temp[activeMachine].materials[subgradeIndex].subGrade.splice(searchindex, 1);
    }

    this.setState({
      machines: temp,
    });


    console.log(JSON.stringify(temp));

  }





  Step2 = () => {

    const { activeMachine, machines, activeMachineMaterial } = this.state;

    const { materials } = machines[activeMachine];


    const subgradeIndex = materials.findIndex(item => item.machine_material_id == activeMachineMaterial);

    const { subGrade = [] } = subgradeIndex != -1 ? materials[subgradeIndex] : []

    return (<Grid container spacing={2}
      sx={{
        borderRadius: "10px",
        borderWidth: "1px",
        padding: "1px 10px",
      }}>
      {/* left part */}
      <Grid item xs={5}>
        <Box className="mt-1">
          <label style={{ fontSize: "14px", marginBottom: "4px" }}>
            materials and sub-grades
          </label>
          {allMaterials.map((item, index) => {
            const checked = materials.findIndex(item => item.machine_material_id == index) != -1;
            return (
              <Box className="d-flex flex-row justify-content-between align-item-center align-content-center  pt-3 pb-1 px-2"

                sx={{
                  backgroundColor: activeMachineMaterial == index ? "#7b48cc" : "#ffffff",
                  color: activeMachineMaterial == index ? "#ffffff" : "#000000",
                }}
              >
                {/* checkbox and label */}
                <Box className="d-flex flex-row align-item-center align-content-center">
                  <input className="h4" type="checkbox" checked={checked} onChange={(e) => {
                    this.selectMaterial(index);
                  }} />
                  <label className="h5" style={{ marginLeft: "10px" }} onClick={() => this.selectMaterial(index)}>{item}</label>
                </Box>
                {/* right arrow */}
                {checked && <i className="fa fa-chevron-right" style={{ fontSize: "14px", }}
                  onClick={() => this.setState({ activeMachineMaterial: index })}
                ></i>}
              </Box>
            )
          })}

        </Box>
      </Grid>
      {/* right part */}
      <Grid item xs={7}>
        <Box className="form-group mt-2" sx={{
          backgroundColor: "#F8F9FAFF",
          padding: "10px",
          borderRadius: "10px",
        }}>

          <label style={{ fontSize: "14px", }}>
            sub-grade
          </label>

          {activeMachineMaterial != -1 && subgrade[activeMachineMaterial].map((item, index) => {
            const checked = subGrade.findIndex(item => item.machine_sub_material_id == index) != -1;
            return (
              <Box className="d-flex flex-row justify-content-between align-item-center align-content-center mt-2" sx={{
              }}>
                {/* checkbox and label */}
                <Box className="col-5 d-flex flex-row align-item-center align-content-center">
                  <input className="h4" type="checkbox" checked={checked} onChange={(e) => {
                    this.selectSubMaterial(index);
                  }} />
                  <label className="h5" style={{ marginLeft: "10px" }} onClick={() => this.selectSubMaterial(index)}>{item}</label>
                </Box>
                {/* right arrow */}
                {checked && <input className="form-control"

                  placeholder="per kg price in INR"

                  style={{
                    // width: "100px",
                    height: "30px",
                    borderRadius: "5px",
                    border: "1px solid #7B48CCFF",
                    padding: "5px",
                    fontSize: "14px",
                    fontWeight: "bold",
                    textTransform: "none",
                  }}
                  onChange={(e) => {
                    const { value } = e.target;
                    const searchindex = subGrade.findIndex(item => item.machine_sub_material_id == index);
                    if (searchindex != -1) {
                      subGrade[searchindex].sub_material_price_per_kg = value;
                    }

                    const { activeMachine } = this.state;

                    let temp = [...this.state.machines];

                    temp[activeMachine].materials[subgradeIndex].subGrade = subGrade;

                    this.setState({
                      machines: temp
                    })
                  }}

                  value={subGrade.findIndex(item => item.machine_sub_material_id == index) != -1 ? subGrade[subGrade.findIndex(item => item.machine_sub_material_id == index)].sub_material_price_per_kg : ""}
                />}
              </Box>
            )
          })}
        </Box>
      </Grid>
    </Grid>)

  }


  ActiveMachine = () => {



    const { activeMachine, activeMachineTab } = this.state;




    if (activeMachineTab == 0) {

      const { machine, process, per_hr_machine_rate_inr,
        maxAllowablePartSizeX, maxAllowablePartSizeY, maxAllowablePartSizeZ,
        minAllowablePartSizeX, minAllowablePartSizeY, minAllowablePartSizeZ,
        finest_surface_roughness, max_machinable_hardness, max_power, model_make, machine_age,
        finest_acheivable_tolerance, tooling_id, max_rpm } = this.state.machines[activeMachine];

      return (
        <Box className="shaddow m-1 p-1" sx={{
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          marginTop: "20px",
          borderWidth: "1px",
          minHeight: "60vh",
        }}>
          {/* machine number delete and edit icons */}
          <Box className="d-flex flex-row justify-content-between align-items-center p-2">

            <Box className="form-group mt-1" sx={{
              display: "flex",
              flexDirection: "column",
              flex: 3
            }}>
              <Input
                variant="outlined"
                label="per hour machine rate (in INR)"
                className="form-control full-width" placeholder="Lathe machine"
                defaultValue={machine}
                onChange={(e) => {
                  this.onChange("machine", e.target.value);
                }}
              />
            </Box>
            <Box className="row-div" sx={{
              display: "flex",
              flex: 2
            }}>
              <Box>
                <Link to={routes.msas.priceMatching(this.props.id)} style={{ textDecoration: "none", marginRight: "10px" }}>
                  price matching tool
                </Link>
              </Box>
              <Box>
                <DeleteFilled className="icon-style"
                  onClick={() => {
                    this.deleteMachine(this.state.activeMachine);
                  }}
                />
              </Box>
              <Box>
                <Switch defaultChecked size="small" />
              </Box>
            </Box>
          </Box>
          {/* machine details */}
          <Grid container spacing={2}
            sx={{
              borderRadius: "10px",
              borderWidth: "1px",
              padding: "1px 10px",
            }}>

            {/* left part */}
            <Grid item xs={6}>

              {/* process */}
              <Box className=" form-group mt-1">
                <label style={{ fontSize: "14px", marginBottom: "4px" }}>Process</label>
                <select
                  showSearch
                  className="form-control"
                  optionFilterProp="children"
                  onChange={(e) => {
                    this.onChange("process", e.target.value);
                  }}
                  defaultValue={process}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <option style={{ color: "#7878bd" }} value="cnc">
                    cnc machine
                  </option>
                  <option style={{ color: "#7878bd" }} value="cnv">
                    conventional machine
                  </option>
                </select>
              </Box>

              {/* per hour machine rate (in INR) */}
              <Box className="form-group mt-1">
                <label style={{ fontSize: "14px", marginBottom: "4px" }}>
                  per hour machine rate (in INR)
                </label>
                <input className="form-control" placeholder="e.g.200/"

                  defaultValue={per_hr_machine_rate_inr}
                  onChange={(e) => {
                    this.onChange("per_hr_machine_rate_inr", e.target.value);
                  }}
                />
              </Box>

              {/* max.allowable part size (mm)< */}
              <Box className="form-group mt-1">
                <label style={{ fontSize: "14px", marginBottom: "4px" }}>max. allowable part size (mm)</label>
                <Box className="s-flex row">

                  <span className="col-4 d-flex flex-row align-item-center align-content-center">
                    <input className="form-control"
                      defaultValue={maxAllowablePartSizeX}
                      onChange={(e) => {
                        this.onChange("maxAllowablePartSizeX", e.target.value);
                      }}
                    />
                  </span>
                  <span className="col-4 d-flex flex-row align-item-center align-content-center">
                    <input className="form-control"
                      defaultValue={maxAllowablePartSizeY}
                      onChange={(e) => {
                        this.onChange("maxAllowablePartSizeY", e.target.value);
                      }}
                    />

                  </span>
                  <span className="col-4 d-flex flex-row align-item-center align-content-center">
                    <input className="form-control"
                      defaultValue={maxAllowablePartSizeZ}
                      onChange={(e) => {
                        this.onChange("maxAllowablePartSizeZ", e.target.value);
                      }}
                    />
                  </span>
                </Box>
              </Box>

              {/* finest surface roughness (Ra) */}
              <Box className="form-group mt-1">
                <label style={{ fontSize: "14px", marginBottom: "4px" }}>
                  finest surface roughness (Ra)
                </label>
                <select className="form-control"

                  defaultValue={finest_surface_roughness}
                  onChange={(e) => {
                    this.onChange("finest_surface_roughness", e.target.value);
                  }}>

                  <option value="0">6.4</option>
                  <option value="1">3.2</option>
                  <option value="2">1.6</option>
                  <option value="3">0.8</option>
                  <option value="4">0.4</option>
                </select>
              </Box>

              {/* max.machinable hardness (hrc) */}
              <Box className="form-group mt-1">
                <label style={{ fontSize: "14px", marginBottom: "4px" }}>
                  max. machinable hardness (hrc)
                </label>
                <input className="form-control" placeholder="e.g. 10"

                  defaultValue={max_machinable_hardness}
                  onChange={(e) => {
                    this.onChange("max_machinable_hardness", e.target.value);
                  }}
                />

              </Box>

              {/* max.power */}
              <Box className="form-group mt-1">
                <label style={{ fontSize: "14px", marginBottom: "4px" }}>max. power</label>
                <input className="form-control" placeholder="e.g. 10 KW"

                  defaultValue={max_power}
                  onChange={(e) => {
                    this.onChange("max_power", e.target.value);
                  }}
                />
              </Box>
            </Grid>

            {/* right part */}

            <Grid item xs={6}>
              <Box className="form-group mt-1">
                <label style={{ fontSize: "14px", marginBottom: "4px" }}>model/make</label>
                <input className="form-control"
                  defaultValue={model_make}
                  onChange={(e) => {
                    this.onChange("model_make", e.target.value);
                  }}

                />


              </Box>
              <Box className="form-group mt-1">
                <label style={{ fontSize: "14px", marginBottom: "4px" }}>age of machine</label>
                <input className="form-control" placeholder="e.g. 7 years"

                  defaultValue={machine_age}
                  onChange={(e) => {
                    this.onChange("machine_age", e.target.value);
                  }}
                />


              </Box>
              <Box className="form-group mt-1">
                <label style={{ fontSize: "14px", marginBottom: "4px" }}>min.allowable part size (mm)</label>
                <Box className="s-flex row">
                  <span className="col-4 d-flex flex-row align-item-center align-content-center">
                    <input className="form-control"

                      defaultValue={minAllowablePartSizeX}
                      onChange={(e) => {
                        this.onChange("minAllowablePartSizeX", e.target.value);
                      }}
                    />

                  </span>
                  <span className="col-4 d-flex flex-row align-item-center align-content-center">
                    <input className="form-control"


                      defaultValue={minAllowablePartSizeY}
                      onChange={(e) => {
                        this.onChange("minAllowablePartSizeY", e.target.value);
                      }}
                    />
                  </span>
                  <span className="col-4 d-flex flex-row align-item-center align-content-center">
                    <input className="form-control"

                      defaultValue={minAllowablePartSizeZ}
                      onChange={(e) => {
                        this.onChange("minAllowablePartSizeZ", e.target.value);
                      }}
                    />

                  </span>
                </Box>
              </Box>
              <Box className="form-group mt-1">
                <label style={{ fontSize: "14px", marginBottom: "4px" }}>
                  finest achievable tolerance (mm)
                </label>
                <select className="form-control"

                  defaultValue={finest_acheivable_tolerance}
                  onChange={(e) => {
                    this.onChange("finest_acheivable_tolerance", e.target.value);
                  }}
                >
                  <option value="1">0.125</option>
                  <option value="2">0.1</option>
                  <option value="3">0.075</option>
                  <option value="4">0.05</option>
                  <option value="4">0.025</option>

                </select>
              </Box>
              <Box className="form-group mt-1">
                <label style={{ fontSize: "14px", marginBottom: "4px" }}>tooling_id</label>
                <select className="form-control"
                  showSearch

                  optionFilterProp="children"

                  defaultValue={tooling_id}
                  onChange={(e) => {
                    this.onChange("tooling_id", e.target.value);
                  }}


                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <option style={{ color: "#7878bd" }} value="0">
                    superior (will reduce your cycle time)
                  </option>
                  <option style={{ color: "#7878bd" }} value="1">
                    mid range (will reduce your cycle time)
                  </option>
                  <option style={{ color: "#7878bd" }} value="2">
                    local (will reduce your cycle time)
                  </option>
                </select>
              </Box>
              <Box className="form-group mt-1">
                <label style={{ fontSize: "14px", marginBottom: "4px" }}>max. rpm</label>
                <input className="form-control" placeholder="e.g. 10000"

                  defaultValue={max_rpm}
                  onChange={(e) => {
                    this.onChange("max_rpm", e.target.value);
                  }}
                />
              </Box>

            </Grid>
          </Grid>
          {/* Save button */}
          <Box sx={{
            display: "flex",
            flex: 1,
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 10px",
          }}>

            <Button variant="outlined" style={{
              border: "1px solid #7B48CCFF",
              color: "#7B48CCFF",
              borderRadius: "5px",
              padding: "10px 20px",
              fontSize: "14px",
              fontWeight: "bold",
              textTransform: "none",
            }}
              onClick={() => {
                this.setState({
                  activeMachine: -1,
                  activeMachineTab: 0,
                });
              }}
            >
              Close
            </Button>


            <Button variant="contained" style={{
              backgroundColor: "#7B48CCFF",
              color: "#ffffff",
              borderRadius: "5px",
              padding: "10px 20px",
              fontSize: "14px",
              fontWeight: "bold",
              textTransform: "none",
            }}

              onClick={() => {
                this.setState({
                  activeMachineTab: 1,
                });
              }}


            >
              add materials
            </Button>
          </Box>
        </Box>)

    } else if (activeMachineTab == 1) {

      const { machine, process, per_hr_machine_rate_inr } = this.state.machines[activeMachine];


      return (
        <Box className="shaddow m-1 p-1" sx={{
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          marginTop: "20px",
          borderWidth: "1px",
        }}>
          {/* machine number delete and edit icons */}
          <Box className="d-flex flex-row justify-content-between align-items-center p-3" sx={{}}>
            <h5 className="macine-text" style={{
              display: "flex",
              flex: 3
            }}>{machine}</h5>
            <Box className="row-div" sx={{
              display: "flex",
              flex: 2
            }}>
              <Link to={routes.msas.priceMatching(this.props.id)} style={{ textDecoration: "none", marginRight: "10px" }}>
                price matching tool
              </Link>
              <Box>
                <DeleteFilled className="icon-style"
                  onClick={() => {
                    this.deleteMachine(this.state.activeMachine);
                  }}
                />
              </Box>
              <Box>
                <Switch defaultChecked size="small" />
              </Box>
            </Box>
          </Box>

          <this.Step2 />

          {/* buttons */}
          <Box sx={{
            display: "flex",
            flex: 1,
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 10px",
          }}>

            <Button variant="outline" style={{
              border: "1px solid #7B48CCFF",
              color: "#7B48CCFF",
              borderRadius: "5px",
              padding: "10px 20px",
              fontSize: "14px",
              fontWeight: "bold",
              textTransform: "none",
            }}
              onClick={() => {
                this.setState({
                  activeMachineTab: 0,
                });
              }}
            >
              Back
            </Button>

            <Button variant="outline" style={{
              border: "1px solid #7B48CCFF",
              color: "#7B48CCFF",
              borderRadius: "5px",
              padding: "10px 20px",
              fontSize: "14px",
              fontWeight: "bold",
              textTransform: "none",
            }}
              onClick={() => {
                this.setState({
                  activeMachineTab: 0,
                  activeMachine: -1,
                });
              }}
            >
              close
            </Button>


            <Button variant="contained" style={{
              backgroundColor: "#7B48CCFF",
              color: "#ffffff",
              borderRadius: "5px",
              padding: "10px 20px",
              fontSize: "14px",
              fontWeight: "bold",
              textTransform: "none",
            }}

              onClick={() => {
                this.saveNewMachine();
              }}
            >
              save
            </Button>
          </Box>
        </Box>)
    }
  }


  saveNewMachine = async () => {

    // validate data

    const { machines, activeMachine } = this.state;

    const { machine, process, per_hr_machine_rate_inr,

      maxAllowablePartSizeX, maxAllowablePartSizeY, maxAllowablePartSizeZ,

      minAllowablePartSizeX, minAllowablePartSizeY, minAllowablePartSizeZ,

      finest_surface_roughness, max_machinable_hardness, max_power, model_make, machine_age,

      finest_acheivable_tolerance, tooling_id, max_rpm, materials } = machines[activeMachine];

    // if (machine == "" || process == "" || per_hr_machine_rate_inr == "" || maxAllowablePartSizeX == "" || maxAllowablePartSizeY == "" || maxAllowablePartSizeZ == "" || minAllowablePartSizeX == "" || minAllowablePartSizeY == "" || minAllowablePartSizeZ == "" || finest_surface_roughness == "" || max_machinable_hardness == "" || max_power == "" || model_make == "" || machine_age == "" || finest_acheivable_tolerance == "" || tooling_id == "" || max_rpm == "") {
    //   alert("Please fill all the fields");
    //   return;
    // }


    if (materials.length == 0) {
      alert("Please select atleast one material");
      return;
    }

    // check if all the subgrades are filled

    let isAllSubgradeFilled = true;

    materials.forEach(item => {
      if (item.subGrade.length == 0) {
        isAllSubgradeFilled = false;
        return;
      }
      item.subGrade.forEach(subitem => {
        if (subitem.sub_material_price_per_kg == "") {
          isAllSubgradeFilled = false;
          return;
        }
      })
    })

    if (!isAllSubgradeFilled) {
      alert("Please fill all the subgrades");
      return;

    }

    // save data


    const formdata = {
      machine: JSON.stringify(machines[activeMachine]),
    }

    const response = await api.post(URL_PATH.msaas_add_machine, formdata);

    if (response.status == 200) {
      alert("Machine added successfully");
    }

    this.setState({
      activeMachine: -1,
      activeMachineTab: 0,
    });

  }


  addNewMachine = () => {
    let temp = [...this.state.machines];
    temp.push({ ...machineCarbonCopy });
    this.setState({
      machines: temp,
      activeMachine: temp.length - 1,
    });
  }



  deleteMachine = async (index) => {

    const { machines } = this.state;

    // native confirm dialog box
    if (!window.confirm("Are you sure you want to delete this machine?")) {
      return;
    }


    const id = machines[index].id

    if (id) {
      const response = await api.delete(URL_PATH.msaas_delete_machine(id));
      if (response.status == 200) {
        alert("Machine deleted successfully");
      }
    }


    let temp = [...machines];
    temp.splice(index, 1);
    this.setState({
      machines: temp,
      activeMachine: -1,
      activeMachineTab: 0,
    });
  }

  AllMachineList = () => {

    const { machines } = this.state;


    return (

      <Box>
        {machines.map((item, index) => {
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
                {item.machine}
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >

                {/* price matching tool */}
                <Link to={routes.msas.priceMatching(item.id)} style={{ textDecoration: "none", marginRight: "10px" }}>
                  price matching tool
                </Link>

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
                    alert('If you edit the machine the settings of price matching tools will be reset.');
                    this.setState({
                      activeMachine: index,
                    });
                  }}
                >
                  <i className="fa fa-edit" OnOpen> </i>
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

                    this.deleteMachine(index);


                  }}
                >
                  <i className="fa fa-trash"></i>
                </div>
              </div>
            </div>
          )
        })}

        {/* Add new machine button */}

        <Box sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "15px 10px",
        }}>
          <Button variant="contained" style={{
            backgroundColor: "#7B48CCFF",
            color: "#ffffff",
            borderRadius: "5px",
            padding: "10px 20px",
            fontSize: "14px",
            fontWeight: "bold",
            textTransform: "none",
          }}
            onClick={() => {
              this.addNewMachine();
            }}

          >
            add new machine
          </Button>
        </Box>
      </Box>
    )


  }

  render() {

    const { activeMachine, activeMachineTab } = this.state;


    return (
      <Box>


        {/* setup your shop in minutes */}
        <Box sx={{
          padding: "10px",
          backgroundColor: "#F8F9FAFF",
          minHeight: "60vh",
        }}
          className="shaddow m-2"
        >
          <h4 className="setup-text center bold" style={{
            color: "#7B48CCFF"
          }}>setup your shop in minutes</h4>
          <div className="center h8" style={{
            color: " #9095A0FF"
          }}>
            this values will be taken into consideration while calculation the
            cost of uploaded parts
          </div>

          {activeMachine == -1 ?
            <this.AllMachineList /> :
            <this.ActiveMachine />
          }

        </Box>

        {/* instant cycle */}

        <InstantCycle data={this.props.data} />

      </Box>
    );
  }
}
export default MachineOne;
