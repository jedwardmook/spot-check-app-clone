import '../Styles/addreview.min.css';
import React, { useState, useContext } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import logo from "../images/spot_check-2.png"
import { UserContext } from '../context/user';

function AddReview() {
    const location = useLocation()
    let navigate = useNavigate()
    const state = location.state
    const { user } = useContext(UserContext)
    const [spotId, setSpotId] = useState(state.id)
    const [rating, setRating] = useState()
    const [bustRating, setBustRating] = useState()
    const [body, setBody] = useState()
    const [userId, setUserId] = useState(user.id)
    const [errors, setErrors] = useState()

    const handleSelectRating = (e) => {
        setRating(parseInt(e.target.value))
    }

    const handleSelectBust = (e) => {
        setBustRating(parseInt(e.target.value))
    }

    const handleSubmitReview = (e) => {
        e.preventDefault()
        fetch("/reviews", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({
                spot_id: spotId,
                rating: rating,
                bust_rating: bustRating,
                body: body,
                user_id: userId,
                spot_name: state.name
            }),
        }).then((response) => {
            if (response.ok) {
                response.json().then((review) => {
                    console.log(review)
                    navigate(`/spots/${spotId}`)
                })
            }else {
                response.json().then((errors) => setErrors(errors.errors))
            }
        })
    }

  return (
    <div className='add_review_window'>
        <div className={errors? "add_review_main_div_long" : "add_review_main_div"}>
            <Link  className='close' to={`/spots/${spotId}`}><h5 className="add_review_exit_button">x</h5></Link>
                <img className="logo" src={logo} alt="Spot Check"/>
                <h1 className='welcome'>Add your review</h1>
                <h2 className='add_review_spot'>{state.name}</h2>
            <div className="add_review_form_div">
                <form onSubmit={handleSubmitReview}>
                    <div className="add_review_select_div">
                        <div className='add_review_select'>
                            <p className='add_review_select_header'>Rating:</p>
                            <select 
                                className='review_select'
                                onChange={handleSelectRating}
                                >
                                <option value=""> </option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                        <div className='add_review_select'>
                            <p  className='add_review_select_header'>Bust:</p>
                            <select 
                                className='review_select'
                                onChange={handleSelectBust}>
                                <option value=""></option>
                                <option value="0">Zero</option>
                                <option value="1">Low</option>
                                <option value="2">Medium</option>
                                <option value="3">High</option>
                            </select>
                        </div> 
                    </div>
                    <div className='add_review_descriptors'>
                            <h5 className='add_review_description'>(How fun it the spot?)</h5>
                            <h5 className='add_review_description'>(Chance of getting kicked out?)</h5>
                    </div>
                    <textarea 
                        className="add_review_textarea"
                        placeholder='Review of spot'
                        onChange={(e) => setBody(e.target.value)}
                        />
                    <br/>
                    <div>
                        <button className="add_review_submit">Submit</button>
                    </div>
                </form>
                {errors && <div>{errors.map((error, index) => {
                return <div className="add_review_errors_div"><h5 className="add_review_error">- {error} -</h5></div>}
                )}
                </div>}
            </div>
        </div>
    </div>
  )
}

export default AddReview