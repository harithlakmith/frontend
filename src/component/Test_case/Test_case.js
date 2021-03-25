import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

 class Test_case extends Component {

	constructor(props){ 
		super(props) 
		this.state = {
		  NIC:'',
		  First_name:'',
		  Last_name:'',
		  Email:'',
		  Password:'',
		  Telephone:''
		};
	    this.handleChange = this.handleChange.bind(this);
		this.AddPass = this.AddPass.bind(this);
	  }
	  
		handleChange = (e) => {
		  this.setState({[e.target.name]:e.target.value});
		}
	  
		AddPass = () => {
		  //event.preventDefault();
		  axios.post('localhost:5000/api/Accounts/PassengerRegister', {
			//PID: parseInt(this.state.NIC),
			Name: this.state.First_name,
			Email: this.state.Email,
			Password: this.state.Password,
			Tp: parseInt(this.state.Telephone),
			Token : 'test',
			Verified:0
	
		})
		  .then(json => {
		  
			  console.log(json.data);  
			
		  });   
	
		}
	
render() {
	return (
	
<div class="row justify-content-md-center">
    <div class="col-lg-6 mt-5 ">
       <div  class=" mt-5 p-3 ">
          <div class="card bg-light text-dark mt-1 p-3">
					<h1 class="p-3 text-center card-title"><i class="fas fa-users"></i>&nbsp;&nbsp;
			  			<u>Passenger Registration Form</u>
					</h1>

		  	<form>
			
				<div class="form-group ">
	
					<div class="form-group">
			   			<input type="text" pattern="[0-9]*" class="form-control" name="NIC" onChange={this.handleChange} value={this.state.NIC} placeholder="NIC" required="required"/>
					</div>
					<div class="row">
						<div class="col"><input type="text" class="form-control" name="First_name" onChange={this.handleChange} value={this.state.First_name} placeholder="First Name" required="required"/></div>
						<div class="col"><input type="text" class="form-control" name="Last_name" onChange={this.handleChange} value={this.state.Last_name} placeholder="Last Name" required="required"/></div>
					</div>        	
				</div>
					<div class="form-group">
						<input type="text" class="form-control" name="Email" onChange={this.handleChange} value={this.state.Email} placeholder="Email" required="required"/>
					</div>
					<div class="form-group">
						<input type="text" class="form-control" name="Password" onChange={this.handleChange} value={this.state.Password} placeholder="Password" required="required"/>
					</div>
					<div class="form-group">
						<input type="text" pattern="[0-9]*" class="form-control" onChange={this.handleChange} value={this.state.Telephone} name="Telephone" placeholder="Telephone" required="required"/>
					</div>        
			
					<div class="form-group">
						<button type="submit" onClick={this.AddPass} class="btn btn-primary btn-lg">Register</button>
					</div>
			</form>
	
		
		</div>
	</div>
	</div>
	</div>
	  );
	  }
  
}
export default Test_case ;