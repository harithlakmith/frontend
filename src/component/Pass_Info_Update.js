import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import authHeader from "./../services/auth-header";

class Pass_Info_Update extends Component {

  constructor(props) {  
    super(props)  
     this.state = {  
        nic:'',
        name: '',  
        email: '',  
        password: '' , 
        telephone:'',
        Test:[]
    }; 
    
    this.handleChange = this.handleChange.bind(this);  
    this.UpdatePassenger = this.UpdatePassenger.bind(this);  

}  

handleChange = (e) => {
  this.setState({[e.target.name]:e.target.value});
}

componentDidMount() { 
  var Pass = JSON.parse(localStorage.getItem('userInfo'));
  var PEmail = Pass.Email; 
  this.setState({
    nic:Pass.NIC,
  })
  axios.get(window.$API_SERVER +'Passenger/'+ PEmail,{ headers: authHeader() })  
      .then(res => {  
          this.setState({ 

            Fname: res.data.FirstName,
            Lname: res.data.LastName,  
            telephone: res.data.Tp,  
            email: PEmail,  
            //password : res.data.Password   
        });  

      })  
      .catch(function (error) {  
          console.log(error);  
      })  
} 

UpdatePassenger(e) { 
  
  var Pass = JSON.parse(localStorage.getItem('userInfo'));
  var PEmail = Pass.Email; 
   
  e.preventDefault();  
  const obj = {    
    FirstName: this.state.Fname, 
    LastName: this.state.Lname,  
    Tp: parseInt(this.state.telephone),  
    //Email: this.state.email, 
    Email: PEmail,  
    Password: this.state.password ,
    //Verified:1
  };  
  this.setState({
          Test:obj,
  });
  axios.post(window.$API_SERVER +'api/Accounts/PassUpdate', obj, { headers: authHeader() })  
      .then(res => console.log(res.data));  

} 



  render() {
	  var NIC = this.state.nic;

  return (

    <div class="row justify-content-md-center">
      <div class="col-lg-6 mt-5 ">
         <div  class=" mt-5 p-3 ">
            <div class="card bg-light text-dark mt-1">
              <h1 class="p-3 text-center card-title">
                <u>Passenger Information Update</u>
              </h1 >
              <form class="text-center px-4">
                <p class="text-dark">Please fill in this form to create an account!</p>

                <div class="form-group ">
                  <div class="row ">
                    <div class="col text-left">
                      <label>NIC : </label>
                      {NIC}
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

      </div>
    </div>


    
  );
}
}
export default Pass_Info_Update;