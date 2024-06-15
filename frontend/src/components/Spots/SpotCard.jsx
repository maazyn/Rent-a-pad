import { NavLink } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
// import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { deleteSpot } from '../../store/spots';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import DeleteSpotModal from './DeleteSpotModal';
import { FaStar } from "react-icons/fa6";
import "./Spots.css"


const SpotCard = ({ id, previewImage, city, state, avgRating, price, showManageButtons }) => {
    // const dispatch = useDispatch();
    // const user = useSelector((state) => state.session.user);

    // const handleDelete = (spotId) => {
    //     if (user) {
    //         {(
    //             <OpenModalButton
    //                 buttonText="Post A Review"
    //                 modalComponent={<DeleteSpotModal spotId={spotId}/>}
    //                 onClick={handleClick}
    //             />
    //         )}
    //         dispatch(deleteSpot(spotId));
    //     }
    // };

    return (
    <div className="spot-card">
        <NavLink to={`/spots/${id}`} className="spot-card-link">
            <img className="sc-image" src={previewImage} />
            <div className="sc-preview-details">
                <div className="sc-location-and-price">
                    <h3 className="sc-location"> {city}, {state}</h3>
                    <p className="sc-price">${price} per night</p>
                </div>
                <div className="sc-rating">
                    <p className="spot-rating"> <FaStar/> {avgRating?.toFixed(1)}</p>
                </div>
            </div>
        </NavLink>
        {showManageButtons && (
            <div className="manage-buttons-container">
                <NavLink className="manage-button-update" to={`/spots/${id}/edit`}>Update</NavLink>
                <div className="manage-button-delete">
                {(
                    <OpenModalButton
                        buttonText="Delete"
                        modalComponent={<DeleteSpotModal spotId={id}/>}
                    />
                )}
                </div>
            </div>
        )}
    </div>
    );
}

export default SpotCard;
