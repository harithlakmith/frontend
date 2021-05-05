
import "bootstrap/dist/css/bootstrap.min.css";
import React ,{Component}from "react";
import axios from "axios";
import { Redirect, withRouter} from "react-router-dom";
import Moment from "moment";
import { loadStripe } from "@stripe/stripe-js";
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe("pk_test_51IWE6DDsAHRSZHe7VvLFM1XO1lHiqtFZ9fFv6pYiilf4x3qSBTPyQnFckUVhvH8ONt5tP9m41KCcnPt5kqvjDwR700t1eBL4ld");



class Book_Now extends Component {

  constructor(props) {
    super(props);
  this.state = {
    routeStartHolt:'',
    routeStopHolt:'',
    fromHolt:'',
    toHolt:'',
    sesDate:'',
    ticketPrice:'',
    ArrivedTime:'',
    routeNo:'',
    duration:'',
    busNo:'',
    fullTicket:1,
    halfTicket:0,
    totalTicket:0.00,
    seats:'',
    sid:0,
    postTId: '',
    loading: false,
    ticketInfo:[],
    userInfo:[],

  };
  this.handleChange = this.handleChange.bind(this);
    this.AddTicket = this.AddTicket.bind(this);
}

  ticketTot(){
    var tp = parseInt(this.state.ticketPrice);
    var ft = parseInt(this.state.fullTicket);
    var ht = parseInt(this.state.halfTicket);
    
    this.setState({
      totalTicket:tp*ft + (tp/2)*ht,
      seats:ft +ht
    });

   
  }

  handleChange = (e) => {
     
      this.setState(
        {[e.target.name]:e.target.value,
        });
      
  }

  componentDidMount() {
    this.intervalID = setInterval(
      () => this.ticketTot(),
      1000
    ); 

    //const value = queryString.parse(this.props.location.search);
    const value = new URLSearchParams(this.props.location.search)
    this.setState({
      routeStartHolt:value.get('routestartholt'),
      routeStopHolt:value.get('routestopholt'),
      fromHolt:value.get('fromholt'),
      toHolt:value.get('toholt'),
      sesDate:value.get('date'),
      ticketPrice:value.get('ticketprice'),
      ArrivedTime:value.get('arrivedtime'),
      routeNo:value.get('routeno'),
      duration:value.get('duration'),
      sid:value.get('sid'),
      busNo:value.get('busNo')
     
      });

      this.setState({
          userInfo : JSON.parse(localStorage.getItem('userInfo'))
      });

       
       
  }
    
      AddTicket(e) {  
        // debugger;  
         e.preventDefault(); 

         const obj = {  
           SId:parseInt(this.state.sid),  
           From:" 1",  
           FromHalt:this.state.fromHolt,  
           To: "1",  
           ToHalt :this.state.toHolt,
           PId:1,
           NoOfSeats:parseInt(this.state.seats),
           PStatus:0,
           Price:parseInt(this.state.totalTicket),
           Date:Moment(Date().toLocaleString()).format('YYYY-MM-DD')
       
         };  
         axios.post(window.$API_SERVER +'Ticket', obj)  
             .then(res => {
               this.setState({
                              postTId: res.data.TId }); 
                              this.paymentOpen(e);
                  }).catch(
                              e => console.error(e) 
                              ); 
              
          
       }  

       paymentOpen = async (event) => {

       
        var pr = parseFloat(this.state.totalTicket) * 100;
        const item ={
          TId:parseInt(this.state.postTId),
          Road:this.state.fromHolt +' to '+ this.state.toHolt,
          Price:parseInt(pr),
          CusEmail:this.state.userInfo.Email,
          Description:this.state.busNo+' | Ticket #'+parseInt(this.state.postTId)+' | Seats-'+parseInt(this.state.seats),

            }
           
            const stripe = await stripePromise;
            const response = await fetch(window.$API_SERVER +"Payment", {
              method: "POST",
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(item),
            });

            const session = await response.json();
            // When the customer clicks on the button, redirect them to Checkout.
             const ticketarray = {
                routeStartHolt:this.state.routeStartHolt,
                routeStopHolt:this.state.routeStopHolt,
                fromHolt:this.state.fromHolt,
                toHolt:this.state.toHolt,
                sesDate:this.state.sesDate,
                ticketPrice:parseInt(pr)/100,
                ArrivedTime:this.state.ArrivedTime,
                routeNo:this.state.routeNo,
                duration:this.state.duration,
                sid:this.state.sid,
                paymentStatus:0,
                paymentIntent:session.payment_id,
                tid:parseInt(this.state.postTId),
                seats:this.state.seats,
                busNo:this.state.busNo  };
                localStorage.removeItem('ticket');
                localStorage.setItem("ticket", JSON.stringify(ticketarray));

            const result = await stripe.redirectToCheckout({
              sessionId: session.id,
              });
              
            
            if (result.error) {
              // If `redirectToCheckout` fails due to a browser or network
              // error, display the localized error message to your customer
              // using `result.error.message`.
            }


       }
       

render(){
  if (JSON.parse(localStorage.getItem('role'))!='Passenger'){
    return <Redirect to={'/sign-in'} />
  }

     
  return (
    <div class="container p-1">
      <br></br>
      <div class="box">
        <h1>
          <u>TICKETS RESERVATION SOLUTION</u>
        </h1>
        <br></br>
        <form>
        <div class="card">
          <div class="card text-dark bg-light mb-3">
            <div class="card-header">
              <div class="row">
                <div class="col-md-6">
                  <h3>{this.state.routeNo}&nbsp;&nbsp;{this.state.routeStartHolt} - {this.state.routeStopHolt}</h3>
                </div>
                <div class="col-md-6">
                  <h3>{this.state.sesDate}</h3>
                </div>
              </div>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-3">
                 
                    <p class="h5"><i class="fas fa-location-arrow"></i>&nbsp;&nbsp;From: {this.state.fromHolt}</p>
                    <p class="h5 mb-5"><i class="fas fa-map-marker-alt"></i>&nbsp;&nbsp;To : {this.state.toHolt}</p>
                    <br/><br/>
                    <p class="text-center fixed-bottom text-muted">Powered by&nbsp;&nbsp; <i class="h3 fab fa-cc-stripe"></i></p>
                </div>
                <div class="col-md-4">
                  <table>
                    <tr class="h5"><i class="fas fa-clock"></i>&nbsp;&nbsp;Arriving time: {this.state.ArrivedTime}</tr>
                    <br></br><br></br>
                    <tr class="h5 ">
                    TICKET PRICE PER PASSENGER<br/><b class="h2"> Rs {this.state.ticketPrice}.00</b>
                    </tr>
                  </table>
                </div>
                <div class="col-md-5">
                  <table>
                    
                    <tr></tr>
                    <tr>Full tickets = <input type="number" min="0" class="form-control" name="fullTicket" placeholder="" value={this.state.fullTicket} onChange={this.handleChange} required="required"/></tr>
                    <tr>Half tickets = <input type="number" min="0" class="form-control" name="halfTicket" placeholder="" value={this.state.halfTicket} onChange={this.handleChange} /></tr>
                    <tr>
                      <h3>TOTAL PRICE = Rs {this.state.totalTicket}</h3>
                    </tr>
                    <tr>
                      <div class="form-group">
                        
                        <button
                        type="submit" onClick={this.AddTicket}
                        className="btn btn-primary btn-lg btn-block"
                        >
                         <span><i class="fas fa-lock"></i>&nbsp;&nbsp;Pay</span>
                        </button>
                        <br/>
                        
                      </div>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        </form>
      </div>
    </div>
  );}
}

export default withRouter(Book_Now);
