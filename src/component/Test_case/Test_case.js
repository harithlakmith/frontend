import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import authHeader from "../services/auth-header";

class Pass_Info_Update extends Component {

  constructor(props) {  
    super(props)  
     this.state = {  
        nic:'',
        name: '',  
        email: '',  
        password: '' , 
        telephone:'',
        Test:[],
        NPassword:'',
        OPassword:'',
        CPassword:''
    }; 
    
    this.handleChange = this.handleChange.bind(this);  
    this.UpdatePassenger = this.UpdatePassenger.bind(this); 
    this.UpdatePassword = this.UpdatePassword.bind(this);  

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

            Fname: res.data[0].FirstName,
            Lname: res.data[0].LastName,  
            telephone: res.data[0].Tp,  
            email: PEmail,  
            //password : res.data.Password   
        });  

      })  
      .catch(function (error) {  
          console.log(error);  
      })  
} 

UpdatePassword() {
  var Pass = JSON.parse(localStorage.getItem('userInfo'));
  var PEmail = Pass.Email; 
  //debugger;
  //e.preventDefault();
  const obj = {
    Email: PEmail, 
    OldPassword: this.state.OPassword,
    NewPassword: this.state.NPassword,
    ConfirmPassword: this.state.CPassword,
  };

  axios
  .post(window.$API_SERVER +"Accounts/PassengerPasswordUpdate", obj, {
    headers: authHeader(),
  })
  .then((res) => {
    this.setState({
            upPassOk:"ok"
    },error=>{
      this.setState({
        upPassOk:""
        })

    })
  });
// debugger;
//this.props.history.push('/Studentlist')
}  

UpdatePassenger() { 
  
  var Pass = JSON.parse(localStorage.getItem('userInfo'));
  var PEmail = Pass.Email; 
   
  //e.preventDefault();  
  const obj = {    
    FirstName: this.state.Fname, 
    LastName: this.state.Lname,  
    Tp: parseInt(this.state.telephone),  
    //Email: this.state.email, 
    Email: PEmail,  
    //Password: this.state.password ,
    //Verified:1
  };  
  this.setState({
          Test:obj,
  });
  axios.post(window.$API_SERVER +'Accounts/PassUpdate', obj, { headers: authHeader() })  
      .then(res => console.log(res.data));  

} 



  render() {
	  var NIC = this.state.nic;

  return (
    <div class="card p-3 mt-5">
    <div class="card-body mt-5 ">
      <h2 class="card-title card-header px-3 headgd text-center text-light ">
                Passenger Information Update
              </h2 >
          <br></br>
          <p class="text-dark text-center">Please fill in this form to update an account!</p>
      <div class="card-deck ">
        <div class="card bg-light text-dark p-3  ">
          <br></br>
          <div class="card-body mt-3 ">
          <form class=" px-4">
               
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
                   <div class="col-12 col-lg-6 col-sm-12">
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
                   <div class="col-12 col-lg-6 col-sm-12">
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
                   type="text"
                   class="form-control"
                   name="telephone"
                   value={this.state.telephone} 
                   onChange={this.handleChange} 
                   placeholder="Telephone"
                   required="required"
                 />
               </div>
              
               <div class="form-group">
               <button type="submit" onClick={this.UpdatePassenger} class="btn btn-primary btn-s">
                       UPDATE
                     </button>
               </div>
             </form>
          </div>
        </div>
        

        <div class="card bg-light text-dark w-50 p-3 ">
          <div class="card-body  mt-3 ">
           
            <form class=" px-4">

            <div class="form-group ">
                 <div class="row ">
      <p class="col-lg-4 col-12  col-sm-6"> Old Password </p>
      <p class=" ">:</p>
      <div class=" col-12 col-lg-6 col-sm-6">
        <input
          class="form"
          type="password"
          name="OPassword"
          value={this.state.OPassword}
          onChange={this.handleChange}
          placeholder="type your old password"
          required="required"
        />
      </div>
    </div>
    </div>

    <div class="form-group ">
                 <div class="row ">
      <p class="col-lg-4 col-form-label"> New Password </p>
      <p class=" ">:</p>
      <div class="col-lg-6 col-12 col-sm-12">
        <input
          class="form"
          type="password"
          name="NPassword"
          value={this.state.NPassword}
          onChange={this.handleChange}
          placeholder="type your new password"
          required="required"
        />
      </div>
    </div>
    </div>


    <div class="form-group ">
                 <div class="row ">
      <p class="col-lg-4 col-form-label">
        Confirm Password
      </p>
      <p class=" h5">:</p>
      <div class="col-lg-6">
        <input
          class="form"
          type="password"
          name="CPassword"
          value={this.state.CPassword}
          onChange={this.handleChange}
          placeholder="renter your new password"
          required="required" />
      </div>
    </div>
  </div>


    <div class="form-group">
      <button type="button" onClick={this.UpdatePassword} class="btn btn-primary btn-s">
        UPDATE PASSWORD
      </button>
    </div>

  </form>
          </div>
        </div>
      </div>
    </div>
  </div>

    
    
  );
}
}
export default Pass_Info_Update;