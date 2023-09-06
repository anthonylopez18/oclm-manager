import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Header from './Header.js';
import Schedule from './Schedule.js';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import UpdateSchedule from './UpdateSchedule.js';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Login from './Login.js';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div className='container'>
  <React.StrictMode>
    <Router>
        <Header />
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route path='/update/:year/:month/:dd' element={<UpdateSchedule  />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Login />} />
          <Route path='/schedule' element={<Schedule />} />
        </Routes>
      </Router>
    </React.StrictMode>
  </div>
  
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
