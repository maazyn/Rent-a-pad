import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteReviewModal from "./DeleteReviewModal";
import "./Reviews.css"


const ReviewCard = ({id, review, User, createdAt }) => {
    const sessionUser = useSelector((state) => state.session.user);
    const reviews = useSelector((state) => state.reviews.list);
    const [showDeleteButton, setShowDeleteButton] = useState(false);

    console.log("FIRST:", id, review, User, createdAt );

    useEffect(() => {
        sessionUser && sessionUser.id === User?.id ? setShowDeleteButton(true) : setShowDeleteButton(false);
    }, [sessionUser, User]);

    useEffect(() => {
    }, [id, reviews])


    if (sessionUser && !reviews) {
        return <h2>Be the first to post a review!</h2>;
    }

   return (
    <>
        <div id="review-owner">
            <h3>{User?.firstName}</h3>
        </div>
        <div id="review-date">
            <h3>{new Date(createdAt).toDateString()}</h3>
        </div>
        <div id="review-text">
            <p>{review}</p>
        </div>
        <div className="delete-review-button-container">
            {showDeleteButton && (
                <OpenModalButton
                    buttonText="Delete"
                    modalComponent={<DeleteReviewModal reviewId={id}/>}
                />
            )}
        </div>
    </>
    );
}

export default ReviewCard;
