import React, { Component } from "react";
import Upload from "../images/Cloud upload 2.png";
import Header from "../components/header";
import RightSection from "../components/rightSection";
import Order from "../components/order";
import API, { URL_PATH } from "../../../../Common/API";
import Men from "../images/Image 36.png";
import routes from "../../../../routes";
import "./style.css";
import HeaderComponent from "../../../../Components/HeaderComponentMLP";

import redux from "../../../../Common/Redux";

const data = [
  {
    name: "order",
  },
  {
    name: "order",
  },
];

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      dragOver: false,
      uploading: false,
      pending_orders: [],
      recent_orders: [],
      total_quotation_done: 0,
      total_time_saved_in_minutes: 0,
      quote_to_order_conversion: {},
      order_completion_status: {},
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const result = await API.get(URL_PATH.getDashboardData);
    const { status, data } = result.data;

    if (status === "success") {
      const {
        pending_orders,
        recent_orders,
        total_quotation_done,
        total_time_saved_in_minutes,
        quote_to_order_conversion,
        order_completion_status,
      } = data;

      this.setState({
        pending_orders,
        recent_orders,
        total_quotation_done,
        total_time_saved_in_minutes,
        quote_to_order_conversion,
        order_completion_status,
      });
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
        const { id, file_path } = data;

        return this.props.history.push({
          pathname: routes.msas.configurePart(id),
          state: {
            data: data,
          },
        });
      } else alert(message);
      break; //only one file at a time
    }
  };

  LeftSection = () => {
    const {
      pending_orders,
      recent_orders,
      total_quotation_done,
      total_time_saved_in_minutes,
      quote_to_order_conversion,
      order_completion_status,
    } = this.state;

    return (
      <div className="container-fluid align-items-center justify-content-center">

        <input type="file" id="file" className="inputfile" hidden onChange={(e) => this.handleFiles(e.target.files)} />

        <h1 className="welcome-text ">
          welcome back, {this.props.userData.user_name}!
        </h1>
        <div>
          <div className="box-div ">
            <h2 className="d-text">upload a 3D model to get new quotation</h2>
            <div
              className="inside-box-bor"
              id="dropbox"
              onDragEnter={this.dragenter}
              onDragLeave={this.dragleave}
              onDragOver={this.dragover}
              onDrop={this.drop}
            >
              <img src={Upload} alt="" className="img-fluid" />
              <div className="drop-text">drop the files here </div>
              <div className="update-text mt-1">supported format:STEP, STL</div>
              <div className="or-text mt-2">OR</div>
              <div className="div-flex mt-1 mb-1">
                <span className="update-text mx-2">recent uploads</span>
                <span className="bro-text mx-2"
                  onClick={() => {
                    document.getElementById("file").click();
                  }}

                > browse files</span>
              </div>
            </div>
          </div>
          <div className="box-flex-we">
            <p className="got-text">we got, what you left off,</p>
            {/* <p
              className="order-text cursor"
              onClick={() => {
                this.props.history.push(routes.customer.quotationListing);
              }}

            >
              view all quotes
            </p> */}
          </div>
          {pending_orders.map((item, index) => (
            <Order
              item={item}
              index={index}
              configurePart={(id) => {
                this.props.history.push(routes.msas.configurePart(id));
              }}
              OrderPart={(id) => {
                // this.props.history.push(routes.customer.orderPart(id))
              }}
            />
          ))}

          {recent_orders.length > 0 && (
            <div className="box-flex-we">
              <p className="got-text">recent orders</p>
              {/* <p className="order-text"

                onClick={() => {
                  this.props.history.push(routes.customer.orderHistory);
                }}
              >view all orders</p> */}
            </div>
          )}

          {recent_orders.length == 0 && pending_orders.length == 0 && (
            <div className="oh-div">
              <img src={Men} alt="" className="img-fluid" />
              <p className="d-text">
                Oh! that's shocking ,we haven't found a order from you, yet
              </p>
              <p className="wait-text">what's are you waiting for</p>
              <p className="order-text">start instant quote</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  render() {
    const {
      total_time_saved_in_minutes,
      quote_to_order_conversion,
      order_completion_status,
    } = this.state;

    const rightData = {
      total_time_saved_in_minutes,
      quote_to_order_conversion,
      order_completion_status,
    };

    return (
      <div
        className="container-fluid align-items-center justify-content-center"
        style={{
          backgroundColor: "#f8f9fa",
        }}
      >
        <HeaderComponent section="customer" theme="light" />

        <div className="row ">
          <div className="col-8">
            <this.LeftSection />
          </div>
          <div className="col-4">
            <RightSection data={rightData} />
          </div>
        </div>
      </div>
    );
  }
}

export default redux(index);
