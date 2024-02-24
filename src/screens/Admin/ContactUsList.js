import React, { Component } from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";

import API, { URL_PATH, assetBaseUrl, setAuthToken } from "../../Common/API";
import moment from "moment";

function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

class CustomersScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerList: [],
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const res = await API.get(URL_PATH.contactList);
    const { status, data, message } = res.data;
    if (status === "success") {
      this.setState({ customerList: data });
    }
  };

  render() {
    return (
      <div style={{ flex: 1 }}>
        <Title>Leads</Title>
        <Table size="small">
          <TableHead>
            <TableRow>
            <TableCell>Sr.No.</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Company</TableCell>
              {/* process */}
              <TableCell>Company Size</TableCell>
              {/* note */}
              <TableCell>Topic</TableCell>
              {/* irmr */}
              <TableCell>message</TableCell>
              {/* bounding_box */}
          
              <TableCell>Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.customerList.map((row,index) => (
              <TableRow key={row.id}>
                <TableCell>
                  {index+1}
                </TableCell>
                <TableCell>
                  {row.firstName}
                </TableCell>
                <TableCell>
                  {row.lastName}
                </TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.companyName}</TableCell>
                <TableCell>{row.companySize}</TableCell>
                <TableCell>{row.topic}</TableCell>
                <TableCell>{row.message}</TableCell>
                <TableCell>{moment(row.created_at).format("DD-MM-YYYY")}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default CustomersScreen;
