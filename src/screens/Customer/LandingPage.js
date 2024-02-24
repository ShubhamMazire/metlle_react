import React, { Component } from "react";
import axios from "axios";
import HeaderComponent from "../../Components/HeaderComponentMLP";
import routes from "../../routes";
import LogoNavigation from "../../Components/LogoNavigation";

const Loader = (props) => {
  return (
    <div style={{ backgroundColor: "black", width: "100vw", height: "100vh" }}>
      <div
        style={{
          position: "fixed",
          right: 0,
          bottom: 0,
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <video
          autoPlay
          muted
          loop="loop"
          id="myVideo"
          style={{
            width: "30vw",
            height: "30vh",
            // minWidth: "100%",
            // minHeight: "100%",

            // objectFit:

            // zIndex: -1,
          }}
        >
          <source src="/videos/video.mp4" type="video/mp4" />
        </video>
        <h4
          style={{
            color: "white",
          }}
        >
          analyzing your part...wait for second
        </h4>
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <LogoNavigation dark={true} />
      </div>
    </div>
  );
};

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      dragOver: false,
      uploading: false,
      cost: 0,
    };
  }
  componentDidMount() {}

  dragenter = (e) => {
    e.stopPropagation();
    this.setState({ dragOver: true });
    e.preventDefault();
  };
  dragleave = (e) => {
    e.stopPropagation();
    this.setState({ dragOver: false });
    e.preventDefault();
  };
  dragover = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  drop = (e) => {
    e.stopPropagation();
    e.preventDefault();
    var dt = e.dataTransfer;
    var files = dt.files;
    this.handleFiles(files);
  };
  handleFiles = async (files) => {
    const dropbox = document.getElementById("dropbox");
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      //STEP or STL stl or step
      //check filename ends with .stl or .step
      const filename = file.name;
      const extension = filename.split(".").pop();
      if (
        extension !== "stl" &&
        extension !== "step" &&
        extension !== "STEP" &&
        extension !== "STL"
      ) {
        alert("only stl and step files are allowed");
        return;
      }

      this.setState({ uploading: true });

      var formdata = new FormData();
      formdata.append("file", file);
      const result = await axios.post("/api/customer/upload-model", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const { status, message, data } = result.data;
      // {"IRMR":0.46890364412390606,"area":1933.793701171875,"price":43.54124069213867,"volume":5400.447983412295}

      this.props.history.push({
        pathname: routes.customer.quotation,
        state: {
          data: data,
        },
      });

      break; //only one file at a time
    }
  };

  render() {
    if (this.state.uploading) return <Loader />;

    return (
      <div>
        <HeaderComponent section="man_login" theme="light" />
        <div className="container mt-4">
          <h1>welcome back, Nilesh!</h1>
          <div className="row">
            {/* left part */}
            <div className="col-md-8">
              {/* uplaod drop box */}
              <div
                style={{
                  border: "1px dashed #000000",
                  borderRadius: "10px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  alignContent: "center",
                  padding: "10px 0px 20px 0px",
                }}
              >
                <h5
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  upload a 3D model, to get a new quotation
                </h5>
                {/* drop file box */}
                {this.state.uploading === false && (
                  <div
                    id="dropbox"
                    onDragEnter={this.dragenter}
                    onDragLeave={this.dragleave}
                    onDragOver={this.dragover}
                    onDrop={this.drop}
                    style={{
                      display: "inline-block",
                      margin: "auto",
                      border:
                        "1px dashed " +
                        (this.state.dragOver ? "#000000" : "#cccccc"),
                      margin: "10px",
                      padding: "15px",
                      textAlign: "center",
                      padding: "5px 100px",
                      borderRadius: "10px",
                    }}
                  >
                    <i className="fa fa-cloud-upload" aria-hidden="true"></i>
                    <h5>Drop files here</h5>
                    <h6 className="mb-3">supported formats:STEP,STL</h6>
                    <h5>OR</h5>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <div className="m-1">recent uploads</div>
                      <div className="m-1 text-primary">browse files</div>
                    </div>
                  </div>
                )}
                {/* uploading */}
                {this.state.uploading === true && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      alignContent: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        alignContent: "center",
                      }}
                    >
                      <div className="spinner-border" role="status">
                        {/* <span className="sr-only"></span> */}
                      </div>
                      <div className="ml-2">uploading...</div>
                    </div>
                    <div className="mt-2">
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          this.setState({ uploading: false });
                        }}
                      >
                        cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* selected files cost */}
                {this.state.cost != 0 && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                      justifyContent: "center",
                      alignContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {this.state.files.map((file, index) => {
                      return (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            alignContent: "center",
                            margin: "10px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "center",
                              alignItems: "center",
                              alignContent: "center",
                            }}
                          >
                            <i
                              className="fa fa-file-text-o"
                              aria-hidden="true"
                            ></i>
                            <div className="ml-2">{file.name}</div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "center",
                              alignItems: "center",
                              alignContent: "center",
                            }}
                          >
                            <div className="mr-2">size: {file.size}</div>
                            <div className="mr-2">type: {file.type}</div>
                          </div>
                          {/* cost */}
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "center",
                              alignItems: "center",
                              alignContent: "center",
                            }}
                          >
                            <div className="mr-2">cost: {this.state.cost}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              {/* recent uploads */}
              <div className="d-flex flex-row justify-content-between">
                <h4 className="my-3">we got what you left off,</h4>
                <div className="my-3 text-primary">view all quotes</div>
              </div>
            </div>
            {/* roght part */}
            <div className="col-md-4" style={{ height: "100vh" }}>
              {/* you saved */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  alignContent: "center",
                  borderRadius: "5px",
                  padding: "15px 25px",
                }}
                className="shadow"
              >
                <h4 className="my-3 bold">you saved total</h4>
                <h1>120 minutes</h1>
                <h4>Before actual production start</h4>
              </div>
              {/* quote to order conversion geaph */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  alignContent: "center",
                  borderRadius: "5px",
                  padding: "15px 25px",
                }}
              >
                <h4 className="my-3 bold">quote to order conversion</h4>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    alignContent: "center",
                  }}
                >
                  {/* <Doughnut
                    data={this.state.data}
                    options={{
                      plugins: {
                        legend: {
                          display: false,
                        },
                        tooltip: {
                          enabled: false,
                        },
                      },
                      rotation: -90,
                      circumference: 180,
                      cutout: "60%",
                      maintainAspectRatio: true,
                      responsive: true,
                    }}
                  /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
