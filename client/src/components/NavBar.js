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
        <div>
            <Link to="/">Home</Link>
        </div>
        <div>
            {user ? (
                <>
                    <Link to="/profile">Profile</Link>
                    <button onClick={handleLogoutClick}>Logout</button>
                </>
            ) : (
            <>
                <Link to="/signup">Signup</Link>
                <Link to="/login">Login</Link>
            </>
            )}
        </div>
        </header>
    );
}

export default NavBar;