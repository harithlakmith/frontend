import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import axios from "axios";

function Session_Pass() {
  return (
    <div class="container p-1">
      <div class="box">
        <h1>
          <u>Session-Passengers</u>
        </h1>
        <br></br>
        <br></br>
        <div class="row">
          <div class="box-box1"></div>
          <div class="box-box6">
            <div class="row">
              <div class="col-lg-2 ; h4 ">Session</div>
              <div class="col-lg-2 ; h4 ">:</div>
              <div class="col-lg-8 ; h4 ">36</div>
            </div>
            <br></br>
            <div class="row">
              <div class="col-lg-2 ; h4 ">Route</div>
              <div class="col-lg-2 ; h4 ">:</div>
              <div class="col-lg-8 ; h4 ">02 Colombo - Galle</div>
            </div>
            <br></br>
            <div class="row">
              <div class="col-lg-2 ; h4 ">My Bus</div>
              <div class="col-lg-2 ; h4 ">:</div>
              <div class="col-lg-8 ; h4 ">ND 7575</div>
            </div>
            <br></br>
            <div class="row">
              <div class="col-lg-2 ; h4 ">Time</div>
              <div class="col-lg-2 ; h4 ">:</div>
              <div class="col-lg-8 ; h4 ">08.00</div>
            </div>
            <br></br>
            <div class="row">
              <div class="col-lg-2 ; h4 ">Date </div>
              <div class="col-lg-2 ; h4 ">:</div>
              <div class="col-lg-2 ; h4 ">01/03/2020 </div>
            </div>
          </div>
        </div>
        <br></br>
        <br></br>

        <div class="row">
          <div class="box-box1"></div>
          <div class="box-box6">
            <div class="row">
              <div class="col-lg-6 ; h4 ">Passenger List</div>
            </div>
            <br></br>
            <div class="row">
              <div class="box-box1"></div>
              <div class="box-box6">
                <table class="table table-hover table-info">
                  <thead>
                    <tr class="bg-info">
                      <th scope="col-lg-2">ID</th>
                      <th scope="col-lg-2">From</th>
                      <th scope="col-lg-2">To</th>
                      <th scope="col-lg-2">No of Passengers</th>
                      <th scope="col-lg-2">Price</th>
                      <th scope="col-lg-2">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1058</td>
                      <td>Kandy</td>
                      <td>Colombo</td>
                      <td>2</td>
                      <td>250</td>
                      <td>08/02/2020</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Session_Pass;
