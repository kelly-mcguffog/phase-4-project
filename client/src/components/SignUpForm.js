import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { Link } from "react-router-dom";

function SignUpForm() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext)
  const [errors, setErrors] = useState([]);
  const [photoFile, setPhotoFile] = useState(null);

  const initialState = {
    name: "",
    age: "",
    username: "",
    password: "",
    password_confirmation: ""
  };

  const [formData, setFormData] = useState(initialState);

  function handleChange(event) {
    if (event.target.name === "profile_picture") {
      setPhotoFile(event.target.files[0]);
    } else {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
      });
      setErrors((prevErrors) => ({
        ...prevErrors,
        [event.target.name]: null,
      }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("age", formData.age);
    data.append("username", formData.username);
    data.append("password", formData.password);
    data.append("password_confirmation", formData.password_confirmation);

    if (photoFile !== null) {
      data.append("profile_picture", photoFile);
    }

    fetch("/signup", {
      method: "POST",
      body: data
    })
      .then((r) => {
        if (r.ok) {
          r.json().then((user) => setUser(user));
          navigate("/");
        } else {
          r.json().then((err) => setErrors(err.errors));
        }
      });
  }

  return (
    <div className="form">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className="form-text head">Sign Up</h1>
        <h3 className="form-text subhead">Enter your details to create an account.</h3>
        {errors.length > 0 && (
          <ul className="error-message">
            {errors.map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}
        <input
          type="text"
          id="name"
          name="name"
          autoComplete="off"
          placeholder="name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          id="age"
          name="age"
          placeholder="age"
          autoComplete="off"
          value={formData.age}
          onChange={handleChange}
        />
        <input
          type="text"
          id="username"
          name="username"
          autoComplete="off"
          placeholder="username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="current-password"
        />
        <input
          type="password"
          id="password_confirmation"
          name="password_confirmation"
          placeholder="password confirmation"
          value={formData.password_confirmation}
          onChange={handleChange}
          autoComplete="current-password"
        />
        <input
          type="file"
          id="profile_picture"
          name="profile_picture"
          accept="image/*"
          onChange={handleChange}
        />
        <button className="form-button" type="submit">Sign Up</button>
        <h5 className="form-text">Already a member?<br></br>
          <Link className="link" to="/login">Login to your account.</Link></h5>
      </form>
    </div>
  );
}

export default SignUpForm;