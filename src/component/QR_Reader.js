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
      <div class="container p-5 mt-5 ">
        <div class="card-deck p-3 mt-5 ">
          <div class="card bg-light border-dark   ">
            <QrReader
              delay={300}
              onError={this.handleError}
              onScan={this.handleScan}
              style={{ width: "100%" }}
            />
          </div>
          <div class="card bg-light text-dark text-center w-50 border-dark ">
            <br></br>
            <p class="card-text text-dark h1">Please Scan</p>
            <br></br>
            <p class="card-text text-dark h1">QR Code</p>
            <br></br>
            <p class="card-text text-dark h1">Inside Your</p>
            <br></br>
            <p class="card-text text-dark h1">Ticket</p>
            <hr></hr>
            <div class="form-inline">
              <p class="col-lg-5 col-form-label; h5"> Enter Ticket ID </p>
              <p class=" h5">:</p>
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

            <br></br>
            <div class=" text-dark">
              <a href={f} class="btn btn-primary m-2 ">
                Go
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default QR_Reader;
