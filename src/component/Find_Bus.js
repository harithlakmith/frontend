import React, { Component } from 'react'
import {Redirect, withRouter} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import Moment from "moment";

 class Find_Bus extends Component {
     
    constructor (props){
      super(props);
    
     
      this.state = {
        
        suggestions: [],
        suggestions1: [],
        text: '',
        text1: '',
        items:[],
       
      }
    }
      
    componentDidMount(){
      axios.get(window.$API_SERVER +'RouteInfo/townlist')
      .then(res => {
        console.log(res);
        this.setState({
          items: res.data
        });
      }).catch(e => console.error(e))
             
      }

    onTextChanged = (e) =>{
      const value = e.target.value;
      let suggestions = [];
      if (value.length > 0){
        const regex = new RegExp(`^${value}`,'i');
        suggestions = this.state.items.sort().filter(v => regex.test(v));
      }
      this.setState( () => ({suggestions, text:value}));

    }

    suggestionSelected (value) {
        this.setState(() => ({
          text: value,
          suggestions: [],
        }))
      }

    renderSuggestions (){
     
      const {suggestions} = this.state;
      if (suggestions.length == 0){
          return null;
        }
      return(
        <ul>
            {suggestions.map((item) => <li onClick={() => this.suggestionSelected(item)}>{item}</li>)}
        </ul>

      );
  
    }

    onTextChanged1 = (e) =>{
      const value = e.target.value;
      let suggestions1 = [];
      if (value.length > 0){
        const regex = new RegExp(`^${value}`,'i');
        suggestions1 = this.state.items.sort().filter(v => regex.test(v));
      }
      this.setState( () => ({suggestions1, text1:value}));

    }

    suggestionSelected1 (value) {
        this.setState(() => ({
          text1: value,
          suggestions1: [],
        }))
      }

    renderSuggestions1 (){
     
      const {suggestions1} = this.state;
      if (suggestions1.length == 0){
          return null;
        }
      return(
        <ul>
            {suggestions1.map((item) => <li onClick={() => this.suggestionSelected1(item)}>{item}</li>)}
        </ul>

      );
  
    }


    render() {

     
        if (JSON.parse(localStorage.getItem('role'))=='BusController'){
            return <Redirect to={'/bus-dashboard'} />
        }else if (JSON.parse(localStorage.getItem('role'))=='Administrator'){
            return <Redirect to={'/admin-dashboard'} />
        }

        const today = Moment(Date().toLocaleString()).format('YYYY-MM-DD');
        
      
       
        const {text,text1} = this.state;
        

        return (
        <div>
            <section class="hero-section videobg" id="home">
            
            <div class="container ">
                <div class="row justify-content-center">
                    <div class="col-lg-6 ">
                        <div class="hero-wrapper mb-4 bg-white p-5 welcomebox">
                            <p class="font-16 text-uppercase"></p>
                            <h1 class="hero-title mt-4 mb-4">Quickly Reserve Your<br/>Ticket with <span class="text-primary">Ticketz</span></h1>

                            <p>During the covid-19 pandemic situation, travelling by public transport
                                 is very difficult. Because numbers of passengers are limited according 
                                 to the government policies. So this site will allow passengers to book their 
                                 bus ticket via online.</p>
                                 
                            <div class="mt-4">
                                
                            </div>
                        </div>
                        
                    </div>

                    <div class="col-lg-6 col-sm-8 pt-4 px-5">
                        <div class="home-img mt-5 mt-lg-0 subscribe">
                        <form action="/bus-list" method="get" class="">
                            <div class="AutoCompleteText">
                                <input name="from" id="from" value= {text} onChange= {this.onTextChanged} type="text" placeholder="From"/>
                                {this.renderSuggestions()}
                            </div>
                            <br></br>
                            <div class="AutoCompleteText">
                                <input  name= "to" id="to" value= {text1} onChange= {this.onTextChanged1} type="text" placeholder="To"/>
                                {this.renderSuggestions1()}
                            </div>
                            <br></br>
                            <div class="form-group">
                                <input name="date" type="date" class="form-control" id="inputCheckOut" placeholder="Date ..." min={today} />
                                
                            </div>
                            <div class="form-group tm-form-element tm-form-element-2">
                                    <button type="submit" class="btn btn-primary ">Check Availability</button>  
                            </div>
                        </form>
                            <img src="images/home-im.png" alt="" class="img-fluid mx-auto d-block"/>
                        </div>
                    </div>
                </div>
              
            </div>
            
         
        </section>
        

      


<section class="pt-md-3 wave-img1">



      <div class="container py-5 ">
      <p class="h2 bold text-success uppercase"><strong><i class="fas fa-arrow-circle-down"></i>&nbsp;&nbsp;Knowledge Base</strong><small class="text-muted h6">&nbsp;&nbsp;&nbsp;&nbsp;<em>for newly connected passengers.</em></small></p> 
      <hr />
      
        <div class="pt-md-5 row align-items-center ">
          
          <div class="col-md-6">
            <div class="blur-shadow-image text-center">
            <div class="embed-responsive embed-responsive-16by9">
              
              
              <video class="" autoplay loop controls muted poster="images/thum.png">
                <source src="images/intro.mp4" type="video/mp4" />
              </video>
             
            
            </div>
            </div>
          </div>
          <div class="col-md-6 mt-lg-0 mt-4 mb-md-0 mb-4 px-5 ">
            <h3 class="text-gradient rgcv text-primary mb-0">How To Reserve A Ticket</h3>
            <h4>Video Tutorial</h4>
            <p class=" mb-md-4 mb-4 bold">
              If you are not familiar with online ticket reservation and payment systems, this video tutorial will help you to reserve your ticket
            </p>
                              
                              <div id="carouselExampleCaptions" class="carousel slide border p-5 my-5" data-ride="carousel">
                                <ol class="btn-primary carousel-indicators">
                                  <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
                                  <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
                                  <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
                                  <li data-target="#carouselExampleCaptions" data-slide-to="3"></li>
                                  <li data-target="#carouselExampleCaptions" data-slide-to="4"></li>
                                </ol>
                                <div class="text-dark carousel-inner text-cente">

                                  <div class="carousel-item active pl-5" data-interval="2000">
                                      <div class="media ">
                                        <img src="images/7.png" class="mr-3 " height="64" width="64"  alt="..."/>
                                        <div class="media-body">
                                          <h5 class="mt-0">01. First Step</h5>
                                          Choose your destinations and date.
                                        </div>
                                      </div>

                                  
                                  </div>

                                  <div class="text-dark carousel-item pl-5 " data-interval="2000">
                                  
                                    

                                      <div class="media ">
                                        <img src="images/5.png" class="mr-3 " height="64" width="64"  alt="..."/>
                                        <div class="media-body">
                                          <h5 class="mt-0">02. Second Step</h5>
                                          Choose correct Bus and Route.
                                        </div>
                                      </div>

                                    
                                  </div>

                                  <div class="carousel-item pl-5" data-interval="2000">
                                  
                                      <div class="media ">
                                        <img src="images/9.jpg" class="mr-3 " height="64" width="64"  alt="..."/>
                                        <div class="media-body">
                                          <h5 class="mt-0">03. Third Step</h5>
                                          Select number of seats.
                                        </div>
                                      </div>

                                
                                  </div>

                                  <div class="carousel-item  pl-5" data-interval="2000">
                                  
                                      <div class="media ">
                                        <img src="images/8.png" class="mr-3 " height="60" width="60"  alt="..."/>
                                        <div class="media-body">
                                          <h5 class="mt-0">04. Forth Step</h5>
                                          Make Payment&nbsp;<small class="text-muted"> Powered by Stripe</small>.
                                        </div>
                                      </div>

                                  
                                  </div>
                                  <div class="carousel-item pl-5 " data-interval="2000">
                                  

                                      <div class="media ">
                                        <img src="images/10.jpg" class="mr-3 " height="60" width="60"  alt="..."/>
                                        <div class="media-body">
                                          <h5 class="mt-0">05. Final Step</h5>
                                          Download your Ticket.
                                        </div>
                                      </div>

                                  </div>
                                </div>
                                <a class="carousel-control-prev btn-primar" href="#carouselExampleCaptions" role="button" data-slide="prev">
                                  <span class="carousel-control-prev-icon  " aria-hidden="true"></span>
                                  <span class="sr-only">Previous</span>
                                </a>
                                <a class="carousel-control-next btn-primar" href="#carouselExampleCaptions" role="button" data-slide="next">
                                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                  <span class="sr-only">Next</span>
                                </a>
                              </div>

          </div>
        </div>
      </div>
</section>


<section class="wave-img">
      <div class="container py-5">
      
        <div class="row align-items-center">
          <div class="col-md-6 mb-md-0 mb-4">
            <h3 class="text-gradient rgcv text-primary mb-0">Mobile </h3>
            <h3>Very nice subtitle</h3>
            <p class="lead mb-md-5 mb-4">
              Don't worry about operating system of your device. Ticketz Support for most familier web browsers.
              
                </p>




<div id="carouselExampleCaptions" class="carousel slide border p-5 my-5" data-ride="carousel">
  <ol class="btn-primary carousel-indicators">
    <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
    <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
    <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
    <li data-target="#carouselExampleCaptions" data-slide-to="3"></li>
    <li data-target="#carouselExampleCaptions" data-slide-to="4"></li>
  </ol>
  <div class="text-dark carousel-inner text-cente">

    <div class="carousel-item active pl-5" data-interval="2000">
        <div class="media ">
          <img src="images/7.png" class="mr-3 " height="64" width="64"  alt="..."/>
          <div class="media-body">
            <h5 class="mt-0">01. First Step</h5>
            Choose your destinations and date.
          </div>
        </div>

     
    </div>

    <div class="text-dark carousel-item pl-5 " data-interval="2000">
    
      

        <div class="media ">
          <img src="images/5.png" class="mr-3 " height="64" width="64"  alt="..."/>
          <div class="media-body">
            <h5 class="mt-0">02. Second Step</h5>
            Choose correct Bus and Route.
          </div>
        </div>

      
    </div>

    <div class="carousel-item pl-5" data-interval="2000">
    
        <div class="media ">
          <img src="images/9.jpg" class="mr-3 " height="64" width="64"  alt="..."/>
          <div class="media-body">
            <h5 class="mt-0">03. Third Step</h5>
            Select number of seats.
          </div>
        </div>

  
    </div>

    <div class="carousel-item  pl-5" data-interval="2000">
    
        <div class="media ">
          <img src="images/8.png" class="mr-3 " height="60" width="60"  alt="..."/>
          <div class="media-body">
            <h5 class="mt-0">04. Forth Step</h5>
            Make Payment&nbsp;<small class="text-muted"> Powered by Stripe</small>.
          </div>
        </div>

    
    </div>
    <div class="carousel-item pl-5 " data-interval="2000">
    

        <div class="media ">
          <img src="images/10.jpg" class="mr-3 " height="60" width="60"  alt="..."/>
          <div class="media-body">
            <h5 class="mt-0">05. Final Step</h5>
            Download your Ticket.
          </div>
        </div>

    </div>
  </div>
  <a class="carousel-control-prev btn-primar" href="#carouselExampleCaptions" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon  " aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next btn-primar" href="#carouselExampleCaptions" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>




          </div>
          <div class="col-md-6">
            <div class="blur-shadow-image text-center">
              <img src="images/phone.gi" alt="img-blur-shadow" class="img-fluid shadow border-radius-lg max-height-600"/>
            </div>
          </div>
        </div>
      </div>
</section>




    </div>  

        )
    }
}


export default withRouter(Find_Bus);