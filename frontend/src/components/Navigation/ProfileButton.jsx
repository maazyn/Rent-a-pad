import { RiAccountBoxFill } from "react-icons/ri";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import LoginFormModal from "../LoginFormModal/LoginFormModal";
import SignupFormModal from "../SignupFormModal/SignupFormModal";
import OpenModalButton from "../OpenModalButton/OpenModalButton";

import * as sessionActions from '../../store/session';

const ProfileButton = ({ user }) => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
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

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : "-hidden");

  return (
    <>
      <button id="profile-button" onClick={toggleMenu}>
        <RiAccountBoxFill />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <div className="account-menu">
            <li>{user.username}</li>
            <li>{user.firstName} {user.lastName}</li>
            <li>{user.email}</li>
            <li>
              <button onClick={logout}>Log Out</button>
            </li>
          </ div>
        ) : (
          <div className="session-buttons">
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
          </div>
        )}
    </ul>
    </>
  );
};

export default ProfileButton;
