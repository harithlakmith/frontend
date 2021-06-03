
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import axios from "axios";
import {Redirect, withRouter} from 'react-router-dom';
import authHeader from "../../services/auth-header";

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
      //flag:false,
      loading: false,
      message: ''
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

        //flag:true
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
       // flag:false
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


  render() {
  if (JSON.parse(localStorage.getItem('role'))!='Administrator'){
      return <Redirect to={'/sign-in'} />
    }

    /*const { halts} = this.state
    const haltList = halts.length ? (
      halts.map(halt => {
       // this.state.nextHaltId = halt.HoltId;
        this.state.halt = halt.HoltName;
        //halt = this.state.halt.HoltName;
        this.state.price = halt.Price;
        this.state.time = halt.Time;
        this.state.dist = halt.Distance;
        
        return (
            
          <tr>
            <td><input class="form-control" name="halt" type="text" onChange={this.handleChange} value={this.state.halt} ></input></td>
            <td><input class="form-control" name="price" type="text" onChange={this.handleChange} value={this.state.price} ></input></td>
            <td><input class="form-control" name="time" type="text" onChange={this.handleChange} value={this.state.time}></input></td>
            <td><input class="form-control" name="dist" type="text" onChange={this.handleChange} value={this.state.dist}></input></td>
            <td><button type="submit" onClick={this.UpdateRouteInfo} class="btn btn-primary btn-sm" >
                Update
            </button></td>
          </tr>
        )
      })
    ) : (
      <div className="center">No Halts available</div>
    );*/

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
                    class="btn btn-primary btn-lg">
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
 
          
            <p></p>
          

       <br/><br/><br/>
           
          </div>
        </div>
      </div>
    );
  }
}

export default Test_case;
