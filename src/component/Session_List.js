import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import axios from "axios";
import { Redirect, withRouter } from "react-router-dom";
import authHeader from "./../services/auth-header";
import Moment from "moment";

class Session_List extends Component {
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
    const sessionList = sessions.length ? (
      sessions.map((session) => {
        return (
          <tr>
            <td>{session.SId}</td>
            <td>{session.BusNo}</td>
            <td>{session.RId}</td>
            <td>{Moment(session.StartTime).format("YYYY-MM-DD")}</td>
            <td>{Moment(session.StartTime).format("hh:mm A")}</td>
            <td>{session.Seats}</td>
          </tr>
        );
      })
    ) : (
      <div class="center">No sessions available</div>
    );

    return (
      <div>
        <div class="container p-1">
          <br></br>
          <br></br>
          <div class="mt-5">
            <h1>
              <u>Session Information </u>
            </h1>
            <br></br>
            <div class="row">
              <div class="col-lg">
                <table class="table table-striped table-hover table-bordered">
                  <thead>
                    <tr class="headgd text-white">
                      <th scope="col-lg-3">Session Id</th>
                      <th scope="col-lg-3">Bus Number</th>
                      <th scope="col-lg-3">Route</th>
                      <th scope="col-lg-3">Date</th>
                      <th scope="col-lg-3">Start Time</th>
                      <th scope="col-lg-3">Seats</th>
                    </tr>
                  </thead>
                  <tbody>{sessionList}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Session_List);