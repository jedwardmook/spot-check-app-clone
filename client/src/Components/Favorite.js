import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../context/user';
import '../Styles/favorite.min.css';

function Favorite({spot_id}) {
    const {user, setUser} = useContext(UserContext)
    const [openFavorite, setOpenFavorite] = useState(false)
    const [openUnfavorite, setOpenUnfavorite] = useState(false)
    const [spotFavorited, setSpotFavorited] = useState(false)

    useEffect(() => {
        if (user.favorites_array?.includes(spot_id)) {
            setSpotFavorited(!spotFavorited)
        }
    },[user.favorites_array])


    const openFavoriteDiv = () => {
        setOpenFavorite(!openFavorite)
    }

    const openUnfavoriteDiv = () => {
        setOpenUnfavorite(!openUnfavorite)
    }

    const setUserCallback = (id) => {
        fetch(`/users/${id}`)
        .then((response) => {
            if (response.ok) {
            response.json().then((user) => setUser(user));
            } else {
            }
        })
    }

    const handleAddFavorite = () => {
        fetch('/favorites', {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    user_id: user.id,
                    spot_id: spot_id
                }),
            }).then((response) => {
                if (response.ok) {
                    response.json().then((favorite) => {
                        setUserCallback(favorite.user_id);
                    })
                } else {
                    response.json().then((errors) => console.log(errors.errors))
                }
            })
            openFavoriteDiv()
    }

    
    
    const handleRemoveFavorite = () => {
        fetch(`/favorites/${user.id}`, {
            method: "DELETE",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                user_id: user.id,
                spot_id: spot_id
                })
            }).then((response) => {
                if (response.ok) {
                    response.json().then((user) => {
                        setUserCallback(user.id);
                    })
                } else {
                    response.json().then((errors) => console.log(errors.errors))
                }
            })
            openUnfavoriteDiv();
            setSpotFavorited(!spotFavorited)
    }


  return (
    <div className='favorite_div'>
        {spotFavorited ? 
        <div onClick={openUnfavoriteDiv} className='favorite_spot_div'>
           <h5 className='favorite_text'>Unfavorite Spot?</h5>
           <h5 className='favorite_heart'>♥︎</h5>
        </div>:
        <div onClick={openFavoriteDiv} className='favorite_spot_div'>
            <h5 className='favorite_text'>Favorite Spot?</h5>
            <h5 className='favorite_heart'>♡</h5>
        </div>}
        {openUnfavorite && <div className="favorite_spot_window">
                            <div className='favorite_spot_buttons_div'>
                                <h5 className='favorite_spot_header'>Remove Spot from Favorites</h5>
                                <div className='favorite_spot_buttons'>
                                    <button onClick= {handleRemoveFavorite} className='favorite_spot_yes_button'>Yes</button>
                                    <button onClick={openUnfavoriteDiv} className='favorite_spot_cancel_button'>Cancel</button>
                                </div>
                            </div>
                        </div>}
        {openFavorite && <div className="favorite_spot_window">
                            <div className='favorite_spot_buttons_div'>
                                <h5 className='favorite_spot_header'>Add Spot to Favorites</h5>
                                <div className='favorite_spot_buttons'>
                                    <button onClick= {handleAddFavorite} className='favorite_spot_yes_button'>Yes</button>
                                    <button onClick={openFavoriteDiv} className='favorite_spot_cancel_button'>Cancel</button>
                                </div>
                            </div>
                        </div>}
    </div>
  )
}

export default Favorite