import React from 'react'
import logo from "../images/spot_check-2.png"
import { useLocation } from 'react-router-dom'
import '../Styles/register.min.css';

function Register() {
  const location = useLocation()
  const fromComponent = location.state.from

  let message; 
  if( fromComponent === "Navbar") {
    message = <h1>Navbar</h1>
  } if ( fromComponent === "MapContainer") {
    message = <h1>MapContainer</h1>
  }

  return (
    <div className='register_window'>
      <div className='register_container'>
        <img className="register_logo" alt="Spot Check" src={logo}/>
        {message}
        <div>
          <button>Back</button>
          <button>Register your acccount</button>
        </div>
      </div>
    </div>
  )
}

export default Register