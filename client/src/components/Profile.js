import React, {useContext} from "react";
import { UserContext } from "../Context/UserContext";
// import Review from "./Review";

function Profile() {
    const {user} = useContext(UserContext)
    // const userReviews = user.reviews.map(review => {
    //     console.log(review)
    // })

    return(
        <>
            <div className="profile">
                <div className="circular--landscape"> 
                    <img className="profile-image" src={user.profile_picture}></img>
                </div>
                <div className="profile-info">
                    <h1>My Profile</h1>
                    <small>Name: {user.name}</small><br></br>
                    <small>Username: {user.username}</small><br></br>
                    <small>Age: {user.age} years old</small><br></br>
                    <button className="form-button">Edit Information</button>
                </div>
            </div>
            <div>
                <h1>hi</h1>
                {user.reviews.map(review => {
                    <div key={review.id}>
                        <h2>{review.comment}</h2>
                        <h3>{review.rating}</h3>
                    </div>
                })}
            </div>
         </>
    )
}

export default Profile;