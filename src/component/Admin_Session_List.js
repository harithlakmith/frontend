import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import axios from "axios";
import { Redirect, withRouter } from "react-router-dom";
import authHeader from "./../services/auth-header";
import Moment from "moment";
import {
  MDBDataTableV5,
  MDBIcon,
  MDBBtn,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from "mdbreact";

class Admin_Session_List extends Component {
  state = {
    sessions: [],
  };
  componentDidMount() {
    var value = new URLSearchParams(this.props.location.search);
    //var SId = value.get("SId");

    axios
      .get(window.$API_SERVER + "Session", { headers: authHeader() })
      .then((res) => {
        this.setState({
          sessions: res.data,
        });
      });
  }

  render() {
    if (JSON.parse(localStorage.getItem("role")) != "Administrator") {
      return <Redirect to={"/sign-in"} />;
    }
    const { sessions } = this.state;

    const data = {
      columns: [
        {
          label: "Session Id",
          field: "SId",

          width: 100,
        },
        {
          label: "Bus Number",
          field: "Busno",

          width: 100,
        },
        {
          label: "Route",
          field: "RId",

          width: 100,
        },
        {
          label: "Date",
          field: "Date",

          width: 100,
        },
        {
          label: "Start Time",
          field: "Starts",

          width: 100,
        },
        {
          label: "Seats",
          field: "Seats",

          width: 100,
        },
      ],
      rows: sessions.map((session) => {
        return {
          SId: session.SId,
          Busno: session.BusNo,
          RId: session.RId,
          Date: Moment(session.StartTime).format("YYYY-MM-DD"),
          Starts: Moment(session.StartTime).format("hh:mm A"),
          Seats: session.Seats,
        };
      }),
    };

    return (
      <div>
        <div class="card">
          <div class="card-body">
            <div class="mt-5 p-5">
              <h2 class="card-title card-header px-3 headgd  text-light text-center">
                <i class="fas fa-list-ol"></i> &nbsp;&nbsp;Session Information
                List
                <br></br>
              </h2>
              <br></br>
              <div class="row">
                <div class="col-lg p-3">
                  <MDBDataTableV5
                    responsive
                    hover
                    striped
                    bordered
                    entriesOptions={[5, 10, 15]}
                    entries={10}
                    info={false}
                    data={data}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Admin_Session_List);
