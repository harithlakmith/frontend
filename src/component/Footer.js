import React from "react";


class Footer extends React.Component {
  render(){
  return (
    
    <div className="main-footer">
     
      
      <div className="container">
        <div className="row col-12">
        <div class="row">
        <p>Get connected with us on social networks: <i class="fab fa-facebook-f"></i> &nbsp;   <i class="fab fa-twitter"></i> &nbsp; <i class="fab fa-google"></i> &nbsp;  <i class="fab fa-instagram"></i> &nbsp;  <i class="fab fa-linkedin"></i> &nbsp;  <i class="fab fa-github"></i> </p>
        </div>
        
        </div>
        <br></br>
        <div className="row">
        
          <div className="col-lg-8">
            <div className="row">
          <div className="col-lg-8">
          <p class="text-justify">During the covid-19 pandemic situation, travelling by public transport
                                 is very difficult. Because numbers of passengers are limited according 
                                 to the government policies. So this site will allow passengers to book their 
                                 bus ticket via online.</p>
          </div>
          
          
          </div>
          <div className="row">
          <div className="col-lg-8">
          <div className="row">
          <div className="col-lg-3 mt-3 col-sm-12" align="center">
            
            <img src="logo.png" class="img-fluid"  alt="Responsive image"></img>
          </div>
          <div class=" col-lg-8" align="center">
              <img src="images/logo-stripe.png" class="img-fluid "  alt="Responsive image"></img>
              
          </div>
          
          </div>
          </div>

          </div>
          </div>
          
          <div className="col-lg-4">
            <h4 class="text-light">CONTACT US</h4>
            <ui className="list-unstyled">
              <br></br>
              <li><i class="fas fa-home me-3"></i> COLOMBO, WESTERN PROVINCE, SRI LANKA</li>
              <br></br>
              <li><i class="fas fa-envelope me-3"></i> info@ticketz.com</li>
              <br></br>
              <li><i class="fas fa-phone me-3"></i> + 94 112 227 6965</li>
              <br></br>
              <li><i class="fas fa-print me-3"></i> + 94 112 227 6965</li>
              <br></br>
            </ui>
          </div>
        </div>
        
        
      </div>
      <div className="main-footerbottem">
        <div className="row" align="center">
          
          <p className="col-sm">
            &copy;{new Date().getFullYear()} SATURN SOLUTION | All rights reserved | Smart Travelling For Smart Lifestyle
            
          </p>
        </div>
        </div>
    </div>
  );
}

}
export default Footer;
