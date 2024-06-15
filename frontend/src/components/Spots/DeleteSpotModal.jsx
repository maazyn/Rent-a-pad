import { useState } from 'react';
// import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { deleteSpot } from '../../store/spots';
import { useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import { FaStar } from "react-icons/fa6";


const DeleteSpotModal = ({ spotId }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const { closeModal } = useModal();


    const handleDelete = (e) => {
        e.preventDefault();
        if (user) {
            dispatch(deleteSpot(spotId))
            closeModal();        }
    };



    return (
        <>
        <h1 className="form-heading">Confirm Delete</h1>
        <h2 id="delete-subheading">Are you sure you want to remove this spot from the listings?</h2>
        <div className="yes-no-buttons-container">
            <button className="yes-button" type="submit" onClick={handleDelete}>Yes (Delete Spot)</button>
            <button className="no-button" onClick={closeModal}>No (Keep Spot)</button>
        </div>
        </>
    )
}

export default DeleteSpotModal;
