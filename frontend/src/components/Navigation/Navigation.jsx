import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import ProfileButton from "./ProfileButton";

import './Navigation.css';

const Navigation = ({ isLoaded }) => {
    const sessionUser = useSelector((state) => state.session.user);

    return (
        <nav className="nav-bar bg-white drop-shadow-sm shadow-black border-b-[0px]">
            <div className="nav-bar-home ml-0 sm:ml-4 md:ml-8 lg:ml-20">
                <NavLink to="/">
                    <img className="nav-logo" src="/images/logo-aa-proj.PNG" alt="Logo" />
                </NavLink>
            </div>
            <div className="create-listing hidden sm:block">
                {sessionUser && (
                    <NavLink to="/spots">Create a listing</NavLink>
                )}
            </div>
            {isLoaded && (
                <div className="flex items-center space-x-4">
                    {/* <h2 className="hidden lg:block text-sm sm:text-base">Hello</h2>, */}
                    <ProfileButton user={sessionUser}/>
                </div>
            )}

        </nav>
    );
}


export default Navigation;
