import React, {useContext} from "react";
import { UserContext } from "../Context/UserContext";
import { Link } from "react-router-dom";

function NavBar() {
    const {user, setUser} = useContext(UserContext)
    function handleLogoutClick() {
        fetch("/logout", { method: "DELETE" }).then((r) => {
        if (r.ok) {
            setUser(null);
        }
        });
    }

    return (
        <header>
            {user ? (
                <>
                    <div className="navbar">
                        <Link to="/">Home</Link>
                    </div>
                </> 
            ): 
            <h3 className="navbar logo">BookClub</h3>
            }

        <div className="navbar">
            {user ? (
                <>
                    <Link to="/profile">Profile</Link>
                    <button className="logout" onClick={handleLogoutClick}>Logout</button>
                </>
            ) : (
            <>
                <Link to="/signup">Signup</Link>
                <Link className="logout" to="/login">Login</Link>
            </>
            )}
        </div>
        </header>
    );
}

export default NavBar;