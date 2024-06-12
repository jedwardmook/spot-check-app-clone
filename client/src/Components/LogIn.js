import '../Styles/login.min.css';
import logo from "../images/spot_check-2.png"
import React, { useState, useContext } from "react";
import { UserContext } from '../context/user';
import { useNavigate, Link } from "react-router-dom"

function LogIn() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState(null)

    const {setUser} = useContext(UserContext)


    let navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault();
        fetch('/sessions', {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        }).then((response) => {
            if (response.ok) {
                response.json().then((user) => {
                    setUser(user);
                    navigate("/");
                })
            } else {
                response.json().then((errors) => setErrors(errors.errors))
            }
        })        
        setUsername("");
        setPassword("");
    }

    const handleGuestLogin = () => {
        fetch('/sessions', {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                username: 'UserGuest',
                password: 'guestPW12',
            }),
        }).then((response) => {
            if (response.ok) {
                response.json().then((user) => {
                    setUser(user);
                    navigate("/");
                })
            } else {
                response.json().then((errors) => setErrors(errors.errors))
            }
        })        
        setUsername("");
        setPassword("");
    }

    return (
        <div className="login_div">
            <div className={errors? 'login_info_div_errors' : 'login_info_div'}>
                <img className="logo" src={logo} alt="Spot Check"/>
                <h1 className='welcome'>Log into your account</h1>
            <div className='login_form'>
                <input
                    className='login_top'
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />
                <input 
                    className='login_bottom'
                    placeholder='Password'
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                <div className='login_links_container'>
                    <button className='login_guest_button' onClick={() => handleGuestLogin()}>log in as guest</button>
                    <Link className='link' to='/signup'><p className='login_link'>sign up for an account</p></Link>
                </div>
                <button onClick={handleLogin} className="login_button">Submit</button>
            </div>
            {errors&& <div className="login_error_div">
                <h5 className='login_error_info'>- {errors} -</h5>
            </div>}
            </div>
        </div>
    )
}

export default LogIn;