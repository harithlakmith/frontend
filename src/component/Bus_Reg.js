import "bootstrap/dist/css/bootstrap.min.css";
//import "./Bus_Reg.css";
//import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import axios from "axios";
import { Redirect, withRouter } from "react-router-dom";
import authHeader from "./../services/auth-header";

class Bus_Reg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      busNo: "",
      email: "",
      password: "",
      seatNo: 0,
      dName: "",
      dNo: 0,
      cName: "",
      cNo: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.BusReg = this.BusReg.bind(this);
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  BusReg = () => {
    axios
      .post(
        window.$API_SERVER + "api/Accounts/BusControllerRegister",
        {
          BusNo: this.state.busNo,
          DriverName: this.state.dName,
          DriverNo: parseInt(this.state.dNo),
          CondName: this.state.cName,
          CondNo: parseInt(this.state.cNo),
          MaxSeats: parseInt(this.state.seatNo),
          Email: this.state.email,
          Password: this.state.password,
          ConfirmPassword: this.state.password,
        },
        { headers: authHeader() }
      )
      .then((json) => {
        console.log(json.data);
      });
  };

  render() {
    if (JSON.parse(localStorage.getItem("role")) != "Administrator") {
      return <Redirect to={"/sign-in"} />;
    }
    return (
      <div class=" container  p-3 mt-5 ">
        <div class="card   p-1 mt-5">
          <div class="card-body   ">
            <h1 class="card-title p-3 text-light text-center headgd ">
              <i class="fas fa-bus"></i>&nbsp;&nbsp;<u>Bus Registration Form</u>{" "}
            </h1>
            <br></br>
            <div class="card-deck ">
              <div class="card bg-light border-dark   ">
                <div class="card-header h5">
                  <i class="fas fa-bus-alt"></i> &nbsp;&nbsp;Bus Details
                </div>

                <div class="card-body mt-2 "></div>
                <form>
                  <div class="form-inline ">
                    <p class="col-lg-4 col-form-label; h5">Bus Number </p>
                    <p class=" h5">:</p>
                    <div class="col-lg-6">
                      <input
                        class="form"
                        type="text"
                        name="busNo"
                        placeholder="add bus number"
                        onChange={this.handleChange}
                        value={this.state.busNo}
                        required="required"
                      />
                    </div>
                  </div>
                  <br></br>
                  <div class="form-inline">
                    <p class="col-lg-4 col-form-label; h5">Add E-Mail </p>
                    <p class=" h5">:</p>
                    <div class="col-lg-6">
                      <input
                        class="form"
                        type="text"
                        name="email"
                        placeholder="add your email"
                        onChange={this.handleChange}
                        value={this.state.email}
                        required="required"
                      />
                    </div>
                  </div>
                  <br></br>
                  <div class="form-inline">
                    <p class="col-lg-4 col-form-label; h5">Password </p>
                    <p class=" h5">:</p>
                    <div class="col-lg-6">
                      <input
                        class="form"
                        type="text"
                        name="password"
                        placeholder="add your password"
                        onChange={this.handleChange}
                        value={this.state.password}
                        required="required"
                      />
                    </div>
                  </div>
                  <br></br>
                  <div class="form-inline">
                    <p class="col-lg-4 col-form-label; h5">No of seats </p>
                    <p class=" h5">:</p>
                    <div class="col-lg-6">
                      <input
                        type="text"
                        pattern="[0-9]*"
                        min="1"
                        max="54"
                        name="seatNo"
                        onChange={this.handleChange}
                        value={this.state.seatNo}
                        required="required"
                      />
                    </div>
                  </div>
                  <br></br>
                  <br></br>
                  <div class="form-inline p-3">
                    <button
                      type="button"
                      onClick={this.BusReg}
                      class="btn btn-primary btn-lg"
                    >
                      REGISTER
                    </button>
                  </div>
                </form>
              </div>

              <div class="card bg-light text-dark w-50 border-dark ">
                <div class="card bg-light text-dark  ">
                  <div class="card-header h5">
                    <i class="fas fa-user"></i> &nbsp;&nbsp;Driver
                  </div>
                  <div class="card-body ">
                    <form>
                      <div class="form-inline ">
                        <p class="col-lg-4 col-form-label; h5">Name </p>
                        <p class=" h5">:</p>
                        <div class="col-lg-6">
                          <input
                            class="form"
                            type="text"
                            name="dName"
                            onChange={this.handleChange}
                            value={this.state.dName}
                          />
                        </div>
                      </div>
                      <br></br>
                      <div class="form-inline ">
                        <p class="col-lg-4 col-form-label; h5">Register No.</p>
                        <p class=" h5">:</p>
                        <div class="col-lg-6">
                          <input
                            class="form"
                            type="text"
                            pattern="[0-9]*"
                            name="dNo"
                            onChange={this.handleChange}
                            value={this.state.dNo}
                            required="required"
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

                <div class="card bg-light text-dark  ">
                  <div class="card-header h5">
                    <i class="fas fa-user"></i> &nbsp;&nbsp;Conductor
                  </div>
                  <div class="card-body ">
                    <form>
                      <div class="form-inline ">
                        <p class="col-lg-4 col-form-label; h5">Name </p>
                        <p class=" h5">:</p>
                        <div class="col-lg-6">
                          <input
                            class="form"
                            type="text"
                            name="cName"
                            onChange={this.handleChange}
                            value={this.state.cName}
                          />
                        </div>
                      </div>
                      <br></br>
                      <div class="form-inline ">
                        <p class="col-lg-4 col-form-label; h5">Register No.</p>
                        <p class=" h5">:</p>
                        <div class="col-lg-6">
                          <input
                            class="form"
                            type="text"
                            pattern="[0-9]*"
                            name="cNo"
                            onChange={this.handleChange}
                            value={this.state.cNo}
                            required="required"
                          />
                        </div>
                      </div>
                    </form>
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

export default Bus_Reg;
