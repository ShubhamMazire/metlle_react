import React from "react";

const Midle1 = (props) => {
  return (
    <div
      style={{
        backgroundImage: `url("/images/bgcolor.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        className={props.anim+" container"}
        style={{
          color: "whitesmoke",
          padding: "20px",
          textAlign: "center",
          maxWidth: "800px",
        }}
        key={props.anim}
        
      >
        <h1
          style={{
            fontWeight: "bold",
            fontSize: "350%",
            marginBottom: "50px",
          }}
          className={props.anim}
        >
          {props.data.lines.map((item, index) => (
            <div>{item}</div>
          ))}
        </h1>

        <p
          style={{
            marginBottom: "50px",
            fontWeight: "normal",
            fontSize: "150%",
          }}
          className={props.anim}
        >
          {props.data.subText}
        </p>
        <button className="btn btn-primary   slider-wrapper wow delay-3s  fadeInUp animated">
          {props.data.button}
        </button>
      </div>
    </div>
  );
};

export default Midle1;
