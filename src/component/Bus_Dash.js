import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Redirect, withRouter } from "react-router-dom";
import authHeader from "./../services/auth-header";
import Moment from "moment";

class Bus_Dash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      busInfo: [],
      BusNo: "",
      CondName: "",
      CondNo: "",
      DriverName: "",
      DriverNo: "",
      Email: "",
      MaxSeats: "",
      MySession: [],
      Ticket: [],
    };
  }

  componentDidMount() {
    var Bus = JSON.parse(localStorage.getItem("userInfo"));
    var BusNo = Bus.BusNo;

    axios
      .get(window.$API_SERVER + "BusInfo/" + BusNo, { headers: authHeader() })
      .then((res) => {
        this.setState({
          BusNo: res.data.BusNo,
          busInfo: res.data,
          CondName: res.data.CondName,
          CondNo: res.data.CondNo,
          DriverName: res.data.DriverName,
          DriverNo: res.data.CondNo,
          Email: res.data.Email,
          MaxSeats: res.data.MaxSeats,
        });
      });

    axios
      .get(window.$API_SERVER + "Session/BusNo/" + BusNo, {
        headers: authHeader(),
      })
      .then((res) => {
        this.setState({
          MySession: res.data,
        });
      });
  }
  render() {
    if (JSON.parse(localStorage.getItem("role")) != "BusController") {
      return <Redirect to={"/sign-in"} />;
    }

    const {
      BusNo,
      CondName,
      CondNo,
      DriverName,
      DriverNo,
      Email,
      MaxSeats,
      MySession,
    } = this.state;

    var s = "/select-route?s=" + MaxSeats;

    const seslist = MySession.length ? (
      MySession.map((ses) => {
        console.clear();
        const dte = new Date(ses.Date);
        const date = Moment(dte.toLocaleString()).format("YYYY-MM-DD");
        const today = Moment(Date().toLocaleString()).format("YYYY-MM-DD");
        var t = "/ticket-session?sid=" + ses.SId;

        let session = "";
        if (today == date) {
          session = (
            <div class="card alert-info text-info p-3 m-3">
              <h3 class="">
                {ses.RNum}&nbsp;&nbsp;{ses.Start} - {ses.Stop}
              </h3>
              <div class="row">
                <div class="col-lg-7">
                  <h5>On: {Moment(ses.Date).format("YYYY-MM-DD")}</h5>
                  <h5>At: {Moment(ses.StartTime).format("LT")}</h5>
                </div>
                <div class="col-lg-4 text-right">
                  <a href={t} class="btn btn-info">
                    Tickets
                  </a>
                </div>
              </div>
            </div>
          );
        }
        return <div class="row">{session}</div>;
      })
    ) : (
      <p>No sessions availble at today</p>
    );
    return (
      <div class="card bg-light p-3 mt-3">
        <div class="card">
          <div class="card-body">
            <div class="mt-5 p-5">
              <h2 class="card-title card-header px-3 headgd  text-light">
                Bus Dashboard
              </h2>
              <br></br>

              <div class="card-deck">
                <div class="card bg-light text-dark p-5">
                  <img
                    src="images/bus.jpg"
                    class="card-img-top"
                    alt="BUS"
                  ></img>
                  <div class="card-body ">
                    <div class="form-group row">
                      <div class="col-lg-4 col-6 ">
                        <label>Mybus</label>
                      </div>
                      <div class="col-lg-5 col-6">{BusNo}</div>
                    </div>
                    <div class="form-group row">
                      <div class="col-lg-4 col-6 ">
                        <label>Email</label>
                      </div>

                      <div class="col-lg-5 col-6">{Email}</div>
                    </div>
                    <div class="form-group row">
                      <div class="col-lg-4 col-6">
                        <label>Seats</label>
                      </div>
                      <div class="col-lg-5 col-6">{MaxSeats}</div>
                    </div>

                    <div class="form-group row">
                      <div class="col-lg-4 col-6">
                        <label>Driver Number</label>
                      </div>
                      <div class="col-lg-5 col-6">{DriverNo}</div>
                    </div>
                    <div class="form-group row">
                      <div class="col-lg-4 col-6 ">
                        <label>Driver Name</label>
                      </div>
                      <div class="col-lg-5 col-6">{DriverName}</div>
                    </div>
                    <div class="form-group row">
                      <div class="col-lg-4 col-6 ">
                        <label>Conducter Number</label>
                      </div>

                      <div class="col-lg-5 col-6">{CondNo}</div>
                    </div>
                    <div class="form-group row">
                      <div class="col-lg-4 col-6  ">
                        <label>Conducter Name</label>
                      </div>
                      <div class="col-lg-5 col-6">{CondName}</div>
                    </div>

                    <br></br>
                    <a href={s} class="btn btn-primary btn-lg">
                      Add Session
                    </a>
                  </div>
                </div>
                <div class="card bg-light text-dark">
                  <div class="card-body">
                    <h3 class="card-title">
                      <u>My Sessions </u>
                    </h3>

                    <div class="card bg-light text-dark ">{seslist}</div>
                    <br></br>

                    <a
                      href={"/session-list"}
                      class="btn btn-primary btn-lg center"
                    >
                      More
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Bus_Dash);
