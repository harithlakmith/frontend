
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import {Redirect, withRouter} from "react-router-dom";
import authHeader from "../../services/auth-header";
import Moment from "moment";

 class Test_case extends Component {

    constructor(props) {
        super(props);
        this.state = {
          Ticket: [],
          TId:'',    
          SId:'',
          From:'',
          To:'',
          FromHalt:'',
          ToHalt:'',
          Seats:'',
          PStatus:'',
          Date:'',
          Price:'',
          pid: '',
        
          
        }
    
      }

componentDidMount(){
  var Pass = JSON.parse(localStorage.getItem('userInfo'));
  var PEmail = Pass.Email; 
  this.setState({
    nic:Pass.NIC,
    mail:Pass.Email
  })
 
  axios.get(window.$API_SERVER +'Passenger/'+ PEmail,{ headers: authHeader() })  
      .then(res => {  
        this.setState({
          pid: res.data[0].PId
          
        });
        this.getTicket();
      })  
}

getTicket(){
  
    var id = this.state.pid
    axios.get(window.$API_SERVER +"Ticket/1" /*+id*/,{ headers: authHeader() })
        .then(res=>{
            this.setState({
                Ticket:res.data
                
              
            });
        })
}
    render() {

        var NIC = this.state.nic;
        var email = this.state.mail;
        const { Ticket } = this.state
        const ticlist = Ticket.length?(
            Ticket.map(tick =>{
                const dte = new Date(tick.Date);
                const date = Moment(dte.toLocaleString()).format('YYYY-MM-DD');
                const today = Moment(Date().toLocaleString()).format('YYYY-MM-DD');
                
                let sts = "";
                let alt = "";
                if (today > date){
                    sts = <span class="badge bg-danger">Expired</span>;
                    //cls = "text-danger";
                    //alt = "alert alert-danger";
                    
                }
                else {
                    //sts = "Available";
                    sts = <span class="badge bg-success">Availble</span>
                    //cls = "text-success";
                    //alt = "alert alert-success";
                    
                }

                const psts = tick.PStatus;
                let Psts = "";
                let icon = "";
                if (psts == 1){
                    Psts = "Paid";
                    icon = "fas fa-check-circle"
                   
                }
                else{
                    Psts = "Not Paid";
                    icon = "fas fa-exclamation-circle"
                }
              
                return( 
                    <tr>
                       <td class ="">{tick.TId}</td> 
                       <td class ="">{tick.FromHalt}</td>
                       <td class ="">{tick.ToHalt}</td>
                       <td class =""><i class={icon}></i> {Psts}</td>
                       <td class ="">{tick.NoOfSeats}</td>
                       <td class ="">{date}</td>
                       <td class ="">{tick.Price}</td>
                       <td class ="">{sts}</td>
                    </tr>
                       )
            })):(
                <div className="center">Not Tickets available</div>
            )
  
        return (  
            <div class="container p-1">
                <br></br>
                <br></br>
            <div class="mt-5">
                <h1>
                    <u>Ticket List</u>  <i class="far fa-list-alt"></i>
                </h1>
                <br></br>
                <div class="form-group ">
                  <div class="row ">
                    <div class="col text-left">
                    <i class="far fa-id-badge"></i> <label>NIC : </label>
                      {NIC}
                    </div>
                  </div>
                </div>
                <div class="form-group ">
                  <div class="row ">
                    <div class="col text-left">
                    <i class="far fa-envelope-open"></i> <label>Email : </label>
                      {email}
                    </div>
                  </div>
                </div>
                <div class="row">
                <div class="col-12 col-lg-9 col-sm-12">
                    <div class="text-center">
                    <table class="table table-hover table-striped  table-bordered text-left">
                        <thead class="table-dark">
                            <tr class="headgd">
                                <th scope="col-lg-4">Ticket Id</th>
                                <th scope="col-lg-4">From</th>
                                <th scope="col-lg-4">To</th>
                                <th scope="col-lg-4">Payment Status</th>
                                <th scope="col-lg-4">No of Seats</th>
                                <th scope="col-lg-4">Date</th>
                                <th scope="col-lg-4">Price</th>
                                <th scope="col-lg-4"><i class="fas fa-ticket-alt"></i> Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ticlist}
                        </tbody>
                    </table>
                </div>
                
                </div>
                <div class="col-lg-3 col-sm-12">
                  
                      <img class= "img-fluid" src="images/tickets.png" alt="ticket" />
                   
                </div>
                </div>
            </div>
            <section class="py-6 wave-img">
      
      <div class="container">
        <div class="row">
          <div class="col-lg-6 mx-auto text-center pb-4">
            <h4 class="text-gradient text-primary">Social Analytics</h4>
            <h2>Turn your idea into a startup</h2>
            <p class="lead">We’re constantly trying to express ourselves and actualize our dreams. If you have the opportunity to play </p>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-4 col-md-6">
            <div class="p-3 text-center">
              <div class="icon icon-shape bg-gradient-primary shadow mx-auto">
                <i class="ni ni-single-02"></i>
              </div>
              <h5 class="mt-4">Check our team</h5>
              <p>We get insulted by others, lose trust for those others. We get back here to follow my dreams</p>
            </div>
          </div>
          <div class="col-lg-4 col-md-6">
            <div class="p-3 text-center">
              <div class="icon icon-shape bg-gradient-info shadow mx-auto">
                <i class="ni ni-email-83"></i>
              </div>
              <h5 class="mt-4">Support 24/7</h5>
              <p>We get insulted by others, lose trust for those others. We get back here to follow my dreams</p>
            </div>
          </div>
          <div class=" col-lg-4 col-md-6 mx-md-auto">
            <div class="p-3 text-center">
              <div class="icon icon-shape bg-gradient-warning shadow mx-auto">
                <i class="ni ni-atom"></i>
              </div>
              <h5 class="mt-4">Unlimited revisions</h5>
              <p>We get insulted by others, lose trust for those others. We get back here to follow my dreams</p>
            </div>
          </div>
        </div>
        <hr></hr>
      </div>
      
    </section>
        </div>
        
         );
    }
}
export default withRouter(Test_case);