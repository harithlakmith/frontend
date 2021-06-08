
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import axios from "axios";
import { Redirect,withRouter} from "react-router-dom";
import authHeader from "./../services/auth-header";
import { MDBDataTableV5, MDBIcon, MDBBtn, MDBTable, MDBTableBody, MDBTableHead  } from 'mdbreact';

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

  const data ={
    columns:[
      {
        label: 'Holt Id',
        field: 'HId',
        
        width: 100
        },
        {
        label: 'Holt Name',
        field: 'HName',
      
        width: 100
        },

        {
          label: 'Full Time(Hours)',
          field: 'FullTime',
          
          width: 100
          },

        {
        label: 'Full Distance (km)',
        field: 'FullDistance',
        
        width: 100
        },
       
        {
        label: 'Price(Rs)',
        field: 'Price',
          
        width: 100
        },
        {
        label: '',
        field: 'Button',
        sort: 'asc',
      
        width: 100
        }
    ],
    rows:routes.map(route => {
        return{
          HId:route.HoltId,
          HName:route.HoltName,
          FullTime:route.Time,
          FullDistance:route.Distance,
          Price:route.Price,
      
        'Button':  <MDBBtn
        href={'/update-routeinfo?RId='+route.RId+'&HoltId='+route.HoltId+'&HoltName='+route.HoltName+'&Time='+route.Time+'&Distance='+route.Distance+'&Price='+route.Price+' '}
       
        color="primary"
      >
        Edit
      </MDBBtn>,
          
        }
  
  
        
      })
        
    }

  return (
    <div class="">
      
        
		<div class="card" >
    <div class="card-body">
      
      
        <div class="mt-5 p-5">
          <h2 class="card-title card-header px-3 headgd  text-light">
            Route Information 
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

export default withRouter(Route_Info);


