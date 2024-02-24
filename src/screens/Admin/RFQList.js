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
    const res = await API.get(URL_PATH.rfqList);
    const { status, data, message } = res.data;
    if (status === "success") {
      this.setState({ customerList: data });
    }
  };

  render() {
    return (
      <div style={{ flex: 1 }}>
        <Title>RFQ List</Title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Part</TableCell>
              <TableCell>Requested</TableCell>
              <TableCell>kiri_value</TableCell>
              <TableCell>surface area</TableCell>
              {/* process */}
              <TableCell >process</TableCell>
              {/* note */}
              <TableCell >note</TableCell>
              {/* irmr */}
              <TableCell>IRMR</TableCell>
              {/* bounding_box */}
              <TableCell>bounding box</TableCell>
              {/* volume */}
              <TableCell>volume</TableCell>
              {/* cost_before_quantity */}
              <TableCell>cost before quantity</TableCell>
              
              {/* Actions  */}

              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.customerList.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <img src={assetBaseUrl + row.thumbnail_path} width="100px" />
                </TableCell>
                <TableCell>
                  {moment(row.requested_part_date).format("DD-MM-YYYY")}
                </TableCell>
                <TableCell>{row.kiri_value}</TableCell>
                <TableCell>{row.surface_area}</TableCell>
                <TableCell>{row.process}</TableCell>
                <TableCell>{row.note}</TableCell>
                <TableCell>{row.irmr}</TableCell>
                {/* bounding_box */}
                <TableCell>{row.bounding_box}</TableCell>
                {/* volume */}
                <TableCell>{row.volume}</TableCell>
                {/* cost_before_quantity */}
                <TableCell>{row.cost_before_quantity}</TableCell>

                {/* Actions  */}
                <TableCell align="right">
                  <Link

                    href="#"
                    className="btn btn-primary text-white"
                    onClick={(event) => {
                      event.preventDefault();
                      this.props.history.push("/admin/rfq/" + row.id);
                    }}
                  >
                    Manage
                  </Link>
                </TableCell>


              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default CustomersScreen;
