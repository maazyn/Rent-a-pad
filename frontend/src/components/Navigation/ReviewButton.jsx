import { useState, useEffect, useRef } from "react";
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import OpenModalButton from "../OpenModalButton/OpenModalButton";
import ReviewFormModal from "../ReviewFormModal/ReviewFormModal"

const ReviewButton = ({theSpot, reviews}) => {
  const sessionUser = useSelector((state) => state.session.user);
  const { spotId } = useParams();
  const [showButton, setShowButton] = useState(false);
  const ulRef = useRef();
  const checkExisting = reviews.filter((review) => review.User.id === sessionUser.id);
  const checkSpotOwner = theSpot.ownerId === sessionUser.id? true: false;

  console.log(theSpot);
  console.log("FLAG:", sessionUser);




  useEffect(() => {
    if (!showButton) return;
    const hideButton = (e) => {
        if (ulRef.current && !ulRef.current.contains(e.target) ) {
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
      {checkExisting.length < 1 && !checkSpotOwner && (
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
