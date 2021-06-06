
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { withRouter} from "react-router-dom";
import Moment from "moment";

 class Session_Ticket extends Component {

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
          PId:'',
          Seats:'',
          PStatus:'',
          Date:'',
          Price:'',
        }
    
      }

componentDidMount(){
    const value = new URLSearchParams(this.props.location.search)
    var sid = value.get('sid');
    axios.get(window.$API_SERVER +"Ticket/session/"+sid)
        .then(res=>{
            this.setState({
                Ticket:res.data,
              
            });
        })
}
    render() {

        const { Ticket } = this.state;
    
        const ticlist = Ticket.length ? (
            Ticket.map(ses=>{

                return( 
                    <div class="card">
                <div class="card-header headgd text-light">
                  <div class="row">
                    <div class="col-md-6 align-left">
                      <h3 class="text-light" >
                        Ticket Number : {ses.TId}
                      </h3>
                    </div>
                    
                  </div>
                </div>
                <div class="card-body">
                  <div class="row">

                  <div class="col-md-3">
                      <p>
                        PId: &nbsp;{ses.PId}
                      </p>
                      <p>SId: &nbsp;{ses.SId}</p>
                    </div>

                    <div class="col-md-3">
                      <p>
                        From: &nbsp;{ses.FromHalt}
                      </p>
                      <p>To: &nbsp;{ses.ToHalt}</p>
                    </div>
                    <div class="col-md-3">
                      <p>No: of Seats :&nbsp;{ses.NoOfSeats} </p>
                      <p>Date :&nbsp;{Moment(ses.Date).format('YYYY-MM-DD')}</p>
                    </div>
                    <div class="col-md-3">
                      <p>Price:&nbsp;Rs{ses.Price}  /=</p>
                    </div>
  
                    
                  </div>
                </div>
              </div>
                       );
            })):(
                <div class="center col-12 col-lg-12">No tickets availabe</div>
            )
  
        return (  
            <div class="">
            	<div class="card" >
                <div class="card-body">
      
      
        <div class="mt-5 p-5">
          <h2 class="card-title card-header px-3 headgd  text-light">
                Ticket Information
                </h2>
                <br></br>
                <div class="row">
                    <div class="col-lg-12 col-sm-12">
                    
                        
                            {ticlist}
                       
                  
                    </div>
                </div>
            </div>
            </div>
            </div>
        </div>
        
         );
    }
}
export default withRouter(Session_Ticket);