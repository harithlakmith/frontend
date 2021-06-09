import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import axios from "axios";
import {Redirect, withRouter} from 'react-router-dom';
import authHeader from "./../services/auth-header";
import Moment from "moment";
import { MDBDataTableV5, MDBIcon } from 'mdbreact';


class Ticket_List extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      Ticket: [],
      TId:'',    

      dte:'',

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


axios.get(window.$API_SERVER +"SearchTicket/" +id,{ headers: authHeader() })

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

    const data ={
      columns:[
        {
          label: 'Ticket Number',
          field: 'TicketNo',
          
          width: 80
          },
          {
          label: 'From',
          field: 'From',
        
          width: 100
          },
          {
          label: 'To',
          field: 'To',
          
          width: 100
          },
          {
          label: 'Number of Seats',
          field: 'NoOfSeat',
          
          width: 100
          },
          {
          label: 'Payment Status',
          field: 'PaymentStatus',
          
          width: 150
          },
          {
          label: 'Price',
          field: 'Price',
          
          width: 100
          },
          {
          label: 'Date',
          field: 'date',
            
          width: 100
          },
          {
          label: 'Status',
          field: 'Status',
        
          width: 100
          }
      ],
      rows: Ticket.map(tick =>{
            
        const dte = tick.Date;
        const date = Moment(dte.toLocaleString()).format('YYYY-MM-DD');
        const today = Moment(Date().toLocaleString()).format('YYYY-MM-DD');
        
        let sts = "";
        if (today > date){
            //sts = <span class="badge bg-danger">Expired</span>;
            sts = <span class="badge badge-danger">Expired</span>;
           
            
        }
        else {
            
            //sts = <span class="badge bg-success">Availble</span>
            sts =<span class="badge badge-success">Available</span>;
           
            
        }

        const psts = tick.PStatus;
        let Psts = "";
        let icon = "";
        let prc = "Rs "+tick.Price;
        let set = <span class="text-center"><p>{tick.NoOfSeats}</p></span>;
        let tNo =<span class="text-center b-2"><p>#{tick.TId}</p></span>;
        let dt = <span class="text-muted">{date}</span>
      
        if (psts == 0){
          Psts = <span class="text-danger">Not Paid</span>;
          icon = <MDBIcon className="pl-2 text-danger red-text" far icon="check-circle" />
         
      }
      else if (psts == 1){
            Psts = <span class="text-success">Paid</span>;
            icon = <MDBIcon className="pl-2 text-success green-text" far icon="check-circle" />
           
        }
        else if(psts ==2){
            Psts = <span class="text-warning">Paylater-Not Paid</span>;
            icon = <MDBIcon className="pl-2 text-warning red-text" icon="exclamation-circle"></MDBIcon>
        }
        else if(psts==3){
            Psts = <span class="text-warning">Paylater-Paid</span>;
            icon = <MDBIcon className="pl-2 text-success green-text pr-3" far icon="check-square" />
        }
         return {
           TicketNo: tNo,
           From: tick.FromHalt,
           To: tick.ToHalt,
           NoOfSeat: set,
           PaymentStatus:[Psts,icon],
           Price: prc,
           date: dt,
           
           Status:sts
    }
      })
    
      
    }
    
    

    return (
      <div>
        <div class="container mt-5 p-1">
          <div class="mt-5">
          <div class= "card-header headgd ">
                <h1 class="text-light">
               

                <i class="far fa-list-alt"></i>&nbsp;&nbsp;Ticket List
                </h1>
            
              </div>
            <div class="card">
             
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
                  
                  <MDBDataTableV5 
                    responsive 
                    hover s
                    triped 
                    bordered 
                    entriesOptions={[5, 10, 15]} 
                    entries={10} 
                    data={data} 
                    pagingTop 
                    searchTop 
                   // scrollY maxHeight='300px' 
                    searchBottom={false} 
                  />
 
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


export default withRouter (Ticket_List);
