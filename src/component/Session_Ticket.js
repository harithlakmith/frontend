import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { withRouter} from "react-router-dom";
import Moment from "moment";
//import Moment from "moment";
import { MDBDataTableV5, MDBIcon } from 'mdbreact';

 class Session_Ticket extends Component {

    constructor(props) {
        super(props);
        this.state = {
          Session: [],
          TId:'',    
          SId:'',
          From:'', 
          To:'',
          FromHalt:'',
          ToHalt:'',
          Seats:'',
          PStatus:'',
          Date:'',
          Price:'',
          sum : 0,
        }
    
      }

componentDidMount(){
    const value = new URLSearchParams(this.props.location.search)
    var sid = value.get('sid');
    //var sid = 26;
    axios.get(window.$API_SERVER +"Ticket/session/"+sid)
        .then(res=>{
            this.setState({
                Session:res.data,
              
            });
        })
}
    render() {

        const { Session } = this.state;
        var tot = 0;
        const Sdata ={
            columns:[
              {
                label: 'Ticket Number',
                field: 'TicketNo',
                
                width: 100
                },
                {
                label: 'Session ID',
                field: 'sid',
                  
                width: 100
                },
                {
                label: 'From',
                field: 'From',
              
                width: 150
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
                label: 'Price',
                field: 'Price',
                
                width: 100
                },
                {
                label: 'Date',
                field: 'date',
                  
                width: 100
                }
                
            ],
            rows: Session.map(ses =>{
              var seat = ses.NoOfSeats;
              var tick = ses.Price;
              var tottic = seat*tick;
                tot = tot + tottic;
             
              
               return {
                 TicketNo: ses.TId,
                 sid : ses.SId,
                 From: ses.FromHalt,
                 To: ses.ToHalt,
                 NoOfSeat: ses.NoOfSeats,
                 Price: ses.Price,
                 date :Moment(ses.Date.toLocaleString()).format('YYYY-MM-DD')
                
          }
            })
          
            
          }
    
        
  
                 
  
        return (  
            <div class="">
                <div class="card" >
                <div class="card-body">
      
      
        <div class="mt-5 p-5">
          <h2 class="card-title card-header px-3 headgd  text-light">
                Ticket Information
                </h2>
                <br></br>
                <div class= "row">
                    <div class= "col-12 col-md-6 col-lg-3">
                      <div class="alert alert-dark">
                      <h4>Total : Rs {tot}</h4>
                            
                      </div>
                        
                    </div> 
                </div>
                <div class="row">
                    <div class="col-lg-12 col-sm-12">
                    <MDBDataTableV5 
                    responsive 
                    hover 
                    striped 
                    bordered 
                    entriesOptions={[5, 10, 15]} 
                    entries={10} 
                    data={Sdata} 
                    searchTop 
                    info ={false}
                    scrollY maxHeight='300px' 
                    searchBottom={false} 
                  />
                        
                            
                       
                  
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