import React, {useContext} from "react";
import { UserContext } from "../Context/UserContext";

function Profile() {
    const {user} = useContext(UserContext)

    return(
        <>
            <img src={user.profile_picture}></img>
            <h1>{user.name}!</h1>
            <h2>{user.username}</h2>
            <h2>{user.age}</h2>
            <button>Edit Information</button>
        </>
    )
}

export default Profile;