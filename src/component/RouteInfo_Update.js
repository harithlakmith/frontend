
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import axios from "axios";
import {Redirect, withRouter} from 'react-router-dom';
import authHeader from "./../services/auth-header";

class RouteInfo_Update extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      RId: "",
      halt:'',
      price:'',
      time:'',
      dist:'',
     
    };
   
    
    
    
    this.handleChange = this.handleChange.bind(this);
    //this.UpdateRoute = this.UpdateRoute.bind(this);
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  

  

  UpdateRouteInfo = () => {
    //event.preventDefault();

    axios
      .post(window.$API_SERVER+"RouteInfo/RouteInfoUpdate", {
      
        RId: parseInt(this.state.RId),
        HoltName: this.state.halt,
        Price: parseInt(this.state.price),
        Time: parseFloat(this.state.time),
        Distance: parseInt(this.state.dist),
       
      }, { headers: authHeader() })
      .then(res => {
        if (res.data == 201){
          this.setState({
            message: 'Update Succeed'
    })
        }
      });
     
  };

  

  

  componentDidMount(){
     var value = new URLSearchParams(this.props.location.search);
     this.setState({
        RId : value.get('RId'),
        //RId : 1,
        halt : value.get('HoltName'),
        //halt : 'Colombo',
        price : value.get('Price'),
        //price : 0,
        time : value.get('Time'),
        //time : 0,
        dist : value.get('Distance'),
        //dist : 0

     })
    
    
  }


  render() {
  if (JSON.parse(localStorage.getItem('role'))!='Administrator'){
      return <Redirect to={'/sign-in'} />
    }
    

    return (
      <div>
        <div class="container mt-5 p-1">
          <div class="mt-5">
            <div class="card">
              <div class= "card-header headgd ">
            <h1 class="text-light">
               Routes Information Update Form
            </h1>
            <h5 class="text-light">Please fill in this form to update route information!</h5>
              </div>
            <br></br>
            <br></br>

              <div class="class-body">
          
             <div class="row">
             <div class="col-lg-12 col-sm-12">
             <table class="table table-hover">
               <thead>
                 <tr class="headgd text-light">
                   <th scope="col"><i class="fas fa-store-alt"></i> Halt</th>
                   <th scope="col"><i class="far fa-money-bill-alt"></i> Price</th>
                   <th scope="col"><i class="far fa-clock"></i> Time</th>
                   <th scope="col"><i class="fas fa-road"></i> Distance</th>
                   <th scope="col"><i class="fas fa-hourglass-half"></i> Action</th>
                 </tr>
               </thead>
               <tbody>
                <tr>
                  <td><input class="form-control" name="halt" type="text" onChange={this.handleChange} value={this.state.halt} ></input></td>
                  <td><input class="form-control" name="price" type="text" onChange={this.handleChange} value={this.state.price} ></input></td>
                  <td><input class="form-control" name="time" type="text" onChange={this.handleChange} value={this.state.time}></input></td>
                  <td><input class="form-control" name="dist" type="text" onChange={this.handleChange} value={this.state.dist}></input></td>
                  <td><button type="submit" onClick={this.UpdateRouteInfo} class="btn btn-primary btn-sm" >
                      Update
                      </button></td>
              </tr>
                 
               </tbody>
             </table>
 
             </div>
           </div>
           </div>
 
          
            <p></p>
          

       <br/><br/>
       </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter (RouteInfo_Update);
