import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { Link } from "react-router-dom";

function SignUp() {
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const history = useHistory();
  const {setUser} = useContext(UserContext)

  const initialState = {
    name:"",
    age:"",
    profile_picture:"",
    username: "",
    password: "",
    passwordConfirmation:""
  }
  const [formData, setFormData] = useState(initialState)
  
  function handleChange(event) {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value
      });
    }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
        history.push("/");
      }
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <h1 className="form-text head">Sign Up</h1>
        <h3 className="form-text subhead">Enter your details to create an account.</h3>
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
          id="profile_picture"
          name="profile_picture"
          placeholder="avatar"
          autoComplete="off"
          value={formData.profile_picture}
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
          name="passwordConfirmation"
          placeholder="password confirmation"
          value={formData.passwordConfirmation}
          onChange={handleChange}
          autoComplete="current-password"
        />
        <button className="form-button" type="submit">Sign Up</button>
        <h5 className="form-text">Already a member?<br></br>
        <Link className="link" to="/login">Login to your account.</Link></h5>
      </form>
    </div>
  );
}

export default SignUp;