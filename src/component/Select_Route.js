import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from 'react'
import axios from "axios";
import { Redirect,withRouter} from "react-router-dom";
import authHeader from "./../services/auth-header";

class Select_Route extends Component {
  constructor(props) {
    super(props);
   
    this.state = {
      busNo: JSON.parse(localStorage.getItem('userInfo')).BusNo,
      route: 0,
      date: undefined,
      time: undefined,
      routes: [],
      Seats: 0,
      test:undefined
    };

    this.handleChange = this.handleChange.bind(this);
    this.SelectRoute = this.SelectRoute.bind(this);
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value  });
  };

  SelectRoute = () => {

    var value = new URLSearchParams(this.props.location.search);
    var s= value.get('s');

    axios
      .post(window.$API_SERVER +"Session", {
        BusNo: this.state.busNo,
        RId: parseInt(this.state.route),
        Date: this.state.date,
        StartTime: this.state.date+'T'+this.state.time+':00',
        Seats: parseInt(s),
      },{ headers: authHeader() }) 
      .then((json) => {
        
      });
  };

  componentDidMount() {
    axios.get(window.$API_SERVER +"Route",{ headers: authHeader() }).then((res) => {
      console.log(res);
      this.setState({
        routes: res.data,
      });
    });
  }

  

  render() {
    if (JSON.parse(localStorage.getItem('role'))!='BusController'){
      return <Redirect to={'/sign-in'} />
    }

    const { routes, busNo } = this.state;
    const routeList = routes.length ? (
      routes.map((route) => {
        return <option value={route.RId}>{route.RNum} : {route.StartHolt}-{route.StopHolt}</option>;
      })
    ) : (
      <div className="center">No Routes available</div>
    );

    return (
      <div class="card bg-light p-3 mt-5">
        <div class="card-body mt-5 ">
          <h1 class="card-title text-light">
            <u>Select Route</u>
          </h1>

          <br></br>

          <div class="card-group card bg-light text-dark mt-4  ">
            <div class="card bg-light text-dark w-50 ">
              <div class="card-body mt-5 ">
                <form>
                  <div class="form-inline ">
                    <p class="col-lg-6 col-form-label; h5">My Bus </p>
                    <p class=" h5">:</p>
                    <div class="col-lg-4">
                      <input
                        type="text"
                        value={busNo}
                       disabled="true"
                      ></input>
                    </div>
                  </div>
                  <br></br>
                  <div class="form-inline  " action="" method="get">
                    <p class="col-lg-6 col-form-label; h5">Route</p>
                    <p class=" h5">:</p>
                    <div class="col-lg-4">
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
                  <br></br>
                  <div class="form-inline ">
                    <button
                      type="button"
                      onClick={this.SelectRoute}
                      class="btn btn-primary btn-lg"
                    >
                      RESERVE THIS SESSION
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div class="card bg-light text-dark w-50 ">
              <div class="card-body mt-5 ">
                <form>
                  <div class="form-inline ">
                    <p class="col-lg-8 col-form-label; h5">Date of Journey </p>
                    <p class=" h5">:</p>

                    <div class="col-lg-3">
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
                    <p class="col-lg-8 col-form-label; h5">
                      Start Time of Your Journey{" "}
                    </p>
                    <p class=" h5">:</p>

                    <div class="col-lg-2">
                      <input
                        type="time"
                        name="time"
                        onChange={this.handleChange}
                        value={this.state.time}
                      ></input>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Select_Route);
