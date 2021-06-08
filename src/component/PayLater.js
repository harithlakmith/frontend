
import "bootstrap/dist/css/bootstrap.min.css";
import React ,{Component}from "react";
import axios from "axios";
import {withRouter} from "react-router-dom";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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
}
}

export default withRouter(Ticket);
