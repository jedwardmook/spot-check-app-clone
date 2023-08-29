import '../Styles/editreview.min.css';
import React, { useState } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import logo from "../images/spot_check-2.png"

function EditReview() {
    const location = useLocation()
    let navigate = useNavigate()
    const state = location.state
    const [errors, setErrors] = useState()
    const [editRating, setEditRating] = useState(state.rating)
    const [editBustRating, setEditBustRating] = useState(state.bust_rating)
    const [editBody, setEditBody] = useState(state.body)
    const [deleteReview, setDeleteReview] = useState(false)


    const submitEditReview = (e) => {
        e.preventDefault()
        fetch(`/reviews/${state.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({
                spot_id : state.spot_id,
                rating: editRating,
                bust_rating: editBustRating,
                body: editBody,
                user_id: state.user_id,
                spot_name: state.spot_name
            }),
        }).then((response) => {
            if (response.ok) {
                response.json().then((review) => {
                    console.log(review)
                    navigate(`/spots/${state.spot_id}`)
                })
            }else {
                response.json().then((errors) => setErrors(errors.errors))
            }
        })

    }

    const handleDeleteDiv = () => {
        setDeleteReview(!deleteReview)
    }

    const deleteReviewConfirmation = () => {
        fetch(`/reviews/${state.id}`, {
            method: "DELETE",
            }).then((response) => {
                if (response.ok) {
                    navigate(`/spots/${state.spot_id}`);
            }
        })
    }

  return (
    <div className='edit_review_window'>
        <div className={errors? "edit_review_main_div_long" : "edit_review_main_div"}>
            <Link  className='close' to={`/spots/${state.spot_id}`}><h5 className="edit_review_exit_button">x</h5></Link>
            <img className="logo" src={logo} alt="Spot Check"/>
                <h1 className='welcome'>Edit your review</h1>
                <h2 className='edit_review_spot'>{state.spot_name}</h2>
            <div className="edit_review_form_div">
                <form onSubmit={submitEditReview}>
                    <div className="edit_review_select_div">
                        <div className='edit_review_select'>
                            <p className='edit_review_select_header'>Rating:</p>
                            <select 
                                className='review_select'
                                onChange={(e) => setEditRating(e.target.value)}
                                value={editRating}
                                >
                                <option value=""> </option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                        <div className='edit_review_select'>
                            <p  className='edit_review_select_header'>Bust:</p>
                            <select 
                                className='review_select'
                                onChange={(e) => setEditBustRating(e.target.value)}
                                value={editBustRating}>
                                <option value=""></option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                    </div>
                    <textarea 
                        className="edit_review_textarea"
                        placeholder='Review of spot'
                        onChange={(e) => setEditBody(e.target.value)}
                        value={editBody}
                        />
                    <br/>
                    <div>
                        <button className="edit_review_submit">Submit</button>
                    </div>
                </form>
                    <p className="edit_review_delete" onClick={handleDeleteDiv}>Delete review</p>
                <div className={deleteReview? "edit_review_delete_div": "off"}>
                <div className='delete_review_div'>
                    <h5 className='delete_review_header'>Delete your review</h5>
                    <div className='delete_review_button_div'>
                        <button className='delete_review_button' onClick={deleteReviewConfirmation}>Yes</button>
                        <button className='delete_cancel_button' onClick={handleDeleteDiv}>Cancel</button>
                    </div>
                </div>
                </div>
                {errors && <div>{errors.map((error, index) => {
                return <div className="edit_review_errors_div"><h5 className="edit_review_error">- {error} -</h5></div>}
                )}
                </div>}
            </div>
        </div>
    </div>
  )
}

export default EditReview