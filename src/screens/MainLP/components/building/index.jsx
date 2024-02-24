import React, { Component } from "react";
import "./style.css";
// import { Slide } from "react-awesome-reveal";
// import Typewriter from "typewriter-effect/dist/core";
import Typewriter from "typewriter-effect";
import routes from "../../../../routes";

import Text from "../../../../Components/Text";
import { Box } from "@mui/system";

class Building extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textIndex: 0,
      isVisible: false,
      maxTextIndex: 3,
      loading: false,
      dummyTexts: [
        {
          button: "witness possibilities",
          lines: ["building a future 1", "with infinite possibilities"],
          subText:
            "from prototyping to production and more we are your partner ",
        },
        {
          button: "witness possibilities 2",
          lines: ["unified manufacturing 2", "interface"],
          subText: "Manage all the resources from single window",
        },
        {
          button: "witness possibilities",
          lines: ["building a future 3", "with infinite possibilities"],
          subText:
            "from prototyping to production and more we are your partner ",
        },
        {
          button: "witness possibilities",
          lines: ["unified manufacturing 4", "interface"],
          subText: "Manage all the resources from single window",
        },
      ],
    };
    // this.intersectionObserver = null;
    // this.targetRef = React.createRef();
  }

  componentDidMount() {

    // this.intersectionObserver = new IntersectionObserver(
    //   this.handleIntersection,
    //   options
    // );

    // if (this.targetRef.current) {
    //   this.intersectionObserver.observe(this.targetRef.current);
    // }
  }

  componentWillUnmount() {
    //   if (this.targetRef.current) {
    //     this.intersectionObserver.unobserve(this.targetRef.current);
    //   }
    //   this.intersectionObserver.disconnect();
    //   this.removeScrollEvent();
    // }
    // handleScroll = (e) => {
    //   e.preventDefault();
    //   try {
    //     clearTimeout(this.bounce);
    //   } catch (e) {}
    //   if (e.deltaY > 0) {
    //     this.setState({ direction: "down" });
    //     if (this.state.textIndex < this.state.maxTextIndex) {
    //       document.getElementById("ele2").scrollIntoView({ behavior: "smooth" });
    //       // remove class spring-effect to div with id spring
    //       this.setState({ loading: true }, () => {
    //         this.bounce = setTimeout(() => {
    //           // add class spring-effect to div with id spring
    //           this.setState({
    //             textIndex: this.state.textIndex + 1,
    //             loading: false,
    //           });
    //         }, 500);
    //       });
    //       return false;
    //     }
    //     this.removeScrollEvent();
    //   } else {
    //     this.removeScrollEvent();
    //     this.setState({ direction: "up", textIndex: 0, loading: false });
    //   }
    //   return false;
    // };
    // removeScrollEvent = () => {
    //   document
    //     .getElementById("root")
    //     .removeEventListener("wheel", this.handleScroll);
    // };
    // handleIntersection = (entries) => {
    //   // alert("hey there " + entries[0].isIntersecting);
    //   const isVisible = entries[0].isIntersecting;
    //   this.setState({ isVisible, textIndex: 0 });
    //   // if true disable scroll for 4 times
    //   if (isVisible) {
    //     document.getElementById("ele2").scrollIntoView({ behavior: "smooth" });
    //     document
    //       .getElementById("root")
    //       .addEventListener("wheel", this.handleScroll);
    //   } else {
    //     this.removeScrollEvent();
    //   }
  }

  render() {
    const { dummyTexts, textIndex } = this.state;

    const { button, lines, subText } = dummyTexts[textIndex];

    return (
      <div className="main-bg-build" id="scroll-block1" ref={this.targetRef}>
        {this.state.loading == false && (
          <div
            className="center-div spring-div slider-wrapper   t0 "
            id="spring"
          >
            {/* <Slide direction="up" duration="3000" triggerOnce={true}> */}
            <div
              className={
                "bold a " + textIndex + " build-text " + this.props.anim ?? ""
              }
              autoplay={5000}
            >
              <Text bold fontSize={"4.5"} className="ab">
                convert designs into physical products,
              </Text>
              <br />
              <Text bold fontSize={"4.5"} style={{
                  textAlign: "center",
                }}
                className="a"
                
              >
                build next amazing
                <Typewriter
                  className="bold a"
                  skipAddStyles={true}
                  wrapperClassName="bold a build-text"
                  options={{
                    strings: [
                      "drone!",
                      "e-wagon!",
                      "spacecraft!",
                      "submarine!",
                      "thing!",
                    ],
                    autoStart: true,
                    loop: true,
                  }}

        
                />
              </Text>
            </div>
            <p
              className={"semi_bold we-text " + this.props.anim ?? ""}
              autoplay={5000}
              style={{
                // 18px font size in desktop
                fontSize:
                  "calc(18px + (24 - 18) * ((100vw - 300px) / (1600 - 300)))",
                lineHeight:
                  "calc(18px + (24 - 18) * ((100vw - 300px) / (1600 - 300)))",
                fontWeight: "bold",
              }}
            >
              we are your partner from prototyping to production and more
            </p>
            <Box sx={{
              marginBottom:"2rem"
            }}>
            <button
              className="btn-build-button semi_bold"
              onClick={() => {
                this.props.history.push(routes.customer.login);
              }}
            >
              build now
            </button>
            </Box>
            {/* </Slide> */}
          </div>
        )}
      </div>
    );
  }
}

export default Building;
