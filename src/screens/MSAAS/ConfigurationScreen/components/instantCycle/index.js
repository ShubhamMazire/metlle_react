import React from "react";
import { Row, Col } from "antd";
import "./style.css";

class InstantCycle extends React.Component {
  render() {

    const {machine_cost, material_cost, overhead,cost_after_quantity, cycle_cost_per_pcs, target_load_time, final_cost, targetLeadTimeInDays, cycleTime, workingMinOneDay, maxPartProOneDay,maxPartProtargetDay, quntity, finalMachinCostAfterQuantity, finalMaterialAfterQuantity} = this.props.data;
    if(quntity < maxPartProtargetDay )
    {
      console.log("this.props.data", maxPartProtargetDay );
    }else{
      console.log("this.props.data2", maxPartProtargetDay );
    }

    // console.log("this.props.data", this.props.data);

    return (
      <div className="shaddow m-2 p-3">
        <h3 className="instant-text bold">Instant cycle time & quotation</h3>
        <div className="d-flex flex-row justify-content-between align-items-center">
          <div style={
            {
              display: "flex",
              flex: 1,
              flexDirection: "column",
              paddingRight: "40px",
            }
          }>

              <div className="d-flex flex-row justify-content-between align-items-center">
                <p className="">maching cost -</p>
                <p>{parseFloat(finalMachinCostAfterQuantity).toFixed(2)}</p>
              </div>
              <div className="row-div-mac">
                <p className="">material cost -</p>
                <p>{parseFloat(finalMaterialAfterQuantity).toFixed(2)}</p>
              </div>
              <div className="row-div-mac">
                <p className="">overhead cost -</p>
                <p>{(overhead / quntity).toFixed(2)}</p>
              </div>
              <div className="row-div-mac">
                <p className="">total cost per unit -</p>
                <p>{(finalMachinCostAfterQuantity + finalMaterialAfterQuantity + (overhead / quntity) ).toFixed(2)}</p>
              </div>
              <div className="row-div-mac1">
                <p className="macine-text2 bold">total cost -</p>
                <p className="macine-text2 bold">{final_cost}/-</p>
              </div>
          </div>

          <div style={
            {
              display: "flex",
              flex: 1,
              borderLeft: "1px solid #000",
              flexDirection: "column",
              padding: "20px 20px 20px 20px",
            }
          } >

              <div className="row-div-mac">
                <p className="">cycle cost per pcs -</p>
                <p>{Math.round(cycleTime)}min</p>
              </div>
              <div className="row-div-mac">
                <p className="">target load time -</p>
                <p>{targetLeadTimeInDays} days</p>
              </div>
              {quntity < Math.round(maxPartProOneDay) ? (
                <p className="target-text center">
                  Target lead time can be achieved with selected parameters.
                </p>
              ) : (
                <p className="target-text text-danger center">
                  Target lead time cannot be achieved with selected parameters.
                </p>
              )}
          </div>
        </div>
      </div>
    );
  }
}
export default InstantCycle;
