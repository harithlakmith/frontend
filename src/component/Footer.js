import React from "react";


class Footer extends React.Component {
  render(){
  return (
    
    <div className="main-footer">
     
      
      <div className="container">
        <div className="row ">
        <div class="col-12">
        <div class="row">
          
        <p>Technologies used for implementations:  <a href="https://reactjs.org/" class="me-4 text-reset"><i class="fab fa-react"></i></a> &nbsp;<a href="https://getbootstrap.com/" class="me-4 text-reset"><i class="fab fa-bootstrap"></i></a>  &nbsp;<a href="https://www.microsoft.com/en-us/sql-server/sql-server-2019" class="me-4 text-reset"><i class="fas fa-database"></i></a>   &nbsp; <a href="https://stripe.com/" class="me-4 text-reset"><i class="fab fa-stripe-s"></i></a>  &nbsp; <a href="https://dotnet.microsoft.com/download/dotnet/3.1" class="me-4 text-reset"><i class="fab fa-microsoft"></i></a>  &nbsp; <a href="https://github.com/harithlakmith/frontend.git" class="me-4 text-reset"><i class="fab fa-github"></i></a>   &nbsp; <a href="https://azure.microsoft.com/en-us/" class="me-4 text-reset"><i class="cib-azure-devops"></i></a> &nbsp; <i class="cib-dot-net"></i> </p>
        </div></div>
        
        </div>
        <br></br>
        <div className="row">
        
          <div className="col-lg-8 col-sm-12">
            <div className="row">
          <div className="col-lg-8">
          <p class="text-justify">During the covid-19 pandemic situation, travelling by public transport
                                 is very difficult. Because numbers of passengers are limited according 
                                 to the government policies. So this site will allow passengers to book their 
                                 bus ticket via online.</p>
          </div>
          
          
          </div>
          <div className="row">
          <div className="col-lg-8 col-sm-12">
          <div className="row">
          <div className="col-lg-3 col-sm-12" align="center">
            
            <img src="logo.png" class="img-fluid"  alt="Responsive image"></img>
          </div>
          <div class=" col-lg-8" align="center">
              <img src="images/logo-stripe.png" class="img-fluid "  alt="Responsive image"></img>
              
          </div>
          
          </div>
          </div>

          </div>
          </div>
          
          <div className="col-lg-4 col-sm-12">
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
