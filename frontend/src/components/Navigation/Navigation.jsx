import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal/LoginFormModal";
import SignupFormModal from "../SignupFormModal/SignupFormModal";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import './Navigation.css';

const Navigation = ({ isLoaded }) => {
    const sessionUser = useSelector((state) => state.session.user);

    const sessionLinks = sessionUser ? (
        <ul className="nav-bar-profile-button">
            <li>
                <ProfileButton user={sessionUser}/>
            </li>
        </ul>
    ) : (
        <ul className="nav-bar-profile-session">
            <li>
                <OpenModalButton
                  buttonText="Log In"
                  modalComponent={<LoginFormModal/>}
                />
            </li>
            <li>
                <OpenModalButton
                  buttonText="Sign Up"
                  modalComponent={<SignupFormModal/>}

                />
            </li>
        </ul>
    );

    return (
        <nav className="nav-bar">
            <li className="nav-bar-home">
                <NavLink to="/">Home</NavLink>
            </li>
            {isLoaded && sessionLinks}
        </nav>
    );
}


export default Navigation;
