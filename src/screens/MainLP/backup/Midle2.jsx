import React from "react";

const Midle2 = () => {
  return (
    <div
      className="container-fluid"
      style={{
       

        backgroundPosition: "center",
      //height: "100vh",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        alignContent: "center",
      }}
    >
      <div
        style={{
          height: "50vh",
          width:"100vw",
          backgroundImage: `url("/images/chain.png")`,
          backgroundSize: "cover",
          backgroundColor: "rgba(0,0,0,0.9)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          alignContent: "center",
         verticalAlign:"center",
        }}
      >
        <h1
          style={{
            color: "whitesmoke",
            fontWeight: "bold",
            // alignItems: "flex-start",
            fontSize: "60px",
            // transform:"translate(0%,-180%)"
            margin:"auto",
          }}
        >
          break the chain of <br /> inefficiencies,
        </h1>
      </div>
    </div>
  );
};

export default Midle2;
