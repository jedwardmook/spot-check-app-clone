import '../Styles/navbar.min.css';
import logo from '../images/text_logo.png'
import React, {useContext, useEffect} from "react"
import { UserContext } from '../context/user';
import { SwitchesContext } from '../context/switches';
import { Link, useNavigate } from "react-router-dom"

function Navbar() {
    const {user, setUser} = useContext(UserContext)
    const {placesDiv, setPlacesDiv, isClicked, setIsClicked, addSpot, setAddSpot, showFavorites, setShowFavorites} = useContext(SwitchesContext)
    let navigate = useNavigate()


    useEffect(() => {
        fetch('/sessions/1')
            .then((response) => {
                if (response.ok) {
                response.json().then((user) => setUser(user));
                } else {
                    navigate('/login')
            }
            })
    }, [])

    const handleLogOut = () => {
        fetch('/sessions/1', {
            method: "DELETE",
            }).then((response) => {
                if (response.ok) {
                    setUser({});
            }
        })
    }

    const handleMenuToggle = () => {
        setIsClicked(!isClicked)
    }

    const handleCancel = () => {
        setAddSpot(!addSpot)
    }

    const handlePlacesDiv = () => {
        setPlacesDiv(!placesDiv)
    }

    return (
        <div className="navbar_div">
            <div onClick={handleMenuToggle} className="navbar_menu">
                <div className='dash'></div>
                <div className='dash'></div>
                <div className='dash'></div>
                {isClicked && 
                    <div className="navbar_user_menu">
                        <div className='menu_link'>{user? <h4>{user.username} </h4>: <h4>Username</h4>}</div>
                        <Link className="menu_links" to="/myprofile"><div className='menu_link'><h4>Profile</h4></div></Link>
                        <Link className="menu_links" to="/"><div className='menu_link' onClick={handlePlacesDiv}>
                            {placesDiv ? <h4>Add A Spot</h4> : <h4>Nearby Spots</h4>}</div></Link>
                        {user.favorites_array.length !== 0 && <Link className="menu_links" to="/"><div className='menu_link' onClick={() => setShowFavorites(!showFavorites)}> 
                            {showFavorites ?<h4>Show All</h4> : <h4>Show Favorites</h4>}</div></Link>}
                        <Link className="menu_links" onClick={handleLogOut} to='login'><div className='menu_link'><h4>Log Out</h4></div></Link>
                    </div>}
            </div>
                <Link to="/"><img className="navbar_logo" alt="Spot Check" src={logo} /></Link>
            {addSpot &&
                <div className='add_spot_window'>
                <div className='add_spot_div'>
                        <h5 className='add_spot_header'>Add spot here</h5>
                    <div className='add_spot_button_div'>
                        <Link to="/addspot" onClick={handleCancel}><button className='add_spot_button'>Yes</button></Link>
                        <button className='cancel_button' onClick={handleCancel}>Cancel</button>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default Navbar