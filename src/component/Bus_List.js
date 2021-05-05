
import React, {Component} from 'react'
import axios from 'axios'
import {  Redirect,withRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Moment from 'moment';
import authHeader from "./../services/auth-header";


class Bus_List extends Component {


    state = {
      buses: [],
      load:true
       
     };   
      
   componentDidMount() {

    //
    const value = new URLSearchParams(this.props.location.search)
    
    axios.get(window.$API_SERVER +'Search/SearchTicket?date='+value.get('date')+'&from_='+value.get('from')+'&to_='+value.get('to'),{ headers: authHeader() })
         .then(res => {
                        this.setState({
                                        buses: res.data,
                                        load:false
                                      });
              },error=>{
                        this.setState({
                        load:false
                        });
              })
          }


    
      render(){
        if (JSON.parse(localStorage.getItem('role'))!='Passenger'){
          return <Redirect to={'/sign-in'} />
        }

        const { buses, load } = this.state
   
        const buslist = buses.length ? (
          buses.map(bus => {
         
            const urlBook = '/book-now?date='+Moment(bus.Date).format('YYYY-MM-DD')
                            +'&routestartholt='+bus.RouteStartHolt
                            +'&routestopholt='+bus.RouteStopHolt
                            +'&routeno='+bus.RNum
                            +'&fromholt='+bus.FromHolt
                            +'&toholt='+bus.ToHolt
                            +'&ticketprice='+bus.TicketPrice
                            +'&arrivedtime='+Moment(bus.ArrivedTime).format('hh:mm A')
                            +'&duration='+bus.Duration
                            +'&sid='+bus.SId
                            +'&busNo='+bus.BusNo

            return (
              <div class="card  bg-light mb-3">
              <div class="card-header">
                <div class="row">
                  <div class="col-md-6">
                    <h3>
                      {bus.RNum}&nbsp;&nbsp; {bus.RouteStartHolt} -{" "}
                      {bus.RouteStopHolt}
                    </h3>
                  </div>
                  <div class="col-md-6">
                    <h3>{Moment(bus.Date).format("YYYY-MM-DD")}</h3>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-md-3">
                    <p>
                      From: {bus.FromHolt} To: {bus.ToHolt}
                    </p>
                    <p>Time Duration:{bus.Duration} hours</p>
                  </div>
                  <div class="col-md-3">
                    <p>
                      Arriving Time:{Moment(bus.ArrivedTime).format("hh:mm A")}
                    </p>
                  </div>
                  <div class="col-md-3">
                    <p>Price:Rs {bus.TicketPrice} /=</p>
                  </div>
  
                  <div class="col-md-3">
                    <div class="form-group">
                      <a
                        href={urlBook}
                        class="btn btn-primary btn-lg btn-block"
                      >
                        BOOK NOW
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            )
          })
        ) : (
            <div className="center">No Buses available</div>
        );


        return (

        <section class="hero-section bg-light" id="services">
          <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-8">
                        <div class="text-center mb-5">
                            <h3 class="text-primary text-uppercase ">TICKETS RESERVATION SOLUTION</h3>
                        </div>
                    </div>
                </div> 
                <div class="row justify-content-center">
                    <div class="col-12 ">
                          {buslist}
                    </div>  
                </div>
          </div>
        </section>
   
  );
      }

  
}

export default withRouter(Bus_List);
