import { useState } from 'react';
import React from 'react';
import './Login.css';
import { useNavigate } from "react-router-dom";
import OclmSchedule from './OclmSchedule.js';

function Login() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const url ="https://oclm-api.onrender.com/login"; 
        const options = {
            mode:'cors',
            headers:{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'https://master.d3ldsmi1fd1rti.amplifyapp.com/' 
            },
            method:'POST',
            body: JSON.stringify({
                //username: inputs.username,
                password:inputs.password
            })
        };
        //this.setState({isLoading:true});
        fetch(url,options)
        //.then(res => res.text())
        .then(
            (response) => {
                console.log(response.status);
                if(response.status == 200){
                    setIsLoggedIn(true);
                    renderSchedule();
                }
                if(response.status== 401){
                    alert("INCORRECT");
                }
              },
              // Note: it's important to handle errors here
              // instead of a catch() block so that we don't swallow
              // exceptions from actual bugs in components.
              (error) => {
                this.setState({
                  error
                });
              }
        );
    }
    const renderSchedule = ()=> {
        console.log('oclm');
        console.log('isLoggedin: ' + isLoggedIn);
        
    }

  return (
    <>
    {!isLoggedIn ?
        <form className='login-form' onSubmit={handleSubmit}>
        {/* <div className='form-group'>
            <input className='login-input form-control' type='text' value={inputs.username || ''} onChange={handleChange} id='username' name='username' placeholder='Username / Email' />
        </div> */}
        <div>
            <input className='login-input form-control' type='password' value={inputs.password || ''} onChange={handleChange} id='password' name='password' placeholder='Password' />
        </div>
        <div>
            <input className='login-button btn btn-primary' type='submit' />
            {/* <a href='/register'>
                <button className='login-button btn btn-secondary' id='btnRegister'>Register</button>
            </a> */}
        </div>
        </form>
        :
        
        <OclmSchedule weekAsDate={Date.now()} />
    }
        </>
  );
}
export default Login;