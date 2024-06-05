import '../Styles/spot.min.css';
import { UserContext } from "../context/user";
import { SwitchesContext } from '../context/switches';
import React, { useContext, useEffect, useState } from 'react'
import { useParams, Link} from 'react-router-dom'
import Review from './Review';
import Favorite from './Favorite';
import noPhoto from '../images/no_photo.jpeg';

function Spot() {
    const {user} = useContext((UserContext))
    const {setIsClicked} = useContext((SwitchesContext))
    const [displaySpot, setDisplaySpot] = useState()
    const [showReviews, setShowReviews] = useState(false)
    const [photoToDisplay, setPhotoToDisplay] = useState(0)
    
    let params = useParams()
    let displayId = params.spotId

    useEffect( () => {
        fetch(`/spots/${displayId}`)
        .then((response) => {
            if (response.ok) {
            response.json().then((spot) => setDisplaySpot(spot));
            } else {
            }
        })
        }, [displayId])

    let displayReviews = displaySpot && displaySpot.reviews.map((review, index) => {
        return <Review review={review} key={index} setDisplaySpot={setDisplaySpot}/>
    })

    const handleShowReviews = () => {
        setShowReviews(!showReviews)
        window.scrollTo(0, 25000)
    }

    const incrementPhoto = () => {
        if (photoToDisplay < displaySpot.image_urls.length - 1)
        setPhotoToDisplay(photoToDisplay + 1)
    }

    const decrementPhoto = () => {
        if (photoToDisplay > 0)
        setPhotoToDisplay(photoToDisplay - 1)
    }


  return (
    displaySpot ? 
        <div onClick={() => setIsClicked(false)}className="display_spot_div">
            <div className="display_spot_header_links">
                <div className='display_spot_links'>
                <Link className="display_spot_link" to="/spots/add_review" state={ displaySpot }>
                    <h5 className="header_link">Add Review</h5>
                </Link>
                {user.id === displaySpot.user_id && 
                <div className='display_spot_links'>
                <Link className="display_spot_link" to="/spots/edit_spot" state={ displaySpot }>
                    <h5 className="header_link">Edit Spot</h5>
                </Link>
                </div>}
                </div>
                <div>
                <Favorite spot_id={displaySpot.id}/>
                </div>
            </div>
            <div className="display_spot_photos_div">
                {displaySpot.image_urls ? 
                <img className="display_spot_primary_photo" alt={displaySpot.name} src={displaySpot.image_urls[photoToDisplay]}/>
                :
                <img className='display_spot_primary_photo' alt={displaySpot.name} src={noPhoto} />
                }
                
            </div>
            <div className="display_spot_photos_control_div">
            {displaySpot.image_urls?
                <div className="display_spot_photos_button_div">
                    <h5 onClick={decrementPhoto} className={photoToDisplay === 0? "off" : "display_spot_photos_minus_button"}>←</h5>
                </div> : ''}
            {displaySpot.image_urls? 
                <div className="display_spot_photos_button_div">
                    <h5 onClick={incrementPhoto} className={photoToDisplay === displaySpot.image_urls.length - 1? "off" : "display_spot_photos_button"}>→</h5>
                </div>: ''}
            </div>
            <div className="display_spot_info_div">
                <div className='display_spot_ratings_div'>
                    <div>
                        <p className="display_spot_name">{displaySpot.name}</p>
                    </div>
                    <div className='display_spot_ratings'>
                        <p className='display_spot_rating'>Rating: {displaySpot.ratings_average} ✶</p>
                        <p className="display_spot_bust">Bust: {displaySpot.bust_average} 🚫</p>
                    </div>
                </div>
                <p className="display_spot_address">{displaySpot.address}</p>
                <p className="display_spot_about">{displaySpot.about}</p>
                <h5 className='display_spot_attributes_header'>Spot Attributes</h5>
            </div>
            <div className="display_spot_attributes_div">
                <ul className='display_spot_attributes'>
                    {displaySpot.bank && <li>Bank</li>}
                    {displaySpot.flat_bar && <li>Flat Bar</li>}
                    {displaySpot.gap && <li>Gap</li>}
                    {displaySpot.handrail && <li>Handrail</li>}
                    {displaySpot.ledge && <li>Ledge</li>}
                    {displaySpot.manual_pad && <li>Manual Pad</li>}
                    {displaySpot.stairs && <li>Stairs</li>}
                    {displaySpot.transition && <li>Transition</li>}
                </ul>
            </div>
            {displayReviews.length > 0 && 
                <p className="display_spot_reviews_click" onClick={handleShowReviews}>
                    {showReviews? `Hide ${displayReviews.length} Reviews` : `Show ${displayReviews.length} Reviews`}
                </p>}
            {showReviews && <div>
                <hr></hr>
                {displayReviews}
            </div>}
        </div> : <div>Spot Loading</div>
  )
}

export default Spot