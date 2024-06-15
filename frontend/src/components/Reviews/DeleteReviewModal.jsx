import { useState } from 'react';
// import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { deleteReview } from '../../store/reviews';
import { useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import { FaStar } from "react-icons/fa6";


const DeleteReviewModal = ({reviewId}) => {
    const dispatch = useDispatch();
    // const user = useSelector((state) => state.session.user);
    const { closeModal } = useModal();
    console.log(reviewId);

    const handleDelete = async (e) => {
        e.preventDefault();
        dispatch(deleteReview(reviewId))
        closeModal();
    };



    return (
        <>
        <h1 className="form-heading">Confirm Delete</h1>
        <h2 id="delete-subheading">Are you sure you want to remove this review?</h2>
        <div className="yes-no-buttons-container">
            <button className="yes-button" type="submit" onClick={handleDelete}>Yes (Delete Review)</button>
            <button className="no-button" onClick={closeModal}>No (Keep Review)</button>
        </div>
        </>
    )
}

export default DeleteReviewModal;
