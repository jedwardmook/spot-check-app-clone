import '../Styles/myprofile.min.css';
import React, { useContext} from "react";
import {Link} from 'react-router-dom'
import { UserContext } from '../context/user'

function MyProfile() {
    const {user} = useContext(UserContext)

    

    const userReviews = user.reviews && user.reviews.map ((review, id) => {
            return <Link className='profile_review_link' to={`/spots/${review.spot_id}`}><div className="profile_review_div" key={id}>
                        <h5 className="profile_spot_name">Spot: {review.spot_name}</h5> 
                        <h5 className="profile_spot_rating">Rating: {review.rating} ✶</h5>
                        {/* <h5 className="profile_spot_bust">Bust Rating:{review.bust_rating} 🚫</h5> */}
                    </div></Link>
    })

    return (
        <div className="profile_div">
            <div className="profile_links_div">
                <Link className="profile_link" to='/'><h5 className="profile_link_text">Spot Map</h5></Link>
                <Link className="profile_link" to='/edit_profile'><h5 className="profile_link_text">Edit Profile</h5></Link>
            </div>
            <div className="profile_main_div">
                <div className="profile_photo_div">
                    <img className="profile_image" src={user.photo_url} alt="Profile pic"/>
                    <h5 className="profile_username">Username: {user.username}</h5>  
                </div>
                <div className="profile_info_div">
                    <h5 className="profile_name">Name: {user.name}</h5>
                    <h5 className="profile_about">About: {user.bio}</h5>
                </div>
            </div>
            {user.reviews.length > 0 && <h5 className="profile_reviews">{user.username}'s reviews</h5>}
            <div className="profile_reviews_div">{userReviews}</div>
    
        </div>
    )
}

export default MyProfile;