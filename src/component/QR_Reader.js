import "bootstrap/dist/css/bootstrap.min.css";

import axios from "axios";
import { Redirect, withRouter } from "react-router-dom";
import authHeader from "./../services/auth-header";
import React, { Component } from "react";
import QrReader from "react-qr-reader";

class QR_Reader extends Component {
  state = {
    result: "",
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
    const { result } = this.state;
    var d = "/manual-pay?TId=" + result;
    if (result != "") {
      return <Redirect to={d} />;
    }
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
            <br></br>
            <br></br>
            <br></br>
            <p class="card-text text-dark h1">Please Scan</p>
            <br></br>
            <p class="card-text text-dark h1">QR Code</p>
            <br></br>
            <p class="card-text text-dark h1">Inside Your</p>
            <br></br>
            <p class="card-text text-dark h1">Ticket</p>
            <br></br>
            <br></br>
            <br></br>
          </div>
        </div>
      </div>
    );
  }
}
export default QR_Reader;
