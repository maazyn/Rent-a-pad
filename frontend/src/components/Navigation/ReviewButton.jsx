import { useState, useEffect, useRef } from "react";
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import OpenModalButton from "../OpenModalButton/OpenModalButton";
import ReviewFormModal from "../ReviewFormModal/ReviewFormModal"

const ReviewButton = () => {
  const sessionUser = useSelector((state) => state.session.user);
  // console.log("FLAG:", sessionUser)
  const [showButton, setShowButton] = useState(false);
  const ulRef = useRef();
  // const toggleMenu = (e) => {
  //   e.stopPropagation();
  //   setShowMenu(!showMenu);
  // };
  const { spotId } = useParams();


  useEffect(() => {
    if (!showButton) return;
    const hideButton = (e) => {
        if (ulRef.current && !ulRef.current.contains(e.target)) {
            setShowButton(false);
        }
    };
    document.addEventListener('click', hideButton);
    return () => document.removeEventListener('click', hideButton);
  }, [showButton]);


  const handleClick = () => {
    setShowButton(true);
  };

  return (
    <div className="review-button-container" ref={ulRef}>
      {sessionUser && (
        <OpenModalButton
          buttonText="Post A Review"
          modalComponent={<ReviewFormModal spotId={spotId}/>}
          onClick={handleClick}
        />
      )}
    </div>
  );
};

export default ReviewButton;
