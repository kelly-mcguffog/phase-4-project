import React, {useContext} from "react";
import { UserContext } from "../Context/UserContext";

function Profile() {
    const {user} = useContext(UserContext)

    return(
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
    )
}

export default Profile;