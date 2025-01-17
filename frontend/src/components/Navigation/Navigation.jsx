import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import ProfileButton from "./ProfileButton";

import './Navigation.css';

const Navigation = ({ isLoaded }) => {
    const sessionUser = useSelector((state) => state.session.user);

    return (
        <nav className="nav-bar">
            <li className="nav-bar-home">
                <NavLink to="/">
                    <img className="nav-logo" src="/images/logo-aa-proj.PNG" alt="Logo" />
                </NavLink>
            </li>
            <li className="create-listing">
                {sessionUser && (
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
