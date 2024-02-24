import React, { Component } from "react";
import API, { URL_PATH, setAuthToken } from "../../Common/API";

// import required icon from @mui/icons-material instaed of fontawesome

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total_part_count: 0,
      total_customer_count: 0,
      total_manufacturer_count: 0,
      total_msaas_count: 0,
      total_part_processed: 0,
      total_part_under_process: 0,
      total_part_manual_quoted: 0,
      total_part_auto_quoted: 0,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const res = await API.get(URL_PATH.dashboard);
    const { status, data, message } = res.data;

    if (status === "success") {
      // "total_part_count": 39,
      // "total_customer_count": 2,
      // "total_manufacturer_count": 2,
      // "total_msaas_count": 3,
      // "total_part_processed": 23,
      // "total_part_under_process": 8,
      // "total_part_manual_quoted": 8,
      // "total_part_auto_quoted": 31

      const {
        total_part_count,
        total_customer_count,
        total_manufacturer_count,
        total_msaas_count,
        total_part_processed,
        total_part_under_process,
        total_part_manual_quoted,
        total_part_auto_quoted,
      } = data;

      this.setState({
        total_part_count,
        total_customer_count,
        total_manufacturer_count,
        total_msaas_count,
        total_part_processed,
        total_part_under_process,
        total_part_manual_quoted,
        total_part_auto_quoted,
      });
    } else {
      //   alert(message);
    }
  };

  render() {
    const {
      total_part_count,
      total_customer_count,
      total_manufacturer_count,
      total_msaas_count,
      total_part_processed,
      total_part_under_process,
      total_part_manual_quoted,
      total_part_auto_quoted,
    } = this.state;

    return (
      <div className="container-fluid">
        <div className="row">



            {/* total_part_count */}
          <div className="col-xl-3 col-sm-6 mb-3">
            <div className="card text-white bg-primary o-hidden h-100">
              <div className="card-body">
                <i class="fa fa-cubes"></i>

                <div className="mr-5">{total_part_count} Total Parts!</div>
              </div>
              <a className="card-footer text-white clearfix small z-1" href="#">
                <span className="float-left">View Details</span>
                <span className="float-right">
                  <i className="fa fa-angle-right"></i>
                </span>
              </a>
            </div>
          </div>

            {/* total_customer_count */}
          <div className="col-xl-3 col-sm-6 mb-3">
            <div className="card text-white bg-primary o-hidden h-100">
              <div className="card-body">
                <i class="fa fa-user"></i>

                <div className="mr-5">
                  {total_customer_count} Total Customers!
                </div>
              </div>
              <a className="card-footer text-white clearfix small z-1" href="#">
                <span className="float-left">View Details</span>
                <span className="float-right">
                  <i className="fa fa-angle-right"></i>
                </span>
              </a>
            </div>
          </div>

            {/* total_manufacturer_count */}
          <div className="col-xl-3 col-sm-6 mb-3">
            <div className="card text-white bg-primary o-hidden h-100">
              <div className="card-body">
                <i class="fa fa-industry"></i>
                <div className="mr-5">
                  {total_manufacturer_count} Total Manufacturers!
                </div>
              </div>
              <a className="card-footer text-white clearfix small z-1" href="#">
                <span className="float-left">View Details</span>
                <span className="float-right">
                  <i className="fa fa-angle-right"></i>
                </span>
              </a>
            </div>
          </div>



            {/* total_msaas_count */}
          <div className="col-xl-3 col-sm-6 mb-3">
            <div className="card text-white bg-primary o-hidden h-100">
              <div className="card-body">
                <i class="fa fa-users"></i>
                <div className="mr-5">
                  {total_msaas_count} Total Msaas Users!
                </div>
              </div>
              <a className="card-footer text-white clearfix small z-1" href="#">
                <span className="float-left">View Details</span>
                <span className="float-right">
                  <i className="fa fa-angle-right"></i>
                </span>
              </a>
            </div>
          </div>

          {/* total_part_processed */}

          <div className="col-xl-3 col-sm-6 mb-3">
            <div className="card text-white bg-primary o-hidden h-100">
              <div className="card-body">
                <i class="fa fa-cubes"></i>
                <div className="mr-5">
                  {total_part_processed} Total Parts Processed!
                </div>
              </div>
              <a className="card-footer text-white clearfix small z-1" href="#">
                <span className="float-left">View Details</span>
                <span className="float-right">
                  <i className="fa fa-angle-right"></i>
                </span>
              </a>
            </div>
          </div>

          {/* total_part_under_process */}
          <div className="col-xl-3 col-sm-6 mb-3">
            <div className="card text-white bg-primary o-hidden h-100">
              <div className="card-body">
                <i class="fa fa-cubes"></i>
                <div className="mr-5">
                  {total_part_under_process} Total Parts Under Processed!
                </div>
              </div>
              <a className="card-footer text-white clearfix small z-1" href="#">
                <span className="float-left">View Details</span>
                <span className="float-right">
                  <i className="fa fa-angle-right"></i>
                </span>
              </a>
            </div>
          </div>

          {/* total_part_manual_quoted */}
          <div className="col-xl-3 col-sm-6 mb-3">
            <div className="card text-white bg-primary o-hidden h-100">
              <div className="card-body">
                <i class="fa fa-cubes"></i>
                <div className="mr-5">
                  {total_part_manual_quoted} Total Parts manual Quoted!
                </div>
              </div>
              <a className="card-footer text-white clearfix small z-1" href="#">
                <span className="float-left">View Details</span>
                <span className="float-right">
                  <i className="fa fa-angle-right"></i>
                </span>
              </a>
            </div>
          </div>

          {/* total_part_auto_quoted */}

          <div className="col-xl-3 col-sm-6 mb-3">
            <div className="card text-white bg-primary o-hidden h-100">
              <div className="card-body">
                <i class="fa fa-cubes"></i>
                <div className="mr-5">
                  {total_part_auto_quoted} Total Parts Auto Processed!
                </div>
              </div>
              <a className="card-footer text-white clearfix small z-1" href="#">
                <span className="float-left">View Details</span>
                <span className="float-right">
                  <i className="fa fa-angle-right"></i>
                </span>
              </a>
            </div>
          </div>

          {/* ----------------------------------------------------------- */}
        </div>
      </div>
    );
  }
}

export default DashBoard;
