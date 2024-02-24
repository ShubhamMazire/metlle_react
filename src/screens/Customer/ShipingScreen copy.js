import React, { Component } from "react";

import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { ThemeProvider, styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import moment from "moment";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
// import CloseIcon from '@mui/icons-material/Close';
import Typography from "@mui/material/Typography";

import axios from "axios";
import HeaderComponent from "../../Components/HeaderComponentMLP";
import routes from "../../routes";
import translater from "../../Constants/translator";
import API, { URL_PATH, assetBaseUrl, localUrl } from "../../Common/API";

const Box = ({ arr = [], children }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        fontSize: "13px",
        // margin: "0px 10px",
      }}
      className="semi_bold"
    >
      {arr.map((item, index) => {
        return (
          <div
            style={{
              margin: "5px 0px",
            }}
          >
            <span style={{}} className="semi_bold no_trans">
              {item.name}:
            </span>
            <span className=" no_trans"> {item.value}</span>
            {item.posFix ?? ""}
          </div>
        );
      })}
      {children}
    </div>
  );
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      dragOver: false,
      uploading: false,
      cost: 0,
      showPopup: false,
      processing: true,
      kiriSend: false,
    };
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    console.log(id);
    this.setState({ id });
    this.getData(id);
  }

  componentWillUnmount() {
    try {
      clearTimeout(this.timeout);
    } catch (error) {}
  }

  getData = async (id) => {
    const fd = {
      id,
    };

    console.log(fd);

    const res = await API.post(URL_PATH.getQuotationDetails, fd);

    const { status, message, data } = res.data;

    if (status == "success" && data.kiri_value != null)
      this.setState({ kiriSend: true });
    else if (this.state.kiriSend == false) {
      const kiri_value = await window.calculateCNC(data.absolute_path);
      const res2 = await API.post(URL_PATH.updateKiriValue, {
        id,
        kiri_value,
      });
      this.setState({ kiriSend: true });
    }

    if (status == "error") {
      try {
        clearTimeout(this.timeout);
      } catch (error) {}

      this.timeout = setTimeout(() => {
        this.getData(id);
      }, 2500);
      return;
    }

    const {
      requested_part_date,
      p_id,
      file_path,
      absolute_path,
      thumbnail_path,
      // costs ------------------------------

      cost_before_quantity,
      machine_cost,
      material_cost,
      overhead,
      final_cost,
      //---------------------

      bounding_box,
      volume,
      surface_area,
      process,
      material,
      sub_grade_material,
      surface_roughness,
      certificate,
      tolerances,
      color,
      finishing,
      threads,
      inspection,
      dfm_comp,
      surge,
      //================================

      final_cost: production_cost = "0",
      packing_cost = "0",
      shipping_cost = "0",
      credit = "0",
      discount = "0",
      gst = "0",
      sub_total = "0",
    } = data;

    this.setState({
      p_id,
      processing: false,
      requested_part_date,
      file_path,
      absolute_path,
      thumbnail_path,
      // costs ------------------------------

      cost_before_quantity: parseInt(cost_before_quantity),
      machine_cost,
      material_cost,
      overhead,
      final_cost,
      //--------------

      bounding_box: translater(
        "bounding_box",
        sub_grade_material,
        bounding_box
      ),
      volume,
      surface_area,

      //----------------  transalation reqored
      process,
      material: translater("material", sub_grade_material, material),
      surface_roughness: translater(
        "surface_roughness",
        sub_grade_material,
        surface_roughness
      ),
      certificate: translater("certificate", sub_grade_material, certificate),
      tolerances: translater("tolerances", sub_grade_material, tolerances),
      color: color,
      finishing: translater("partFinish", sub_grade_material, finishing),
      threads: translater("threads", sub_grade_material, threads),
      inspection: translater("inspection", sub_grade_material, inspection),
      dfm_comp,
      surge,
      //================================
      production_cost,
      packing_cost,
      shipping_cost,
      credit,
      discount,
      gst,
      sub_total,
    });

    // updateKiriValue
  };

  dragenter = (e) => {
    e.stopPropagation();
    this.setState({ dragOver: true });
    e.preventDefault();
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
    const dropbox = document.getElementById("dropbox");
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      //STEP or STL stl or step
      //check filename ends with .stl or .step
      const filename = file.name;
      const extension = filename.split(".").pop();
      if (
        extension !== "stl" &&
        extension !== "step" &&
        extension !== "STEP" &&
        extension !== "STL"
      ) {
        alert("only stl and step files are allowed");
        return;
      }

      this.setState({ uploading: true });

      var formdata = new FormData();
      formdata.append("file", file);
      const result = await API.post("/customer/upload-model", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { status, message, data } = result.data;

      // {"IRMR":0.46890364412390606,"area":1933.793701171875,"price":43.54124069213867,"volume":5400.447983412295}

      if (status === "success") {
        const { id, file_path } = data;

        this.props.history.push({
          pathname: routes.customer.quotation,
          state: {
            data: data,
          },
        });

        this.setState({
          id,
          file_path,
          uploading: false,
          processing: true,
          kiriSend: false,
        });

        this.getData(id);
      } else alert(message);
      break; //only one file at a time
    }
  };

  matchTargetPrice = async () => {
    const res = await API.post(URL_PATH.getTargetPrice, {
      id: this.state.id,
      targeted_price: document.getElementById("targetValue").value,
    });

    const { status, message, data } = res.data;

    if (status == "success") {
      const { accept, avg_complexity } = data;

      this.setState({
        dfm_comp: avg_complexity,
      });

      this.setState({ showPopup: true, targetPriceAccept: accept });
    }
  };

  UploadedFile = () => {
    // return <div />;

    return (
      <div className="d-flex flex-row align-items-start align-content-start flex-start my-4  shaddow rounded border p-3">
        <div className="my-3 p-3 d-flex flex-row align-items-center">
          <input type="checkbox" name="a1" />
          <span style={{ marginLeft: "5px" }}>01</span>
        </div>
        <div
          style={{ flex: 1 }}
          className="d-flex flex-column my-3  p-3 rounded border"
        >
          <div
            className="d-flex  flex-row justify-content-between ml-4"
            style={{
              marginLeft: "15px",
            }}
          >
            <img
              className="rounded"
              src={
                this.state.thumbnail_path
                  ? assetBaseUrl + this.state.thumbnail_path
                  : "https://via.placeholder.com/100"
              }
              alt=""
              width={100}
              height={100}
            />
            <div
              style={{ flex: 1 }}
              className="d-flex flex-row justify-content-between"
            >
              {/* knuche.step */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  paddingBottom: "15px",
                }}
              >
                <div>
                  <div className="h5 bold">{this.state.p_id}</div>
                  {/* configure part */}
                  <div
                    onClick={() => {
                      this.props.history.push({
                        pathname: routes.customer.configurePart(this.state.id),
                      });
                    }}
                    style={{
                      color: "#16BC9CFF",
                      cursor: "pointer",
                      marginTop: "20px",
                    }}
                  >
                    <i className="fa fa-cog" aria-hidden="true"></i>
                    <span className="semi_bold h6">&nbsp;configure part</span>
                  </div>
                </div>
                <div
                  className="muted-text"
                  style={{
                    fontSize: "13px",
                  }}
                >
                  unit:mm(metric)
                </div>
              </div>
              {/* expected delivery */}
              <div
                className="d-flex flex-row justify-content-between m-2 rounded border shaddow"
                style={{
                  backgroundColor: "#F8F9FAFF",
                }}
              >
                <div className="p-3  d-flex flex-column justify-content-between">
                  <div
                    style={{ color: "#16BC9CFF", fontSize: "20px" }}
                    className="semi_bold"
                  >
                    expedite delivery
                  </div>
                  <div>
                    <i className="fa fa-clock-o " aria-hidden="true"></i>
                    <span style={{ fontSize: "13px" }}> 2 business days</span>
                  </div>
                </div>
                <div
                  style={{
                    width: "1px",
                    height: "100%",
                    backgroundColor: "gray",
                  }}
                />
                <div className="p-3 d-flex flex-column justify-content-end">
                  <h6
                    style={{
                      fontSize: "12px",
                    }}
                    className="no_trans"
                  >
                    {this.state.production_cost + this.state.surge} Rs each
                  </h6>
                  <div
                    className="bold h4 no_trans"
                    style={{
                      marginTop: "7px",
                    }}
                  >
                    {this.state.production_cost + this.state.surge} Rs
                  </div>
                </div>
              </div>

              {/* standerd delivary */}
              <div
                className="d-flex flex-row justify-content-between m-2 rounded border shaddow"
                style={{
                  backgroundColor: "#F8F9FAFF",
                }}
              >
                <div className="p-3  d-flex flex-column justify-content-between">
                  <div
                    style={{ color: "#535CE8FF", fontSize: "20px" }}
                    className="semi_bold"
                  >
                    standard delivery
                  </div>
                  <div>
                    <i className="fa fa-clock-o " aria-hidden="true"></i>
                    <span style={{ fontSize: "13px" }}> 2 business days</span>
                  </div>
                </div>
                <div
                  style={{
                    width: "1px",
                    height: "100%",
                    backgroundColor: "gray",
                  }}
                />
                <div className="p-3 d-flex flex-column justify-content-end">
                  <h6
                    style={{
                      fontSize: "12px",
                    }}
                    className="no_trans"
                  >
                    {this.state.production_cost} Rs each
                  </h6>
                  <div
                    className="bold h4 no_trans"
                    style={{
                      marginTop: "7px",
                    }}
                  >
                    {this.state.production_cost} Rs
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-2 d-flex flex-row justify-space-between">
            <Box
              arr={[
                {
                  name: "Bounding box",
                  value: this.state.bounding_box,
                },
                {
                  name: "Volume",
                  value: this.state.volume,
                  posFix: (
                    <span>
                      mm<sup>3</sup>
                    </span>
                  ),
                },
                {
                  name: "surface area",
                  value: this.state.surface_area,
                  posFix: (
                    <span>
                      mm<sup>2</sup>
                    </span>
                  ),
                },
              ]}
            />
            <Box
              arr={[
                {
                  name: "process",
                  value: this.state.process,
                },
                {
                  name: "Material",
                  value: this.state.material,
                },
                {
                  name: "Surface roughness",
                  value:
                    this.state.process == "3d"
                      ? "NA"
                      : this.state.surface_roughness,
                },
              ]}
            />
            <Box
              arr={[
                {
                  name: "certificate",
                  value: "NA", //this.state.certificate,
                },
                {
                  name: "tolerances",
                  value:
                    this.state.process == "3d" ? "NA" : this.state.tolerances,
                },
                {
                  name: this.state.process == "3d" ? "Color" : "finishing",
                  value:
                    this.state.process == "3d"
                      ? this.state.color
                      : this.state.finishing,
                },
              ]}
            />

            <Box
              arr={[
                {
                  name: "threads",
                  value: this.state.process == "3d" ? "NA" : this.state.threads,
                },
                {
                  name: "inspection",
                  value: this.state.inspection,
                },
                {
                  name: "DfM",
                  value:
                    this.state.process == "3d"
                      ? "NA"
                      : this.state.dfm_comp ?? 0 + "%",
                },
              ]}
            />

            <Box>
              <div
                style={{
                  display: "flex",
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  alignItems: "flex-start",
                  margin: "5px 0px",
                }}
                className=" shaddow py-1 px-1 rounded border"
              >
                <div
                  className="d-flex flex-row "
                  style={{
                    margin: "0px 10px",
                  }}
                >
                  <div
                    style={{ fontSize: "12px", marginRight: "5px" }}
                    className="semi_bold"
                  >
                    target price <br /> per pcs
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      margin: "auto",
                    }}
                  >
                    <input
                      type="text"
                      className="form-input rounded border semi_bold"
                      style={{
                        padding: "2px 0px",
                        marginRight: "10px",
                        textAlign: "center",
                        fontSize: "11px",
                        maxWidth: "95px",
                      }}
                      id="targetValue"
                    />
                    <button
                      className="ml-1 px-1"
                      style={{
                        backgroundColor: "#0d6efd",
                        border: "none",
                      }}
                      onClick={() => {
                        this.matchTargetPrice();
                      }}
                    >
                      {/* arrow icon */}
                      <img
                        src="https://img.icons8.com/ios-glyphs/30/000000/long-arrow-right.png"
                        style={{
                          // style tint color to white
                          filter: "invert(100%)",
                          width: "13px",
                          height: "13px",
                        }}
                        alt="Match"
                      />
                    </button>
                  </div>
                </div>
                <div
                  style={{
                    fontSize: "8px",
                    marginTop: "5px",
                  }}
                >
                  enter target price, we will try to match for you in seconds
                </div>
              </div>
            </Box>
          </div>
        </div>
      </div>
    );
  };

  Popup = () => {
    return (
      <BootstrapDialog
        onClose={() => {
          this.setState({ showPopup: false });
        }}
        aria-labelledby="customized-dialog-title"
        open={true}
        fullWidth={true}
        maxWidth={"md"}
      >
        {/* <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        Modal title
      </BootstrapDialogTitle> */}
        {/* <DialogTitle id="popup-message" /> */}

        <DialogContent
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: "50px 20px",
            justifyContent: "space-evenly",
            position: "relative",
          }}
        >
          <Button
            autoFocus
            onClick={() => {
              this.setState({ showPopup: false });
            }}
            style={{
              position: "absolute",
              top: "5px",
              right: "5px",
            }}
          >
            {/* cross icon image */}
            <img
              src="https://img.icons8.com/ios-glyphs/30/000000/multiply.png"
              alt="cross"
            />
          </Button>

          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <img
              style={{ height: "100%", maxWidth: "100%" }}
              src={"/assets/noMatch.png"}
              alt="placeholder"
            />
          </div>
          {this.state.targetPriceAccept ? (
            <div
              style={{
                paddingLeft: "25px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
              }}
            >
              <Typography
                className="center"
                variant="h6"
                style={{ fontWeight: "bold", marginBottom: "10px" }}
              >
                Congratulations!!
                <br />
                We have recalculate our quotation
                <br /> to match your target price
              </Typography>
            </div>
          ) : (
            <div
              style={{
                paddingLeft: "25px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
              }}
            >
              <Typography
                className="center"
                variant="h6"
                style={{ fontWeight: "bold", marginBottom: "10px" }}
              >
                Oops!!
                <br />
                We see, we can't match the target price
                <Typography
                  style={{
                    color: "blue",
                  }}
                  className="center semi_bold no_trans"
                  variant="subtitle1"
                >
                  Check DfM, to know more
                </Typography>
              </Typography>
              <div style={{ height: "50px" }} />
              <Typography className="center regular" variant="body1">
                please recalculate your target price <br />
                or
                <br />
                send this quotation for manual calculations
              </Typography>
            </div>
          )}
        </DialogContent>
      </BootstrapDialog>
    );
  };

  deleteApi = async (id) => {
    const result = await API.post(URL_PATH.deletePart, {
      id,
    });
    const { status, message = "Something went wrong", data } = result.data;

    if (status === "success") {
      // alert("Part deleted successfully");
      this.props.history.push({
        pathname: routes.customer.dashboard,
      });
    } else {
      alert(message);
    }
  };

  deletePart = async (id) => {
    // confirm("Are you sure you want to delete this part?");

    const result = window.confirm("Are you sure you want to delete this part?");
    if (result) {
      this.deleteApi(id);
    }
  };

  sendFileForManualQuote = async (id) => {
    const result = await API.post(URL_PATH.sendManualQuote, {
      id,
    });
    const { status, message = "Something went wrong", data } = result.data;

    if (status === "success") {
      this.props.history.push({
        pathname: routes.customer.dashboard,
      });
    } else {
      alert(message);
    }
  };

  render() {
    const { requested_part_date = null, processing } = this.state;
    return (
      <div>
        <HeaderComponent section="man_login" theme="light" />
        {this.state.showPopup && <this.Popup />}

        <div className="container-fluid mt-4">
          <div
            style={{
              margin: "0px 50px",
            }}
          >
            {requested_part_date != null && (
              <div
                style={{ fontSize: "32px", color: "#212427" }}
                className="ml-3 bold"
              >
                Quote :{" "}
                {moment(requested_part_date).format("DDMMYYYY") + this.state.id}
              </div>
            )}
            {processing ? (
              <div className="d-flex flex-row">
                {/* left part */}
                <div
                  className="  px-3 pb-4 pt-3"
                  style={{
                    width: "80%",
                  }}
                >
                  <Skeleton count={6} />
                </div>

                <div
                  className="  px-3 pb-4 pt-3"
                  style={{
                    width: "20%",
                    // height: "100vh",
                  }}
                >
                  <Skeleton count={5} />
                </div>
              </div>
            ) : (
              <div className="row">
                {/* left part */}
                <div
                  style={{
                    width: "80%",
                  }}
                >
                  {/* recent uploads */}
                  <div className="d-flex flex-row justify-content-between my-3">
                    <div>
                      <input type="checkbox" name="" id="" />
                      <span style={{ marginLeft: "10px" }}>
                        1 Part uploaded
                      </span>
                    </div>
                    <div>
                      <span
                        style={{
                          margin: "0px 5px",
                          color: "#16BC9CFF",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          this.sendFileForManualQuote(this.state.id);
                        }}
                      >
                        <i className="fa fa-paperclip" aria-hidden="true"></i>
                        <span
                          style={{ marginLeft: "3px" }}
                          className="semi_bold"
                        >
                          {" "}
                          Send file for manual quote
                        </span>
                      </span>
                      <span
                        style={{ margin: "0px 5px 0 15px", cursor: "pointer" }}
                        onClick={() => {
                          this.deletePart(this.state.id);
                        }}
                      >
                        <i className="fa fa-trash" aria-hidden="true"></i>
                        <span
                          style={{ marginLeft: "3px" }}
                          className="semi_bold"
                        >
                          Delete part
                        </span>
                      </span>
                    </div>
                  </div>
                  <this.UploadedFile />
                  {/* uplaod drop box */}
                  <div
                    style={{
                      border: "1px dashed #000000",
                      borderRadius: "10px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      alignContent: "center",
                      padding: "20px 0px 20px 0px",
                    }}
                  >
                    <h6
                      style={{
                        textAlign: "center",
                      }}
                      className="h7"
                    >
                      upload new 3D model, to get in same quotation
                    </h6>
                    {/* drop file box */}
                    {this.state.uploading === false && (
                      <div
                        id="dropbox"
                        onDragEnter={this.dragenter}
                        onDragLeave={this.dragleave}
                        onDragOver={this.dragover}
                        onDrop={this.drop}
                        style={{
                          display: "inline-block",
                          margin: "auto",
                          border:
                            "1px dashed " +
                            (this.state.dragOver ? "#000000" : "#cccccc"),
                          margin: "10px",
                          padding: "15px",
                          textAlign: "center",
                          padding: "5px 100px",
                          borderRadius: "10px",
                        }}
                      >
                        <i
                          className="fa fa-cloud-upload"
                          aria-hidden="true"
                        ></i>
                        <h6>Drop files here</h6>
                        <h6 className="mb-3 h8">supported formats:STEP,STL</h6>
                        <h6 className="h9">OR</h6>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                          }}
                        >
                          <div className="m-1 h8">recent uploads</div>
                          <div className="m-1 text-primary h8">
                            browse files
                          </div>
                        </div>
                      </div>
                    )}
                    {/* uploading */}
                    {this.state.uploading === true && (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          alignContent: "center",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            alignContent: "center",
                          }}
                        >
                          <div className="spinner-border" role="status">
                            {/* <span className="sr-only"></span> */}
                          </div>
                          <div className="ml-2">uploading...</div>
                        </div>
                        <div className="mt-2">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              this.setState({ uploading: false });
                            }}
                          >
                            cancel
                          </button>
                        </div>
                      </div>
                    )}

                    {/* selected files cost */}
                    {this.state.cost != 0 && (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                          justifyContent: "center",
                          alignContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {this.state.files.map((file, index) => {
                          return (
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                alignContent: "center",
                                margin: "10px",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  alignContent: "center",
                                }}
                              >
                                <i
                                  className="fa fa-file-text-o"
                                  aria-hidden="true"
                                ></i>
                                <div className="ml-2">{file.name}</div>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  alignContent: "center",
                                }}
                              >
                                <div className="mr-2">size: {file.size}</div>
                                <div className="mr-2">type: {file.type}</div>
                              </div>
                              {/* cost */}
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  alignContent: "center",
                                }}
                              >
                                <div className="mr-2">
                                  cost: {this.state.cost}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
                {/* right part */}
                <div
                  className=" shaddow px-3 pb-4 pt-3"
                  style={{
                    width: "20%",
                    // height: "100vh",
                  }}
                >
                  {/* download and share in row */}

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignContent: "center",
                      alignItems: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <form
                      action={localUrl + "/pdf/getPdf"}
                      method="post"
                      id="download"
                    >
                      <input type="hidden" name="id" value={this.state.id} />
                      <div
                        onClick={() => {
                          document.getElementById("download").submit();
                        }}
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignContent: "center",
                          cursor: "pointer",
                          alignItems: "center",
                        }}
                      >
                        <i
                          className="fa fa-download"
                          aria-hidden="true"
                          style={{
                            fontSize: "20px",
                            marginRight: "10px",
                          }}
                        ></i>
                        <span className="semi_bold">download</span>
                      </div>
                    </form>
                    {/* <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignContent: "center",

                    alignItems: "center",
                  }}
                >
                  <i
                    className="fa fa-share-alt"
                    aria-hidden="true"
                    style={{
                      fontSize: "20px",
                      marginRight: "10px",
                    }}
                  ></i>
                  <span>share</span>
                </div> */}
                  </div>

                  {/* shipping billing address */}
                  <div
                    style={{
                      borderRadius: "5px",
                      padding: "15px 25px",
                      marginTop: "15px",
                    }}
                    className="shaddow"
                  >
                    {/* Add shiping address */}
                    <div
                      style={{
                        marginTop: "20px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "14px",
                          flex: 1,
                          marginRight: "5px",
                        }}
                      >
                        <i className="fa fa-plus" aria-hidden="true"></i>
                        <span
                          style={{ marginLeft: "6px" }}
                          className="semi_bold"
                        >
                          add shipping address
                        </span>
                      </div>
                      <span
                        style={{
                          fontSize: "8px",
                        }}
                      >
                        use saved address
                      </span>
                    </div>
                    {/* Add billing address */}
                    <div
                      style={{
                        marginTop: "25px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "14px",
                          flex: 1,
                          marginRight: "5px",
                        }}
                      >
                        <i className="fa fa-plus" aria-hidden="true"></i>
                        <span
                          style={{ marginLeft: "6px" }}
                          className="semi_bold"
                        >
                          add billing address
                        </span>
                      </div>
                      <span
                        style={{
                          fontSize: "8px",
                        }}
                      >
                        use saved address
                      </span>
                    </div>
                  </div>

                  {/* apply promocode */}
                  {/* <div
                style={{
                  borderRadius: "5px",
                  padding: "10px 25px",
                  marginTop: "15px",
                }}
                className="shaddow"
              > */}
                  {/* Add shiping address */}
                  {/* <div
                  style={{
                    // margin: "5px 0px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignContent: "center",
                    alignItems: "center",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                >
                  <span style={{ marginRight: "20px" }}>apply promocode</span>
                  <i className="fa fa-plus" aria-hidden="true"></i>
                </div> */}
                  {/* </div> */}

                  {/*subtotal */}
                  <div
                    style={{
                      borderRadius: "5px",
                      padding: "10px 25px",
                      marginTop: "15px",
                    }}
                    className="shaddow"
                  >
                    <this.Row
                      name="production cost"
                      value={this.state.production_cost}
                    />
                    <this.Row
                      name="packing cost"
                      value={this.state.packing_cost}
                    />
                    <this.Row
                      name="shipping cost"
                      value={this.state.shipping_cost}
                    />
                    <this.Row name="credits" value={this.state.credit} />
                    <this.Row name="discounts" value={this.state.discount} />
                    <this.Row name="GST" value={this.state.gst} />

                    <div
                      style={{
                        // margin: "5px 0px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignContent: "center",
                        alignItems: "center",
                        fontSize: "20px",
                        borderTop: "1px solid #000000",
                        paddingTop: "10px",
                        marginTop: "10px",
                      }}
                    >
                      <span
                        style={{ marginRight: "20px" }}
                        className="semi_bold"
                      >
                        subtotal
                      </span>
                      <span style={{}} className="semi_bold">
                        {this.state.sub_total}
                      </span>
                    </div>
                  </div>

                  {/* Continue to shipping button */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignContent: "center",
                      alignItems: "center",
                      marginTop: "20px",
                    }}
                  >
                    <button
                      className="btn btn-primary semi_bold"
                      style={{ flex: 1 }}
                      onClick={() => {
                        this.props.history.push({
                          pathname: routes.customer.shippingPage(this.state.id),
                        });
                      }}
                    >
                      continue to shipping
                    </button>
                  </div>

                  {/* message */}

                  <div
                    className="center mt-2 semi_bold"
                    style={{
                      fontSize: "12px",
                    }}
                  >
                    you are just one step short to send you parts for production
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  Row = ({ name, value = "0" }) => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignContent: "center",
          alignItems: "center",
          margin: "5px 0px",

          fontSize: "14px",
        }}
      >
        <span className="semi_bold">{name}</span>
        <span className="semi_bold">{value ?? "0"}</span>
      </div>
    );
  };
}

export default LandingPage;
