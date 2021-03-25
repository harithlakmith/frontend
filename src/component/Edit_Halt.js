
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import axios from "axios";

function Edit_Halt() {
  return (
    <div>
      <div class="container p-1">
        <div class="box">
          <h1>
            <u>Bus Registration Form</u>
          </h1>

          <br></br>
          <div class="row">
            <div class="box-box1"></div>
            <div class="box-bo2">
              <table class="table table-hover table-info table-bordered">
                <thead>
                  <tr class="bg-info">
                    <th scope="col-lg-3">Halt</th>
                    <th scope="col-lg-3">Price</th>
                    <th scope="col-lg-3">Time</th>
                    <th scope="col-lg-3">Distance</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="box-bo4"></div>
            <div class="box-bo3">
              <div class="form-group">
                <button type="submit" class="btn btn-primary btn-lg">
                  Add
                </button>
              </div>
              <div class="form-group">
                <button type="submit" class="btn btn-primary btn-lg">
                  Edit
                </button>
              </div>
              <div class="form-group">
                <button type="submit" class="btn btn-primary btn-lg">
                  Delete
                </button>
              </div>
            </div>
          </div>

          <hr />
          <div class="hint-text">
            Tiketz{" "}
            <a href="#">
              <i>Smart Travelling for Smart Lifestyle</i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit_Halt;
