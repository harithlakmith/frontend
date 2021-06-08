import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import authHeader from "./../services/auth-header";

class Update_Bus extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.UpdateInfo = this.UpdateInfo.bind(this);
    this.UpdatePassword = this.UpdatePassword.bind(this);

    this.state = {
      BusInfo: [],
      OldPassword: "",
      NewPassword: "",
      Seats: "",
      DriverName: "",
      DriverRegNo: "",
      ConductorName: "",
      ConductorRegNo: "",
      upPassOk: "",
      upInfoOk: "",
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    var Bus = JSON.parse(localStorage.getItem("userInfo"));
    var BusNum = Bus.BusNo;
    axios
      .get(window.$API_SERVER + "BusInfo/" + BusNum, { headers: authHeader() })
      .then((response) => {
        this.setState({
          BusInfo: response.data,
          DriverName: response.data.DriverName,
          DriverRegNo: response.data.DriverNo,
          ConductorName: response.data.CondName,
          ConductorRegNo: response.data.CondNo,
          Seats: response.data.MaxSeats,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  UpdatePassword(e) {
    var Bus = JSON.parse(localStorage.getItem("userInfo"));
    var BusNum = Bus.BusNo;
    debugger;
    e.preventDefault();
    const obj = {
      BusNo: BusNum,
      OldPassword: this.state.OldPassword,
      NewPassword: this.state.NewPassword,
      ConfirmPassword: this.state.ConfirmPassword,
    };
    axios
      .post(window.$API_SERVER + "Accounts/PasswordUpdate", obj, {
        headers: authHeader(),
      })
      .then((res) => {
        this.setState(
          {
            upPassOk: "ok",
          },
          (error) => {
            this.setState({
              upPassOk: "",
            });
          }
        );
      });
    // debugger;
    //this.props.history.push('/Studentlist')
  }

  UpdateInfo(e) {
    var Bus = JSON.parse(localStorage.getItem("userInfo"));
    var BusNum = Bus.BusNo;
    // debugger;
    e.preventDefault();
    const obj = {
      BusNo: BusNum,
      DriverName: this.state.DriverName,
      DriverNo: parseInt(this.state.DriverRegNo),
      CondName: this.state.ConductorName,
      CondNo: parseInt(this.state.ConductorRegNo),
      MaxSeats: parseInt(this.state.Seats),
    };
    axios
      .post(window.$API_SERVER + "Accounts/BusInfoUpdate", obj, {
        headers: authHeader(),
      })
      .then(
        (res) => {
          this.setState({
            upInfoOk: "ok",
          });
        },
        (error) => {
          this.setState({
            upInfoOk: "",
          });
        }
      );
    //  debugger;
    //this.props.history.push('/Businfo')
  }

  render() {
    if (JSON.parse(localStorage.getItem("role")) != "BusController") {
      return <Redirect to={"/sign-in"} />;
    }
    const { BusInfo } = this.state;
    return (
      <div>
        <div class=" d-none d-md-block">
          <div class=" container p-3  mt-5 ">
            <div class="card p-1 mt-5">
              <div class="card-body  ">
                <h1 class="card-title  p-3 text-light headgd text-center">
                  <i class="fas fa-bus"></i>&nbsp;&nbsp;
                  <u>Update Bus Information</u>
                </h1>
                <br></br>
                <div class="card-deck ">
                  <div class="card bg-light text-dark border-dark p-3 col-lg-6 col-mb-6  ">
                    <div class="card-body mt-3">
                      <form>
                        <div class="form-inline ">
                          <p class="col-lg-5 col-mb-4 col-form-label; h5">
                            Old Password&nbsp;:&nbsp;{" "}
                          </p>

                          <div class="col-lg-6">
                            <input
                              class="form"
                              type="password"
                              name="OldPassword"
                              value={this.state.OldPassword}
                              onChange={this.handleChange}
                              placeholder="type your old password"
                              required="required"
                            />
                          </div>
                        </div>
                        <br></br>
                        <div class="form-inline">
                          <p class="col-lg-5 col-mb-4 col-form-label; h5">
                            New Password&nbsp;:&nbsp;{" "}
                          </p>

                          <div class="col-lg-6">
                            <input
                              class="form"
                              type="password"
                              name="NewPassword"
                              value={this.state.NewPassword}
                              onChange={this.handleChange}
                              placeholder="type your new password"
                              required="required"
                            />
                          </div>
                        </div>
                        <br></br>
                        <div class="form-inline">
                          <p class="col-lg-5 col-mb-4 col-form-label; h5">
                            Confirm Password&nbsp;:&nbsp;{" "}
                          </p>

                          <div class="col-lg-6">
                            <input
                              class="form"
                              type="password"
                              name="ConfirmPassword"
                              value={this.state.ConfirmPassword}
                              onChange={this.handleChange}
                              placeholder="renter your new password"
                              required="required"
                            />
                          </div>
                        </div>
                        <hr></hr>
                        <div class="form-inline text-dark p-3">
                          <button
                            type="button"
                            onClick={this.UpdatePassword}
                            class="btn btn-primary btn-lg"
                          >
                            UPDATE PASSWORD
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>

                  <div class="card bg-light text-dark w-50 border-dark col-lg-6 col-mb-6">
                    <div class="card-body ">
                      <div class="form-inline">
                        <p class="col-lg-5 col-mb-4 col-form-label; h5">
                          Number of Seats&nbsp;:&nbsp;
                        </p>

                        <div class="col-lg-6">
                          <input
                            type="text"
                            name="Seats"
                            value={this.state.Seats}
                            onChange={this.handleChange}
                            min="1"
                            max="54"
                            required="required"
                          />
                        </div>
                      </div>
                      <hr></hr>
                      <form>
                        <div class="form-inline ">
                          <p class="row  h3">Driver</p>
                        </div>
                        <br></br>
                        <div class="form-inline ">
                          <p class="col-lg-5 col-mb-4 col-form-label; h5">
                            Name&nbsp;:&nbsp;{" "}
                          </p>

                          <div class="col-lg-6">
                            <input
                              class="form"
                              type="text"
                              name="DriverName"
                              value={this.state.DriverName}
                              onChange={this.handleChange}
                            />
                          </div>
                        </div>
                        <br></br>
                        <div class="form-inline ">
                          <p class="col-lg-5 col-mb-4 col-form-label; h5">
                            Register No.&nbsp;:&nbsp;
                          </p>

                          <div class="col-lg-6">
                            <input
                              class="form"
                              type="text"
                              name="DriverRegNo"
                              value={this.state.DriverRegNo}
                              onChange={this.handleChange}
                            />
                          </div>
                        </div>
                      </form>
                      <hr></hr>
                      <form>
                        <div class="form-inline ">
                          <p class="row  h3">Conductor</p>
                        </div>
                        <br></br>
                        <div class="form-inline ">
                          <p class="col-lg-5 col-mb-4 col-form-label; h5">
                            Name&nbsp;:&nbsp;{" "}
                          </p>

                          <div class="col-lg-6">
                            <input
                              class="form"
                              type="text"
                              name="ConductorName"
                              value={this.state.ConductorName}
                              onChange={this.handleChange}
                            />
                          </div>
                        </div>
                        <br></br>
                        <div class="form-inline ">
                          <p class="col-lg-5 col-mb-4 col-form-label; h5">
                            Register No.&nbsp;:&nbsp;
                          </p>

                          <div class="col-lg-6">
                            <input
                              class="form"
                              type="text"
                              name="ConductorRegNo"
                              value={this.state.ConductorRegNo}
                              onChange={this.handleChange}
                            />
                          </div>
                        </div>
                        <hr></hr>
                        <div class=" text-dark">
                          <button
                            type="button"
                            onClick={this.UpdateInfo}
                            class="btn btn-primary btn-lg"
                          >
                            UPDATE
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class=" d-md-none">
          <div class=" container p-3  mt-5 ">
            <div class="card p-1 mt-5">
              <div class="card-body  ">
                <h1 class="card-title  p-3 text-light headgd text-center">
                  <i class="fas fa-bus"></i>&nbsp;&nbsp;
                  <u>Update Bus Information</u>
                </h1>
                <br></br>

                <div class="card bg-light border-dark col-sm-12  ">
                  <div class="card-body mt-2 "></div>
                  <form>
                    <div class="form-inline ">
                      <p class="col-sm-12 col-form-label; h5">
                        Old Password&nbsp;:&nbsp;{" "}
                      </p>

                      <div class="col-sm-12">
                        <input
                          class="form"
                          type="password"
                          name="OldPassword"
                          value={this.state.OldPassword}
                          onChange={this.handleChange}
                          placeholder="type your old password"
                          required="required"
                        />
                      </div>
                    </div>
                    <br></br>
                    <div class="form-inline">
                      <p class="col-sm-12 col-form-label; h5">
                        New Password&nbsp;:&nbsp;{" "}
                      </p>

                      <div class="col-sm-12">
                        <input
                          class="form"
                          type="password"
                          name="NewPassword"
                          value={this.state.NewPassword}
                          onChange={this.handleChange}
                          placeholder="type your new password"
                          required="required"
                        />
                      </div>
                    </div>
                    <br></br>
                    <div class="form-inline">
                      <p class="col-sm-12 col-form-label; h5">
                        Confirm Password&nbsp;:&nbsp;{" "}
                      </p>

                      <div class="col-sm-12">
                        <input
                          class="form"
                          type="password"
                          name="ConfirmPassword"
                          value={this.state.ConfirmPassword}
                          onChange={this.handleChange}
                          placeholder="renter your new password"
                          required="required"
                        />
                      </div>
                    </div>
                    <hr></hr>
                    <div class="form-inline text-dark p-3">
                      <button
                        type="button"
                        onClick={this.UpdatePassword}
                        class="btn btn-primary btn-lg"
                      >
                        UPDATE PASSWORD
                      </button>
                    </div>
                  </form>
                </div>

                <div class="card bg-light text-dark border-dark ">
                  <div class="card-body ">
                    <br></br>
                    <div class="form-inline">
                      <p class="col-sm-12 col-form-label; h5">
                        Number of Seats&nbsp;:&nbsp;
                      </p>

                      <div class="col-sm-12">
                        <input
                          type="text"
                          name="Seats"
                          value={this.state.Seats}
                          onChange={this.handleChange}
                          min="1"
                          max="54"
                          required="required"
                        />
                      </div>
                    </div>
                    <hr></hr>
                    <form>
                      <div class="form-inline ">
                        <p class="row  h3">&nbsp;&nbsp;Driver</p>
                      </div>
                      <br></br>
                      <div class="form-inline ">
                        <p class="col-sm-12 col-form-label; h5">
                          Name&nbsp;:&nbsp;{" "}
                        </p>

                        <div class="col-sm-12">
                          <input
                            class="form"
                            type="text"
                            name="DriverName"
                            value={this.state.DriverName}
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>
                      <br></br>
                      <div class="form-inline ">
                        <p class="col-sm-12 col-form-label; h5">
                          Register No.&nbsp;:&nbsp;
                        </p>

                        <div class="col-sm-12">
                          <input
                            class="form"
                            type="text"
                            name="DriverRegNo"
                            value={this.state.DriverRegNo}
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>
                    </form>
                    <hr></hr>
                    <form>
                      <div class="form-inline ">
                        <p class="row  h3">&nbsp;&nbsp;Conductor</p>
                      </div>
                      <br></br>
                      <div class="form-inline ">
                        <p class="col-sm-12 col-form-label; h5">
                          Name &nbsp;:&nbsp;
                        </p>

                        <div class="col-sm-12">
                          <input
                            class="form"
                            type="text"
                            name="ConductorName"
                            value={this.state.ConductorName}
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>
                      <br></br>
                      <div class="form-inline ">
                        <p class="col-sm-12 col-form-label; h5">
                          Register No.&nbsp;:&nbsp;
                        </p>

                        <div class="col-sm-12">
                          <input
                            class="form"
                            type="text"
                            name="ConductorRegNo"
                            value={this.state.ConductorRegNo}
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>
                      <hr></hr>
                      <div class=" text-dark">
                        <button
                          type="button"
                          onClick={this.UpdateInfo}
                          class="btn btn-primary btn-lg"
                        >
                          UPDATE
                        </button>
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

export default Update_Bus;
