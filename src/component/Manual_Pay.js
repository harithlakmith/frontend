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
    };
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

  Update = () => {
    axios
      .post(
        window.$API_SERVER + "/Ticket/update/ ",
        {
          TId: this.state.TId,
        },
        { headers: authHeader() }
      )
      .then((res) => {
        this.setState({
          //postRoute: res.data.RId,
        });
      });
  };

  render() {
    if (JSON.parse(localStorage.getItem("role")) != "BusController") {
      return <Redirect to={"/sign-in"} />;
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

    return (
      <div class="container p-1">
        <br></br>
        <div class="box">
          <h1>
            <u>TICKETS RESERVATION SOLUTION</u>
          </h1>
          <br></br>
          <form>
            <div class="card  border  border-light-4 rounded mb-2">
              <div class="card-header p-3 headgd rounded">
                <div class="row ">
                  <div class="col-md-6 ">
                    <h3 class="text-light">
                      &nbsp;&nbsp; {FromHalt} - {ToHalt}
                    </h3>
                    <p class="card-text">
                      <span class="text-light">
                        &nbsp;<i class="fas fa-bus-alt"></i>&nbsp;&nbsp;Bus
                        Session No <b>{SId}</b>
                      </span>
                    </p>
                  </div>
                  <div class="col-md-6  ">
                    <h3 class="text-light">
                      <i class="fas fa-calendar-day"></i>&nbsp;&nbsp;{" "}
                      {Moment(Date).format("YYYY-MM-DD")}
                    </h3>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <div class="row pt-3 px-1 px-lg-5">
                  <div class="col-12 col-lg-8  ">
                    <div class="row">
                      <div class="col-12 col-lg-5 align-items-center">
                        <div class="card">
                          <img
                            class="card-img-top"
                            src="images/mappin.jpg"
                            alt="Card image cap"
                          />
                          <div class="card-body">
                            <h5 class="card-title ">From: {FromHalt}</h5>
                            <h5 class="card-title ">To : {ToHalt}</h5>
                          </div>
                        </div>
                      </div>
                      <div class="col-12 col-lg-7">
                        <div class="h-50">
                          {" "}
                          <div class="h3 text-left h-25 ">Payment Status</div>
                          <div class="h2 text-left h-25 ">{PStatus}</div>
                        </div>
                        <div class="h-25">
                          <h3>Ticket ID : {TId} </h3>
                          <hr></hr>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-12 col-lg-4">
                    <div class="h-50">
                      {" "}
                      <div class="h3 text-left h-25 ">Number of Tickets</div>
                      <div class="h2 text-left h-25 ">{NoOfSeats}</div>
                    </div>
                    <div class="h-25">
                      <h3>TOTAL = Rs {Price}</h3>
                      <hr></hr>

                      <div class="form-group">
                        <button
                          type="submit"
                          onClick={this.Update}
                          className="btn btn-primary btn-lg btn-block"
                        >
                          Pay
                        </button>
                        <br />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Manual_Pay);
