
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import axios from "axios";
import { Redirect,withRouter} from "react-router-dom";
import authHeader from "./../services/auth-header";

class Route_Info extends Component {
    
  state = {

    routes: []
  }
componentDidMount(){
    
    var value = new URLSearchParams(this.props.location.search);
    var RId = value.get('RId');

    axios.get(window.$API_SERVER + 'RouteInfo/'+RId,{ headers: authHeader() })
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
         
          <td>{route.HoltId}</td>
          <td>{route.HoltName}</td>
          <td>{route.Time}</td>
          <td>{route.Distance}</td>
          <td>{route.Price}</td>
          <td>  <a href={'/route-info-update?RId='+route.RId+'&HoltId='+route.HoltId+'&HoltName='+route.HoltName+'&Time='+route.Time+'&Distance='+route.Distance+'&Price='+route.Price+' '} class="btn btn-primary btn-s">
                    Edit
                  </a>
          </td>
          </tr>
      )
    })
  ) : (
    <div class="center">No Route Information available</div>
  );

  return (
    <div>
      <div class="container p-1">
      <br></br><br></br>
        <div class="mt-5">
          <h1>
            <u>Route Information </u>
          </h1>
          <br></br>
          <div class="row">
            <div class="col-lg">
              <table class="table table-striped table-hover table-bordered">
                <thead>
                  <tr class="headgd text-white">
                    <th scope="col-lg-3">Holt Id</th>
                    <th scope="col-lg-3">Holt Name</th>
                    <th scope="col-lg-3">Full Time</th>
                    <th scope="col-lg-3">Full Distance</th>
                    <th scope="col-lg-3">Price</th> 
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
  );
}
}

export default withRouter(Route_Info);


