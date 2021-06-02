
import "bootstrap/dist/css/bootstrap.min.css";
import React ,{Component}from "react";
import axios from "axios";
import { Redirect, withRouter} from "react-router-dom";
import Moment from "moment";
import { loadStripe } from "@stripe/stripe-js";
import { Spinner, Toast } from 'react-bootstrap';
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
    fromHoltId:'',
    toHoltId:'',
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
    freeSeats:0,
    postTId: '',
    loading: false,
    ticketInfo:[],
    userInfo:[],
    loading:false,
    MaxSeats:0,
    MaxSeats2:0,
    limitEx: false,
    payDis:false,
    showA:true

  };
  this.handleChange = this.handleChange.bind(this);
    this.AddTicket = this.AddTicket.bind(this);
}

  ticketTot(){
    var tp = parseInt(this.state.ticketPrice);
    var ft = parseInt(this.state.fullTicket);
    var ht = parseInt(this.state.halfTicket);
  

    var AvSeat = parseInt(this.state.freeSeats);
    var fts = parseInt(this.state.fullTicket);
    var hts = parseInt(this.state.halfTicket);

    
    if((AvSeat-fts-hts)<0){
       var t = true;
    }else{
      var t = false;
    }

    this.setState({
      totalTicket:tp*ft + (tp/2)*ht,
      seats:ft +ht,
      MaxSeats:AvSeat-hts,
      MaxSeats2:AvSeat-fts,
      limitEx:t,
      payDis:t
    });

   
  }
  
  MaxSeat(){

    var AvSeat = parseInt(this.state.freeSeats);
    var fts = parseInt(this.state.fullTicket);
    var hts = parseInt(this.state.halfTicket);

    this.setState({
      MaxSeats:AvSeat-hts,
      MaxSeats2:AvSeat-fts,
    });

  }

  handleChange = (e) => {
     
      this.setState(
        {
          [e.target.name]:e.target.value,
         
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
      fromHoltId:value.get('fromholtId'),
      toHoltId:value.get('toholtId'),
      sesDate:value.get('date'),
      ticketPrice:value.get('ticketprice'),
      ArrivedTime:value.get('arrivedtime'),
      routeNo:value.get('routeno'),
      duration:value.get('duration'),
      sid:value.get('sid'),
      busNo:value.get('busNo'),
      freeSeats:value.get('freeSeats')
     
      });

      this.setState({
          userInfo : JSON.parse(localStorage.getItem('userInfo'))
      });

      var AvSeat = parseInt(value.get('freeSeats'));
      var fts = parseInt(this.state.fullTicket);
      var hts = parseInt(this.state.halfTicket);
      var x = AvSeat-hts-fts;
      this.setState({
        
        MaxSeats:AvSeat-hts,
        MaxSeats2:AvSeat-fts,
      });

       
  }
 
      AddTicket(e) {  
        // debugger;  
         e.preventDefault(); 

         this.setState({
           loading : true
         })

         const obj = {  
           SId:parseInt(this.state.sid),  
           From:parseInt(this.fromHoltId),  
           FromHalt:this.state.fromHolt,  
           To: parseInt(this.toHoltId),  
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

        toggleShowA(){
            this.setState({
              showA:false
            });
        }

render(){
  if (JSON.parse(localStorage.getItem('role'))!='Passenger'){
    return <Redirect to={'/sign-in'} />
  }
  const {loading }= this.state;
     
  return (
    <div class="container p-1">
      <br></br>
      <div class="box">
        <h1>
          <u>TICKETS RESERVATION SOLUTION</u>
        </h1>
        <br></br>
        <form>
       
          <div class="card border border-primary rounded mb-3">
            <div class="card-header p-3 headgd rounded">
              <div class="row ">
                <div class="col-md-6 ">
                  <h3 class="text-light">#{this.state.routeNo}&nbsp;&nbsp;{this.state.routeStartHolt} - {this.state.routeStopHolt}</h3>
                  <p class="card-text"><span class="text-light">&nbsp;<i class="fas fa-bus-alt"></i>&nbsp;&nbsp;Bus registraion no <b>{this.state.busNo}</b></span></p>
                </div>
                <div class="col-md-6  ">
                  <h3 class="text-light"><i class="fas fa-calendar-day"></i>&nbsp;&nbsp;{this.state.sesDate}</h3>
                </div>
              </div>
            </div>
            <div class="card-body">
              <div class="row pt-3 px-1 px-lg-5">
              <div class="col-12 col-lg-8  ">
                <div class="row">
                    <div class="col-12 col-lg-5 align-items-center">
                        <div class="card">
                          <img class="card-img-top" src="images/mappin.jpg" alt="Card image cap"/>
                          <div class="card-body">
                            <h5 class="card-title">From: {this.state.fromHolt}</h5>
                            <h5 class="card-title">To : {this.state.toHolt}</h5>
                            <p class="card-text"><small class="text-muted">Towns you entered</small></p>
                          </div>
                        </div>
                      
                        
                    </div>

                    <div class="col-12 col-lg-7">
                      
                      <div class="h5 text-center h-25"><i class="fas fa-clock"></i>&nbsp;&nbsp;Arriving time: {this.state.ArrivedTime}</div>
                      
                      <div class=" text-center h-25 ">
                            <div class="h5 align-bottom">
                          TICKET PRICE PER PASSENGER<br/><b class="h2 "> Rs {this.state.ticketPrice}.00</b>
                          </div>
                          
                      </div>
                      <div class=" text-center h-25 d-none d-lg-block ">
                        <img src="images/stripe.png" class="img-fluid p-5 " alt="Responsive image"></img>
                      </div>
                        
                    </div>

                  </div>
                </div>

                <div class="col-12 col-lg-4">
                
                   <div class="h-50"> <p class="font-weight-bold">No of Tickets&nbsp;&nbsp; <span class="alert alert-success">Available Only&nbsp;{this.state.freeSeats}&nbsp;seats</span></p>
                    <div class="input-group mb-2">
                      <div class="input-group-prepend">
                        <div class="input-group-text">Full</div>
                      </div>
                      <input type="number" min="0" max={this.state.MaxSeats} class="form-control" name="fullTicket" placeholder="" value={this.state.fullTicket} onChange={this.handleChange} required="required"/>
                    </div>
                    <div class="input-group mb-2">
                      <div class="input-group-prepend">
                        <div class="input-group-text">Half</div>
                      </div>
                      <input type="number" min="0" max={this.state.MaxSeats2} class="form-control" name="halfTicket" placeholder="" value={this.state.halfTicket} onChange={this.handleChange} />
                    </div>
                    
                     </div>  
                   <div class="h-25">
                   {this.state.limitEx &&(<div class="alert alert-danger"><i class="fas fa-exclamation-circle"></i>
                   &nbsp;&nbsp;Available seat limit excceded</div>
                   )}
                      <h3>TOTAL = Rs {this.state.totalTicket}</h3>
                    
                      <div class="form-group">
                        
                        <button type="submit" onClick={this.AddTicket}
                        className="btn btn-primary btn-lg btn-block" disabled={this.state.limitEx}>
                         <span>{loading ?(
                           <Spinner animation="border" role="status" size="sm" >
                           <span className="sr-only">Loading...</span>
                         </Spinner>
                         ):(<i class="fas fa-lock"></i>)}&nbsp;&nbsp;Pay&nbsp;&nbsp;</span>

                         
                            
                          </button>
                        <br/>
                        
                      </div>

                      
                    </div>
                    <div class=" text-center h-25 d-block d-lg-none ">
                        <img src="images/stripe.png" class="img-fluid p-5 " alt="Responsive image"></img>
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
