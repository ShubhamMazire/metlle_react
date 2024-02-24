import React, { Component } from "react";
import HeroSection from "./components/heroSection";
import Building from "./components/building";
import Tools from "./getYourShop";
import Timing from "./components/timing";
import BreakTheChain from "./components/breakTheChain";
import Teams from "./components/teams";
import Business from "./components/business";
import Made from "./components/made";
import Platfrom from "./components/platform";
import routes from "../../routes";
import redux from "../../Common/Redux";


import { Grid,Box,Button } from "@mui/material";
// import { Slide } from "react-awesome-reveal";

const dummyTexts = [
  {
    button: "witness possibilities",
    lines: ["building a future", "with infinite possibilities"],
    subText: "from prototyping to production and more we are your partner",
  },
  {
    button: "witness possibilities",
    lines: ["unified manufacturing", "interface"],
    subText: "Manage all the resources from single window",
  },
];

const dummyImages = [
  {
    image: "/images/drone.png",
    line: "unified manufacturing interface",
    subText: "Manage all the resources from single window",
  },
  {
    image: "/images/2.png",
    line: "unified manufacturing interface",
    subText: "Manage all the resources from single window",
  },
  {
    image: "/images/3.png",
    line: "unified manufacturing interface",
    subText: "Manage all the resources from single window",
  },
  {
    image: "/images/4.png",
    line: "unified manufacturing interface",
    subText: "Manage all the resources from single window",
  },
  {
    image: "/images/5.png",
    line: "unified manufacturing interface",
    subText: "Manage all the resources from single window",
  },
];

const Div = ({ Element, index, effect }) => {
  // console.log("ele"+index);
  return (
    <div
      id={"ele" + index}
      className={effect}
      autoplay={5000}
      touchDisabled={true}
    >
      {Element}
    </div>
  );
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: 1,
      textIndex: 0,
      maxTextIndex: dummyTexts.length - 1,
      imageIndex: 0,
      maxImageIndex: dummyImages.length - 1,
      direction: "down",
    };
  }

  componentDidMount() {
    // document
    //   .getElementById("root")
    //   .addEventListener("wheel", this.handleScroll);
  }

  handleScroll = (e) => {
    if (e.deltaY > 0) {
      this.setState({ direction: "down" });
      if (
        this.state.active === 2 &&
        this.state.textIndex < this.state.maxTextIndex
      ) {
        document.getElementById("ele2").scrollIntoView({ behavior: "smooth" });
        this.setState({ textIndex: this.state.textIndex + 1 });
        return false;
      }

      if (
        this.state.active === 7 &&
        this.state.imageIndex < this.state.maxImageIndex
      ) {
        document.getElementById("ele7").scrollIntoView({ behavior: "smooth" });
        this.setState({ imageIndex: this.state.imageIndex + 1 });
        return false;
      }

      if (this.state.active < 11) {
        document
          .getElementById("ele" + (this.state.active + 1))
          .scrollIntoView({ behavior: "smooth" });
        this.setState({ active: this.state.active + 1, textIndex: 0 }, () => {
          console.log(this.state.active);
        });
      } else {
        document
          .getElementById("ele" + this.state.active)
          .scrollIntoView({ behavior: "smooth" });
      }
    } else {
      this.setState({ direction: "up" });
      if (this.state.active > 1) {
        document
          .getElementById("ele" + (this.state.active - 1))
          .scrollIntoView({ behavior: "smooth" });
        this.setState({ active: this.state.active - 1 }, () => {
          console.log(this.state.active);
        });
      } else {
        document
          .getElementById("ele" + this.state.active)
          .scrollIntoView({ behavior: "smooth" });
      }
    }
    return false;
  };

  componentWillUnmount() {
    document
      .getElementById("root")
      .removeEventListener("wheel", this.handleScroll);
  }

  render() {
    return (
      <div>
        <Div
          Element={
            <HeroSection direction={this.state.direction} {...this.props} />
          }
          index={1}
          effect="fade-in"
        />
        <Div
          Element={
            <Building
              data={dummyTexts[this.state.textIndex]}
              anim={"slider-wrapper  t" + this.state.textIndex}
              {...this.props}
            />
          }
          index={2}
        />
        {/* </Slide> */}
        <Div Element={<Tools />} index={3} effect="fade-in" />
        <Div Element={<Timing />} index={4} effect="fade-in" />
        <Div Element={<Platfrom />} index={5} effect="fade-in" />
        <Div Element={<BreakTheChain />} index={6} effect="fade-in" />
        <Div
          Element={
            <Made
              data={dummyImages[this.state.imageIndex]}
              imganim={"slider-wrapper t" + this.state.imageIndex}
              anim={"slider-wrappert" + this.state.imageIndex}
            />
          }
          index={7}
        />
        <Div
          Element={<Teams active={this.state.active == 8} />}
          index={8}
          effect="fade-in"
        />
        
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


        <Div Element={<Business />} index={9} effect="fade-in" />
      </div>
    );
  }
}

export default redux(App);
