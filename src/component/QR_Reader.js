import "bootstrap/dist/css/bootstrap.min.css";

import axios from "axios";
import { Redirect, withRouter } from "react-router-dom";
import authHeader from "./../services/auth-header";
import React, { Component } from "react";
import QrReader from "react-qr-reader";

class QR_Reader extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      result: "",
      ManualResult: "",
    };
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleScan = (data) => {
    if (data) {
      this.setState({
        result: data,
      });
    }
  };
  handleError = (err) => {
    console.error(err);
  };
  render() {
    const { result, ManualResult } = this.state;
    var d = "/manual-pay?TId=" + result;
    if (result != "") {
      return <Redirect to={d} />;
    }

    var f = "/manual-pay?TId=" + ManualResult;
    return (
      <div>
        <div class=" d-none d-lg-block">
          <div class="container p-5 mt-5 ">
            <div class="card-deck p-3 mt-5 col-lg-12  ">
              <div class="card bg-light border-dark col-lg-6  p-3 ">
                <QrReader
                  delay={300}
                  onError={this.handleError}
                  onScan={this.handleScan}
                  style={{ width: "100%" }}
                />
                <hr></hr>
                <div class="form-inline">
                  <p class="col-lg-5  col-form-label; h5">
                    {" "}
                    Enter Ticket ID&nbsp;:&nbsp;{" "}
                  </p>

                  <div class="col-lg-6">
                    <input
                      class="form"
                      type="text"
                      name="ManualResult"
                      value={this.state.ManualResult}
                      onError={this.handleError}
                      onChange={this.handleChange}
                      placeholder=""
                      required="required"
                    />
                  </div>
                </div>
              </div>
              <div class="card bg-light text-dark text-center w-50 border-dark col-lg-6  ">
                <br></br>
                <br></br>
                <br></br>

                <p class="card-text text-dark h1">Please Scan QR</p>
                <br></br>
                <p class="card-text text-dark h1">QR Code</p>
                <br></br>
                <p class="card-text text-dark h1">Inside Your</p>
                <br></br>

                <p class="card-text text-dark h1">Ticket</p>
                <br></br>

                <hr></hr>
                <br></br>
                <div class=" text-dark col-lg-12">
                  <a href={f} class="btn btn-primary btn-lg mb-2 mt-2">
                    Go To Ticket
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class=" d-lg-none">
          <div class="container p-5 mt-5 ">
            <div class="card-deck p-3 mt-5 col-md-12 col-sm-12 ">
              <h1 class="card-title  p-3 text-light headgd text-center">
                <u>Scan QR Code Inside Your Ticket</u>
              </h1>
              <QrReader
                delay={300}
                onError={this.handleError}
                onScan={this.handleScan}
                style={{ width: "100%" }}
              />

              <div class="form-inline mt-4 ">
                <div class="col-md-6 col-sm-5  col-form-label; h5">
                  {" "}
                  Enter Ticket ID&nbsp;:&nbsp;{" "}
                </div>

                <div class="col-md-4 col-sm-6">
                  <input
                    class="form"
                    type="text"
                    name="ManualResult"
                    value={this.state.ManualResult}
                    onError={this.handleError}
                    onChange={this.handleChange}
                    placeholder=""
                    required="required"
                  />
                </div>
              </div>
              <hr></hr>

              <div class=" text-dark mt-4 col-md-12 col-sm-12">
                <a href={f} class="btn btn-primary btn-lg  mb-2 mt-2">
                  Go To Ticket
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default QR_Reader;
