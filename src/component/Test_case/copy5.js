
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import axios from "axios";
import {Redirect, withRouter} from 'react-router-dom';
import authHeader from "../../services/auth-header";
//import React { useState } from "react";
import  { useState } from "react";

class Test_case extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      RNum: "",
      startAt: "",
      startHoltId: 0,
      stopAt: "",
      stopHoltId: 0,
      fullTime: 0,
      fullPrice: 0,
      fullDistance: 0,
      postRoute:0,
      halt:'',
      haltId:'',
      price:'',
      time:'',
      dist:'',
      nextHaltId:0,
      halts:[],
      flag:false,
      loading: false,
      message: '',
      inputList:  [{ index: Math.random(), halt: "", time: "", price: "", dist: "" }]
      //[{ index: Math.random(), halt: "", time: "", price: "", dist: "" }]
    };
    this.handleChange = this.handleChange.bind(this);
    this.UpdateRoute = this.UpdateRoute.bind(this);
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  UpdateRoute = () => {
    //event.preventDefault();

    axios
      .post(window.$API_SERVER +"Route/RouteUpdate", {
      
        Duration: parseInt(this.state.fullTime),
        Distance: parseInt(this.state.fullDistance),
        RNum: this.state.RNum,
      }, { headers: authHeader() })
      .then(res => {
        this.setState({
          postRoute: res.data.RId
          
        });this.haltListRefresh();
      });

     
  };

  UpdateRouteInfo = () => {
    //event.preventDefault();

    axios
      .post(window.$API_SERVER+"RouteInfo/RouteInfoUpdate", {
      
        RId: parseInt(this.state.postRoute),
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

  haltListRefresh(){
    axios.get(window.$API_SERVER +'RouteInfo/'+ this.state.postRoute, { headers: authHeader() })
    .then(res => {
      
      this.setState({
        halts: res.data,
        //halt : res.data.data.HoltName,

        flag:true
      });
    },error => {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      this.setState({
        loading: false,
        message: resMessage,
        flag:false
      });
    })

  };

  getRoute() {
    
    axios
      .get(window.$API_SERVER +"Route/1" , { headers: authHeader() })
      .then((response) => {
        this.setState({

          RNum: response.data.RNum,
          fullDistance: response.data.Distance,
          fullTime: response.data.Duration,
          
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  } 

  componentDidMount(){
    this.getRoute();
    this.haltListRefresh();
  }

  /*handleAddClick = () => {
    setInputList([...inputList, { halt: "", price: "" , time: "", dist: ""}]);
  };*/
  addNewRow = () => {
    this.setState((prevState) => ({
        inputList: [...prevState.inputList, { index: Math.random(), halt: "", time: "", price: "", dist: "" }],
    }));
}



  render() {
  if (JSON.parse(localStorage.getItem('role'))!='Administrator'){
      return <Redirect to={'/sign-in'} />
    }

  const [inputList, setInputList] = useState([{ halt: "", price: "" , time: "", dist: ""}]);

    return (
      <div>
        <div class="container mt-5 p-1">
          <div class="mt-5">
            <h1>
              <u>Routes Update Form</u>
            </h1>
            <h5>Please fill in this form to update routes!</h5>
            <br></br>
            <br></br>

            <div class="row">
             
              <div class="col-lg-6">
                <div class="row">
                  <div class="col-lg-4 ; h5 ">Route No </div>
                  <div class="col-lg-1 ; h5 ">: </div>
                  <div class="col-lg-5">
                    <input
                      type="text"
                      class="form-control"
                      name="RNum"
                      onChange={this.handleChange}
                      value={this.state.RNum}
                      required="required"
                    />
                  </div>
                </div>

                <br></br>
                
                <br></br>
                <div class="row">
                  <div class="col-lg-4 ; h5 ">Full Time </div>
                  <div class="col-lg-1 ; h5 ">: </div>
                  <div class="col-lg-5">
                    <input
                      type="text"
                      pattern="[0-9]*"
                      class="form-control"
                      name="fullTime"
                    
                      onChange={this.handleChange}
                      value={this.state.fullTime}
                      required="required"
                    />
                  </div>
                </div>
                <br></br>
                <div class="row">
                  <div class="col-lg-4 ; h5 ">Full price </div>
                  <div class="col-lg-1 ; h5 ">: </div>
                  <div class="col-lg-5">
                    <input
                      type="text"
                      pattern="[0-9]*"
                      class="form-control"
                      name="fullPrice"
                      
                      onChange={this.handleChange}
                      value={this.state.fullPrice}
                      required="required"
                    />
                  </div>
                </div>
              </div>
              
              <div class="col-lg-5">
                <div class="row"></div>
                <br></br>
                <br></br>
               
                <br></br>
                <div class="row">
                  <div class="col-lg-4 ; h5 ">Full Distance </div>
                  <div class="col-lg-1 ; h5 ">: </div>
                  <div class="col-lg-5">
                    <input
                      type="text"
                      pattern="[0-9]*"
                      class="form-control"
                      name="fullDistance"
                     
                      onChange={this.handleChange}
                      value={this.state.fullDistance}
                      required="required"
                    />
                  </div>
                </div>
              </div>
            </div>
            <br></br>

            <div class="col-6">
              <div class="form-group">
                  <button
                    type="submit"
                    onClick={this.UpdateRoute}
                    class="btn btn-primary btn-lg" >
                    Update route
                  </button>
                </div></div>

            <hr />

            <div class="form-group">
              <div class="row">
                <div class="col"></div>
              </div>
              <div class="row">
                <div class="col"></div>
              </div>
              <div class="row">
                <div class="col"></div>
              </div>
            </div>

          
             <div class="row">
             <div class="col-lg-12">
             
      {inputList.map((halts) => {
        return (
          <div className="box">
            <input
              name="halt"
              type = "text"
              placeholder="Enter Holt Name"
              value={halts.HoltName}
              onChange={this.handleChange}
            />
            <input
              name="Price"
              type = "text"
              placeholder="Enter Price"
              value={halts.Price}
              onChange={this.handleChange}
            />
            <input
              name="time"
              type = "text"
              placeholder="Enter Time"
              value={halts.Time}
              onChange={this.handleChange}
            />
            <input
              name="dist"
              type = "text"
              placeholder="Enter Distance"
              value={halts.Distance}
              onChange={this.handleChange}
            />
            <button 
            type="submit" 
            onClick={this.UpdateRouteInfo} 
            class="btn btn-primary btn-sm" >
                Update
            </button>
            <button 
            type="submit" 
            onClick={this.addNewRow} 
            class="btn btn-primary btn-sm" >
                New Edit
            </button>
            
          </div>
        );
      })}
 
             </div>
           </div>
 
          

       <br/><br/><br/>
           
          </div>
        </div>
      </div>
    );
  }
}

export default Test_case;
