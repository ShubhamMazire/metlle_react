import React, { Component } from "react";
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import "../node_modules/bootstrap/dist/js/bootstrap.bundle";

import Header from "./Header";
import Midle1 from "./Midle1";
import Cards from "./Cards";
import Card2 from "./Card2";
import Card3 from "./Card3";
import Midle2 from "./Midle2";
import Footer from "./Footer";
import NavigationBar from "./NavigationBar";
import ReactPageScroller from "react-page-scroller";

import routes from "../../routes";
import Midle3 from "./Midle3";
const dummyTexts = [
  {
    image: "https://picsum.photos/600/300",
    button: "witness possibilities",
    lines: ["building a future", "with infinite possibilities"],
    subText: "from prototyping to production and more we are your partner ",
  },
  {
    button: " possibilities witness",
    lines: ["with infinite possibilities", "building a future"],
    subText: "we are your partner from prototyping to production and more",
    image: "https://picsum.photos/600/300",
  },
  {
    button: "witness possibilities",
    lines: ["building a future", "with infinite possibilities"],
    subText: "from prototyping to production and more we are your partner ",
    image: "https://picsum.photos/600/300",
  },
  {
    button: " possibilities witness",
    lines: ["with infinite possibilities", "building a future"],
    subText: "we are your partner from prototyping to production and more",
    image: "https://picsum.photos/600/300",
  },
  {
    button: "witness possibilities",
    lines: ["building a future", "with infinite possibilities"],
    subText: "we are your partner from prototyping to production and more",
    image: "https://picsum.photos/600/300",
  },
  {
    button: "witness possibilities",
    lines: ["with infinite possibilities", "building a future"],
    subText: "we are your partner from prototyping to production and more",
    image: "https://picsum.photos/600/300",
  },
];

const dummyImages = [
  {
    image: "https://picsum.photos/600/301",
    button: "witness possibilities",
    lines: ["building a future", "with infinite possibilities"],
    subText: "we are your partner from prototyping to production and more",
  },
  {
    button: "witness possibilities",
    lines: ["with infinite possibilities", "building a future"],
    subText: "we are your partner from prototyping to production and more",
    image: "https://picsum.photos/600/302",
  },
  {
    button: "witness possibilities",
    lines: ["building a future", "with infinite possibilities"],
    subText: "we are your partner from prototyping to production and more",
    image: "https://picsum.photos/600/303",
  },
  {
    button: "witness possibilities",
    lines: ["with infinite possibilities", "building a future"],
    subText: "we are your partner from prototyping to production and more",
    image: "https://picsum.photos/600/304",
  },
  {
    button: "witness possibilities",
    lines: ["with infinite possibilities", "building a future"],
    subText: "we are your partner from prototyping to production and more",
    image: "https://picsum.photos/600/305",
  },
  {
    button: "witness possibilities",
    lines: ["building a future", "with infinite possibilities"],
    subText: "we are your partner from prototyping to production and more",
    image: "https://picsum.photos/600/306",
  },
];


{
  /* <div style={{ backgroundColor: "#E3E3E3" }}> */
}

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
      maxTextIndex: 4,
      imageIndex: 0,
      maxImageIndex: 4,
      direction: "up",
    };
  }

  componentDidMount() {
    document.getElementById("root").addEventListener("wheel", (e) => {
      e.preventDefault();
      e.stopPropagation();

      // console.log("scrolling");

      // console.log(e.deltaY);
      if (e.deltaY > 0) {
        this.setState({ direction: "down" });

        if (
          this.state.active === 2 &&
          this.state.textIndex < this.state.maxTextIndex
        ) {
          document
            .getElementById("ele2")
            .scrollIntoView({ behavior: "smooth" });
          this.setState({ textIndex: this.state.textIndex + 1 });
          return false;
        }

        if (
          this.state.active == 7 &&
          this.state.imageIndex < this.state.maxImageIndex
        ) {
          document
            .getElementById("ele7")
            .scrollIntoView({ behavior: "smooth" });
          this.setState({ imageIndex: this.state.imageIndex + 1 });
          return false;
        }

        if (this.state.active < 8) {
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
    });
  }

  render() {
    return (
      <div>
        {/* <NavigationBar /> */}
        <Div
          Element={<Header direction={this.state.direction} />}
          index={1}
          effect="slider-wrapper wow delay-1s  fadeIn animated"
        />
        <Div
          Element={<Midle1 data={dummyTexts[this.state.textIndex]} updater={this.state.textIndex}/>}
          index={2}
          effect="slider-wrapper wow delay-3s  fadeInUp animated"
        />
        <Div
          Element={<Cards />}
          index={3}
          effect="slider-wrapper wow delay-3s  fadeInUp animated"
        />
        <Div
          Element={<Card2 />}
          index={4}
          effect="slider-wrapper wow delay-3s  fadeInUp animated"
        />
        <Div
          Element={<Card3 />}
          index={5}
          effect="slider-wrapper wow delay-3s  fadeInUp animated"
        />
        <Div
          Element={<Midle2 />}
          index={6}
          effect="slider-wrapper wow delay-3s  fadeInUp animated"
        />
        <Div
          Element={<Midle3 data={dummyImages[this.state.imageIndex]} imganim={"slider-wrapper wow delay-1s  fadeInUp animated t"+this.state.imageIndex}  anim={"slider-wrapper wow delay-1s  fadeInRight animated t"+this.state.imageIndex}  />}
          index={7}
          effect="slider-wrapper wow delay-3s  fadeInUp animated"
        />
      </div>
    );
  }
}

export default App;
