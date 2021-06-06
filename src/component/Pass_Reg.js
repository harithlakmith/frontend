import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import axios from "axios";

class Pass_Reg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      NIC: "",
      First_name: "",
      Last_name: "",
      Email: "",
      Password: "",
      ConfirmPassword: "",
      Telephone: "",
      message: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.AddPass = this.AddPass.bind(this);
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  AddPass = () => {
    //event.preventDefault();

    axios
      .post(window.$API_SERVER + "Accounts/PassengerRegister", {
        //PID: parseInt(this.state.NIC),
        NIC: this.state.NIC,
        FirstName: this.state.First_name,
        LastName: this.state.Last_name,
        Email: this.state.Email,
        Password: this.state.Password,
        ConfirmPassword: this.state.Password,
        Tp: parseInt(this.state.Telephone),
        Token: "test",
        Verified: 0,
      })
      .then(
        (json) => {
          console.log(json.data);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            message: resMessage,
          });
        }
      );
  };

  render() {
    return (
      <div class="row justify-content-center">
        <div class="col-10 col-lg-6 mt-5 ">
          <div class=" mt-5 p-3 ">
            <div class="">
              <h1 class="p-3 text-center card-title">
                <u>Passenger Registration Form</u>
              </h1>

              <div class="Pass_Reg_Form">
                <form>
                  <div class="form-group ">
                    <div class="input-group mb-3">
                      <span class="input-group-text" id="basic-addon1">
                        <i class="far fa-id-card"></i>
                      </span>
                      <input
                        type="text"
                        class="form-control"
                        name="NIC"
                        onChange={this.handleChange}
                        value={this.state.NIC}
                        placeholder="NIC"
                        required="required"
                      ></input>
                    </div>

                    <div class="row">
                      <div class="col-12 col-lg-6 col-sm-12 ">
                        <input
                          type="text"
                          class="form-control"
                          name="First_name"
                          onChange={this.handleChange}
                          value={this.state.First_name}
                          placeholder="First Name"
                          required="required"
                        ></input>
                      </div>
                      <div class="col-12 col-lg-6 col-sm-12">
                        <input
                          type="text"
                          class="form-control"
                          name="Last_name"
                          onChange={this.handleChange}
                          value={this.state.Last_name}
                          placeholder="Last Name"
                          required="required"
                        ></input>
                      </div>
                    </div>
                  </div>
                  <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">
                      <i class="fas fa-envelope-open fa-lg"></i>
                    </span>
                    <input
                      type="text"
                      class="form-control"
                      name="Email"
                      onChange={this.handleChange}
                      value={this.state.Email}
                      placeholder="Email"
                      required="required"
                    ></input>
                  </div>
                  <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">
                      <i class="fas fa-user-lock fa-lg"></i>
                    </span>
                    <input
                      type="password"
                      class="form-control"
                      name="Password"
                      onChange={this.handleChange}
                      value={this.state.Password}
                      placeholder="Password"
                      required="required"
                    ></input>

                    <div id="passwordHelpBlock" class="form-text text-black-50">
                      Your password must contain simple letters and numbers, and
                      must not contain spaces, special characters, or emoji.
                    </div>
                  </div>
                  <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">
                      <i class="fas fa-phone"></i>
                    </span>
                    <input
                      type="text"
                      pattern="[0-9]*"
                      class="form-control"
                      onChange={this.handleChange}
                      value={this.state.Telephone}
                      name="Telephone"
                      placeholder="Telephone"
                      required="required"
                    ></input>
                  </div>{" "}
                </form>
                <div class="form-group">
                  {this.state.message && (
                    <div className="form-group">
                      <div className="alert alert-danger" role="alert">
                        {this.state.message}
                      </div>
                    </div>
                  )}
                </div>

                <div class="form-group">
                  <button
                    type="submit"
                    onClick={this.AddPass}
                    class="btn btn-primary btn-lg "
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Pass_Reg;
