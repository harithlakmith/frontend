import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import axios from "axios";
import {Redirect, withRouter} from 'react-router-dom';
import authHeader from "./../services/auth-header";
import Moment from "moment";

class Test_case extends React.Component {
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
            return ( 
              <div class="card">
                <div class="card-header headgd text-light">
                  <div class="row">
                    <div class="col-md-6 align-left">
                      <h3 class="text-light" >
                        Ticket Number : {tick.TId}
                      </h3>
                    </div>
                    <div class="col-md-6 align-right">
                      <h3 class="text-light"><i class={icon}></i> {Psts}</h3>
                    </div>
                  </div>
                </div>
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-3">
                      <p>
                        From: &nbsp;{tick.FromHalt}
                      </p>
                      <p>To: &nbsp;{tick.ToHalt}</p>
                    </div>
                    <div class="col-md-3">
                      <p>No: of Seats :&nbsp;{tick.NoOfSeats} </p>
                      <p>Date :&nbsp;{date}</p>
                    </div>
                    <div class="col-md-3">
                      <p>Price:&nbsp;Rs{tick.Price}  /=</p>
                    </div>
  
                    <div class="col-md-3">
                      {sts}
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        ) : (
            <div className="center">No Tickets available</div>
        );
    

    return (
      <div>
        <div class="container mt-5 p-1">
          <div class="mt-5">
            <div class="card">
              <div class= "card-header headgd ">
                <h1 class="text-light">
               
                  <u>Ticket List</u>  <i class="far fa-list-alt"></i>
                </h1>
            
              </div>
              <br></br>
              <br></br>

              <div class="class-body">
              <div class="container">
                <div class="row ">
                  <div class="col text-left">
                    <i class="far fa-id-badge"></i> <label>NIC : </label>
                      {NIC}
                  </div>
                </div>
                <br></br>
                <div class="row ">
                  <div class="col text-left">
                    <i class="far fa-envelope-open"></i> <label>Email : </label>
                      {email}
                  </div>
                </div>
                <br></br>
                <div class="row">
                  <div class="col-lg-12 col-sm-12">
                    {ticlist}
 
                  </div>
                </div>
              </div>
              </div>
 
          
                <p></p>
          

              <br/><br/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter (Test_case);