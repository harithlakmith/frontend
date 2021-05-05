
import "bootstrap/dist/css/bootstrap.min.css";
import React ,{Component}from "react";
import axios from "axios";
import {withRouter} from "react-router-dom";
import Pdf from "react-to-pdf";
const ref = React.createRef();

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
          this.setState({
                success : value.get('success'),
                ticket: JSON.parse(localStorage.getItem('ticket')),
                userInfo:JSON.parse(localStorage.getItem('userInfo')),
              });

          if(value.get('success')=="true"){
               this.sendsms();
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
    
     

        
       

render(){

  const {success,ticket,userInfo,sms} = this.state;
  const pdfname = 'Ticketz-#'+ ticket.tid+'_'+userInfo.Id+'.pdf';
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
                  <div class="alert alert-success" role="alert">
                  <i class="fas fa-check-circle"></i>&nbsp;&nbsp;Payment is Succesful!
                  </div>
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
                    <Pdf targetRef={ref} filename={pdfname}  x={.5} y={.5} scale={1}>
                      {({ toPdf }) => <button class="btn btn-lg btn-info mt-5" onClick={toPdf}>Download Ticket&nbsp;&nbsp;<i class="fas fa-download"></i></button>}
                    </Pdf>
                </div>
              </div>

            </div> 
          </div>
          <div ref={ref} style={{width: 10500, height: 10500}}   class="col-lg-4 p-3">
              <div class=" pt-0  mt-3">
   
                  <div  class="card border-primary py-4 ">
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
                              <div class="alert alert-success h6" role="alert">
                                Payment is Succesful!
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
                Payment is Unsuccesful!<br/>
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
