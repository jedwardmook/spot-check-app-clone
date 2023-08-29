import '../Styles/review.min.css';
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/user';

function Review({review}) {
    const {user} = useContext(UserContext)

  
    return (
    review &&
    <div className='review_div'>
        <div className='review_main_div'>
            <div className='review_ratings_div'>
                <p className='review_rating'>Rating: {review.rating} ✶</p>
                <p className='review_bust_rating'>Bust: {review.bust_possibility} 🚫</p>
            </div>
            <div className='review_author_div'>
                <p className='review_author_username'>{review.review_author}</p>
                <img src={review.author_image} alt="Review Author" className="review_author_photo" />
            </div>
        </div>
        <div className='review_body_div'>
            <p className='review_date'>{review.clean_date}</p>
            <p className='review_body'>{review.body}</p>
        </div>
        {user.id === review.user_id &&
        <div className='review_edit_div'>
            <Link to="/spots/edit_review" state= { review }><p className='review_edit'>Edit Review</p></Link>
        </div>}
        <br/>
    </div>
  )
}

export default Review