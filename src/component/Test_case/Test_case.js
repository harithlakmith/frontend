
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
    axios.get(window.$API_SERVER +"Ticket" /*+id*/,{ headers: authHeader() })
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
                let cls = "";
                let sts = "";
                
                if (today > date){
                    sts = "Expired";
                    cls = "text-danger";
                    
                }
                else {
                    sts = "Available";
                    cls = "text-success";
                    
                }

                const psts = tick.PStatus;
                let Psts = "";
                let alt = "";
                if (psts == 1){
                    Psts = "Paid";
                    alt = "alert alert-info";
                }
                else{
                    Psts = "Not Paid";
                    alt = "alert alert-warning";
                }
              
                return( 
                    <tr>
                       <td class ="">{tick.TId}</td> 
                       <td class ="">{tick.FromHalt}</td>
                       <td class ="">{tick.ToHalt}</td>
                       <td class ={alt} role="alert">{Psts}</td>
                       <td class ="">{tick.NoOfSeats}</td>
                       <td class ="">{date}</td>
                       <td class ="">{tick.Price}</td>
                       <td class ={cls}>{sts}</td>
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
                    <u>Ticket List</u>
                </h1>
                <br></br>
                <div class="form-group ">
                  <div class="row ">
                    <div class="col text-left">
                      <label>NIC : </label>
                      {NIC}
                    </div>
                  </div>
                </div>
                <div class="form-group ">
                  <div class="row ">
                    <div class="col text-left">
                      <label>Email : </label>
                      {email}
                    </div>
                  </div>
                </div>
                <div class="row">
                <div class="col-lg-9">
                    <div class="text-center">
                    <table class="table table-hover  table-bordered text-center">
                        <thead>
                            <tr class="bg-info">
                                <th scope="col-lg-4">Ticket Id</th>
                                <th scope="col-lg-4">From</th>
                                <th scope="col-lg-4">To</th>
                                <th scope="col-lg-4">Payment Status</th>
                                <th scope="col-lg-4">No of Seats</th>
                                <th scope="col-lg-4">Date</th>
                                <th scope="col-lg-4">Price</th>
                                <th scope="col-lg-4">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ticlist}
                        </tbody>
                    </table>
                </div>
                
                </div>
                <div class="col-lg-3">
                  
                      <img class= "img-fluid" src="images/tickets.png" alt="ticket" />
                   
                </div>
                </div>
            </div>
        </div>
        
         );
    }
}
export default withRouter(Test_case);