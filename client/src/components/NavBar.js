import React, {useContext, useState} from "react";
import { UserContext } from "../Context/UserContext";
import { Link, NavLink, useNavigate } from "react-router-dom";

function NavBar() {
    const {user, setUser} = useContext(UserContext)
    const [isMobile, setIsMobile] = useState(false);
    const navigate = useNavigate()

    function handleLogoutClick() {
        fetch("/logout", { method: "DELETE" }).then((r) => {
            if (r.ok) {
                setUser(null);
                navigate("/login");
            }
        });
    }

    function handleMobile() {
        setIsMobile((isMobile) => !isMobile);
    }

    return (
        <header id="navbar">
                <Link to="/"><h3 className="logo">BookClub</h3></Link>
                {user ? (
                    <div id="navbar-right" className={isMobile ? "active" : "inactive"}>

                        <NavLink to="/books/new">Add Book</NavLink>
                        <NavLink to="/profile">Profile</NavLink>
                        <button className="logout" onClick={handleLogoutClick}>Logout</button>
                    </div>
                ) : (
                    <></>
                )}
            <div id={user ? "mobile" : "desktop"} onClick={handleMobile}>
                    <i id="bar" className={isMobile ? "fa-solid fa-times" : "fa-solid fa-bars"}></i>
            </div>
        </header>
    );
}

export default NavBar;