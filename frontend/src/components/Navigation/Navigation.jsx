import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import ProfileButton from "./ProfileButton";

import './Navigation.css';

const Navigation = ({ isLoaded }) => {
    const sessionUser = useSelector((state) => state.session.user);

    return (
        <nav className="nav-bar">
            <li className="nav-bar-home">
                <NavLink to="/">Home</NavLink>
            </li>
            <li className="create-listing">
                {isLoaded && (
                    <NavLink to="/spots">Create a listing</NavLink>
                )}
            </li>
            {isLoaded && (
                <h2>Hello</h2>,
                <ProfileButton user={sessionUser}/>
            )}

        </nav>
    );
}


export default Navigation;
