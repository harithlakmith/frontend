
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import axios from "axios";
import {Redirect, withRouter} from 'react-router-dom';
import authHeader from "./../services/auth-header";

class Route_Update extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      RNum: "",
      fullTime: 0,
      fullDistance: 0,
      postRoute:0,
      loading: false,
      message: '',
      RId: '',
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
          
        });
      });

     
  };

  
  componentDidMount(){

    var value = new URLSearchParams(this.props.location.search);
    var RId = value.get('RId');


    axios
      .get(window.$API_SERVER +"Route/" +RId , { headers: authHeader() })
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



  render() {
  if (JSON.parse(localStorage.getItem('role'))!='Administrator'){
      return <Redirect to={'/sign-in'} />
    }

    var rnum = this.state.RNum
    

    return (
      <div>
        <div class="container mt-5 p-1">
          <div class="mt-5">
            <div class="card">
              <div class= "card-header headgd ">
            <h1 class="text-light">
               Routes Update Form
            </h1>
            <h5 class="text-light">Please fill in this form to update route information!</h5>
              </div>
            <br></br>
            <br></br>

            <div class="card-body">
              <div class="row">
              <div class="col-lg-6 col-sm-12">
                <div class="row">
                <div class="col-lg-4 col-sm-6; h5 ">Route No  &nbsp; &nbsp;&nbsp;:&nbsp;&nbsp;{rnum}</div>
                </div>
              </div>
              </div>
              <br></br>
              <br></br>
              <div class="row">
              <div class="col-lg-6 col-sm-12">
                <div class="row">
                <div class="col-lg-4 col-sm-6; h5 "> <i class="far fa-clock"></i>  Full Time :</div>
                <div class="col-lg-5 col-sm-6">
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

                
              </div>

              <div class="col-lg-6 col-sm-12">
                <div class="row">
                <div class="col-lg-4 col-sm-6; h5 "> <i class="fas fa-road"></i> Full Distance :</div>
                <div class="col-lg-5 col-sm-6">
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
              <br></br>
                <br/>
                

              </div>
              <br></br>
              <div class="row">

                <div class="col-lg-6">
                <div class="form-group">
                  <button
                    type="submit"
                    onClick={this.UpdateRoute}
                    class="btn headgd text-light btn-lg">
                       Update route
                  </button>
                </div></div>
              </div>
           </div>
 
          
            
          

       <br/><br/>
       </div>
          </div>
        </div>
      </div>
    );
  }
}


export default withRouter (Route_Update);

