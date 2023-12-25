import React from "react";

const UserProfileDetails = ({ name, username, age, profile_picture }) => (
  <div className="details">
    <div className="image-cropper profile-cropper">
      <img className="profile-image" src={profile_picture} alt={name} />
    </div>
    <div className="profile-info">
      <h1 className="page-header profile-username">{name}</h1>
      <p className="profile-text">
        <strong>Username:</strong> {username}
      </p>
      <p className="profile-text">
        <strong>Age:</strong> {age} years old
      </p>
    </div>
  </div>
);

export default UserProfileDetails;