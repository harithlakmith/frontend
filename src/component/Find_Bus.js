import React, { Component } from 'react'
import {Redirect, withRouter} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

 class Find_Bus extends Component {
     
    constructor (props){
      super(props);
    
     
      this.state = {
        
        suggestions: [],
        suggestions1: [],
        text: '',
        text1: '',
        items:[],
        date:new Date()
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

   
    handleDate=(e)=>{
      this.setState({date:e.target.value});
      if(this.state.date<new Date()){
         ;
      }
  }

    render() {

        if (JSON.parse(localStorage.getItem('role'))=='BusController'){
            return <Redirect to={'/bus-dashboard'} />
        }else if (JSON.parse(localStorage.getItem('role'))=='Administrator'){
            return <Redirect to={'/admin-dashboard'} />
        }


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
                                <input name="date" type="date" class="form-control" id="inputCheckOut" placeholder="Date ..." min="onChange={(e)=>{this.handleDate(e);}}"/>
                                
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

        <section class="py-6">
          <div class="container">
            <div class="row">
              <div class="col-lg-6 mx-auto text-center pb-4">
                <h4 class="text-gradient text-primary">Social Analytics</h4>
                <h2>Turn your idea into a startup</h2>
                <p class="lead">We’re constantly trying to express ourselves and actualize our dreams. If you have the opportunity to play </p>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-4 col-md-6">
                <div class="p-3 text-center">
                  <div class="icon icon-shape bg-gradient-primary shadow mx-auto">
                    <i class="ni ni-single-02"></i>
                  </div>
                  <h5 class="mt-4">Check our team</h5>
                  <p>We get insulted by others, lose trust for those others. We get back here to follow my dreams</p>
                </div>
              </div>
              <div class="col-lg-4 col-md-6">
                <div class="p-3 text-center">
                  <div class="icon icon-shape bg-gradient-info shadow mx-auto">
                    <i class="ni ni-email-83"></i>
                  </div>
                  <h5 class="mt-4">Support 24/7</h5>
                  <p>We get insulted by others, lose trust for those others. We get back here to follow my dreams</p>
                </div>
              </div>
              <div class="col-lg-4 col-md-6 mx-md-auto">
                <div class="p-3 text-center">
                  <div class="icon icon-shape bg-gradient-warning shadow mx-auto">
                    <i class="ni ni-atom"></i>
                  </div>
                  <h5 class="mt-4">Unlimited revisions</h5>
                  <p>We get insulted by others, lose trust for those others. We get back here to follow my dreams</p>
                </div>
              </div>
            </div>
            <hr></hr>
          </div>
          
        </section>


        <section class="">
  <div class="container py-5">
  
    <div class="row align-items-center">
      <div class="col-md-6 mb-md-0 mb-4">
        <h3 class="text-gradient rgcv text-primary mb-0">Medium Length Headline</h3>
        <h3>Very nice subtitle</h3>
        <p class="lead mb-md-5 mb-4">
          Change the color to match your brand or vision, add your logo, choose the perfect thumbnail, remove the playbar, add controls and more.
        </p>
        <p><span class="me-2">&#9679;</span> Showcase and embed your work with</p>
        <p><span class="me-2">&#9679;</span> Publish across social channels in a click</p>
        <p><span class="me-2">&#9679;</span> Sell your videos worldwide</p>
        <p><span class="me-2">&#9679;</span> Make more profit</p>
      </div>
      <div class="col-md-6">
        <div class="blur-shadow-image text-center">
          <img src="../../assets/img/curved-images/curved5.jpg" alt="img-blur-shadow" class="img-fluid shadow border-radius-lg max-height-600"/>
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