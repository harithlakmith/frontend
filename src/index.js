import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//import '@fortawesome/fontawesome-free/css/all.min.css'; 
//import 'bootstrap-css-only/css/bootstrap.min.css'; 
//import 'mdbreact/dist/css/mdb.css';
//import Add_Route from './component/add_route/Add_Route';

window.$API_SERVER = "https://ticketbookingapi.azurewebsites.net/api/";

//window.$API_SERVER = "http://localhost:5000/api/";


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
