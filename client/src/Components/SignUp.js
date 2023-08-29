import '../Styles/signup.min.css';
import logo from "../images/spot_check-2.png"
import React, { useState, useContext } from "react";
import { UserContext } from '../context/user';
import { useNavigate, Link } from 'react-router-dom';

function SignUp() {
    const {setUser} = useContext(UserContext)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [errors, setErrors] = useState()
    let navigate = useNavigate()

    const handleSignup = (e) => {
        e.preventDefault();

        fetch('/users', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user: { username: username,
                    password: password,
                    password_confirmation: passwordConfirmation,
                    name: "Update name",
                    bio: "Update info",
                },
            }),
        }).then((response) => {
            if (response.ok) {
                response.json().then((user) => {
                    setUser(user);
                    navigate("/myprofile")
                })
            } else {
                response.json().then(errors => setErrors(errors))
            }
        })
        setUsername("");
        setPassword("");
        setPasswordConfirmation("");
    }
    
    return (
      <div className="signup_div">
        <div className={errors? "signup_info_div_long": "signup_info_div"}>
            <img className="logo" alt="Spot Check" src={logo}/>
            <h1 className='welcome'>Sign up for an account</h1>
        <div className="signup_form">
            <input
                className="signup_top_input"
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
            <input
                type="password"
                className="signup_input"
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            <input
                type="password"
                className="signup_bottom_input"
                placeholder='Confirm Password'
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                />
        <Link className='link' to='/login'><p className='login_link'>log into your account</p></Link>
        <button className="signup_button" onClick={handleSignup}>Submit</button>
        </div>
        {errors && errors.errors.map((error, index) => {
            return <div className="signup_error_div"key={index}><h5 className="signup_error">- {error} -</h5></div>
        })
        }
        </div>
      </div>
    );
  }
  
  export default SignUp;