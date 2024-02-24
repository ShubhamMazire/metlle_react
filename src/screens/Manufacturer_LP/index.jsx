import React from "react";
import GetStarted from "./GetstartedOne";
import Middle from "./Middle";
import Middle0 from "./Middle0";
import Middle1 from "./Middle1";
import GetYourShop from "./getYourShop";
import RunAt from "./runAt";
import Task from "./task";
import Footer from "../MainLP/components/footer";
const LandingPage = () => {
  return (
    <div>
      <div style={{ backgroundColor: "black" }}>
        <GetStarted />
        <Middle />
        <Middle0 />
        <Middle1 />
      </div>
      <GetYourShop />
      <RunAt />
      <Task />
    </div>
  );
};

export default LandingPage;
