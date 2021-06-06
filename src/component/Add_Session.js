import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import axios from "axios";
import { Redirect, withRouter } from "react-router-dom";
import authHeader from "./../services/auth-header";

class Add_Session extends Component {
  constructor(props) {
    super(props);

    this.state = {
      busNo: 0,
      busNos: [],
      route: 0,
      date: undefined,
      time: undefined,
      routes: [],
      Seats: 0,
      test: undefined,
    };

    this.handleChange = this.handleChange.bind(this);
    this.SelectRoute = this.SelectRoute.bind(this);
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  SelectRoute = () => {
    var value = new URLSearchParams(this.props.location.search);
    var s = value.get("s");

    axios
      .post(
        window.$API_SERVER + "Session",
        {
          BusNo: this.state.busNo,
          RId: parseInt(this.state.route),
          Date: this.state.date,
          StartTime: this.state.date + "T" + this.state.time + ":00",
          Seats: parseInt(s),
        },
        { headers: authHeader() }
      )
      .then((json) => {});
  };

  componentDidMount() {
    axios
      .get(window.$API_SERVER + "Route", { headers: authHeader() })
      .then((res) => {
        console.log(res);
        this.setState({
          routes: res.data,
        });
      });

    axios
      .get(window.$API_SERVER + "BusInfo", { headers: authHeader() })
      .then((res) => {
        //console.log(res);
        this.setState({
          busNos: res.data,
        });
      });
  }
  render() {
    var d = "/admin-dashboard";

    const { routes, busNo, busNos } = this.state;
    const routeList = routes.length ? (
      routes.map((route) => {
        return (
          <option value={route.RId}>
            {route.RNum} : {route.StartHolt}-{route.StopHolt}
          </option>
        );
      })
    ) : (
      <div className="center">No Routes available</div>
    );

    const busnoList = busNos.length ? (
      busNos.map((busNo) => {
        return <option value={busNo.BusNo}>{busNo.BusNo}</option>;
      })
    ) : (
      <div className="center">No Busses available</div>
    );
    return (
      <div>
        <div class="container p-3 mt-5">
          <div class="card   p-4 mt-5">
            <div class="headgd p-2">
              <h1 class="card-title  text-light text-center ">
                <i class="fas fa-bus"></i>&nbsp;&nbsp;<u>Add Session</u>
              </h1>

              <h5 class="text-light text-center ">
                Please fill in this form to reserve your sessions!
              </h5>
            </div>
            <br></br>
            <br></br>

            <div class="row">
              <div class="col-lg-6">
                <div class="form-inline  " action="" method="get">
                  <div class="col-lg-4 ; h5 ">My Bus </div>
                  <div class="col-lg-1 ; h5 ">: </div>
                  <div class="col-lg-5">
                    <div class="dropdown">
                      <select
                        type="text"
                        pattern="[0-9]*"
                        name="route"
                        onChange={this.handleChange}
                        value={this.state.busNo}
                        required="required"
                      >
                        <option value="">Select Bus</option>
                        {busnoList}
                      </select>
                    </div>
                  </div>
                </div>

                <br></br>
                <div class="form-inline  " action="" method="get">
                  <div class="col-lg-4 ; h5 ">Route </div>
                  <div class="col-lg-1 ; h5 ">: </div>
                  <div class="col-lg-5">
                    <div class="dropdown">
                      <select
                        type="text"
                        pattern="[0-9]*"
                        name="route"
                        onChange={this.handleChange}
                        value={this.state.route}
                        required="required"
                      >
                        <option value="">Select Your Route</option>
                        {routeList}
                      </select>
                    </div>
                  </div>
                </div>
                <br></br>
                <div class="form-inline ">
                  <div class="col-lg-4 ; h5 ">Date of Journey </div>
                  <div class="col-lg-1 ; h5 ">: </div>
                  <div class="col-lg-5">
                    <input
                      type="date"
                      pattern="[0-9]*"
                      name="date"
                      onChange={this.handleChange}
                      value={this.state.date}
                    ></input>
                  </div>
                </div>
                <br></br>
                <div class="form-inline ">
                  <div class="col-lg-4 ; h5 ">Start Time of Your Journey </div>
                  <div class="col-lg-1 ; h5 ">: </div>
                  <div class="col-lg-5">
                    <input
                      type="time"
                      name="time"
                      onChange={this.handleChange}
                      value={this.state.time}
                    ></input>
                  </div>
                </div>
              </div>

              <div class="col-lg-5">
                <img class="img-fluid" src="images/bus.png" alt="bus" />
              </div>
            </div>
            <br></br>
            <div class="col-6">
              <div class="form-group">
                <a
                  type="button"
                  onClick={this.SelectRoute}
                  class="btn btn-primary btn-lg"
                  href={d}
                >
                  RESERVE THIS SESSION
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Add_Session);
