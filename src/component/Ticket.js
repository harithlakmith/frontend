//import logo from "./../../logo.svg";
//import "./Book_Now.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React ,{Component}from "react";
import axios from "axios";
import { RouteComponentProps, BrowserRouter, Switch, Route, Link, useLocation, useRouteMatch,withRouter, useParams} from "react-router-dom";
import Moment,{ now } from "moment";
import { Barcode } from 'react-barcode';
import jsPDF from 'jspdf';  
import html2canvas from 'html2canvas'; 
import Button from "react-validation/build/button";


class Ticket extends Component {

  constructor(props) {
    super(props);
      this.state = {
        fullTicket:1,
        halfTicket:0,
        totalTicket:0.00,
        seats:'',
        sid:0,
        userInfo:[],
        ticket:[],
        success:undefined,
        msgStatus:[],
      };
        this.handleChange = this.handleChange.bind(this);
        this.sendsms = this.sendsms.bind(this);
}

      handleChange = (e) => {  
          this.setState(
            {[e.target.name]:e.target.value,
            });   
      }

      printDocument() {  
        const input = document.getElementById('pdfdiv');  
        html2canvas(input)  
          .then((canvas) => {  
            var imgWidth = 200;  
            var pageHeight = 290;  
            var imgHeight = canvas.height * imgWidth / canvas.width;  
            var heightLeft = imgHeight;  
            const imgData = canvas.toDataURL('image/png');  
            const pdf = new jsPDF('p', 'mm', 'a4')  
            var position = 0;  
            var heightLeft = imgHeight;  
            pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);  
            pdf.save("download.pdf");  
          });  
      }  

      componentDidMount() {
          //const value = queryString.parse(this.props.location.search);
          const value = new URLSearchParams(this.props.location.search)
          this.setState({
                success : value.get('success'),
                ticket: JSON.parse(localStorage.getItem('ticket')),
              });

          if(value.get('success')=="true"){
              // this.sendsms();
          }   
      }

      sendsms(){
       const userInfo = JSON.parse(localStorage.getItem('userInfo'));
       const ticket = JSON.parse(localStorage.getItem('ticket'));
        
              const obj = {
                TId:parseInt(ticket.tid),
                Road:ticket.fromHolt+" to "+ticket.toHolt,
                Price: parseInt(ticket.ticketPrice),
                Seats:parseInt(ticket.seats),
                Date:ticket.sesDate,
                SId:parseInt(ticket.sid),
                Telephone:'94'+ userInfo.Tp,
                BusNo:ticket.busNo,
                ReachTime:ticket.ArrivedTime,
                From:ticket.fromHolt
              }

            axios.post("http://localhost:5000/Payment/smsapi", obj)
                  .then(res=>{
                    this.setState({
                      msgStatus: res.data,
                    });

                  }).catch(err=>{
                    this.setState({
                      msgStatus: err.data,
                    })
                  })
      }
    
     

        
       

render(){

  const {success,ticket} = this.state;
  if(success=="true"){
     return(


        <div class="row justify-content-md-center mt-5 pt-5">
          <div class="col-lg-4 p-3 mt-5 ">
          <div class="container">
              <div class="row">
                <div class="col-lg">
                  <div class="alert alert-success" role="alert">
                    Payment is Succesful!
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-lg">
                  <div class="alert alert-success" role="alert">
                      Ticket details sent your mobile number (SMS)
                  </div>
                </div>
              </div>

              <div class="row align-items-end">
                <div class="col-lg">
                    <div class="alert alert-danger" role="alert">
                     *Payment cannot refundable. Please keep softcopy of the ticket in your phone or smartdevices.
                   </div>
                </div>
              </div>
            </div>   
            
          </div>
          <div  class="col-lg-4 p-3">
              <div class=" pt-0  mt-3">
   
                  <div class="card bg-dark text-light p-4 ">
                      <h1 class="card-title text-light text-center mt-4">
                        <u>Your Ticket #{ticket.tid}</u>
                      </h1>
                   
        <table id="pdfdiv" class="table table-hover table-info table-bordered">
                <thead>
                  <tr class="bg-info">
                    <th scope="col-lg-3">Bus No</th>
                    <th scope="col-lg-3">Driver Name</th>
                    <th scope="col-lg-3">Driver No</th>
                    <th scope="col-lg-3">Conductor Name</th>
                    <th scope="col-lg-3">Conductor No</th>
                    <th scope="col-lg-3">No of Seats</th>
                    <th scope="col-lg-3">Email</th>
                   
                  </tr>
                </thead>
                <tbody>
                <tr>ok</tr>
                </tbody>
              </table>
                
                      <div  class="card-body text-center">
                              <h5 class="card-title text-light">{ticket.sesDate}</h5>
                              <p class="card-text">{ticket.routeNo}&nbsp;&nbsp;{ticket.routeStartHolt}-{ticket.routeStopHolt}&nbsp;&nbsp;#{ticket.sid}</p>
                              <p class="card-text">No of Seats : {ticket.seats}</p>
                              <p class="card-text">From : {ticket.fromHolt}</p>
                              <p class="card-text">To : {ticket.toHolt}</p>
                              <h5 class="card-title text-success">Bus reach to {ticket.fromHolt} <br/> @ {ticket.ArrivedTime}</h5> 
                              <h4 class="card-title text-light">Ticket Price :Rs {ticket.ticketPrice}/=</h4>
                              <Button onClick={this.printDocument}>  
                        Generate Pdf  
                                </Button> 
                      </div>

              
                 
                  </div>
                 
                
              </div>
          </div>  
        </div>
        


    
   );
  }else{
     return(<u>unsuccess</u>);
  }
    
  
}
}

export default withRouter(Ticket);
