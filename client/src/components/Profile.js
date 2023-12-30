import React, { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import UserProfileDetails from "./UserProfileDetails";
import FavoriteBooks from "./FavoriteBooks";
import MyBookReview from "./MyBookReview";

function Profile({ onDeleteReview }) {
  const { user } = useContext(UserContext);
  const { name, username, age, profile_picture } = user;
  const topReviews = user.reviews.filter((review) => review.rating > 4).slice(0, 5);

  return (
    <>
      <UserProfileDetails name={name} username={username} age={age} profile_picture={profile_picture} />
      <FavoriteBooks name={name} topReviews={topReviews} />
      <div className="review-section">
        <h2 className="page-header review-header">{name}'s Book Reviews</h2>
        {user.reviews.map((review) => (
          <MyBookReview key={review.id} review={review} onDeleteReview={onDeleteReview} />
        ))}
      </div>
    </>
  );
}

export default Profile;
