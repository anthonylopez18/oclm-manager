import './Navigation.css';
import logos from './oclm-logo.png';
import React from 'react';


function Navigation() {
  return (
    <div className="Navigation">
         <img className="nav-logo" src={logos} alt='LOGO' />
         <div className='login'>
            {
            //<Login />
            }
        </div>
    </div>
  );
}
class Login extends React.Component{
  constructor(props){
      super(props);
      this.state = {
          isLoggedIn : false
      };
      this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event){
    this.setState({
      isLoggedIn : true
    });
    console.log('isLoggedIn: '+this.isLoggedIn);
  }
  render(){ 
    return (
      <div className='login'>
          <input className='form-control' type="text" placeholder='Username'></input>
          <input className='form-control' type="password" placeholder='Password'></input>
          <button className='btn btn-primary' type='submit' onClick={this.handleSubmit}>Login</button>
      </div>
    );
  }
}
export default Navigation;
