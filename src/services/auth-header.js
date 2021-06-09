import axios from "axios";
import {Redirect} from 'react-router-dom';

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
    

   



    
    /*axios.interceptors.response.use(undefined,error =>{
      if (error.response.status === 401) {
        //console.log(error.response)
        return <Redirect to={"/sign-in"} />;
      }
      console.log(error.response)
      throw error.response
    }

    )*/
  } 