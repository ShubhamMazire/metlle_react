import React from "react";
import Header from "./components/header";
import LeftSection from "./components/leftSection";
import RightSection from "./components/rightSection";
import "./style.css";

import HeaderComponentMLP from "../../../Components/HeaderComponentMLP";

const LandingPage = () => {
  return (
    <div
      className="container-fluid align-items-center justify-content-center"
      style={{
        backgroundColor: "#f8f9fa",
      }}
    >
      <div>{/* <Header /> */}</div>
      <div className="row ">
        <HeaderComponentMLP theme="loght" section="msas" />
        <div className="col-8">
          <LeftSection />
        </div>
        <div className="col-4">
          <RightSection />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
