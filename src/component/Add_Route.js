import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import axios from "axios";
import { Redirect, withRouter } from "react-router-dom";
import authHeader from "./../services/auth-header";

class Add_Route extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      RNum: "",
      startAt: "",
      startHoltId: 0,
      stopAt: "",
      stopHoltId: 0,
      fullTime: 0,
      fullPrice: 0,
      fullDistance: 0,
      postRoute: 0,
      halt: "",
      haltId: "",
      price: "",
      time: "",
      dist: "",
      nextHaltId: 0,
      halts: [],
      flag: false,
      loading: false,
      message: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.AddRoute = this.AddRoute.bind(this);
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  AddRoute = () => {
    //event.preventDefault();

    axios
      .post(
        window.$API_SERVER + "Route",
        {
          StartHoltId: 1,
          StartHolt: this.state.startAt,
          StopHoltId: 10,
          StopHolt: this.state.stopAt,
          Duration: parseInt(this.state.fullTime),
          Distance: parseInt(this.state.fullDistance),
          RNum: this.state.RNum,
        },
        { headers: authHeader() }
      )
      .then((res) => {
        this.setState({
          postRoute: res.data.RId,
        });
        this.haltListRefresh();
      });
  };

  AddRouteRow = () => {
    //event.preventDefault();

    axios
      .post(
        window.$API_SERVER + "RouteInfo",
        {
          RId: parseInt(this.state.postRoute),
          HoltName: this.state.halt,
          HoltId: parseInt(this.state.nextHaltId) + 1,
          Price: parseInt(this.state.price),
          Time: parseFloat(this.state.time),
          Distance: parseInt(this.state.dist),
        },
        { headers: authHeader() }
      )
      .then((res) => {
        this.setState({
          nextHaltId: res.data.HoltId,
          halt: "",
          time: "",
          price: "",
          dist: "",
        });
        this.haltListRefresh();
      });
  };

  haltListRefresh() {
    axios
      .get(window.$API_SERVER + "RouteInfo/" + this.state.postRoute, {
        headers: authHeader(),
      })
      .then(
        (res) => {
          this.setState({
            halts: res.data,
            flag: true,
          });
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage,
            flag: false,
          });
        }
      );
  }

  componentDidMount() {
    this.haltListRefresh();
  }

  render() {
    if (JSON.parse(localStorage.getItem("role")) != "Administrator") {
      return <Redirect to={"/sign-in"} />;
    }

    const { halts, flag } = this.state;
    const haltList = halts.length ? (
      halts.map((halt) => {
        this.state.nextHaltId = halt.HoltId;
        return (
          <tr>
            <td>{halt.HoltName}</td>
            <td>{halt.Price}</td>
            <td>{halt.Time}</td>
            <td>{halt.Distance}</td>
          </tr>
        );
      })
    ) : (
      <div className="center">No Halts available</div>
    );

    return (
      <div>
        <div class=" container  p-5 mt-5 ">
          <div class="card headgd   p-3 mt-5">
            <div class="card-body   ">
              <h1 class="card-title text-light ">
                <u>Add New Route</u>
              </h1>
              <h5 class=" text-light ">
                Please fill in this form to create bus routes!
              </h5>
              <br></br>
              <br></br>

              <div class="card-deck ">
                <div class="card bg-light   ">
                  <div class="card-body mt-2 ">
                    <form>
                      <div class="form-inline ">
                        <p class="col-lg-4 col-form-label; h5 ">Route No </p>
                        <p class=" h5 ">: </p>
                        <p class="col-lg-6">
                          <input
                            type="text"
                            class="form-control"
                            name="RNum"
                            placeholder="RouteNo"
                            onChange={this.handleChange}
                            value={this.state.RNum}
                            required="required"
                          />
                        </p>
                      </div>

                      <br></br>
                      <div class="form-inline ">
                        <p class="col-lg-4 col-form-label; h5 ">Start At </p>
                        <p class=" h5 ">: </p>
                        <p class="col-lg-6">
                          <input
                            type="text"
                            class="form-control"
                            name="startAt"
                            placeholder="Start At"
                            onChange={this.handleChange}
                            value={this.state.startAt}
                            required="required"
                          />
                        </p>
                      </div>
                      <br></br>
                      <div class="form-inline ">
                        <p class="col-lg-4 col-form-label; h5 ">Full Time </p>
                        <p class="h5 ">: </p>
                        <p class="col-lg-6">
                          <input
                            type="text"
                            pattern="[0-9]*"
                            class="form-control"
                            name="fullTime"
                            placeholder="Full Time"
                            onChange={this.handleChange}
                            value={this.state.fullTime}
                            required="required"
                          />
                        </p>
                      </div>
                      <br></br>
                      <div class="form-inline ">
                        <p class="col-lg-4 col-form-label; h5 ">Full price </p>
                        <p class=" h5 ">: </p>
                        <p class="col-lg-6">
                          <input
                            type="text"
                            pattern="[0-9]*"
                            class="form-control"
                            name="fullPrice"
                            placeholder="Full Price"
                            onChange={this.handleChange}
                            value={this.state.fullPrice}
                            required="required"
                          />
                        </p>
                      </div>
                    </form>
                    <br></br>
                    <br></br>
                    <div class="col-lg-6 text-dark">
                      <button
                        type="submit"
                        onClick={this.AddRoute}
                        class="btn btn-primary btn-lg"
                        hidden={flag}
                      >
                        Register route
                      </button>
                    </div>
                  </div>
                </div>

                <div class="card bg-light text-dark w-50 border-light ">
                  <br></br>
                  <br></br>

                  <hr></hr>
                  <div class="card-body ">
                    <form>
                      <div class="form-inline ">
                        <p class="col-lg-4 col-form-label; h5">Stop At </p>
                        <p class=" h5">:</p>
                        <div class="col-lg-6">
                          <input
                            type="text"
                            class="form-control"
                            name="stopAt"
                            placeholder="Stop At"
                            onChange={this.handleChange}
                            value={this.state.stopAt}
                            required="required"
                          />
                        </div>
                      </div>
                      <br></br>
                      <div class="form-inline ">
                        <p class="col-lg-4 col-form-label; h5">
                          Full Distance{" "}
                        </p>
                        <p class=" h5">:</p>
                        <div class="col-lg-6">
                          <input
                            type="text"
                            pattern="[0-9]*"
                            class="form-control"
                            name="fullDistance"
                            placeholder="Full Distance"
                            onChange={this.handleChange}
                            value={this.state.fullDistance}
                            required="required"
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <br></br>

              <hr />

              <div class="form-group">
                <div class="row">
                  <div class="col"></div>
                </div>
                <div class="row">
                  <div class="col"></div>
                </div>
                <div class="row">
                  <div class="col"></div>
                </div>
              </div>

              {flag ? (
                <div class="card bg-light   ">
                  <div class="row">
                    <div class="col-lg-12">
                      <table class="table table-hover">
                        <thead>
                          <tr>
                            <th scope="col">Halt</th>
                            <th scope="col">Price</th>
                            <th scope="col">Time</th>
                            <th scope="col">Distance</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {haltList}
                          <tr>
                            <td>
                              <input
                                class="form-control"
                                name="halt"
                                type="text"
                                onChange={this.handleChange}
                              ></input>
                            </td>
                            <td>
                              <input
                                class="form-control"
                                name="price"
                                type="text"
                                onChange={this.handleChange}
                              ></input>
                            </td>
                            <td>
                              <input
                                class="form-control"
                                name="time"
                                type="text"
                                onChange={this.handleChange}
                              ></input>
                            </td>
                            <td>
                              <input
                                class="form-control"
                                name="dist"
                                type="text"
                                onChange={this.handleChange}
                              ></input>
                            </td>
                            <td>
                              <button
                                type="submit"
                                onClick={this.AddRouteRow}
                                class="btn btn-primary btn-sm"
                              >
                                Add
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : (
                <p></p>
              )}

              <br />
              <br />
              <br />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Add_Route;
