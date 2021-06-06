import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Redirect, withRouter } from "react-router-dom";

class Admin_Dash extends Component {
  render() {
    if (JSON.parse(localStorage.getItem("role")) != "Administrator") {
      return <Redirect to={"/sign-in"} />;
    }
    return (
      <div class="container p-3 mt-3  mb-4">
        <div class="card   p-4 mt-5">
          <div class="col-lg-12 h1  p-3 text-light headgd text-center ">
            <i class="fas fa-user-cog"></i>&nbsp;&nbsp;<u>Admin Dashboard</u>
          </div>

          <br></br>

          <div class="row">
            <div class="col-lg-8 h2 mb-4 text-dark ">
              Settings - Routes&nbsp;&nbsp;
            </div>
          </div>

          <div class="row">
            <div class="col-lg-4">
              <div class="card border-primary mb-3">
                <div class="card-header h5">
                  <i class="fas fa-list-ol"></i> &nbsp;&nbsp;Route List
                </div>
                <div class="card-body text-center">
                  <p class="card-text">
                    Click below button for displaying the infomation list of bus
                    Routes.
                  </p>
                  <a href="/" class="btn btn-primary m-2 disabled">
                    Show Route
                  </a>
                </div>
              </div>
            </div>

            <div class="col-lg-4">
              <div class="card border-primary mb-3">
                <div class="card-header h5">
                  <i class="fas fa-route"></i>&nbsp;&nbsp;Add New Route
                </div>
                <div class="card-body text-center">
                  <p class="card-text">
                    Click below button for Adding new routes to the system.
                  </p>
                  <a href="/add-route" class="btn btn-primary m-2">
                    Add Route
                  </a>
                </div>
              </div>
            </div>

            <div class="col-lg-4">
              <div class="card border-primary mb-3 ">
                <div class="card-header h5">
                  <i class="fas fa-route"></i>&nbsp;&nbsp;Edit Routes
                </div>
                <div class="card-body text-center">
                  <p class="card-text">
                    Click below button for updating the information of registerd
                    routes.
                  </p>
                  <a href="/" class="btn btn-primary m-2 disabled">
                    Edit Route
                  </a>
                </div>
              </div>
            </div>
          </div>
          <hr></hr>
          <div class="row">
            <div class="col-lg-8 h2 mb-4 text-dark">Settings - Buses&nbsp;</div>
          </div>

          <div class="row">
            <div class="col-lg-4">
              <div class="card border-primary mb-3">
                <div class="card-header h5">
                  <i class="fas fa-list-ol"></i> &nbsp;&nbsp;Bus List
                </div>
                <div class="card-body text-center">
                  <p class="card-text">
                    Click below button for Displaying the information list of
                    buses
                  </p>
                  <a href="/show-buses" class="btn btn-primary m-2">
                    Bus List
                  </a>
                </div>
              </div>
            </div>

            <div class="col-lg-4">
              <div class="card border-primary mb-3 ">
                <div class="card-header h5">
                  <i class="fas fa-plus"></i> &nbsp;&nbsp;Add New Bus
                </div>
                <div class="card-body text-center">
                  <p class="card-text">
                    Click below button for registering new bus for the system.
                  </p>
                  <a href="/bus-reg" class="btn btn-primary m-2 ">
                    Add Bus
                  </a>
                </div>
              </div>
            </div>
          </div>
          <hr></hr>
          <div class="row">
            <div class="col-lg-8 h2 mb-2 text-dark">Settings - Session</div>
          </div>
          <br></br>
          <div class="row">
            <div class="col-lg-4">
              <div class="card border-primary mb-3">
                <div class="card-header h5">
                  {" "}
                  <i class="fas fa-list-ol"></i> &nbsp;&nbsp;Session List
                </div>
                <div class="card-body text-center">
                  <p class="card-text">
                    Click below button for Displaying the information list of
                    Sessions
                  </p>
                  <a href="/session-list" class="btn btn-primary m-2 ">
                    Sessions List
                  </a>
                </div>
              </div>
            </div>

            <div class="col-lg-4">
              <div class="card border-primary mb-3 ">
                <div class="card-header h5">
                  {" "}
                  <i class="fas fa-plus"></i> &nbsp;&nbsp;Add Session
                </div>
                <div class="card-body text-center">
                  <p class="card-text">
                    Click below button for adding new session for the related
                    bus.
                  </p>
                  <a href="/add-session" class="btn btn-primary m-2">
                    Add Session
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Admin_Dash;
