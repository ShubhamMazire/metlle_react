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
import "react-loading-skeleton/dist/skeleton.css";
// import CloseIcon from '@mui/icons-material/Close';
import Typography from "@mui/material/Typography";

import HeaderComponent from "../../Components/HeaderComponentMLP";
import routes from "../../routes";
import translater from "../../Constants/translator";
import API, { URL_PATH, assetBaseUrl, localUrl } from "../../Common/API";
import Swal from 'sweetalert2';

import Redux from "../../Common/Redux";

const Box = ({ arr = [], children }) => {
  console.log(arr);
  if (arr == null) return <div />;

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
      user_id: 0,
      uploading: false,
      cost: 0,
      showPopup: false,
      processing: false,
      kiriSend: false,
      showAddressPopup: false,
      showBillingAddressPopup: false,
      data: [],
      calcualtions: {
        production_cost: 0,
        packing_cost: 0,
        shipping_cost: 0,
        credit: 0,
        discount: 0,
        gst: 0,
        sub_total: 0,
        final_cost: 0,
      },
      // ---------------
      selectAll: false,
      selectedParts: [],
      // shipping
      address: '',
      city: '',
      state: '',
      zip: '',
      country: '',
      loading: false,
      error: '',
      // billing
      billing_address: '',
      billing_city: '',
      billing_state: '',
      billing_zip: '',
      billing_country: '',
      billing_loading: false,
      billing_error: ''
    };
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    console.log(id);
    this.setState({ id });

    this.getData();
    // return;
    const user = this.props.userData;

    this.setState({ user_id: user.user_id });
  }

  componentWillUnmount() {
    try {
      clearTimeout(this.timeout);
    } catch (error) {}
  }

  getData = async (id = 0) => {
      const res = await API.get(URL_PATH.getQuotationItemFromCart);
   

    const {
      status,
      message = "",
      data = res.data.data.length - 1,
      processing = false,
      calcualtions = res.calcualtions.length - 1,
    } = res.data;

 
    this.setState({main_id : res.data.data[res.data.data.length - 1].id, requested_part_date : res.data.data[res.data.data.length - 1].requested_part_date})

    if (status == "error") {
      try {
        clearTimeout(this.timeout);
      } catch (error) {}

      this.timeout = setTimeout(() => {
        this.getData(id);
      }, 2500);
      return;
    }

    // calcualtion all keys value to int convertsion

    Object.keys(calcualtions).map((item) => {
      calcualtions[item] = parseInt(calcualtions[item]);
    });

    this.setState({ data, processing, calcualtions, uploading: false });
    // console.log(res.data);
    if (processing)
      this.timeout = setTimeout(() => {
        this.getData(id);
      }, 2500);


    // updateKiriValue
  };

  // shipping start
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value, error: '' });
  }

  handleShippingSubmit = async (event) => {
    event.preventDefault();
    
    // Validate form fields
    const { address, city, state, zip, country } = this.state;
    if (!address || !city || !state || !zip || !country) {
      this.setState({ error: 'All fields are required' });
      return;
    }

    try {
      // Show loader
      this.setState({ loading: true });

      // Prepare form data
      const formData = new FormData();
      formData.append("address", address);
      formData.append("city", city);
      formData.append("state", state);
      formData.append("zip", zip);
      formData.append("country", country);

      // AJAX request to submit form
      const result = await API.post("/customer/upload-shipping", formData);

      const { status, message, data } = result.data;

      if (status === "success") {
        this.setState({ showAddressPopup: false });
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: message,
        });
        this.setState({ loading: false });
        // Close the address popup if needed
        // this.setState({ showAddressPopup: false });
      } else {
        this.setState({ error: message });
      }
    } catch (error) {
      console.error('Error:', error);
      this.setState({ loading: false, error: 'An error occurred while submitting the form' });
    }
  };

  handleBillingSubmit = async (event) => {
    event.preventDefault();
    
    // Validate form fields
    const { billing_address, billing_city, billing_state, billing_zip, billing_country } = this.state;
    if (!billing_address || !billing_city || !billing_state || !billing_zip || !billing_country) {
      this.setState({ error: 'All fields are required' });
      return;
    }

    try {
      // Show loader
      this.setState({ loading: true });

      // Prepare form data
      const formData = new FormData();
      formData.append("address", billing_address);
      formData.append("city", billing_city);
      formData.append("state", billing_state);
      formData.append("zip", billing_zip);
      formData.append("country", billing_country);

      // AJAX request to submit form
      const result = await API.post("/customer/upload-billing", formData);

      const { status, message, data } = result.data;

      if (status === "success") {
        this.setState({ showBillingAddressPopup: false });
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: message,
        });
        this.setState({ billing_loading: false });
        // Close the address popup if needed
        // this.setState({ showAddressPopup: false });
      } else {
        this.setState({ billing_error: message });
      }
    } catch (error) {
      console.error('Error:', error);
      this.setState({ billing_loading: false, billing_error: 'An error occurred while submitting the form' });
    }
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
        this.getData();
      } else alert(message);
      break; //only one file at a time
    }
  };

  matchTargetPrice = async (index) => {
    const res = await API.post(URL_PATH.getTargetPrice, {
      id: this.state.data[index - 1].id,
      targeted_price: document.getElementById("targetValue_" + index).value,
    });

    const { status, message, data } = res.data;

    if (status == "success") {
      const { accept, avg_complexity } = data;

      this.setState({ showPopup: true, targetPriceAccept: accept });
    }
  };

  toggleSelect = (index) => {
    const { selectedParts } = this.state;

    if (selectedParts.includes(index)) {
      const newSelectedParts = selectedParts.filter((item) => item != index);
      this.setState({ selectedParts: newSelectedParts });

      if (newSelectedParts.length != this.state.data.length) {
        this.setState({ selectAll: false });
      }
    } else {
      const newSelectedParts = [...selectedParts, index];
      this.setState({ selectedParts: newSelectedParts });

      if (newSelectedParts.length == this.state.data.length) {
        this.setState({ selectAll: true });
      }
    }
  };

  UploadedFile = ({ item, index }) => {
    // return <div />;
    if(item.id !== this.state.main_id)
    {
      return null
    }
    console.log('item.id',item.id);
    const temp = {
      id: item.id,
      p_id: item.p_id,

      thumbnail_path: item.thumbnail_path,
      // costs ------------------------------

      //--------------

      bounding_box: translater(
        "bounding_box",
        item.sub_grade_material,
        item.bounding_box
      ),
      volume: item.volume,
      surface_area: item.surface_area,
      //----------------  transalation reqored
      process: translater("process", item.sub_grade_material, item.process),
      process_tag: item.process,
      material: translater(
        item.process == "3d" ? "material3D" : "material",
        item.sub_grade_material,
        item.material
      ),
      surface_roughness: translater(
        "surface_roughness",
        item.sub_grade_material,
        item.surface_roughness
      ),
      tolerances: translater(
        "tolerances",
        item.sub_grade_material,
        item.tolerances
      ),
      color: item.color,
      finishing: translater(
        "partFinish",
        item.sub_grade_material,
        item.finishing
      ),
      threads: translater("threads", item.sub_grade_material, item.threads),
      inspection: translater(
        "inspection",
        item.sub_grade_material,
        item.inspection
      ),
      dfm_comp: item.dfm_comp,
      production_cost: item.production_cost,
      surge: item.surge,
      final_cost: item.final_cost,
      parts_quantity: item.parts_quantity,
    };

    const {
      id,
      p_id,
      thumbnail_path,
      bounding_box,
      volume,
      surface_area,
      process,
      process_tag,
      material,
      surface_roughness,
      tolerances,
      color,
      finishing,
      threads,
      inspection,
      dfm_comp,
      surge,
      final_cost,
      parts_quantity,
    } = temp;
    

    const perPartExpeditCost = parseInt(
      final_cost / parts_quantity + surge / parts_quantity
    );
    const perPartStandardCost = parseInt(final_cost / parts_quantity);
    const expediteCost = final_cost + surge * parts_quantity;
    const standardCost = final_cost;

    const standardDeliveryTime =
      item.process == "3d" ? "3 business days" : "5 business days";
    const expediteDeliveryTime =
      item.process == "3d" ? "2 business days" : "3 business days";

    this.timeout = setTimeout(() => {
      if(standardCost == null){
        this.getData(id);
      }
    }, 2500);
    

    // cnc 3 5
    // 3d  2 3
    console.log('standardCost',standardCost);
    return standardCost == null ? (
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
      <div className="d-flex flex-row align-items-start align-content-start flex-start my-4  shaddow rounded border p-3">
        <div
          className="my-3 p-3 d-flex flex-row align-items-center"
          onClick={() => {
            this.toggleSelect(index);
          }}
        >
          <input
            type="checkbox"
            name="a1"
            checked={this.state.selectedParts.includes(index)}
          />

          <span style={{ marginLeft: "5px" }}>
            {index < 10 ? "0" + index : index}
          </span>
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
                thumbnail_path
                  ? assetBaseUrl + thumbnail_path
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
                  <div className="h5 bold">{p_id}</div>
                  {/* configure part */}
                  <div
                    onClick={() => {
                      this.props.history.push({
                        pathname: routes.customer.configurePart(id),
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
                    <span style={{ fontSize: "13px" }}>
                      {" "}
                      {expediteDeliveryTime}
                    </span>
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
                    {perPartExpeditCost/parts_quantity} Rs each
                  </h6>
                  <div
                    className="bold h4 no_trans"
                    style={{
                      marginTop: "7px",
                    }}
                  >
                    {expediteCost} Rs
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
                    <span style={{ fontSize: "13px" }}>
                      {" "}
                      {standardDeliveryTime}
                    </span>
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
                    {perPartStandardCost} Rs each
                  </h6>
                  <div
                    className="bold h4 no_trans"
                    style={{
                      marginTop: "7px",
                    }}
                  >
                    {standardCost} Rs
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
                  value: bounding_box,
                },
                {
                  name: "Volume",
                  value: volume,
                  posFix: (
                    <span>
                      mm<sup>3</sup>
                    </span>
                  ),
                },
                {
                  name: "surface area",
                  value: surface_area,
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
                  value: process,
                },
                {
                  name: "Material",
                  value: material,
                },
                {
                  name: "Surface roughness",
                  value: process_tag == "3d" ? "NA" : surface_roughness,
                },
              ]}
            />
            <Box
              arr={[
                {
                  name: "certificate",
                  value: "NA", //certificate,
                },
                {
                  name: "tolerances",
                  value: process_tag == "3d" ? "NA" : tolerances,
                },
                {
                  name: process_tag == "3d" ? "Color" : "finishing",
                  value: process_tag == "3d" ? color : finishing,
                },
              ]}
            />

            <Box
              arr={[
                {
                  name: "threads",
                  value: process_tag == "3d" ? "NA" : threads,
                },
                {
                  name: "inspection",
                  value: inspection,
                },
                {
                  name: "DfM",
                  value: process_tag == "3d" ? "NA" : dfm_comp ?? 0 + "%",
                },
              ]}
            />

            <Box arr={[]}>
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
                      id={"targetValue_" + index}
                    />
                    <button
                      className="ml-1 px-1"
                      style={{
                        backgroundColor: "#0d6efd",
                        border: "none",
                      }}
                      onClick={() => {
                        this.matchTargetPrice(index);
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

  Address = () => {
    return (
      <BootstrapDialog
        onClose={() => {
          this.setState({ showAddressPopup: false });
        }}
        aria-labelledby="customized-dialog-title"
        open={true}
        fullWidth={true}
        maxWidth={"md"}
      >
        {/* <DialogTitle id="popup-message" /> */}

        <DialogContent
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px 20px",
            position: "relative",
          }}
        >
          <Button
            autoFocus
            onClick={() => {
              this.setState({ showAddressPopup: false });
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

          <h3 className="medium mb-2">Shipping address</h3>

          {/* bootstrap form */}
          <form onSubmit={this.handleShippingSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
            }}
          >
            <div className="row mb-3">
              <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="address"
                    value={this.state.address}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="row  mb-3">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    name="city"
                    value={this.state.city}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="state">State</label>
                  <input
                    type="text"
                    className="form-control"
                    id="state"
                    name="state"
                    value={this.state.state}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="row  mb-3">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="zip">ZIP Code</label>
                  <input
                    type="text"
                    className="form-control"
                    id="zip"
                    name="zip"
                    value={this.state.zip}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="country">Country</label>
                  <input
                    type="text"
                    className="form-control"
                    id="country"
                    name="country"
                    value={this.state.country}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>
            <button class="btn btn-primary semi_bold" type="submit">Submit</button>
            {this.state.loading && <div>Loading...</div>}
            {this.state.error && <div>{this.state.error}</div>}
          </form>
        </DialogContent>
      </BootstrapDialog>
    );
  };

  BillingAddress = () => {
    return (
      <BootstrapDialog
        onClose={() => {
          this.setState({ showBillingAddressPopup: false });
        }}
        aria-labelledby="customized-dialog-title"
        open={true}
        fullWidth={true}
        maxWidth={"md"}
      >
        {/* <DialogTitle id="popup-message" /> */}

        <DialogContent
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px 20px",
            position: "relative",
          }}
        >
          <Button
            autoFocus
            onClick={() => {
              this.setState({ showBillingAddressPopup: false });
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

          <h3 className="medium mb-2">Billing address</h3>

          {/* bootstrap form */}
          <form onSubmit={this.handleBillingSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
            }}
          >
            <div className="row mb-3">
              <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    id="billing_address"
                    name="billing_address"
                    value={this.state.billing_address}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="row  mb-3">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    className="form-control"
                    id="billing_city"
                    name="billing_city"
                    value={this.state.billing_city}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="state">State</label>
                  <input
                    type="text"
                    className="form-control"
                    id="billing_state"
                    name="billing_state"
                    value={this.state.billing_state}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="row  mb-3">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="zip">ZIP Code</label>
                  <input
                    type="text"
                    className="form-control"
                    id="billing_zip"
                    name="billing_zip"
                    value={this.state.billing_zip}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="country">Country</label>
                  <input
                    type="text"
                    className="form-control"
                    id="billing_country"
                    name="billing_country"
                    value={this.state.billing_country}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>
            <button class="btn btn-primary semi_bold" type="submit">Submit</button>
            {this.state.billing_loading && <div>Loading...</div>}
            {this.state.billing_error && <div>{this.state.billing_error}</div>}
          </form>
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
      this.getData(this.state.id);
    } else {
      alert(message);
    }
  };

  deletePart = async () => {
    // confirm("Are you sure you want to delete this part?");

    const result = window.confirm(
      "Are you sure you want to delete selected part?"
    );
    if (result) {
      this.state.selectedParts.map((item) => {
        const id = this.state.data[item - 1].id;
        this.deleteApi(id);
      });
    }
  };

  sendManualQuote = async (id) => {
    const result = await API.post(URL_PATH.sendManualQuote, {
      id,
    });
    const { status, message = "Something went wrong", data } = result.data;

    if (status === "success") {
      this.getData(this.state.id);
    } else {
      alert(message);
    }
  };

  sendFileForManualQuote = async (id) => {
    const { selectedParts } = this.state;

    if (selectedParts.length == 0) {
      alert("Please select atleast one part");
      return;
    }

    selectedParts.map((item) => {
      const id = this.state.data[item - 1].id;
      this.sendManualQuote(id);
    });
  };

  render() {
    const { requested_part_date = null, processing, data, main_id } = this.state;
    const {
      packing_cost,
      shipping_cost,
      credit,
      discount,
      gst,
      sub_total,
      final_cost,
    } = this.state.calcualtions;

    return (
      <div>
        <HeaderComponent section="man_login" theme="light" />
        {this.state.showPopup && <this.Popup />}

        {this.state.showAddressPopup && <this.Address />}

        {this.state.showBillingAddressPopup && <this.BillingAddress />}

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
                {moment(requested_part_date).format("DDMMYYYY") + this.state.main_id}
              </div>
            )}
            {processing && (final_cost === 0 || final_cost == null) ? (
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
                    <div
                      onClick={() => {
                        if (this.state.selectAll) {
                          this.setState({ selectedParts: [] });
                        } else {
                          const selectedParts = [];
                          for (let i = 1; i <= data.length; i++) {
                            selectedParts.push(i);
                          }
                          this.setState({ selectedParts });
                        }
                        this.setState({ selectAll: !this.state.selectAll });
                      }}
                    >
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        checked={this.state.selectAll}
                      />
                      <span style={{ marginLeft: "10px" }}>
                        {data.length} Part uploaded
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
                          this.sendFileForManualQuote();
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
                          this.deletePart();
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

                  {this.state.data.map((item, index) => (
                      
                        <this.UploadedFile item={item} index={index + 1} />
                      
                    ))}

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
                      <input
                        type="hidden"
                        name="user_id"
                        value={this.state.user_id}
                      />
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
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          this.setState({ showAddressPopup: true });
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
                      <span style={{ fontSize: "8px", }} > use saved address </span>
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
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        this.setState({ showBillingAddressPopup: true });
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

                 
                  {/*subtotal */}
                  <div
                    style={{
                      borderRadius: "5px",
                      padding: "10px 25px",
                      marginTop: "15px",
                    }}
                    className="shaddow"
                  >
                    <this.Row name="production cost" value={final_cost} />
                    <this.Row name="packing cost" value={packing_cost} />
                    <this.Row name="shipping cost" value={shipping_cost} />
                    <this.Row name="credits" value={credit} />
                    <this.Row name="discounts" value={discount} />
                    <this.Row name="GST(18%)" value={gst} />

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
                        {sub_total}
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
                        console.log(this.state.main_id);
                        this.props.history.push({
                          pathname: routes.customer.shippingPage(this.state.main_id),
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

export default Redux(LandingPage);
