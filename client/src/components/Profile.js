import React, {useContext} from "react";
import { UserContext } from "../Context/UserContext";
import ReviewButtons from "./ReviewButtons";


function Profile({deleteReview}) {
    const {user} = useContext(UserContext)
    return(
        <>
            <div className="details">
                <div className="headshot"> 
                    <img className="image" src={user.profile_picture}></img>
                </div>
                <div className="profile-info">
                    <h1>Welcome, {user.name}!</h1>
                    <p className="profile-text"><strong>Username:</strong> {user.username}</p>
                    <p className="profile-text"><strong>Age:</strong> {user.age} years old</p>
                    <button className="form-button">Edit Information</button>
                </div>
            </div>
            <div className="review-section">
                <h1 className="review-header">My Book Reviews</h1>
                {user.reviews.map(review => {
                    return(    
                    <div className="review details" key={review.id}>
                        <img className="review-image" src={review.book.book_image}></img>
                        <div className="details-text">
                            <h2>{review.comment}</h2>
                            <p className="star">{"★".repeat(review.rating)}</p>
                            <h5 className="title"><strong>{review.book.title}</strong></h5>
                            <h5 className="author"><em>{review.book.author}</em></h5>
                            <ReviewButtons deleteReview={deleteReview} review={review}/>
                        </div>
                    </div>
                    )  
                })}
            </div>
         </>
    )
}

export default Profile;