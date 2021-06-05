import React, { Component } from "react";
import axios from "axios";
import { Redirect, withRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Moment from "moment";
import authHeader from "./../services/auth-header";

class Testing extends Component {
  render() {
    return (
      <div class=" container p-5 mt-5 ">
        <div class="card-header">
          <div class="row">
            <div class="col-md-6">
              <h3>nb1234 &nbsp;&nbsp; kegalle - rambukkana</h3>
            </div>
            <div class="col-md-6">
              <h3>2021/06/05</h3>
            </div>
          </div>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-md-3">
              <p>From: kegalle To: rambukkana</p>
              <p>Time Duration:1 hours</p>
            </div>
            <div class="col-md-3">
              <p>Arriving Time:3.00</p>
            </div>
            <div class="col-md-3">
              <p>Price:Rs 45 /=</p>
            </div>

            <div class="col-md-3">
              <div class="form-group">
                <a class="btn btn-primary btn-lg btn-block">BOOK NOW</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    return (
      <section class="hero-section bg-light" id="services">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-8">
              <div class="text-center mb-5">
                <h3 class="text-primary text-uppercase ">
                  TICKETS RESERVATION SOLUTION
                </h3>
              </div>
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col-12 "></div>
          </div>
        </div>
      </section>
    );
  }
}

export default withRouter(Testing);
