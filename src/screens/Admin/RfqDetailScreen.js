import React, { Component } from "react";
import API, { URL_PATH, assetBaseUrl, setAuthToken } from "../../Common/API";
import STLViewer from "../../Components/STLViewer";
import moment from "moment";

import translater from "../../Constants/translator.js";
class RfqDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      partDetail: {},
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    console.log(id);

    this.setState({ id: id });

    this.getPartDetail(id);
  }

  getPartDetail = async (id) => {
    const formdata = {
      id: id,
    };

    const res = await API.post(URL_PATH.getQuotationDetails, formdata);

    const { status, messsage, data } = res.data;

    if (status == "success") {
      this.setState({ partDetail: data });
    } else {
      alert(messsage);
    }
  };

  getAvailableWidth = () => {
    // get width for bootstrap conmtiner anbd left side assisgned 7 out of 12

    const width = window.innerWidth;

    // if (width < 768) {
    //   return width - 100;
    // }
    return width * (9 / 12);
  };

  getAvailableHeight = () => {
    const height = window.innerHeight;

    return height * 0.5;
  };

  render() {
    const {
      id = 114,
      p_id = null,
      user_id = 0,
      requested_part_date = "2023-08-26T09=21=14.000Z",
      last_updated_date = null,
      finalized_date = null,
      file_path = "1693041674252.stl",
      thumbnail_path = "thumbnails/1693041674252.png",
      quote_type = "manual_generated",
      status = "manual",
      kiri_value = 2875,
      surface_area = 5029.71,
      irmr = 0.83,
      bounding_box = "[32.05182, 65.0, 5.549999]",
      predicted_cost = null,
      volume = 9602.21,
      bounding_box_volume = 11562.69,
      process = "3d",
      material = "1",
      color = null,
      surface_roughness = 1,
      tolerances = 1,
      finishing = "1",
      threads = "1",
      inspection = "0",
      certificate = null,
      parts_quantity = 1,
      target_price_per_pcs = null,
      sub_grade_material = "1",
      machine_cost = null,
      weight_of_part = null,
      material_cost = 0,
      cost_before_quantity = 60,
      cost_after_quantity = 60,
      overhead = 6,
      profit = 0,
      packing_cost = 0,
      shipping_cost = 0,
      final_cost = 66,
      gst = 11.88,
      sub_total = 77.88,
      post_process = null,
      part_finish = null,
      note = "",
      credit = 0,
      discount = 0,
      infill_percentage = null,
      dfm_comp = null,
      surge = 50,
      absolute_path = "http=//13.233.232.56=8000/uploads/1693041674252.stl",
    } = this.state.partDetail;

    return (
      <div>
        <div className="d-flex justify-content-between align-items-center">
          <h1>RFQ </h1>

          {/* download */}
          <a
            href={assetBaseUrl + file_path}
            download
            className="btn btn-success px-4"
          >
            Download file
          </a>
        </div>

        <STLViewer
          file_path={assetBaseUrl + file_path}
          width={this.getAvailableWidth()}
          height={this.getAvailableHeight()}
        />

        {/* <STLViewer
          width={this.getAvailableWidth()}
          height={this.getAvailableHeight()}
          url={assetBaseUrl + file_path}
          groundColor="white"
          objectColor="#979797"
          skyboxColor="white"
          gridLineColor="white"
          lightColor="white"
          volume={(vol) => this.setState({ volume: vol })}
        /> */}

        {/* show all details in table key value */}
        <table className="table table-bordered">
          <tbody>
            <tr>
              <td>id</td>
              <td>{id}</td>
            </tr>
            {p_id && (
              <tr>
                <td>p_id</td>
                <td>{p_id}</td>
              </tr>
            )}
            {requested_part_date && (
              <tr>
                <td>requested_part_date</td>
                <td>{moment(requested_part_date).format("DD-MM-YYYY")}</td>
              </tr>
            )}
            {last_updated_date && (
              <tr>
                <td>last_updated_date</td>
                <td>{last_updated_date}</td>
              </tr>
            )}
            {finalized_date && (
              <tr>
                <td>finalized_date</td>
                <td>{finalized_date}</td>
              </tr>
            )}
            {file_path && (
              <tr>
                <td>quote_type</td>
                <td>{quote_type}</td>
              </tr>
            )}
            <tr>
              <td>status</td>
              <td>{status}</td>
            </tr>
            <tr>
              <td>kiri_value</td>
              <td>{kiri_value}</td>
            </tr>
            <tr>
              <td>surface_area</td>
              <td>{surface_area}</td>
            </tr>
            <tr>
              <td>irmr</td>
              <td>{irmr}</td>
            </tr>
            <tr>
              <td>bounding_box</td>
              <td>
                {translater("bounding_box", sub_grade_material, bounding_box)}
              </td>
            </tr>
            <tr>
              <td>predicted_cost</td>
              <td>{predicted_cost}</td>
            </tr>
            <tr>
              <td>volume</td>
              <td>{volume}</td>
            </tr>
            <tr>
              <td>bounding_box_volume</td>
              <td>{bounding_box_volume}</td>
            </tr>
            <tr>
              <td>process</td>
              <td>{translater("process", sub_grade_material, process)}</td>
            </tr>
            <tr>
              <td>material</td>
              <td>{translater(process == "3d" ? "material3D" : "material", sub_grade_material, material)}</td>
            </tr>
            <tr>
              <td>color</td>
              <td>{color}</td>
            </tr>
            <tr>
              <td>surface_roughness</td>
              <td>{translater(
        "surface_roughness",
        sub_grade_material,
        surface_roughness
      )}</td>
            </tr>
            <tr>
              <td>tolerances</td>
              <td>{translater("tolerances", sub_grade_material, tolerances)}</td>
            </tr>
            <tr>
              <td>finishing</td>
              <td>{translater("partFinish", sub_grade_material, finishing)}</td>
            </tr>
            <tr>
              <td>threads</td>
              <td>{translater("threads", sub_grade_material, threads)}</td>
            </tr>
            <tr>
              <td>inspection</td>
              <td>{translater("inspection", sub_grade_material, inspection)}</td>
            </tr>
            <tr>
              <td>certificate</td>
              <td>{certificate}</td>
            </tr>
            <tr>
              <td>parts_quantity</td>
              <td>{parts_quantity}</td>
            </tr>
            <tr>
              <td>target_price_per_pcs</td>
              <td>{target_price_per_pcs}</td>
            </tr>
            <tr>
              <td>sub_grade_material</td>
              <td>{sub_grade_material}</td>
            </tr>
            <tr>
              <td>machine_cost</td>
              <td>{machine_cost}</td>
            </tr>
            <tr>
              <td>weight_of_part</td>
              <td>{weight_of_part}</td>
            </tr>
            <tr>
              <td>material_cost</td>
              <td>{material_cost}</td>
            </tr>
            <tr>
              <td>cost_before_quantity</td>
              <td>{cost_before_quantity}</td>
            </tr>
            <tr>
              <td>cost_after_quantity</td>
              <td>{cost_after_quantity}</td>
            </tr>
            <tr>
              <td>overhead</td>
              <td>{overhead}</td>
            </tr>
            <tr>
              <td>profit</td>
              <td>{profit}</td>
            </tr>
            <tr>
              <td>packing_cost</td>
              <td>{packing_cost}</td>
            </tr>
            <tr>
              <td>shipping_cost</td>
              <td>{shipping_cost}</td>
            </tr>
            <tr>
              <td>final_cost</td>
              <td>{final_cost}</td>
            </tr>
            <tr>
              <td>gst</td>
              <td>{gst}</td>
            </tr>
            <tr>
              <td>sub_total</td>
              <td>{sub_total}</td>
            </tr>
            <tr>
              <td>post_process</td>
              <td>{post_process}</td>
            </tr>
            <tr>
              <td>part_finish</td>
              <td>{part_finish}</td>
            </tr>
            <tr>
              <td>note</td>
              <td>{note}</td>
            </tr>
            <tr>
              <td>credit</td>
              <td>{credit}</td>
            </tr>
            <tr>
              <td>discount</td>
              <td>{discount}</td>
            </tr>
            <tr>
              <td>infill_percentage</td>
              <td>{infill_percentage}</td>
            </tr>
            <tr>
              <td>dfm_comp</td>
              <td>{dfm_comp}</td>
            </tr>
            <tr>
              <td>surge</td>
              <td>{surge}</td>
            </tr>
            <tr>
              <td>absolute_path</td>
              <td>{absolute_path}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default RfqDetailScreen;
