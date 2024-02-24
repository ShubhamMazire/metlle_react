import React, { Component } from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";

import API, { URL_PATH, setAuthToken } from "../../Common/API";

function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(
    0,
    "16 Mar, 2023",
    "Elvis Presley",
    "Tupelo, MS",
    "VISA ⠀•••• 3719",
    312.44
  ),
  createData(
    1,
    "16 Mar, 2023",
    "Paul McCartney",
    "London, UK",
    "VISA ⠀•••• 2574",
    866.99
  ),
  createData(
    2,
    "16 Mar, 2023",
    "Tom Scholz",
    "Boston, MA",
    "MC ⠀•••• 1253",
    100.81
  ),
  createData(
    3,
    "16 Mar, 2023",
    "Michael Jackson",
    "Gary, IN",
    "AMEX ⠀•••• 2000",
    654.39
  ),
  createData(
    4,
    "15 Mar, 2023",
    "Bruce Springsteen",
    "Long Branch, NJ",
    "VISA ⠀•••• 5919",
    212.79
  ),
];


class ManufacturersScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerList:[],
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {

    const res=await API.get(URL_PATH.msaasUserList);
    const {status,data,message}=res.data;
    if(status==="success"){
      this.setState({customerList:data});
    }
  };

  render() {
    return (
      <div style={{ flex: 1 }}>
        <Title>MSAAS Users</Title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Contact number</TableCell>
              <TableCell align="right">Pincode</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.customerList.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.user_full_name}</TableCell>
                <TableCell>{row.user_email_id}</TableCell>
                <TableCell>{row.contact_number}</TableCell>
                <TableCell align="right">{row.pincode}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default ManufacturersScreen;
