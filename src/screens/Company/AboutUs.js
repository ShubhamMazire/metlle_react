import React, { Component } from "react";
import HeaderComponent from "../../Components/HeaderComponentMLP";
import Team from "../MainLP/components/teams";

import { Typography, Box, Grid, Button } from "@mui/material";

import routes from "../../routes";

import BlogBox from "./BlogBox";
class AboutUs extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Box>
        <HeaderComponent section="root" theme="light" />
        <Box>
          <h1
            className="py-5 h1 bold center"
            style={{
              fontSixe: "2rem",
              backgroundColor: "#1D2128FF",
              color: "#fff",
            }}
          >
            build next great product!
          </h1>

          {/* our story : */}
          <Box className="py-5 px-4 container">
            <Grid container spacing={2} className="">
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <h2 className="bold">our story :</h2>
                <div className="regular" style={{}}>
                  Enim fugiat sint duis sunt duis deserunt cillum sint est.
                  Laboris est Lorem pariatur velit in est adipisicing esse sint
                  elit enim proident minim enim incididunt velit nisi. Aliqua
                  deserunt laborum et eiusmod quis ullamco. Esse sit duis enim
                  voluptate anim et adipisicing ea irure do. Dolor qui mollit
                  cupidatat Lorem in non elit incididunt duis incididunt qui
                  minim ea sunt.Pariatur nisi Lorem excepteur ad nisi proident
                  ullamco do Lorem dolor duis non elit cupidatat amet deserunt
                  velit. Ex est nostrud quis proident ea nisi culpa voluptate
                  sit occaecat tempor proident mollit amet.Magna labore nulla
                  reprehenderit nulla irure tempor voluptate. Exercitation
                  labore pariatur ad ut do culpa officia ut duis ea enim
                  occaecat cupidatat nulla in laborum excepteur.Esse laboris
                  consectetur elit voluptate reprehenderit non. Eu cillum qui
                  elit ad occaecat dolor. Proident reprehenderit consectetur
                  laboris est incididunt dolor pariatur occaecat incididunt elit
                  et ea esse ad Lorem adipisicing cupidatat dolore. Consectetur
                  fugiat ea do voluptate esse dolore labore officia.Proident
                  pariatur ut cillum excepteur velit Lorem mollit ullamco anim
                  sint et Lorem ullamco. Incididunt minim non mollit aliquip eu
                  do. Sit et dolor sunt occaecat sunt reprehenderit esse
                  incididunt aliqua et consequat tempor dolor proident. Aliquip
                  laborum Lorem consectetur aliquip dolor ex proid
                </div>
              </Grid>

              <Grid item xs={12} sm={6} md={6} lg={6} xl={6} className="center">
                <img
                  src="/assets/About US.png"
                  height={"100%"}
                  width="auto"
                  alt="#xxx"
                />
              </Grid>
            </Grid>
          </Box>

          {/* team mve fster */}
          <Box className="" style={{}}>
            <Team
              height="50vh"
              title="teams move faster with metlle"
              button={{
                text: "Join Us Now",
                link: routes.customer.login,
              }}
            />
          </Box>

          {/* integration of technology in manufact  and custom */}
          <Box className="py-5 px-5 container">
            <Grid container spacing={5} className="px-4">
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <h2 className="semi_bold">
                  integration of technology in manufacturing
                </h2>
                <h6 className="regular" style={{ color: "#535CE8FF" }}>
                  our mission
                </h6>
                <div className="regular" style={{}}>
                  Enim fugiat sint duis sunt duis deserunt cillum sint est.
                  Laboris est Lorem pariatur velit in est adipisicing esse sint
                  elit enim proident minim enim incididunt velit nisi. Aliqua
                  deserunt laborum et eiusmod quis ullamco. Esse sit duis enim
                  voluptate anim et adipisicing ea irure do. Dolor qui
                </div>
              </Grid>

              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <h2 className="semi_bold">
                  custom manufacturing at fastest way
                </h2>
                <h6 className="regular" style={{ color: "#535CE8FF" }}>
                  our vision
                </h6>
                <div className="regular" style={{}}>
                  Enim fugiat sint duis sunt duis deserunt cillum sint est.
                  Laboris est Lorem pariatur velit in est adipisicing esse sint
                  elit enim proident minim enim incididunt velit nisi. Aliqua
                  deserunt laborum et eiusmod quis ullamco. Esse sit duis enim
                  voluptate anim et adipisicing ea irure do. Dolor qui
                </div>
              </Grid>
            </Grid>
          </Box>

          {/* experience digital transformation */}
          <Box className="py-5 px-5 container">
            <h2 className="bold center my-3">
              experience digital transformation
            </h2>

            <Grid container spacing={5} className="container">
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <div
                  style={{
                    position: "relative",
                    paddingBottom: "56.25%",
                    height: 0,
                    overflow: "hidden",
                  }}
                >
                  <iframe
                    src="https://player.vimeo.com/video/879849140?badge=0&autopause=0&quality_selector=0&player_id=0&app_id=58479&loop=1&autoplay=1&muted=1"
                    frameborder="0"
                    style={{
                      width: "100%",
                      height: "100%",
                      position: "absolute",
                      left: "0px",
                      top: "0px",
                      overflow: "hidden",
                    }}
                    mute
                    title="Final Render 3"
                    allow="autoplay; fullscreen"
                  ></iframe>
                </div>
              </Grid>

              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={6}
                xl={6}
                sx={{
                  display: "flex",
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
                className="container"
              >
                <h3 className="semi_bold">see, how it works</h3>
                <div className="regular container" style={{}}>
                  Enim fugiat sint duis sunt duis deserunt cillum sint est.
                  Laboris est Lorem pariatur velit in est adipisicing esse sint
                  elit enim proident minim enim incididunt velit nisi. Aliqua
                  deserunt laboru
                </div>

                <Grid container spacing={2} className="py-4">
                  <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                    <Button
                      variant="contained"
                      color="primary"
                      className="bold"
                      style={{ width: "100%" }}
                    >
                      explore transformation
                    </Button>
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                    <Button
                      variant="outlined"
                      color="primary"
                      className="bold"
                      style={{ width: "100%" }}

                      onClick={() => {
                        this.props.history.push(routes.company.contact);
                      }}
                    >
                      contact us now
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>

          {/* whats new  */}

          <Box
            style={{
              backgroundColor: "#F3F4F6FF",
            }}
          >
            <Box
              className="py-4 container"
              style={{
                backgroundColor: "#F3F4F6FF",
              }}
            >
              <h2 className="bold center my-3">what's new?</h2>

              <h6 className="p center my-2">
                Do consectetur proident proident id eiusmod deserunt consequat{" "}
                <br /> pariatur ad ex velit do Lorem reprehenderit.
              </h6>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                  <BlogBox
                    image="/assets/About US.png"
                    title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    date="12/12/2021"
                    readTime="5 min"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                  <BlogBox
                    image="/assets/About US.png"
                    title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    date="12/12/2021"
                    readTime="5 min"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                  <BlogBox
                    image="/assets/About US.png"
                    title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    date="12/12/2021"
                    readTime="5 min"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                  <BlogBox
                    image="/assets/About US.png"
                    title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    date="12/12/2021"
                    readTime="5 min"
                  />
                </Grid>
              </Grid>

              <Box className="center py-4">
                <Button
                  variant="contained"
                  color="primary"
                  className="bold"
                  type="primary"

                  onClick={() => {
                    this.props.history.push(routes.blogs.root);
                  }}
                >
                  Read more articles
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
}
export default AboutUs;
