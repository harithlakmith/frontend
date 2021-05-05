import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
//import "./bus_dash.css";
import Moment from "moment";
import {Redirect, withRouter} from 'react-router-dom';

import axios from "axios";
import authHeader from "./../services/auth-header";

class Bus_Dash extends Component {

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

  /*Booked=(sid)=>{
    var book = 0;
    axios.get("http://localhost:5000/Ticket/session/"+sid)
    .then(res=>{
        this.setState({
            Ticket:res.data,
          
        });
    })

    this.state.Ticket.length?(
      this.state.Ticket.map(Tick=>{
        book = book + parseInt(Tick.NoOfSeats);
      })
    ):(
        book = ''
    );

    return book;
  }*/

  render() {
   if (JSON.parse(localStorage.getItem('role'))!='BusController'){
      return <Redirect to={'/sign-in'} />
    }

    const { BusNo,CondName,CondNo,DriverName,DriverNo,Email,MaxSeats,MySession } = this.state;

    var s = '/select-route?s='+MaxSeats;

    const seslist = MySession.length ? (
      MySession.map(ses=> {      var t = "/ticket-session?sid="+ ses.SId;
                            return(   <div class="card alert-info text-info p-3 m-3">
                                        <h3 class="">{ses.RNum}&nbsp;&nbsp;{ses.Start} - {ses.Stop}</h3>
                                          <div class="row">
                                            <div class="col-lg-7">
                                              <h5>On: {Moment(ses.Date).format('YYYY-MM-DD')}</h5>
                                              <h5>At: {Moment(ses.StartTime).format('LT')}</h5>
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
      <div class="card bg-light p-3 mt-5">
        <div class="card-body mt-5 ">
          <h1 class="card-title ">
            <u>Bus Dashboard</u>
          </h1>
          <br></br>
          <hr />

          <div class="card-deck">
            <div class="card bg-light text-dark p-5">
              <div class="card-body ">
                
                  <div class="form-group row">
                    <div class="col-lg-4 ; h5 ">
                      <label>Mybus</label>
                    </div>
                    <div class="col-lg-5; h5">{BusNo}</div>
                  </div>
                  <div class="form-group row">
                    <div class="col-lg-4 ; h5 ">
                      <label>Email</label>
                    </div>

                    <div class="col-lg-5; h5">{Email}</div>
                  </div>
                  <div class="form-group row">
                    <div class="col-lg-4 ; h5 ">
                      <label>Seats</label>
                    </div>
                    <div class="col-lg-5; h5">{MaxSeats}</div>
                  </div>

                  <div class="form-group row">
                    <div class="col-lg-4 ; h5 ">
                      <label>Driver Number</label>
                    </div>
                    <div class="col-lg-5; h5">{DriverNo}</div>
                  </div>
                  <div class="form-group row">
                    <div class="col-lg-4 ; h5 ">
                      <label>Driver Name</label>
                    </div>
                    <div class="col-lg-5; h5">{DriverName}</div>
                  </div>
                  <div class="form-group row">
                    <div class="col-lg-4 ; h5 ">
                      <label>Conducter Number</label>
                    </div>

                    <div class="col-lg-5; h5">{CondNo}</div>
                  </div>
                  <div class="form-group row">
                    <div class="col-lg-4 ; h5 ">
                      <label>Conducter Name</label>
                    </div>
                    <div class="col-lg-5; h5">{CondName}</div>
                  </div>
                
                <br></br>
                <a href={s} class="btn btn-primary btn-lg">
                  Add Session
                </a>
              </div>
            </div>
            <div class="card bg-light text-dark">
              <div class="card-body">
                <h3 class="card-title">
                  <u>My Sessions </u>
                </h3>
                <hr />
                {seslist}
              </div>
            </div>
          </div>
          <hr />
        </div>
      </div>
    );
  }
}

export default withRouter(Bus_Dash);
