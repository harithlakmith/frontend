import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
//import "./Admin_Dash.css";
import { render } from "react-dom";
import {Redirect, withRouter} from 'react-router-dom';

class Admin_Dash extends Component {

render(){
  if (JSON.parse(localStorage.getItem('role'))!='Administrator'){
    return <Redirect to={'/sign-in'} />
  }
  return (
    <div class="container p-1">
      <div class="">
        <h1>
          <u>Admin Dashboard</u>
        </h1>
        <br></br>
        <br></br>
        <br></br>
        <div class="row">
          <div class="col-lg-8 ; h2 ">Routes</div>
        </div>
        <br></br>
        <div class="row">
          <div class="col-lg-1">
          <a href="/" class="btn btn-primary m-2">Show Route</a>
          </div>
          <div class="col-lg-1">
          <a href="/add-route" class="btn btn-primary m-2">Add Route</a>
          </div>         
          <div class="col-lg-1">
          <a href="/" class="btn btn-primary m-2">Edit Route</a>
          </div>
        </div>
     
        <div class="row">
          <div class="col-lg-8 ; h2 ">Bus</div>
        </div>
        <br></br>
        <div class="row">
          <div class="col-lg-1">
             <a href="/show-buses" class="btn btn-primary m-2">Show Bus</a>
          </div>
          <div class="col-lg-1">
             <a href="/bus-reg" class="btn btn-primary m-2">Add Bus</a>
          </div> 
        </div>
       
        <div class="row">
          <div class="col-lg-8 ; h2 ">Session</div>
        </div>
        <br></br>
        <div class="row">
          <div class="col-lg-2">
            <a href="/" class="btn btn-primary m-2">Show Session</a>
          </div>
          <div class="col-lg-2">
            <a href="/add-route" class="btn btn-primary m-2">Add Session</a>
          </div> 
        </div>
      </div>
    </div>
  );
}
}

export default Admin_Dash;
