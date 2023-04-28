import React from "react";

function Profile({user}) {
    return <h1>Welcome, {user.username}!</h1>;
}

export default Profile;