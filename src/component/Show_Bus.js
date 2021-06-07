
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import axios from "axios";
import authHeader from "./../services/auth-header";
import { MDBDataTableV5, MDBIcon, MDBBtn, MDBTable, MDBTableBody, MDBTableHead  } from 'mdbreact';

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
    const data ={
      columns:[
        {
          label: 'Bus No',
          field: 'BusNo',
          
          width: 100
          },
          {
          label: 'Driver Name',
          field: 'DriverName',
        
          width: 100
          },
          {
          label: 'Driver No',
          field: 'DriverNo',
          
          width: 100
          },
          {
          label: 'Conductor Name',
          field: 'ConductorName',
          
          width: 100
          },
          {
          label: 'Conductor No',
          field: 'ConductorNo',
          
          width: 100
          },
          {
          label: 'No Of Seats',
          field: 'NoOfSeats',
          
          width: 100
          },
          {
          label: 'Email',
          field: 'Email',
         
            
          width: 100
          },
         
      ],
      rows:buses.map(bus => {
          return{
            BusNo:bus.BusNo,
            DriverName:bus.DriverName,
            DriverNo:bus.DriverNo,
            ConductorName:bus.CondName,
            ConductorNo:bus.CondNo,
            NoOfSeats:bus.MaxSeats,
            Email:bus.Email, 
            
          }
    
    
          
        })
          
      }
   


  return (
    <div>
      	<div class="card" >
    <div class="card-body">
      
      
        <div class="mt-5 p-5">
          <h2 class="card-title card-header px-3 headgd  text-light">
            Buses Information List
          </h2>

          <br></br>
          <div class="row">
          
            <div class="col-lg">
            <MDBDataTableV5 responsive hover striped bordered entriesOptions={[5, 10, 15]} entries={10} info={false} data={data} />
            </div>
           
          </div>
         
        </div>
      </div>
      </div>
    </div>
  );}
}

export default Show_Bus;
