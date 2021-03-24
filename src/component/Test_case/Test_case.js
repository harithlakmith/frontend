import logo from './../../logo.svg';
//import './SignIn.css';
import React, {Component} from 'react';
import axios from 'axios';
//import Pass_Info_Update from './component/pass_info_update/Pass_Info_Update';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Redirect, withRouter} from 'react-router-dom';
import { browserHistory } from 'history'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../../services/auth.service";


class SignIn extends Component{

    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
    
        this.state = {
          username: "",
          password: "",
          loading: false,
          message: ""
        };
        
      }

      onChangeUsername(e) {
        this.setState({
          username: e.target.value
        });
      }
    
      onChangePassword(e) {
        this.setState({
          password: e.target.value
        });
      }
    
      handleLogin(e) {
        e.preventDefault();
    
        this.setState({
          message: "",
          loading: true
        });
      
    

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            AuthService.login(this.state.username, this.state.password).then(
              () => {

                  const role=JSON.parse(localStorage.getItem('role'))
                  if(role=='Passenger'){
                    this.props.history.push("/home")
                  }else if(role=='Administrator'){
                    this.props.history.push("/admin-dash")
                  };
                
                window.location.reload();
              },
              error => {
                const resMessage =
                  (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                  error.message ||
                  error.toString();
      
                this.setState({
                  loading: false,
                  message: resMessage
                });
              }
            );
          } else {
            this.setState({
              loading: false
            });
          }

        
    }

  /* ---*/
 
  /*---*/


render(){
    
 /* if (localStorage.getItem('user')){
    return <Redirect to={'/home'} />
}*/
    
return (
  <Form onSubmit={this.handleLogin}
     ref={c => {
        this.form = c;
     }}>

    <div className="container p-1 mt-5">
      <div class="mt-5">
          <h1>
             <u>Login</u>
          </h1>
             
          <hr/>
  
       <div class="row px-5">
          <div class="col-md-7 px-5">
             
            <div class="form-group">
             <Input type="text" class="form-control" name="username" 
                 onChange={this.onChangeUsername}
                 value={this.state.username} placeholder="Email" required="required"/>
            </div>

       
            <div class="form-group">
             <Input type="password" class="form-control" name="password"
                value={this.state.password}
                onChange={this.onChangePassword}
                placeholder="Password" required="required"/>
            </div>   
          
            
          
           <div class="form-group">
              <button type="submit"
                class="btn btn-primary btn-lg"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span class="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </button>
           </div>


            {this.state.message && (
              <div class="form-group">
                <div class="alert alert-danger" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
  
          </div>

          <div class="col-md-5 ">
            <img src="./../../login.JPG" alt="login" class=""/>
          </div>
                   
        </div>
  
      </div>
  
    </div>
  </Form>   
    );
  }
  }
  
  export default withRouter(SignIn);

  /* <div className="form-group">
              <button type="submit" className="btn btn-primary btn-lg">Login</button>
          </div>*/
          
/*  submitHandler = e => {
    e.preventDefault()
    
    const data ={
        Email: this.email,
        Password: this.password
    }
  axios
  .post("http://localhost:5000/api/Accounts/Login", data)
  .then(response => {
      
      localStorage.setItem('user', response.data)
      this.setState({
          loggedIn: true
      })
      this.props.setUser(response.data)

      *//*
      if(response.status == 200){
          alert("Loggin Succesful!")
      }
      *//*
  })
  .catch(error => {
      
      localStorage.setItem('error', error.data)
      this.setState({
          loggedIn: false
      })
      //this.setState({errorMessage: 'Check your email and password!(' +error.message+ ')'})
      
      
  })}*/