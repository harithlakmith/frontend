
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import axios from "axios";
import { Redirect,withRouter} from "react-router-dom";
import authHeader from "./../services/auth-header";

class Show_Route extends Component {
    
  state = {
    routes: []
  }
componentDidMount(){



    axios.get(window.$API_SERVER + 'Route' ,{ headers: authHeader() })
      .then(res => {

        this.setState({
          routes:res.data
        });
      })
     
}

render(){
  const { routes } = this.state

  const routeList = routes.length ? (
    routes.map(route => {
      return(
          <tr>
          <td>{route.RId}</td>    
          <td>{route.RNum}</td>
          <td>{route.StartHolt}</td>
          <td>{route.StopHolt}</td>
          <td>{route.Distance}</td>
          <td>{route.Duration}</td>
          <td>  <a href={'/route-info?RId='+route.RId} class="btn btn-primary btn-sm">
                    Route Info
                  </a>
          </td>
          <td>  <a href={'/route-update?RId='+route.RId} class="btn btn-primary btn-sm center">
                    Edit
                  </a>
          </td>
          </tr>
      )
    })
  ) : (
    <div class="center">No Routes available</div>
  );

  return (
    <div>
     		<div class="card" >
    <div class="card-body">
      
      
        <div class="mt-5 p-5">
          <h2 class="card-title card-header px-3 headgd  text-light">
            Routes Information List
          </h2>
          <br></br>
          <div class="row">
            <div class="col-lg">
              <table class="table table-striped table-hover table-bordered">
                <thead>
                  <tr class="headgd text-white">
                  <th scope="col-lg-3">Route Id</th>
                    <th scope="col-lg-3">Route No</th>
                    <th scope="col-lg-3">Start At</th>
                    <th scope="col-lg-3">Stop At</th>
                    <th scope="col-lg-3">Full Distance</th>
                    <th scope="col-lg-3">Full Time</th> 
                    <th scope="col-lg-3"></th> 
                    <th scope="col-lg-3"></th> 
                  </tr>
                </thead>
                <tbody>
                  {routeList}
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
}

export default withRouter(Show_Route);


