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
      selectedDeliveryOption: 'standard_delivery', // default selected option
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
      parts_quantity
    } = data;

    const perPartExpeditCost = parseInt(
      final_cost / parts_quantity + surge / parts_quantity
    );
    const perPartStandardCost = parseInt(final_cost / parts_quantity);
    const expediteCost = final_cost + surge * parts_quantity + packing_cost +gst;
    const standardCost = final_cost + packing_cost +gst;

    const standardDeliveryTime = process == "3d" ? "3 business days" : "5 business days";
    const expediteDeliveryTime = process == "3d" ? "2 business days" : "3 business days";

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
      perPartStandardCost,
      expediteCost,
      standardCost,
      standardDeliveryTime,
      expediteDeliveryTime,
      perPartExpeditCost,
      parts_quantity,
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

  handleDeliOption = (event) => {
    this.setState({ selectedDeliveryOption: event.target.value });
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
      alert(message);
    } else {
      alert(message);
    }
  };

  createOrder = async (id) => {
    try {
      const selectedPaymentMethod = document.querySelector('input[name="payment_method"]:checked');
      if (!selectedPaymentMethod) {
        alert('Please select a payment method.');
        return;
      }

      // Gather form data
      const formData = new FormData();
      formData.append('payment_method', selectedPaymentMethod.id);

      // Add additional form fields as needed
    
      formData.append('surge', this.state.surge);
      formData.append('quote_id', this.state.id);
      formData.append('final_cost', this.state.final_cost);
      formData.append('sub_total', this.state.sub_total);
      formData.append('gst', this.state.gst);
      formData.append('packing_cost', this.state.packing_cost);
      formData.append('delivery', document.getElementById('deliOption').value);
      formData.append('parts_quantity', this.state.parts_quantity);
      formData.append('requested_part_date', this.state.requested_part_date);


      if(selectedPaymentMethod === 'net_30'){
        formData.append('net_30_file', document.querySelector('input[name="net_30_file"]').files[0]);
        formData.append('po_number', document.querySelector('input[name="po_number"]').value);

        const net30File = document.querySelector('input[name="net_30_file"]').files[0];
        const po_number =  document.querySelector('input[name="po_number"]').value;
        if (!po_number || !net30File) {
          alert('Please Enter Po Number Or Upload Net 30 File.');
          return;
        }
      }

      const result = await API.post(URL_PATH.createOrder,formData);
      const { status, message = "Something went wrong", data } = result.data;
      // window.location.href = result.data.productionUrl;
      if (status === "success") {
        alert(message);
        this.props.history.push({
          pathname: routes.customer.orderHistory,
        });
      } else {
        alert(message);
      }
    } catch (error) {
      console.error("Error creating order:", error);
  
      // Handle the error, you can log it or show a user-friendly message
      alert("An error occurred while creating the order. Please try again.");
    }
  };

  render() {
    const { 
      requested_part_date = null,
      processing,
       expediteCost,
      standardCost,
      standardDeliveryTime,
      expediteDeliveryTime,
      perPartExpeditCost,
      parts_quantity,
      perPartStandardCost,
      surge
       } = this.state;

       const { selectedDeliveryOption } = this.state;
       const showStandardDelivery = selectedDeliveryOption === 'standard_delivery';
       const showExpediteDelivery = selectedDeliveryOption === 'expidate_delivery';
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
                    width: "50%",
                    marginLeft:"10%"
                  }}
                >
                  {/* recent uploads */}
                  <div className="d-flex flex-row justify-content-between my-3">
                    <div>
                      <span style={{ marginLeft: "10px" }}>
                        <div className="row">
                          <div className="col-md-5">
                             <b>GST Number:</b> 
                          </div>
                          <div className="col-md-7">
                          <input type="text" className="form-control" placeholder="Input GST Number"/>
                          </div>
                        </div>
                      </span>
                    </div>
                  </div>
                  <div className="container">
                      <div className="row">
                          <div class="col-md-12">
                              <h3><i className="fa fa-university"></i>Payment Method</h3>
                          </div>
                          <div className="col-md-12">
                              <div class="row  p-3 shaddow mt-2">
                                    <div class="col-md-1" style={{ maxWidth: '40px', maxHeight:'40px' }}>
                                        <input type="radio" name="payment_method" id="payment_gateway" className="form-control shaddow" style={{height:'24px',borderRadius:'17px'}}  />
                                    </div>
                                    <div className="col-md-4">
                                        <h5><b>Payment Gateway</b></h5>
                                    </div>
                              </div>
                              <div class="row p-3 shaddow mt-2">
                                    <div class="col-md-1" style={{ maxWidth: '40px', maxHeight:'40px' }}>
                                        <input type="radio" name="payment_method" id="net_30" className="form-control shaddow" style={{height:'24px',borderRadius:'17px'}}  />
                                    </div>
                                    <div className="col-md-4">
                                        <h5><b>Net 30</b></h5>
                                    </div>
                                    <div className="row m-4">
                                        <div className="col-4 col-sm-4 col-md-4 col-lg-4 ">
                                              <label>Upload Net 30 File</label>
                                        </div>
                                        <div className="col-6 col-sm-6 col-md-6 col-lg-6">
                                          <input type="file" name="net_30_file" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="row m-4">
                                        <div className="col-4 col-sm-4 col-md-4 col-lg-4 ">
                                              <label>Enter PO Number</label>
                                        </div>
                                        <div className="col-6 col-sm-6 col-md-6 col-lg-6">
                                          <input type="text" name="po_number" className="form-control" placeholder="Enter PO Number" />
                                        </div>
                                    </div>
                              </div>
                              <div class="row p-3 shaddow mt-2">
                                    <div class="col-md-1" style={{ maxWidth: '40px', maxHeight:'40px' }}>
                                        <input type="radio" name="payment_method" id="cod" className="form-control shaddow" style={{height:'24px',borderRadius:'17px'}}  />
                                    </div>
                                    <div className="col-md-4">
                                        <h5><b>Cash On Dilevery</b></h5>
                                    </div>
                              </div>
                        </div>
                      </div>
                  </div>
                </div>
                {/* right part */}
                <div
                  className=" shaddow px-3 pb-4 pt-3"
                  style={{
                    width: "30%",
                    marginRight:"10%"
                    // height: "100vh",
                  }}
                >

                  {/* Select Delivery Option */}
                  <div style={{ borderRadius: "5px", padding: "15px 25px", marginTop: "15px", }} className="shaddow" >
                    <div style={{ marginTop: "20px", display: "flex", flexDirection: "row", justifyContent: "space-between", alignContent: "center", alignItems: "center", }}>
                      <div style={{fontSize: "14px",flex: 1,marginRight: "5px",}} >
                        <span style={{ marginLeft: "6px" }}className="semi_bold">
                           Select Delivery Option 
                        </span>
                      </div>
                    </div>
                    {/* delivery option */}
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignContent: "center", alignItems: "center", }}>
                      <div style={{fontSize: "14px",flex: 1,marginRight: "5px",}} >
                        <span style={{ marginLeft: "6px" }}className="semi_bold">
                           <select  id="deliOption" name="delivery" className="form-control" onChange={this.handleDeliOption}>
                              <option value="standard_delivery">Standard Delivery</option>
                              <option value="expidate_delivery">Expidite  Delivery</option>
                           </select>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* expected delivery */}
                  {showExpediteDelivery && (
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
                  )}

                  {/* standerd delivary */}
                  {showStandardDelivery && (
                  <div
                    className="d-flex flex-row justify-content-between m-2 rounded border shaddow"
                    style={{
                      backgroundColor: "#F8F9FAFF",
                      display: showStandardDelivery ? 'block' : 'none'
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
                  )}

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
                      value={showExpediteDelivery ? this.state.production_cost+surge : this.state.production_cost}
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
                        {showExpediteDelivery ? this.state.sub_total+surge : this.state.sub_total}
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
                      onClick={this.createOrder}
                    >
                      Place Order
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
