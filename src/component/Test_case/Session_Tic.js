import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { withRouter} from "react-router-dom";
import Moment from "moment";

 class Session_Tic extends Component {

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
        var totalTicket = 0;
        const ticlist = Ticket.length ? (
            Ticket.map(ses=>{
                totalTicket=totalTicket+ses.Price;
                return( 
                    <tr class="">
                       <td ><div class="alert alert-info">{ses.TId}</div></td> 
                      
                       <td>
                           <tr>
                               <td>{ses.FromHalt}&nbsp;to&nbsp;{ses.ToHalt}</td>
                               <td>Rs&nbsp;{ses.Price}/=</td>
                               <td>{ses.PId}</td>
                               <td>No of Seats:{ses.NoOfSeats}</td>
                               <td>{Moment(ses.Date.toLocaleString()).format('YYYY-MM-DD')}</td>
                           </tr>
                            <div class=" p-1">
                                <div class="">
                                    <h5 class="card-title"><span class="float-right"></span></h5>
                                    <p class="card-text"></p>
                                    
                                </div>
                            </div>

                       </td>
                      
                       </tr>
       
                       );
            })):(
                <div className="center">No tickets availabe</div>
            )
            
        return (  
            <div class="container p-1">
            <div class="">
                <h1>
                    <u>Ticket Information</u>
                </h1>
                <br></br>

                
          <div class="card-deck">
            <div class="card bg-light text-dark p-5">
              <div class="card-body ">
                <div class="row">
                    <div class="text-center">
                    <table class="table text-center">
                        <thead>
                            <tr class="">
                                <th scope="col-lg-2">#Ticket Ref</th>
                                
                                <th>Details</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {ticlist}
                        </tbody>
                    </table>
                    </div>
                    </div>
                    <div class="card bg-light text-dark">
                         <div class="card-body">
                                {totalTicket}
                        </div> 
                    </div> 
                    </div> 
                    </div>
                </div>
            </div>
        </div>
        
         );
    }
}
export default withRouter(Session_Tic);