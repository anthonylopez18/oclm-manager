
import Navigation from './Navigation.js';
import './Header.css';
import logos from './oclm-logo.png';
import React from 'react';


function Header() {
  return (
  <>
   <div className="Navigation">
         <img className="nav-logo" src={logos} alt='LOGO' />         
    </div>
    <div>
        <Navigation />
    </div>
  </>
   
  );
}
export default Header;
