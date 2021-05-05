
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import axios from "axios";
import {Redirect, withRouter} from 'react-router-dom';
import authHeader from "./../services/auth-header";

class Add_Route extends React.Component {
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
      message: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.AddRoute = this.AddRoute.bind(this);
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  AddRoute = () => {
    //event.preventDefault();

    axios
      .post(window.$API_SERVER +"Route", {
      
        StartHoltId: 1,
        StartHolt: this.state.startAt,
        StopHoltId: 10,
        StopHolt: this.state.stopAt,
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

  AddRouteRow = () => {
    //event.preventDefault();

    axios
      .post(window.$API_SERVER +"RouteInfo", {
      
        RId: parseInt(this.state.postRoute),
        HoltName: this.state.halt,
        HoltId:parseInt(this.state.nextHaltId)+1,
        Price: parseInt(this.state.price),
        Time: parseFloat(this.state.time),
        Distance: parseInt(this.state.dist),
       
      }, { headers: authHeader() })
      .then(res => {
        this.setState({
          nextHaltId: res.data.HoltId,
          halt:'',
          time:'',
          price:'',
          dist:''
        });
        this.haltListRefresh();
      });
     
  };

  haltListRefresh(){
    axios.get(window.$API_SERVER +'RouteInfo/'+ this.state.postRoute, { headers: authHeader() })
    .then(res => {
      
      this.setState({
        halts: res.data,
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

  componentDidMount(){
    this.haltListRefresh();
  }


  render() {
  if (JSON.parse(localStorage.getItem('role'))!='Administrator'){
      return <Redirect to={'/sign-in'} />
    }

    const { halts, flag } = this.state
    const haltList = halts.length ? (
      halts.map(halt => {
        this.state.nextHaltId = halt.HoltId;
        return (
            
          <tr>
            <td>{halt.HoltName}</td>
            <td>{halt.Price}</td>
            <td>{halt.Time}</td>
            <td>{halt.Distance}</td>
          </tr>
        )
      })
    ) : (
      <div className="center">No Halts available</div>
    );

    return (
      <div>
        <div class="container mt-5 p-1">
          <div class="mt-5">
            <h1>
              <u>Bus Registration Form</u>
            </h1>
            <h5>Please fill in this form to create bus routes!</h5>
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
                      placeholder="RouteNo"
                      onChange={this.handleChange}
                      value={this.state.RNum}
                      required="required"
                    />
                  </div>
                </div>

                <br></br>
                <div class="row">
                  <div class="col-lg-4 ; h5 ">Start At </div>
                  <div class="col-lg-1 ; h5 ">: </div>
                  <div class="col-lg-5">
                    <input
                      type="text"
                      class="form-control"
                      name="startAt"
                      placeholder="Start At"
                      onChange={this.handleChange}
                      value={this.state.startAt}
                      required="required"
                    />
                  </div>
                </div>
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
                      placeholder="Full Time"
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
                      placeholder="Full Price"
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
                <hr></hr>
                <div class="row">
                  <div class="col-lg-4 ; h5 ">Stop At </div>
                  <div class="col-lg-1 ; h5 ">: </div>
                  <div class="col-lg-5">
                    <input
                      type="text"
                      class="form-control"
                      name="stopAt"
                      placeholder="Stop At"
                      onChange={this.handleChange}
                      value={this.state.stopAt}
                      required="required"
                    />
                  </div>
                </div>
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
                      placeholder="Full Distance"
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
                    onClick={this.AddRoute}
                    class="btn btn-primary btn-lg" hidden={flag}>
                    Register route
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

          {flag?(
             <div class="row">
             <div class="col-lg-12">
             <table class="table table-hover">
               <thead>
                 <tr>
                   <th scope="col">Halt</th>
                   <th scope="col">Price</th>
                   <th scope="col">Time</th>
                   <th scope="col">Distance</th>
                   <th scope="col">Action</th>
                 </tr>
               </thead>
               <tbody>
                 {haltList}
                 <tr>
                   <td><input class="form-control" name="halt" type="text" onChange={this.handleChange} ></input></td>
                   <td><input class="form-control" name="price" type="text" onChange={this.handleChange} ></input></td>
                   <td><input class="form-control" name="time" type="text" onChange={this.handleChange}></input></td>
                   <td><input class="form-control" name="dist" type="text" onChange={this.handleChange}></input></td>
                   <td><button type="submit" onClick={this.AddRouteRow} class="btn btn-primary btn-sm" >
                     Add
                   </button></td>
                 </tr>
               </tbody>
             </table>
 
             </div>
           </div>
 
          ):(
            <p></p>
          )}

       <br/><br/><br/>
           
          </div>
        </div>
      </div>
    );
  }
}

export default Add_Route;
