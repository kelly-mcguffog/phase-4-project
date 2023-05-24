import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import ReviewButtons from "./ReviewButtons";


function Profile({onDeleteReview}) {
    const {user} = useContext(UserContext)
    const topReviews = user.reviews.filter(review => review.rating > 4).slice(0, 5)
    return(
        <>
            <div className="details">
                <div className="image-cropper profile-cropper">
                    <img className="profile-image" src={user.profile_picture}></img>
                </div>
                <div className="profile-info">
                    <h1 className="page-header profile-username">{user.name}</h1>
                    <p className="profile-text"><strong>Username:</strong> {user.username}</p>
                    <p className="profile-text"><strong>Age:</strong> {user.age} years old</p>
                </div>
            </div>
            <div>
                <h3 className="page-header">{user.name}'s Favorite Books</h3>
                <div className="favorites">
                    {topReviews.map(review => {
                        return(
                            <div className="books favorite-books" key={review.id}>
                                <Link to={`/books/${review.book_id}`}>
                                    <img className="image" src={review.book.book_image}></img>
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="review-section">
                <h3 className="page-header review-header">{user.name}'s Book Reviews</h3>
                {user.reviews.map(review => {
                    return(    
                        <div className="review details" key={review.id}>
                            <Link to={`/books/${review.book_id}`}>
                                <img className="review-image" src={review.book.book_image}></img>
                            </Link>
                            <div className="details-text">
                                <h2 className="comment">{review.comment}</h2>
                                <p className="star">{"★".repeat(review.rating)}</p>
                                <h5 className="title"><strong>{review.book.title}</strong></h5>
                                <h5 className="author"><em>{review.book.author}</em></h5>
                                <ReviewButtons onDeleteReview={onDeleteReview} review={review}/>
                            </div>
                        </div>
                    )  
                })}
            </div>
        </>
    )
}

export default Profile;