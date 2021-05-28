import React, {Component}from 'react';
import logo from './logo.svg';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch,Redirect,Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode'


import AuthService from "./services/auth.service";

import Add_Route from './component/Add_Route';
import Find_Bus from './component/Find_Bus';
import Test_case from './component/Test_case/Test_case';
import Bus_List from './component/Bus_List';
import Book_Now from './component/Book_Now';
import Admin_Dash from './component/Admin_Dash';
import Bus_Reg from './component/Bus_Reg';
import Select_Route from './component/Select_Route';
import Session_Pass from './component/Session_Pass';
import Update_Bus from './component/Update_Bus';
//import NavBar from './navbar';
import Pass_Info_Update from './component/Pass_Info_Update';
import SignIn from './component/SignIn';
//import Nav_Bar from './component/nav_bar/Nav_Bar';
import Pass_Reg from './component/Pass_Reg';
import Bus_Dash from './component/Bus_Dash';
import Show_Bus from './component/Show_Bus';
//import Check_Out from './component/Check_Out';
//import checkout from './component/checkout';
import Ticket from './component/Ticket';
import Session_Ticket from './component/Session_Ticket';

import Ticket_List from './component/Ticket_List';
//import Test_case1 from './component/Test_case/Test_case1';

import Route_Info from './component/Route_Info';
import Show_Route from './component/Show_Route';



class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
      jwttoken:undefined,
      role:undefined,
      useInfo:undefined
    };
  }

  componentDidMount() {
    const user1 = AuthService.getCurrentUser();
    const role = JSON.parse(localStorage.getItem('role'));    
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));  

    if (user1) { 
      const token = jwt_decode(user1.token); 
    //  const user = jwt_decode(user1.role);
      this.setState({
       // currentUser: user,
        jwttoken:token,
        role:role,
        userInfo:userInfo
        /*showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),*/
      });
    }
  }

  logOut() {
    AuthService.logout();
   
  }

render(){
  const { currentUser, showModeratorBoard, showAdminBoard, jwttoken, role, userInfo } = this.state;
  var up = '';
  
  if(role =="BusController"){
        up=<a class="dropdown-item" href="/update-bus">Update profile</a>;
  }else if(role=="Passenger"){
        up=<a class="dropdown-item" href="/update-passenger">Update profile</a>;
  }

  return (
  
    <div>
         <nav class="navbar navbar-expand-lg fixed-top navbar-custom sticky sticky-dark bg-white">
            <div class="container">
             
                <a class="logo text-uppercase" href="/home">
                    <img src="logo2.png" alt="" class="logo-dark" height="60" />
                </a>

                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <i class="mdi mdi-menu"></i>
                </button>
                <div class="collapse navbar-collapse" id="navbarCollapse">
                   
                  
           {jwttoken ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
  
              </li>

              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button"
                 aria-haspopup="true" aria-expanded="false">Hi, {userInfo.FirstName}{userInfo.BusNo}</a>
                  <div class="dropdown-menu">
                      {up}
                      <a class="dropdown-item" href="#"></a>
                      <div class="dropdown-divider"></div>
                      <a class="dropdown-item" href="/home" onClick={this.logOut}>Log Out</a>
                  </div>
              </li>

            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                 <a href="/sign-in" class="btn btn-success btn-rounded navbar-btn">Log In</a>
                
              </li>

              <li className="nav-item">
                  <a href="/passenger-signup" class="btn btn-success btn-rounded navbar-btn">Register</a>
                  
              </li>

             
            </div>
          )}
                    
                </div>
            </div>
        </nav>
        
       
       <BrowserRouter>
        <Switch>
          <Route path="/add-route">
          <Add_Route />
          </Route>
        
          <Route path="/home">
            <Find_Bus />
          </Route>

          <Route path="/test">
          <Test_case />
          </Route>
          

          <Route path="/bus-list" component={Bus_List}>
          <Bus_List />
          </Route>

          <Route path="/book-now" component={Book_Now}>
          <Book_Now/>
          </Route>

          <Route path="/admin-dash" component={Admin_Dash}>
          < Admin_Dash/>
          </Route>

          <Route path="/bus-reg" component={Bus_Reg}>
          <Bus_Reg />
          </Route>

          <Route path="/select-route" component={Select_Route}>
          <Select_Route />
          </Route>

          <Route path="/session-pass" component={Session_Pass}>
          <Session_Pass />
          </Route>

          <Route path="/update-bus" component={Update_Bus}>
          <Update_Bus />
          </Route>

          <Route path="/update-passenger" component={Pass_Info_Update}>
          <Pass_Info_Update />
          </Route>

          <Route path="/sign-in" component={SignIn} >
          <SignIn />
          </Route>

          <Route path="/passenger-signup" component={Pass_Reg} >
          <Pass_Reg />
          </Route>

          <Route path="/bus-dashboard" component={Bus_Dash} >
          <Bus_Dash />
          </Route>

          <Route path="/admin-dashboard" component={Admin_Dash} >
          <Admin_Dash />
          </Route>

          <Route path="/show-buses" component={Show_Bus} >
          <Show_Bus />
          </Route>

          <Route path="/ticket" >
          <Ticket />
          </Route>

          <Route path="/ticket-session" >
          <Session_Ticket />
          </Route>

          <Route path="/ticket-list" >
          <Ticket_List />
          </Route>
          
          <Route path="/route-info" >
          <Route_Info />
          </Route>

          <Route path="/show-route" >
          <Show_Route />
          </Route>


        </Switch>
      </BrowserRouter>

         
    </div>
   
  );
  }
}

export default App;
/*<header>
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <nav class="navbar navbar-expand-lg navbar-light">
                        <a class="navbar-brand" href="#"><img src="images/logo.png" alt="logo"/></a>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
                        <div class="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
                            <ul class="navbar-nav">

                                <li class="nav-item">
                                    <a class="nav-link" href="#howitworks">How it works</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#services">Our Services </a>
                                </li>
                                <li><a href="booking.html" class="btn btn-info">Book a Cleaning</a></li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    </header>*/