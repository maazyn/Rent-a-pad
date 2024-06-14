import { NavLink } from 'react-router-dom';
import { FaStar } from "react-icons/fa6";
import "./Spots.css"


const SpotCard = ({ id, previewImage, city, state, avgRating, price, }) => {
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
                    <p className="spot-rating"> <FaStar/> {avgRating.toFixed(1)}</p>
                </div>
            </div>
        </NavLink>
    </div>
    );
}

export default SpotCard;
