
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
                    <tr>
                       <td class ="">{ses.TId}</td> 
                       <td class ="">{ses.SId}</td>
                       <td class ="">{ses.FromHalt}</td>
                       <td class ="">{ses.ToHalt}</td>
                       <td class ="">{ses.PId}</td>
                       <td class ="">{ses.NoOfSeats}</td>
                       
                       <td class ="">{Moment(ses.Date).format('YYYY-MM-DD')}</td>
                       <td class ="">{ses.Price}</td>
                       </tr>
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
                    <div class="col-12">
                    <table class="table table-striped table-hover table-bordered">
                        <thead>
                            <tr class="headgd text-white">
                                <th scope="col-lg-4 col-4 col-sm-4">Ticket Id</th>
                                <th scope="col-lg-4 col-4 col-sm-4">Session Id</th>
                                <th scope="col-lg-4 col-4 col-sm-4">From</th>
                                <th scope="col-lg-4 col-4 col-sm-4">To</th>
                                <th scope="col-lg-4 col-4 col-sm-4">Passenger Id</th>
                                <th scope="col-lg-4 col-4 col-sm-4">No of Seats</th>
                               
                                <th scope="col-lg-4 col-4 col-sm-4">Date</th>
                                <th scope="col-lg-4 col-4 col-sm-4">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ticlist}
                        </tbody>
                    </table>
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