
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import {Redirect, withRouter} from "react-router-dom";
import authHeader from "./../services/auth-header";
import Moment from "moment";

 class Ticket_List extends Component {

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
  //var PEmail = Pass.Email; 
  var id = Pass.Id
  this.setState({
    nic:Pass.NIC,
    mail:Pass.Email
  })
 
  axios.get(window.$API_SERVER +"Ticket/" +id,{ headers: authHeader() })
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
               
                if (today > date){
                    sts = <span class="badge bg-danger">Expired</span>;
                   
                    
                }
                else {
                    
                    sts = <span class="badge bg-success">Availble</span>
                   
                    
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
                        <div class="col-12 col-lg-9 col-sm-12 col-md-12">
                   
                            <table class="table table-hover table-striped  table-bordered text-left">
                                <thead class="table-dark">
                                    <tr class="headgd">
                                        <th scope="col-lg-1 col-sm-1">Ticket Id</th>
                                        <th scope="col-lg-1 col-sm-2">From</th>
                                        <th scope="col-lg-1 col-sm-2">To</th>
                                        <th scope="col-lg-1 col-sm-2">Payment Status</th>
                                        <th scope="col-lg-1 col-sm-1">No of Seats</th>
                                        <th scope="col-lg-2 col-sm-2">Date</th>
                                        <th scope="col-lg-1 col-sm-1">Price</th>
                                        <th scope="col-lg-1 col-sm-1"><i class="fas fa-ticket-alt"></i> Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ticlist}
                                </tbody>
                            </table>
             
                
                        </div>
                        <div class="col-lg-3 col-sm-6 col-md-6">
                  
                            <img class= "img-fluid" src="images/tickets.png" alt="ticket" />
                   
                        </div>
                    </div>
                </div>
            </div>
        
         );
    }
}
export default withRouter(Ticket_List);