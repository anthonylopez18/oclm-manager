import './Navigation.css';
import logos from './oclm-logo.png';

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
function Login(){
    return (
        <div className='login'>
            <input type="text" placeholder='Username'></input>
            <input type="password" placeholder='Password'></input>
            <button>Login</button>
        </div>
        );
}
export default Navigation;
