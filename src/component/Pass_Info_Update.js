
//import './Pass_Info_Update.css';
//import Pass_Info_Update from './component/pass_info_update/Pass_Info_Update';
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import axios from "axios";
import authHeader from "./../services/auth-header";

class Pass_Info_Update extends React.Component {

    constructor(props) {  
        super(props)   
    
         this.state = {  
            nic:'',
            name: '',  
            email: '',  
            password: '' , 
            telephone:'',     
    
        }  
             
        this.handleChange = this.handleChange.bind(this);  
        this.UpdatePassenger = this.UpdatePassenger.bind(this); 
    }  

    
    handleChange = (e) => {
      this.setState({[e.target.name]:e.target.value});
    }
    
    componentDidMount() { 
      var Pass = JSON.parse(localStorage.getItem('userInfo'));
      var PEmail = Pass.Email;  
      axios.get('http://localhost:5000/Passenger/'+PEmail,{ headers: authHeader() })  
          .then(response => {  
              this.setState({ 
                              nic: response.data.NIC, 
                              Fname: response.data.FirstName,
                              Lname: response.data.LastName,  
                              telephone: response.data.Tp,  
                              email: PEmail,  
                              password : response.data.Password 
                
            });  
    
          })  
          .catch(function (error) {  
              console.log(error);  
          })  
    } 
    
    
   
    
    UpdatePassenger(e) {  
     // debugger;  
      e.preventDefault();  
      const obj = {  

        FirstName: this.state.Fname, 
        LastName: this.state.Lname,  
        Tp: parseInt(this.state.telephone),  
        Email: this.state.email,  
        Password: this.state.password,      
    
      };  
      axios.post('http://localhost:5000/api/Accounts/PassUpdate', obj, { headers: authHeader() })  
          .then(res => console.log(res.data));  
    }  
    
render(){

  const {nic} = this.state;

  return (
    <div  class="card bg-primary p-3">
      <div class="card bg-light text-dark mt-4">
        <h1 class="card-title">
          <u>Passenger Information Update</u>
        </h1 >
        <form class="m-5">
          <p class="text-white">Please fill in this form to create an account!</p>
          <hr />

          <div class="form-group ">
            <div class="row ">
              <div class="col">
                <label>NIC : </label>
                <input
                  type="text"
                  class="form-control"
                  value={nic}
                  disabled="true"
                />
                
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="row">
              <div class="col">
                <input
                  type="text"
                  class="form-control"
                  name="Fname"
                  value={this.state.Fname}
                  onChange={this.handleChange} 
                  placeholder="First Name"
                  required="required"
                />
              </div>
              <div class="col">
                <input
                  type="text"
                  class="form-control"
                  name="Lname"
                  value={this.state.Lname} 
                  onChange={this.handleChange} 
                  placeholder="Last Name"
                  required="required"
                />
              </div>
            </div>
          </div>
          
          <div class="form-group">
            <input
              type="password"
              class="form-control"
              name="password"
              value={this.state.password} 
              onChange={this.handleChange} 
              placeholder="Password"
              required="required"
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              name="telephone"
              value={this.state.telephone} 
              onChange={this.handleChange} 
              placeholder="Telephone"
              required="required"
            />
          </div>
          <div class="form-group"></div>
          <div class="form-group">
          <button type="submit" onClick={this.UpdatePassenger} class="btn btn-primary btn-lg">
                  Update
                </button>
          </div>
        </form>
       
      </div>
    </div>
  );
}}

export default Pass_Info_Update;
