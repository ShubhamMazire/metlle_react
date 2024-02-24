import React from "react";
import "./style.css";
import { Col, Row } from "antd";

import { Box } from "@mui/system";


// import { Slide } from "react-awesome-reveal";

class Made extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      textIndex: 0,
      maxTextIndex: 3,
      loading: false,
      dummyTexts: [
        {
          image: "/assets/unified manufacturing interface.png",
          line: "unified manufacturing interface",
          subText: "Tired of finding multiple suppliers for your manufacturing requirements? Now, manage them all from a single window.",
        },
        {
          image: "/assets/no follow ups.png",
          line: "no more follow ups!",
          subText: "Stop taking frequent follow-ups. track your parts on your own and ensure end to end transparency!",
        },
        {
          image: "/assets/manage pos.png",
          line: "complete BoM, in single purchase order",
          subText: "Why create different purchase orders for a single product? Include every child part in a single order regardless of the processes.",
        },
        {
          image: "/assets/speed matters.png",
          line: "rapid, in a true manner",
          subText: "rapid manufacturing today is hardly rapid enough. Experience rapid in a true manner with metlle.com.",
        },
        {
          image: "/assets/distributed manufacturing.png",
          line: "distributed manufacturing, new normal",
          subText: "reduce dependency on nearby suppliers, get your part manufactured from the best. Distribute manufacturing to achieve quality your design deserves.",
        },
      ],
    };

    // this.intersectionObserver = null;
    // this.targetRef = React.createRef();
  }

  componentDidMount() {
    // const options = {
    //   root: null, // Use the viewport as the root
    //   rootMargin: "0px",
    //   threshold: 0.85, // Set the threshold as needed
    // };
    // this.intersectionObserver = new IntersectionObserver(
    //   this.handleIntersection,
    //   options
    // );
    // if (this.targetRef.current) {
    //   this.intersectionObserver.observe(this.targetRef.current);
    // }
  }

  componentWillUnmount() {
    // if (this.targetRef.current) {
    //   this.intersectionObserver.unobserve(this.targetRef.current);
    // }
    // this.intersectionObserver.disconnect();
    // this.removeScrollEvent();
  }

  // removeScrollEvent = () => {
  //   document
  //     .getElementById("root")
  //     .removeEventListener("wheel", this.handleScroll);
  // };

  // handleScroll = (e) => {
  //   e.preventDefault();
  //   try {
  //     clearTimeout(this.bounce);
  //   } catch (e) {}
  //   if (e.deltaY > 0) {
  //     this.setState({ direction: "down" });
  //     if (this.state.textIndex < this.state.maxTextIndex) {
  //       document.getElementById("ele7").scrollIntoView({ behavior: "smooth" });
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
  //     // this.setState({ direction: "up", textIndex: 0, loading: false });
  //   }
  //   return false;
  // };

  // handleIntersection = (entries) => {
  //   const isVisible = entries[0].isIntersecting;
  //   this.setState({ isVisible, textIndex: 0 });

  //   if (isVisible) {
  //     document.getElementById("ele7").scrollIntoView({ behavior: "smooth" });
  //     document
  //       .getElementById("root")
  //       .addEventListener("wheel", this.handleScroll);
  //   } else {
  //     this.removeScrollEvent();
  //   }
  // };

  render() {
    const { dummyTexts, textIndex, loading } = this.state;

    const { image, line, subText } = dummyTexts[textIndex];

    return (
      <div
        className="main-bg-made"
        style={{
          margin: "5rem auto 0 auto",
        }}
        ref={this.targetRef}
      >
        <div>
          {/* <Slide direction="up" duration="2000" triggerOnce={true}> */}
          {loading === false && (
            <>
              <h1
                className="made-text bold"
                style={{
                  fontSize: "3.125rem", // Updated font size using the formula (5rem * 0.625)
                }}
              >
                Manufacturing
                <br />
                Made (incredibly) easy
              </h1>
              {/* </Slide> */}




              <Box sx={{
                "@media screen and (orientation: portait)": {
                  display: "none"
                }
              }}>

                {dummyTexts.map((item, index) => {
                  const direction = index % 2 === 0 ? "left" : "right";

                  if (direction === "left")
                    return (
                      <Row justify="center" className="width-row ">
                        <Col lg={10} className="slider-wrapper ">
                          <img src={item.image} alt="" className="img-fluid" />
                        </Col>
                        <Col
                          lg={20}
                          className=" slider-wrapper  mb-4"
                          style={{
                            margin: "0px 0px 0px 2rem",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            flex: 1,
                          }}
                        >
                          {/* <Slide direction="right" duration="3000" triggerOnce="true"> */}
                          <h1
                            className="uni-text bold"
                            style={{
                              fontSize: "3rem", // Updated font size using the formula (5rem * 0.625)
                            }}
                          >
                            {item.line}
                          </h1>
                          <p className="uni-text1 mt-1 semi_bold">
                            {item.subText}
                          </p>
                          {/* </Slide> */}
                        </Col>
                      </Row>
                    );

                  return (
                    <Row justify="center" className="width-row bg-image1">
                      <Col
                        lg={20}
                        className=" slider-wrapper mb-4"
                        style={{
                          margin: "0px 0px 0px 2rem",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          flex: 1,
                        }}
                      >
                        {/* <Slide direction="right" duration="3000" triggerOnce="true"> */}
                        <h1
                          className="uni-text bold"
                          style={{
                            fontSize: "3rem", // Updated font size using the formula (5rem * 0.625)
                          }}
                        >
                          {item.line}
                        </h1>
                        <p className="uni-text1 mt-1 semi_bold">{item.subText}</p>
                        {/* </Slide> */}
                      </Col>
                      <Col lg={10} className=" slider-wrapper">
                        <img src={item.image} alt="" className="img-fluid" />
                      </Col>
                    </Row>
                  );
                })}
              </Box>



              <Box sx={{
                "@media screen and (orientation: landscape)": {
                  display: "none"
                }
              }}>

                {dummyTexts.map((item, index) => {
                  return (
                    <Row justify="center" className="width-row ">
                      <Col lg={10} className="slider-wrapper ">
                        <img src={item.image} alt="" className="img-fluid" />
                      </Col>
                      <Col
                        lg={20}
                        className=" slider-wrapper  mb-4"
                        style={{
                          margin: "0px 0px 0px 2rem",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          flex: 1,
                        }}
                      >
                        {/* <Slide direction="right" duration="3000" triggerOnce="true"> */}
                        <h1
                          className="uni-text bold"
                          style={{
                            fontSize: "3rem", // Updated font size using the formula (5rem * 0.625)
                          }}
                        >
                          {item.line}
                        </h1>
                        <p className="uni-text1 mt-1 semi_bold">
                          {item.subText}
                        </p>
                        {/* </Slide> */}
                      </Col>
                    </Row>
                  );
                })}
              </Box>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default Made;
