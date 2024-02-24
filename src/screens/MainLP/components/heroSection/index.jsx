import React, { Component } from "react";
import "./style.css";

import UploadLogo from "../../images/File upload 4.png";
import LockLogo from "../../images/Lock 4.png";
import HeaderComponent from "../../../../Components/HeaderComponentMLP";
import { useMediaQuery } from "react-responsive";

import routes from "../../../../routes";

import API, { URL_PATH } from "../../../../Common/API";

import { Box } from "@mui/material";
import redux from "../../../../Common/Redux";
import Text from "../../../../Components/Text";

class HeroSection extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

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
        console.log(this.props.isAuth);
        if (!this.props.isAuth) {
          // save ids to redux for guest user
          this.props.setGuestUserModelId(id);
        }

        return this.props.history.push({
          pathname: routes.customer.quotationListing,
          state: {
            data: data,
          },
        });
      } else alert(message);
      break; //only one file at a time
    }
  };

  render() {
    return (
      <Box sx={{

        backgroundRepeat: "noRepeat",
        width: "100%",
        // minHeight: "100vh",
        backgroundAttachment: "fixed",
        "@media screen and (orientation: landscape)": {
          backgroundImage: `url("/assets/Customer_PC/Main 16x9 hd.png")`,
        },

        "@media screen and (orientation: portrait)": {
          backgroundImage: `url(/assets/Customer_Mobile/Main.png)`,
        },


        // backgroundImage
        // backgroundImage:{
        //   xl:`url("/assets/Customer_PC/Main 16x9 hd.png")`,
        //   lg:`url("/assets/Customer_PC/Main 16x9 hd.png")`,
        //   md:`url(/assets/Customer_Mobile/Main.png)`,
        //   sm:`url(/assets/Customer_Mobile/Main.png)`,
        //   xs:`url(/assets/Customer_Mobile/Main.png)`,
        // },
        backgroundSize: "cover",
        backgroundPosition: "center",
        paddingBottom: "55px",
        display: "flex",
        flexDirection: "column",



      }}>
        {/* <img src={Logo} alt="" className="img-fluid mt-3 mar" /> */}
        {/* <div className="mt-3 mar img-fluid"/> */}

        {/* top navigation */}

        <div
          style={{
            // position: this.props.direction === "up" ? "fixed" : "absolute",
            top: "0",
            left: "0",
            width: "100%",
            backgroundColor:
              this.props.direction === "up"
                ? "rgba(0, 0, 0, 0.35)"
                : "transparent",
          }}
          className="slider-wrapper wow delay-2s  fadeInDown animated "
        >
          <HeaderComponent section="root" theme="dark" />
        </div>


        {/* page content */}
        <Box className="whole-padding" sx={{
          display: "flex",
          flex:1,
          flexDirection: "column",
          justifyContent: "center",
        }}>
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            paddingLeft: "3.125rem",
            marginBottom: {
              xs: "1rem",
              sm: "2rem",
              md: "3rem",
              lg: "3rem",
              xl: "4rem",
            },
            marginTop: {
              xs: "2rem",
              sm: "2.5rem",
              md: "3rem",
              lg: "5rem",
              xl: "6rem",
            },
          }}>
            <Text className="main-text extra_bold" fontSize={"5"} extrabold>
              procure custom parts.
              <br /> hassle free!
            </Text>
            <Box sx={{
              "@media screen and (orientation: portrait)": {
                display: "none",
              },
            }}>
              <p className="manu-text semi_bold">
                manufacturing, where speed matters, at your fingertips
              </p>
              <p className="small-manu-text regular">
                get a hyper-quick quote of your high quality parts within seconds
                not in days
                <br /> & release for the production within minutes not in weeks,
                on demand.
              </p>
            </Box>
          </Box>


          <Box
            className="div-bx"
            onDragEnter={this.dragenter}
            onDragLeave={this.dragleave}
            onDragOver={this.dragover}
            onDrop={this.drop}
          >

            {/* hidden input file field */}
            <input
              type="file"
              id="fileElem"
              multiple
              accept=".stl,.step"
              style={{ display: "none" }}
              onChange={(e) => this.handleFiles(e.target.files)}
            />

            <Box sx={{
              margonBottom: "20px",
            }} className="second-main-div" >
              <p className="upload-text ">
                upload a 3D model to see instant pricing, lead time and DfM
                feedback
              </p>
              <p className="upload-text ">.STEP | .STL</p>
              <div className="center-btn" onClick={() => { document.getElementById("fileElem").click() }}>
                <button className="btn-start">
                  <img src={UploadLogo} alt="" />
                  start your instant quotation
                </button>
              </div>
              <p className="upload-text12 mt-2 ">
                <img src={LockLogo} alt="" /> All uploads are secure and
                confidential
              </p>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default HeroSection;
