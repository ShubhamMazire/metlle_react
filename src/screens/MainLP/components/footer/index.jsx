import React from "react";
import { Input, Select } from "antd";
import "./style.css";
import Facebook from "../../images/Facebook 2.png";
import Twi from "../../images/Twitter 2.png";
import Linkin from "../../images/LinkedIn 2.png";
import You from "../../images/YouTube 2.png";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import routes from "../../../../routes";
import { useHistory } from "react-router-dom";
import Text from "../../../../Components/Text";
const { Option } = Select;
const { Search } = Input;

//    https://cdn-icons-png.flaticon.com/512/684/684809.png   map
//    https://cdn-icons-png.flaticon.com/512/159/159832.png  call
//    https://cdn-icons-png.flaticon.com/512/11067/11067313.png  mail

const Footer = () => {
  const pushPath = useHistory();

  const navigate = (path) => {
    pushPath.push(path);
    // scroll to top

    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  };

  return (
    <div
      className=" container-fluid main-bg-clr"
      style={{
        width: "100%",
        padding: "50px 15px 25px 15px",

        backgroundImage: `url("/assets/footerBg.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Grid container spacing={2} justify="flex-start" align="middle">
        <Grid item lg={3} md={3} xs={12}>
          <div className="center-col">
            <div>
              <h6
                className=" semi_bold"
                style={{
                  margin: "25px",
                }}
              >
                build hardware at speed the speed of software. metlle.com helps
                you convert your CAD designs into physical products seamlessly.
                through the fusion of cutting-edge technology and manufacturing
                expertise, we aim to revolutionize the industry, simplifying the
                supply chain for custom-designed parts.
              </h6>
            </div>
          </div>
        </Grid>
        <Grid item lg={3} md={3} xs={12}>
          <Box
            className=""
            sx={{
              "@media screen and (orientation: landscape)": {
                textAlign: "initial",
              },
            }}
          >
            <Box
              sx={{
                margin: "10px 0px",
              }}
              onClick={() => navigate(routes.root)}
            >
              <img
                src={"/assets/logo_black.png"}
                alt=""
                className="img-fluid logo_footer"
                style={{
                  width: "80%",
                  height: "auto",
                  margin: "0px 0px 0px 0px",
                }}
              />
            </Box>
            <div>
              <p className="text-footer">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/684/684809.png"
                  style={{ width: "20px", height: "20px" }}
                />{" "}
                295/3B, Laxmi road, pune 411002
              </p>
              <p className="text-footer">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/159/159832.png"
                  style={{ width: "20px", height: "20px" }}
                />{" "}
                +91 9657976757
              </p>
              <p className="text-footer">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/11067/11067313.png"
                  style={{ width: "20px", height: "20px" }}
                />{" "}
                &nbsp;&nbsp;system@metlle.com
              </p>
            </div>
          </Box>
        </Grid>
        <Grid item lg={3} md={3} xs={12} sx={{marginTop:"25px"}}>
          <div className="">
            <div>
              <Box mt={2}>
                <Text
                  bold
                  className="cursor" h7
                  onClick={() => navigate(routes.blogs.root)}
                >
                  resources
                </Text>
              </Box>
              <Box  mt={1}>
                <Text
                  bold
                  className="cursor" h7
                  onClick={() => navigate(routes.root)}
                >
                  industries
                </Text>
              </Box>
              <Box  mt={1}>
                <Text
                  bold
                  className="cursor" h7
                  onClick={() => navigate(routes.manufacturer.root)}
                >
                  partner
                </Text>
              </Box>
              <Box  mt={1}>
                <Text
                  bold
                  className="cursor" h7
                  onClick={() => navigate(routes.company.root)}
                >
                  Company
                </Text>
              </Box>
              <Box  mt={1}>
                <Text
                  bold
                  className="cursor notrans" h7
                  onClick={() => navigate(routes.msas.root)}
                >
                  MSasS
                </Text>
              </Box>
              <Box  mt={1}>
                <Text
                  bold
                  className="cursor" h7
                  onClick={() => navigate(routes.company.contact)}
                >
                  Contact Us
                </Text>
              </Box>
            </div>
          </div>
        </Grid>
        <Grid item lg={3} md={3} xs={12}>
          <div className="center-col">
            <div>
              <h5>connect with us:</h5>
              <div>
                <img src={Twi} alt="" className="img-fluid spce" />
                <img src={Facebook} alt="" className="img-fluid spce" />
                <img src={Linkin} alt="" className="img-fluid spce" />
                <img src={You} alt="" className="img-fluid spce" />
              </div>
              <h5
                style={{
                  marginTop: "20px",
                }}
              >
                Made with{" "}
                <img
                  src="https://cdn-icons-png.flaticon.com/512/426/426833.png"
                  style={{
                    width: "20px",
                    height: "20px",
                  }}
                />{" "}
                in india{" "}
              </h5>
            </div>
          </div>
        </Grid>
      </Grid>

      {/* 3 iamges in row and in column in mobile devices using row col */}

      <Grid
        container
        spacing={2}
        justify="space-around"
        align="middle"
        sx={{ marginTop: "1.5rem" }}
      >
        <Grid item lg={4} md={6} xs={12}>
          <img src="/assets/Image 893.png" alt="" className="img-fluid" />
        </Grid>

        <Grid item lg={4} md={6} xs={12}>
          <img src="/assets/tiger.png" alt="" className="img-fluid" />
        </Grid>

        <Grid item lg={4} md={6} xs={12}>
          <img src="/assets/startupindia.png" alt="" className="img-fluid" />
        </Grid>
      </Grid>

      <h6 className=" center_text mt-4">
        2023 ©Herstellen Technologies Pvt Ltd. All Rights Reserved.
      </h6>
    </div>
  );
};

export default Footer;
