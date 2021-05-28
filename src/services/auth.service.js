import axios from "axios";



const API_URL = "https://ticketbookingapi.azurewebsites.net/api/Accounts/";
//const API_URL = "http://localhost:5000/api/Accounts/";
const API_URL = window.$API_SERVER + 'Accounts/';


class AuthService {
  
  login(aEmail, aPassword) {
    return axios
      .post(window.$API_SERVER + "Accounts/Login", {
        Email:aEmail,
        Password:aPassword
      })
      .then(response => {
   
        if (response.data) {
        
         localStorage.setItem("user", JSON.stringify(response.data));
         localStorage.setItem("role", JSON.stringify(response.data.role[0]));
         localStorage.setItem("userInfo", JSON.stringify(response.data.data));
         localStorage.setItem("token", JSON.stringify(response.data.token));
         this.getuserfromtoken();

         
        }
   

        return response.data;
        //return user;
      });
  }


  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem('role');
    localStorage.removeItem('userInfo');
    localStorage.removeItem('token');
    
  }

  getuserfromtoken(){
    var Token = JSON.parse(localStorage.getItem('token'));
    if (Token){
      try{
        //Tkn = Jason.parse(atob(Token.split('.')[1]));
        localStorage.setItem("tkn", JSON.parse(atob(Token.split('.')[1])));
        //localStorage.setItem("name",JSON.stringify(tkn.http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name))
        //http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name
      }
      catch(error){}
    }
    return null;
  };

  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new AuthService();
