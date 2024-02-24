import React, { Component } from "react";
import API, { URL_PATH } from "../../../Common/API";
import HeaderComponent from "../../../Components/HeaderComponentMLP";
import Order from "../../Customer/customer_dashboard/components/order";
import routes from "../../../routes";
import { Link } from "react-router-dom";

class ListOrderHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      dragOver: false,
      uploading: false,
      pending_orders: [],
      recent_orders: [],
      total_quotation_done: 0,
      total_time_saved_in_minutes: 0,
      quote_to_order_conversion: {},
      order_completion_status: {},
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const result = await API.get(URL_PATH.getOrdersData);
    const { status, data } = result.data;

    if (status === "success") {
      const {
        pending_orders,
        recent_orders,
        total_quotation_done,
        total_time_saved_in_minutes,
        quote_to_order_conversion,
        order_completion_status,
      } = data;

      this.setState({
        pending_orders,
        // recent_orders,
        // total_quotation_done,
        // total_time_saved_in_minutes,
        // quote_to_order_conversion,
        // order_completion_status,
      });
    }
  };

  LeftSection = () => {
    console.log("----------------------------------------------------   1");
    const {
      pending_orders,
      recent_orders,
      total_quotation_done,
      total_time_saved_in_minutes,
      quote_to_order_conversion,
      order_completion_status,
    } = this.state;

    console.log("----------------------------------------------------   2");

    return (
      <div className="container-fluid align-items-center justify-content-center">
        {pending_orders.map((item, index) => {
          console.log(
            "----------------------------------------------------   3"
          );

          return (
            <Order
              item={item}
              index={index}
              configurePart={(id) => {
                this.props.history.push(routes.customer.configurePart(id));
              }}
              // OrderPart={(id) => {
              //   // this.props.history.push(routes.customer.orderPart(id))
              // }}
            />
          );
        })}

        {recent_orders.length == 0 && pending_orders.length == 0 && (
          <div className="oh-div">
            <img src={"/assets/Image 36.png"} alt="" className="img-fluid" />
            <p className="d-text">
              Oh! that's shocking ,we haven't found a order from you, yet
            </p>
            <p className="wait-text">what's are you waiting for</p>
            <p className="order-text">start instant quote</p>
          </div>
        )}
      </div>
    );
  };

  render() {
    return (
      <div
        className="container-fluid align-items-center justify-content-center"
        style={{
          backgroundColor: "#f8f9fa",
        }}
      >
        <HeaderComponent section="customer" theme="light" />

        <div className="d-flex flex-row align-items-center">
          <h1 className="mx-3">Order history</h1>

          <Link to={routes.customer.dashboard}>
            <div className="btn btn-primary ml-auto">Order another part</div>
          </Link>
        </div>
        <this.LeftSection />
      </div>
    );
  }
}

export default ListOrderHistory;
