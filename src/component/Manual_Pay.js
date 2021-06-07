import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import axios from "axios";
import { Redirect, withRouter } from "react-router-dom";
import Moment from "moment";
import authHeader from "./../services/auth-header";

class Manual_Pay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ticket: [],
      TId: "",
      SId: "",
      From: "",
      FromHalt: "",
      To: "",
      ToHalt: "",
      PId: "",
      NoOfSeats: 0,
      PStatus: 0,
      Price: 0,
      Date: "",
      UserId: "",
      nextPage: false,
    };
    this.PaymentStatus = this.PaymentStatus.bind(this);
  }

  componentDidMount() {
    var value = new URLSearchParams(this.props.location.search);
    var TId = value.get("TId");

    //var TId = 31;
    axios
      .get(window.$API_SERVER + "Ticket/def/" + TId, { headers: authHeader() })

      .then((res) => {
        this.setState({
          //ticket: res.data,
          TId: res.data.TId,
          SId: res.data.PId,
          From: res.data.From,
          FromHalt: res.data.FromHalt,
          To: res.data.To,
          ToHalt: res.data.ToHalt,
          PId: res.data.PId,
          NoOfSeats: res.data.NoOfSeats,
          PStatus: res.data.PStatus,
          Price: res.data.Price,
          //Date: res.data.Date,
          UserId: res.data.UserId,
        });
        this.getDate();
      });
  }
  getDate() {
    var sid = this.state.SId;
    //var sid = 1;
    axios
      .get(window.$API_SERVER + "Session/" + sid, { headers: authHeader() })
      .then((response) => {
        this.setState({
          Date: response.data.Date,
        });
      });
  }

  PaymentStatus = () => {
    axios
      .post(
        window.$API_SERVER + "Ticket/PaymentUpdate",
        {
          TId: this.state.TId,
          PStatus: 1,
        },
        { headers: authHeader() }
      )
      .then((json) => {
        console.log(json.data);
      });

    this.setState({
      nextPage: true,
    });
  };

  render() {
    if (JSON.parse(localStorage.getItem("role")) != "BusController") {
      return <Redirect to={"/sign-in"} />;
    }

    if (this.state.nextPage == true) {
      return <Redirect to={"/bus-dashboard"} />;
    }

    const {
      ticket: [],
      TId,
      SId,
      From,
      FromHalt,
      To,
      ToHalt,
      PId,
      NoOfSeats,
      PStatus,
      Price,
      Date,
      UserId,
    } = this.state;
    var s = "/bus-dashboard";
    return (
      <div class="container p-3 mt-5">
        <br></br>

        <br></br>
        <form>
          <div class="card  border  border-dark-4 rounded mb-2">
            <div class="card-header p-3 headgd rounded">
              <div class="col-lg">
                <h1 class="text-light text-center">
                  {FromHalt} &nbsp; To &nbsp; {ToHalt}
                </h1>
              </div>
            </div>
            <div class="card-deck p-3 mt-3">
              <div class="card bg-light border-dark p-3  ">
                <div class=" text-left h-50  ">
                  <h3>
                    Date &nbsp; :&nbsp; {Moment(Date).format("YYYY-MM-DD")}
                  </h3>
                </div>
                <br></br>
                <br></br>
                <div class=" text-left h-50  ">
                  <h3>Ticket ID &nbsp;:&nbsp; {TId}</h3>
                </div>
              </div>
              <div class="card bg-light border-dark p-3  ">
                <div class=" text-left h-50 ">
                  <h3>Session &nbsp; :&nbsp; {SId}</h3>
                </div>
                <br></br>
                <br></br>
                <div class="text-left h-50">
                  <h3>Payment Status &nbsp; :&nbsp; {PStatus}</h3>
                </div>
              </div>

              <div class="card bg-light border-dark p-3  ">
                <div class=" text-left h-50 ">
                  <h3>Number of Tickets &nbsp; :&nbsp; {NoOfSeats} </h3>
                </div>
                <br></br>
                <br></br>
                <div class="h-50">
                  <h3>TOTAL = Rs {Price}</h3>
                </div>
              </div>
            </div>
            <hr></hr>
            <div class="form-group w-25 mt-3  ml-4">
              <button
                type="submit"
                onClick={this.PaymentStatus}
                className="btn btn-primary btn-lg btn-block"
              >
                Pay
              </button>
              <br />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(Manual_Pay);
