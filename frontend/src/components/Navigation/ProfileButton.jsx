import { RiAccountBoxFill } from "react-icons/ri";
import { RiMenuLine } from "react-icons/ri";

import { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import LoginFormModal from "../LoginFormModal/LoginFormModal";
import SignupFormModal from "../SignupFormModal/SignupFormModal";
// import OpenModalButton from "../OpenModalButton/OpenModalButton";
import OpenModalMenuItem from "../OpenModalMenuItem";
import { NavLink } from "react-router-dom";
import * as sessionActions from '../../store/session';
import { useNavigate } from "react-router-dom";

const ProfileButton = ({ user, isLoaded }) => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const navigate = useNavigate();
  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep click from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;
    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    navigate("/");
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : "-hidden");

  return (
    <>
      <button id="profile-button" className="flex flex-row relative w-[80px] rounded-full justify-center items-center box-border" onClick={toggleMenu}>
        <div><RiMenuLine/></div>
        <RiAccountBoxFill />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <div className="account-menu">
            <li>{user.username}</li>
            <li>{user.firstName} {user.lastName}</li>
            <li>{user.email}</li>
            <li className="manage-container">
              {isLoaded && (
                <button to="/spots/current">Manage Listings</button>
              )}
            </li>
            <li className="manage-container">
              {(
                <NavLink className="manage-button" to="/spots/current">Manage Listings</NavLink>
              )}
            </li>
            <li>
              <button onClick={logout}>Log Out</button>
            </li>
          </ div>
        ) : (
          <div className="session-menu">
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal/>}
              />
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal/>}
              />
          </div>
        )}
    </ul>
    </>
  );
};

export default ProfileButton;
