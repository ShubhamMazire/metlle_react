import React, { Component } from "react";
import { StlViewer } from "react-stl-file-viewer";

class STLViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  getAvailableWidth = () => {
    if (document.getElementById("stl_viewer")) {
      const width = document.getElementById("stl_viewer").offsetWidth;
      return width;
    }
    return document.body.clientWidth / 2;
  };

  getAvailableHeight = () => {
    //    40% height of the screen
    return window.innerHeight * 0.4;
  };

  render() {
    const { file_path } = this.props;
    if (!file_path) {
      // return error message
      return (
        <div className="text-danger">
          Error in STLViewer Component : file_path is not defined
        </div>
      );
    }
    // is it valid html file path

    if (!file_path.endsWith(".stl")) {
      // return error message
      return (
        <div className="text-danger">
          Error in STLViewer Component : file type is not valid
        </div>
      );
    }

    //

    return (
      <div
        id="stl_viewer"
        style={{
          display: "flex",
          height: this.props.height - 50 ?? "480px",
          overflow: "hidden",
        }}
      >
        <iframe
          title="stl viewer"
          src={`https://www.viewstl.com/?embedded=true&url=${this.props.file_path}`}
          width={this.props.width ?? "100%"}
          height={this.props.height ?? "500px"}
          frameBorder="0"
          allowFullScreen
        ></iframe>

        {/* <StlViewer
                    width={this.getAvailableWidth()}
                    height={this.getAvailableHeight()}
                    url={this.props.file_path}
                    groundColor="white"
                    objectColor="red"
                    skyboxColor="black"
                    gridLineColor="black"
                    lightColor="black"
                    volume={(vol) => this.setState({ volume: vol })}
                /> */}
      </div>
    );
  }
}

export default STLViewer;
