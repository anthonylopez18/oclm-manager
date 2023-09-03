import './Navigation.css';
import logos from './oclm-logo.png';
import React from 'react';
import Login from './Login.js'


function Navigation() {
  return (
    <>
    
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">Pioneer Valley Tagalog</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="/">Home </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="./schedule">OCLM</a>
          </li>
          <li className="nav-item">
            <a className="nav-link disabled" href="#">Field Service</a>
          </li>
          <li className="nav-item">
            <a className="nav-link disabled" href="#">Sunday Schedule</a>
          </li>
        </ul>
      </div>
    </nav>
    </>
    
  );
}
export default Navigation;
