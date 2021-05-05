import axios from "axios";


const API_URL = "https://ticketbookingapi.azurewebsites.net/api/Accounts/";

class AuthService {
  
  login(aEmail, aPassword) {
    return axios
      .post(API_URL + "Login", {
        Email:aEmail,
        Password:aPassword
      })
      .then(response => {
   
        if (response.data) {
        
         localStorage.setItem("user", JSON.stringify(response.data));
         localStorage.setItem("role", JSON.stringify(response.data.role[0]));
         localStorage.setItem("userInfo", JSON.stringify(response.data.data));
         localStorage.setItem("token", JSON.stringify(response.data.token));
         
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
