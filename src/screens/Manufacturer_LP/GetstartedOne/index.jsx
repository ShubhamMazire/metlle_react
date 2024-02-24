import React from "react";
import "./style.css";
import Navigationbar from "../../../Components/HeaderComponentMLP";
import routes from "../../../routes";
import { Link } from "react-router-dom";
const GetStarted = () => {
  return (
    <div className="main-bg2">
      <Navigationbar section="msas" />
      <div className="div-top ">
        <h3 className="main-text bold">
          Increase the RPM <br />
          of your business <br />
          growth
        </h3>
        <p className="subtextInc regular">
          Mettle is India's first technology and first manufacturing platform.
          Grow your machine shop business by enabling the technology with the
          help of Mettle. Onboard your machine shop with us and start your
          journey of growth.
        </p>


        <Link color="primary" href="#" to={routes.manufacturer.login}  sx={{ mt: 3 }}>
        <button
          className="getStartedButton"
        >
          Get Started
        </button>

        </Link>
      </div>
    </div>
  );
};

export default GetStarted;
