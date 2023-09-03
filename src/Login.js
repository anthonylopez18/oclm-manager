import { useState } from 'react';
import React from 'react';
import './Login.css';

function Login() {
    const [inputs, setInputs] = useState({});

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
        .then(res => res.text())
        .then(
            (result) => {
                console.log(result.status);
                if(result.status == 200)
                    alert('CORRECT');
                else{
                    alert('FAILED');
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

  return (
    <>
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

        </>
  );
}
export default Login;