import React from "react";
import "./style.css";
import { Col, Row } from "antd";
import Tool from "../../images/Image 34.png";
import Menu from "../../images/Menu 13.png";
import Dollar from "../../images/Attach money 12.png";
import Tick from "../../images/Check circle 12.png";
import Calender from "../../images/Event 12.png";
import Delete from "../../images/Delete 13.png";
import moment from "moment";
import API, { URL_PATH, assetBaseUrl } from "../../../../../Common/API";

const deleteApi = async (id) => {
  const result = await API.post(URL_PATH.deletePart, {
    id,
  });
  const { status, message = "Something went wrong", data } = result.data;

  if (status === "success") {
    // alert("Part deleted successfully");
    window.location.reload();
  } else {
    alert(message);
  }
};

const deletePart = async (id) => {
  // confirm("Are you sure you want to delete this part?");

  const result = window.confirm("Are you sure you want to delete this part?");
  if (result) {
    deleteApi(id);
  }
};

const Order = ({ item, index, configurePart = null }) => {
  const {
    id = 17,
    p_id,
    user_id = 2,
    requested_part_date = "2021-08-31T06:12:13.000Z",
    last_updated_date,
    finalized_date = null,
    file_path = "1691145533261.stl",
    thumbnail_path = "thumbnails/1691145533261.png",
    quote_type = "auto_generated",
    status = "finalized",
    kiri_value = null,
    irmr = 0.46,
    surface_area = 4476.05,
    bounding_box = "[25.0, 25.0, 24.999998]",
    predicted_cost = 61.68,
    volume = 7220.25,
    bounding_box_volume = 15625,
    process = "cnc",
    material = "1",
    surface_roughness = 1,
    tolerances = 1,
    finishing = "1",
    threads = "1",
    inspection = "2",
    parts_quantity = 1,
    target_price_per_pcs = null,
    sub_grade_materials = "1",
    machine_cost = 61.68,
    weight_of_part = 0.02,
    material_cost = 6.82,
    cost_before_quntity = 68.5,
    cost_after_quntity = 68.5,
    overhead = 6.85,
    profit = 0,
    final_cost = 75.35,
  } = item;

  const file_name = p_id ?? file_path;

  const thumbnail = assetBaseUrl + thumbnail_path;

  console.log("item::::::", item);

  return (
    <div>
      <div className="big-box">
        <Row>
          <Col lg={12}>
            <div>
              <div className="flex-center">
                <div>
                  <h4 className="kn-text">{file_name}</h4>
                  <div className="flex-icon-box">
                    <img src={Menu} alt="" className="img-fluid" />{" "}
                    <div className="yy-text">
                      {moment(requested_part_date).format("DDMMYYYY")}{id+" "}
                    </div>
                  </div>
                  <div className="flex-icon-box">
                    <img src={Dollar} alt="" className="img-fluid" />
                    <div className="yy-text">{final_cost}</div>
                  </div>
                  <div className="flex-icon-box">
                    <img src={Tick} alt="" className="img-fluid" />{" "}
                    <div className="yy-text">
                      {quote_type.split("_").join(" ")}
                    </div>
                  </div>
                  <div className="flex-icon-box">
                    <img src={Calender} alt="" className="img-fluid" />{" "}
                    <div className="yy-text">
                      last update -{" "}
                      {moment(
                        last_updated_date != null
                          ? last_updated_date
                          : requested_part_date
                      ).format("DD MM YYYY")}
                    </div>
                  </div>
                </div>
                <div className="colum-div">
                  {/* <button className="btn-order ">order</button> */}
                  <button
                    className="btn2-order "
                    onClick={() => {
                      configurePart && configurePart(id);
                    }}
                  >
                    copy quote to configure
                  </button>
                </div>
              </div>
            </div>
          </Col>
          <Col lg={12}>
            <div>
              <div
                className="del-text"
                style={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  deletePart(id);
                }}
              >
                <img src={Delete} alt="" className="img-fluid" />
                delete part
              </div>
              <div className="flex1-icon-box">
                <div className="part-text">01 part</div>
                <img
                  src={thumbnail}
                  alt=""
                  className="img-fluid"
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Order;
