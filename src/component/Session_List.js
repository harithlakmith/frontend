import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import Moment from "moment";
import {Redirect, withRouter} from 'react-router-dom';

import axios from "axios";
import authHeader from "./../services/auth-header";


class Session_List extends Component {

    constructor(props) {
        super(props);
        this.state = {
          busInfo: [],
          BusNo:'',    
          CondName:'',
          CondNo:'',
          DriverName:'',
          DriverNo:'',
          Email:'',
          MaxSeats:'',
          MySession:[],
          Ticket:[],
        }
    
      }

    componentDidMount(){

        var Bus = JSON.parse(localStorage.getItem('userInfo'));
        var BusNo = Bus.BusNo;
        
        axios.get(window.$API_SERVER +'BusInfo/'+ BusNo,{ headers: authHeader() })
        .then(res => {
          
          this.setState({
            BusNo:res.data.BusNo,
            busInfo: res.data,
            CondName:res.data.CondName,
            CondNo:res.data.CondNo,
            DriverName:res.data.DriverName,
            DriverNo:res.data.CondNo,
            Email:res.data.Email,
            MaxSeats:res.data.MaxSeats
          });
        });
          
            axios.get(window.$API_SERVER +'Session/BusNo/'+ BusNo,{ headers: authHeader() })
            .then(res => {
              
              this.setState({
                MySession:res.data
              });
            });
      
           
        }
      
        render() {
            if (JSON.parse(localStorage.getItem('role'))!='BusController'){
               return <Redirect to={'/sign-in'} />
             }
         
             const { BusNo,CondName,CondNo,DriverName,DriverNo,Email,MaxSeats,MySession } = this.state;
         
             var s = '/select-route?s='+MaxSeats;
         
             const seslist = MySession.length ? (
               MySession.map(ses=> { 
                   
                const dte = new Date(ses.Date);
                const date = Moment(dte.toLocaleString()).format('YYYY-MM-DD');
                const today = Moment(Date().toLocaleString()).format('YYYY-MM-DD');
                
                let session = "";
               
                if (today > date){
                    session = <span class="badge bg-danger">Expired</span>;
                   
                    
                }
                else {
                    
                    session = <span class="badge bg-success">Availble</span>
                   
                    
                }
                
                var t = "/ticket-session?sid="+ ses.SId;
                                     return(   <div class="card alert-info text-info p-3 m-3">
                                                 <h3 class="">{ses.RNum}&nbsp;&nbsp;{ses.Start} - {ses.Stop}</h3>
                                                   <div class="row">
                                                     <div class="col-lg-7">
                                                       <h5>On: {Moment(ses.Date).format('YYYY-MM-DD')}</h5>
                                                       <h5>At: {Moment(ses.StartTime).format('LT')}</h5>
                                                       <h4>Session: {session}</h4>
                                                     </div>
                                                     <div class="col-lg-4 text-right">
                                                       <a href={t} class="btn btn-info">Tickets</a>
                                                     </div>
                                                   </div>
                                               </div>);
                                   })
               ):(
                       <p>No Data</p>
               )
         
         

    return (
<div>
<div class="card bg-light p-3 mt-3">
        
        <div class="card" >
<div class="card-body">


  <div class="mt-5 p-5">
    <h2 class="card-title card-header px-3 headgd  text-light">
      Session List
    </h2>
    <div class="card bg-light text-dark ">
    <div class="card-body ">
      
      {seslist}
      </div>
      </div>

      </div>
      </div>
      </div>
      </div>
      </div>
    );
}
}

export default withRouter(Session_List);