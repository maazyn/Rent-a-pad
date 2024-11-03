import { NavLink } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import DeleteSpotModal from './DeleteSpotModal';
import { Tooltip } from 'react-tooltip'
import { IoMdStar } from "react-icons/io";
import "./Spots.css"
import FooterNav from "../../FooterNav/FooterNav";


const SpotCard = ({ id, previewImage, name, city, state, avgRating, price, showManageButtons }) => {


    return (
        <a className="tooltip-text" data-tooltip-id="spots-tooltip" data-tooltip-content={name}>
            <div className="spot-card">

                <NavLink to={`/spots/${id}`} className="spot-card-link">
                    <img className="sc-image" src={previewImage} />
                    <div className="sc-preview-details">
                        <div className="sc-location-and-price">
                            <p className="sc-name"> {name}</p>
                            <p className="sc-location">{city}, {state}</p>
                            <p className="sc-price text-black flex gap-[3px] font-medium">${price} <p className='flex text-[#343434] font-light'> /night</p></p>
                        </div>
                        <div className="sc-rating">
                            <IoMdStar/><p className="spot-rating">  {avgRating === 0? "New": avgRating.toFixed(1)}</p>
                            {/* {count(avgRating) === 0? "New" : `(${count(avgRating)})`} */}
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
            <Tooltip id="spots-tooltip" place="top" effect="solid"/>
        </a>
    );
}

export default SpotCard;
