
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component,Fragment } from "react";
import axios from "axios";
import { Redirect,withRouter} from "react-router-dom";
import authHeader from "./../services/auth-header";
import { MDBDataTableV5, MDBIcon, MDBBtn, MDBTable, MDBTableBody, MDBTableHead  } from 'mdbreact';

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

  
  const {text,text1} = this.state;

const data ={
  columns:[
    {
      label: 'Route Id',
      field: 'RId',
      
      width: 100
      },
      {
      label: 'Route No',
      field: 'RNo',
    
      width: 100
      },
      {
      label: 'Start At',
      field: 'StartAt',
      
      width: 100
      },
      {
      label: 'Stop At',
      field: 'StopAt',
      
      width: 100
      },
      {
      label: 'Full Distance',
      field: 'FullDistance',
      
      width: 100
      },
      {
      label: 'Full Time',
      field: 'FullTime',
      
      width: 100
      },
      {
      label: '',
      field: 'Button1',
      sort: 'asc',
        
      width: 100
      },
      {
      label: '',
      field: 'Button2',
      sort: 'asc',
    
      width: 100
      }
  ],
  rows:routes.map(route => {
      return{
        RId:route.RId,
        RNo:route.RNum,
        StartAt:route.StartHolt,
        StopAt:route.StopHolt,
        FullDistance:route.Distance,
        FullTime:route.Duration,
        'Button1':  <MDBBtn
        href={'/route-info?RId='+route.RId}
       
        color="primary"
      >
        Route Info
      </MDBBtn>,
        'Button2':  <MDBBtn
        href={'/route-update?RId='+route.RId}
       
        color="primary"
      >
        Edit
      </MDBBtn>,
        
      }


      
    })
      
  }

  return (
    <div>
     		<div class="card" >
    <div class="card-body">
      
      
        <div class="mt-5 p-5">
          <h2 class="card-title card-header px-3 headgd  text-light">
            Routes Information List
            <br></br>
            

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
  );
}
}

export default withRouter(Show_Route);


