import "bootstrap/dist/css/bootstrap.min.css";
import React ,{Component}from "react";
import axios from "axios";
import {withRouter} from "react-router-dom";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import authHeader from "./../services/auth-header";
import {Spinner, Toast } from 'react-bootstrap';
import Moment from "moment";



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
        sms:'', 
        sending:true,
        isPaylater:'false',
        TickId:parseInt(localStorage.getItem('ticket')).tid
      };
        this.handleChange = this.handleChange.bind(this);
        this.sendsms = this.sendsms.bind(this);
       
}

      handleChange = (e) => {  
          this.setState(
            {[e.target.name]:e.target.value,
            });   
      }
      
      

      componentDidMount() {
          //const value = queryString.parse(this.props.location.search);
          const value = new URLSearchParams(this.props.location.search)
          var tid = value.get('tid');
          
          this.setState({
                success : value.get('success'),
                ticket: JSON.parse(localStorage.getItem('ticket')),
                userInfo:JSON.parse(localStorage.getItem('userInfo')),
                isPaylater:value.get('isPaylater'),
                TickId:parseInt(tid)
              });


            const ticket = JSON.parse(localStorage.getItem('ticket'));

          if(value.get('success')=="false"){
           
              fetch(window.$API_SERVER + 'Ticket/' + ticket.tid, { //delete ticket
                  method: 'DELETE',
                  headers: authHeader()
                })
                
                .then(res => console.log(res))
                .catch(err=> console.log(err))
  
          }else if(value.get('success')=="true"){

                if(value.get('isPaylater')=="false"){
                          //  this.sendsms();
                      axios.post(window.$API_SERVER + "Ticket/PaymentUpdate",{TId: ticket.tid, PStatus: 1}, { headers: authHeader() })//paid
                      .then((json) => {
                        console.log("st");
                        console.log(json.data);
                      });
                      console.log("stc");
                      }

                if(value.get('isPaylater')=="true"){
                  //  this.sendsms();
                      axios.post(window.$API_SERVER + "Ticket/PaymentUpdate",{TId: ticket.tid, PStatus: 2}, { headers: authHeader() })//paid
                      .then((json) => {
                        console.log("st");
                        console.log(json.data);
                      });
                      console.log("stc");
                      }
            

          }
      }

    

      sendsms(){
       const userInfo = JSON.parse(localStorage.getItem('userInfo'));
       const ticket = JSON.parse(localStorage.getItem('ticket'));
       var p = " " ;
        if(!this.state.isPaylater){
          p="(Online Pay)";
        }else{
          p="(PayLater)";
        }
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
                From:ticket.fromHolt,
                PayMethod:p
              }

            axios.post(window.$API_SERVER +"Payment/smsapi", obj)
                  .then(res=>{
                    this.setState({
                      msgStatus: res.data,
                      sms:res.data.code,
                    });

                  },error=>{
                    this.setState({
                      sms:'',
                    });

                  }).catch(err=>{
                    this.setState({
                      msgStatus: err.data,
                      sms:'',
                    })
                  })
      }
    
     
     

   printDocument=(e)=> {
    const {isPaylater, success,ticket,userInfo,sms} = this.state;
    const today = Moment(Date().toLocaleString()).format('YYYY-MM-DD');
    const t = this.state.success;
    const doc = new jsPDF();
    let QRimage = document.getElementById('qr');
    
    
    let y = 10;


doc.setLineWidth(0.5);
doc.rect(5, 5, 200, 50); // up box
doc.addImage("logo2.png", "PNG", 20, 10, 100, 35);

//doc.setLineWidth(0.8);
//doc.setDrawColor("#f7ad26");
//doc.setFillColor("#f9cf81");
//doc.roundedRect(160, 10, 40, 20, 3 , 3, "S");
doc.setFontSize(11);
doc.setFont("courier","bold");
doc.setTextColor("#000000");
doc.text("Payment Method:",130, 20,null, null, "left");
doc.text("Payment Status:",130, 25,null, null, "left");
doc.text("Printed Date  :",130, 30,null, null, "left");
doc.text(today,167, 30,null, null, "left");

var pIntent='';
if(isPaylater){
  doc.setTextColor("#f79a26");
  doc.text("PayLater(cash)",167, 20,null, null, "left");
  doc.setTextColor("#e80303");
  doc.text("Not paid",167, 25,null, null, "left");

      pIntent = "--< no pay-id in paylater mode >--";
}else{
  doc.setTextColor("#40d11a");
  doc.text("Online(stripe)",167, 20,null, null, "left");
  doc.text("Paid",167, 25,null, null, "left");

       pIntent = ticket.paymentIntent;
}

doc.setLineWidth(0.5);
doc.setDrawColor("#000000");
doc.rect(5, 60, 200, 230); // down box
doc.setFont("helvetica", "bold");
doc.setTextColor("#2d0dde");
doc.setFontSize(28);
doc.text("-------Ticket #" + ticket.tid + "-------", 105, 80, null, null, "center");
doc.setTextColor("#000000");
doc.setFontSize(14);
doc.setFont("times", "normal");
doc.text(ticket.sesDate, 105, y+90, null, null, "center");
doc.setFontSize(18);
doc.text(ticket.routeNo +" "+ ticket.routeStartHolt +" -  "+ ticket .routeStopHolt, 105, y+100, null, null, "center");
doc.text("[ "+ ticket.busNo +" ]", 105, y+110, null, null, "center");
doc.setFontSize(14);
doc.text("No of Seats " + ticket.seats, 105, y+120, null, null, "center");
doc.setFont("times", "bold");
doc.text("From - " + ticket.fromHolt, 105, y+130, null, null, "center");
doc.text("To - " + ticket.toHolt, 105, y+137, null, null, "center");
doc.setFont("times", "normal");
doc.setTextColor("#2d0dde");
doc.setFontSize(20);
doc.text("Bus Reach to " + ticket.fromHolt, 105, y+150, null, null, "center");
doc.text("@ " + ticket.ArrivedTime, 105, y+160, null, null, "center");
doc.setTextColor("#40d11a");
doc.setFontSize(27);
doc.setFont("helvetica", "bold");
doc.text("Price : Rs " + ticket.ticketPrice, 105, y+175, null, null, "center");
doc.setFont("times", "normal");
doc.setTextColor("#000000");

doc.addImage(QRimage, 'png', 85, y+185,40,40, "center");

doc.setTextColor("#9f9d9d");
doc.setFontSize(11);
doc.text("* This QR code valid only for PayLater passengers. They should provide this QR",45, y+235)
doc.text(" to the conductor when paying",47, y+240)
doc.setTextColor("#000000");
doc.setFontSize(12);
doc.setLineDash([2.5]);
doc.line(40, y+245, 180, y+245);
doc.setFillColor("#f7ad26");
doc.setTextColor("#f7ad26");
doc.setFont("courier","normal");
doc.text("P-id : " + pIntent, 55, y+255, null, null, "left");
doc.text("C-id : " + userInfo.Id, 55, y+261, null, null, "left");
doc.text("S-id : #" + ticket.sid, 55, y+267, null, null, "left");
doc.setLineWidth(0.5);
doc.setLineDash([0]);
doc.setDrawColor("#f7ad26");
doc.setFillColor("#f9cf81");
doc.roundedRect(45, y+250, 130, 20, 3 , 3, "S");

doc.save( "Ticketz.pdf");
  }
        
       

render(){

  const {success,ticket,userInfo,sms} = this.state;
  const pdfname = 'Ticketz-#'+ ticket.tid+'_'+userInfo.Id+'.pdf';
  const paylaterpath = '/ticket?isPaylater=true&success=true&TId='+ ticket.tid;

  var React = require('react');
  var QRCode = require('qrcode.react');
  const qrvalue = this.state.TickId;


  var smsshow = "";
  if(sms=="ok"){
    smsshow = "ok"
  }else{
    smsshow = ""};
  if(success=="true"){
     return(


        <div class="row justify-content-md-center mt-5 pt-5">
  
          <div class="col-lg-4 p-3 mt-5 ">
          <div class="container">
              <div class="row">
                <div class="col-lg">
                {this.state.isPaylater?(
                        <div class="alert alert-success" role="alert">
                        <i class="fas fa-check-circle"></i>&nbsp;&nbsp;Type : Pay Later (cash)
                    </div>
                ):(
                    <div class="alert alert-success" role="alert">
                    <i class="fas fa-check-circle"></i>&nbsp;&nbsp;Payment is Succesful!
                </div>
                )}

                </div>
              </div>

              {smsshow?(

                      <div class="row">
                      <div class="col-lg">
                        <div class="alert alert-success" role="alert">
                        <i class="fas fa-envelope"></i>&nbsp;&nbsp;Ticket details sent your mobile number (SMS)
                        </div>
                      </div>
                      </div>
              ):(

                      <div class="row">
                      <div class="col-lg">
                        <div class="alert alert-warning" role="alert">
                        <i class="fas fa-envelope"></i>&nbsp;&nbsp;Ticket details can't sent your mobile number<br/>
                        <div class="text-center">
                        <button class="btn btn-sm mt-2 btn-warning text-center" onClick={this.sendsms}>Try Again</button>
                        </div></div>
                      </div>
                      </div>

              )}

                <div class="row align-items-end">
                <div class="col-lg">
                    <div class="alert alert-info" role="alert">
                    <i class="fas fa-info-circle"></i>&nbsp;&nbsp;Your bus ({ticket.busNo}) will reach {ticket.fromHolt} @{ticket.ArrivedTime}.<b>Please stay at halt by this time.</b> 
                   </div>
                </div>
              </div>

              <div class="row align-items-end">
                <div class="col-lg">
                    <div class="alert alert-danger" role="alert">
                    <i class="fas fa-exclamation-circle"></i>&nbsp;&nbsp;Payment cannot<b> Refundable</b>. Please keep softcopy of the ticket in your phone or smartdevice.
                   </div>
                </div>
              </div>

              <div class="row align-items-end text-center">
                <div class="col-lg">
                <button class="btn btn-success" onClick={this.printDocument} >Download Ticket</button>
               
                </div>
              </div>

              <div class="row align-items-end text-center">
                <div class="col-lg">
                
                <a href="/home" class="m-4 btn btn-primary">Home Page</a>
                </div>
              </div>


            </div> 
          </div>

        
          <div class="col-lg-4 p-3">
              <div class=" pt-0  mt-3">
   
                  <div  class="card border-primary py-4 ">

                  <div id = "capture" className="Order-sum" >
                      <h1 class="card-title  text-center mt-4">
                        <u>Your Ticket #{ticket.tid}</u>
                      </h1>
                
                      <div  class="card-body text-center">
                              <h5 class="card-title">{ticket.sesDate}</h5>
                              <p class="card-text h4">{ticket.routeNo}&nbsp;&nbsp;{ticket.routeStartHolt}-{ticket.routeStopHolt}&nbsp;&nbsp;[{ticket.busNo}]</p>
                              <p class="card-text">No of Seats : {ticket.seats}</p>
                              <p class="card-text">From : {ticket.fromHolt}</p>
                              <p class="card-text">To : {ticket.toHolt}</p>
                              <h5 class="card-title text-success">Bus reach to {ticket.fromHolt} <br/> @ {ticket.ArrivedTime}</h5> 
                              <h4 class="card-title h2"> Price :Rs {ticket.ticketPrice}/=</h4>
                              <div class="alert alert-warning text-left text-warning h6" role="alert">
                                  P-Id&nbsp;: {ticket.paymentIntent}<br/>
                                  C-Id&nbsp;: {userInfo.Id}<br/>
                                  S-Id&nbsp;: #{ticket.sid}
                              </div>
                              {this.state.isPaylater?( <div id="pay" class="alert alert-success h6" role="alert">
                                PayLater Ticket
                              </div>):( <div id="pay" class="alert alert-success h6" role="alert">
                                Payment is Succesful!
                              </div>)}
                             
                              <QRCode id="qr" value={qrvalue} />
                              </div>
                     

                              </div>
                 
                  </div>
                
                
              </div>
              
          </div>  
        </div>
        


    
   );
  }else{

     return( <div>
      <br/> <br/> <br/> <br/><br/> <br/>
      <div class="container">
        <div class="row justify-content-md-center">
          <div class="col-lg-5 text-center">
               <div class="alert alert-danger h6" role="alert">
               Your Payment is Unsuccesful!<br/>
                <a href="/home" class="m-4 btn btn-danger">Home Page</a>
                
              </div>

          </div>
        </div>
      </div>
    
              </div>);
  }
    
  
}
}

export default withRouter(Ticket);
