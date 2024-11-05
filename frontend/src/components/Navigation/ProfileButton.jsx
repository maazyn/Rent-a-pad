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

  const managePage = (e) => {
    e.preventDefault();
    navigate("/spots/current");
    closeMenu();
  };
  const createPage = (e) => {
    e.preventDefault();
    navigate("/spots");
    closeMenu();
  };
  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    navigate("/");
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : "-hidden");

  return (
    <>
    {user ? (
      <div className="relative">
        <button
          id="profile-button"
          className={`flex flex-row relative w-[85px] rounded-full justify-center items-center box-border ${
          showMenu ? "shadow-[0px_3px_3px_rgb(202,202,202)]": ""
          } hover:shadow-[0px_3px_3px_rgb(202,202,202)] duration-200`}
          onClick={toggleMenu}>
          <div><RiMenuLine/></div>
          <RiAccountBoxFill />
        </button>

        <ul className={`${ulClassName} absolute right-0 top-[100%] mt-2 bg-white rounded-lg overflow-y-auto z-10 py-2`} ref={ulRef}>

          <div className="account-menu mt-2">
            <li className="user-details text-left px-4">{user.firstName} {user.lastName}</li>
            <li className="user-details text-left px-4">{user.username}</li>
            <li className="user-details text-left px-4">{user.email}</li>

            <div className="w-full h-[1px] border-[0.5px] border-slate-300 my-3"></div>

            <li className="text-left h-[35px] leading-[35px]">
                <button className="text-left px-4 h-[35px] w-full rounded-none text-sm hover:bg-stone-200" onClick={managePage}>Manage Listings</button>
            </li>
            <li className="text-left h-[35px] leading-[35px]">
                <button className=" text-left px-4 h-[35px] w-full rounded-none text-sm hover:bg-stone-200" onClick={createPage}>Create Listing</button>
            </li>
            <li className="text-left h-[35px] leading-[35px]">
              <button className="text-left px-4 h-[35px] w-full rounded-none text-sm hover:bg-stone-200" onClick={logout}>Log Out</button>
            </li>
          </ div>
        </ul>
      </div>
    ) : (
      <div className="relative">
        <button id="profile-button-no-session" className="flex flex-row relative w-[170px] rounded-full justify-center items-center box-border px-[5px]">
          <div className="session-menu flex flex-row h-[40px] leading-[40px]">
            <div className="pr-[10px]">
              <OpenModalMenuItem
                itemText=" Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal/>}
              />
            </div>
            /
            <div className="pl-[10px]">
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal/>}
              />
            </div>
          </div>
          {/* <div><RiMenuLine/></div> */}
          {/* <RiAccountBoxFill /> */}
        </button>
      </div>
    )}
    </>
  );
};

export default ProfileButton;
