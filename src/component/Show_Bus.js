
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import axios from "axios";
import authHeader from "./../services/auth-header";

class Show_Bus extends Component {

  state = {
    buses: []
  }
componentDidMount(){
    axios.get(window.$API_SERVER +'BusInfo',{ headers: authHeader() })
      .then(res => {
        
        this.setState({
          buses: res.data
        });
      })
  }




  render(){

    const { buses } = this.state
    const busList = buses.length ? (
      buses.map(bus => {
        return (
            
            <tr>
            <td>{bus.BusNo}</td>
            <td>{bus.DriverName}</td>
            <td>{bus.DriverNo}</td>
            <td>{bus.CondName}</td>
            <td>{bus.CondNo}</td>
            <td>{bus.MaxSeats}</td>
            <td>{bus.Email}</td>
          </tr>
        )
      })
    ) : (
      <div className="center">No Buses available</div>
    );


  return (
    <div>
      <div class="container p-1">
      <br></br><br></br>
        <div class="mt-5">
          <h1>
            <u>Buses Information List</u>
          </h1>

          <br></br>
          <div class="row">
          
            <div class="col-lg">
              <table class="table table-hover table-info table-bordered">
                <thead>
                  <tr class="bg-info">
                    <th scope="col-lg-3">Bus No</th>
                    <th scope="col-lg-3">Driver Name</th>
                    <th scope="col-lg-3">Driver No</th>
                    <th scope="col-lg-3">Conductor Name</th>
                    <th scope="col-lg-3">Conductor No</th>
                    <th scope="col-lg-3">No of Seats</th>
                    <th scope="col-lg-3">Email</th>
                   
                  </tr>
                </thead>
                <tbody>
                 {busList}
                </tbody>
              </table>
            </div>
            <div class="box-bo4"></div>
           
          </div>

          <hr />
         
        </div>
      </div>
    </div>
  );}
}

export default Show_Bus;
