import "./App.css";
import React from "react";


import MachineOne from "./components/machineOne";
import Tool from "./components/tool";

import { Box } from "@material-ui/core";
import Grid from '@mui/material/Grid';

import API, { URL_PATH, assetBaseUrl } from "../../../Common/API";


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      data: {},
    };
  }

  componentDidMount() {
    this.getData();
  }




  getData = async () => {
    console.log('test',this.state.machine);
    const res = await API.post(URL_PATH.getCNCCost,
      { id: this.state.id  }
    );

    const { status, message = "", data, processing = true, calcualtions } = res.data;

    if (status == "success")
      this.setState({ data, processing, calcualtions });
    else
      alert(message);
  }

  syncData = async (fd) => {

    const res = await API.post(URL_PATH.getCNCCost,
      { id: this.state.id, ...fd }
    );

    const { status, message = "", data, processing = true, calcualtions } = res.data;

    if (status == "success")
      this.setState({ data, processing, calcualtions });
    else
      alert(message);
  }




  render() {

    const { data } = this.state;

    return (
      <Grid container spacing={2}>
        {/* Left Section */}
        <Grid item xs={6}>
          {/* Your content for the left section */}
          <MachineOne data={data} id={this.state.id} />
        </Grid>

        {/* Right Section */}
        <Grid item xs={6}>
          {/* Your content for the right section */}
          <Tool data={data} syncData={this.syncData} id={this.state.id} />
        </Grid>
      </Grid>

    );
  }
}
export default App;
