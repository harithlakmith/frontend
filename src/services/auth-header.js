import axios from "axios";

export default function authHeader() {
    const Token = JSON.parse(localStorage.getItem('token'));
    
  
    axios.interceptors.request.use(
      config => {
        config.headers.authorization = `Bearer ${Token}`;
        return config;
      },
      error =>{
        return Promise.reject(error)
      }
    );
    
  } 