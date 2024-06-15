import React from 'react'
import logo from "../images/spot_check-2.png"
import { useLocation, useNavigate } from 'react-router-dom'
import '../Styles/register.min.css';

function Register() {
  const location = useLocation()
  const navigate =  useNavigate()
  const fromComponent = location.state?.from

  let message; 
  if( fromComponent === "Navbar") {
    message = "access profile"
  } if ( fromComponent === "MapContainer") {
    message = "add spot"
  } if (fromComponent === "Add Review") {
    message = "add review"
  } if (fromComponent === "Favorite") {
    message = "favorite spot"
  } if (fromComponent === undefined) {
    message = "use Spot Check"
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  const handleRegister = () => {
    navigate("/signup")
  }

  return (
    <div className="register_window">
      <div className="register_container">
        <img className="register_logo" alt="Spot Check" src={logo}/>
        <h2 className="register_message">Sign up for an account to {message}.</h2>
        <div className="register_button_container">
          <button className="register_back_button" onClick={() => handleGoBack()}>go back</button>
          <button className="register_signup_button" onClick={() => handleRegister()}>Sign Up</button>
        </div>
      </div>
    </div>
  )
}

export default Register