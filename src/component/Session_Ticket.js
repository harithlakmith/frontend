
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { withRouter} from "react-router-dom";

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
                       
                       <td class ="">{ses.Date}</td>
                       <td class ="">{ses.Price}</td>
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
                <div class="row">
                    <div class="text-center">
                    <table class="table table-hover table-info table-bordered text-center">
                        <thead>
                            <tr class="bg-info">
                                <th scope="col-lg-4">Ticket Id</th>
                                <th scope="col-lg-4">Session Id</th>
                                <th scope="col-lg-4">From</th>
                                <th scope="col-lg-4">To</th>
                                <th scope="col-lg-4">Passenger Id</th>
                                <th scope="col-lg-4">No of Seats</th>
                               
                                <th scope="col-lg-4">Date</th>
                                <th scope="col-lg-4">Price</th>
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
        
         );
    }
}
export default withRouter(Session_Ticket);