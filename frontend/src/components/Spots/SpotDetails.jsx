import { useEffect } from 'react';
// import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getSpot } from '../../store/spots';
import { useParams } from 'react-router-dom';
import { FaStar } from "react-icons/fa6";
import "./Spots.css"


const SpotDetails = () => {
    const dispatch = useDispatch();
    let {spotId} = useParams();
    spotId = parseInt(spotId);
    const theSpot = useSelector((state) => state.spots.spot);
    console.log(theSpot)

    useEffect(() => {
        // console.log("FLAG:", typeof spotId)
        dispatch(getSpot(spotId));
    }, [dispatch, spotId])

    if (!theSpot) {
        return <div>Loading...</div>;
    }
    return (
        <div className="details-card">
            <div id="details-upper">
                <h2>{theSpot.name}</h2>
                <p>{theSpot.city}, {theSpot.state}, {theSpot.country}</p>
            </div>
            <li id="details-images">
                <ul id="details-default-main-image">
                {theSpot.SpotImages.map((image, i) => {
                    if (image.preview === true) {
                        {console.log(image.url)}
                        <img key={i} src={image.url} />
                    } else return null
                })}
                </ul>
                <ul id="details-rest-images">
                    {theSpot.SpotImages.map((image, id) => {
                        if (image.preview === false) {
                            <img key={id} src={image.url} />
                        }
                    })}
                </ul>
            </li>
            <div className="details">
                <div id="details-left">
                    <p>Hosted by {theSpot.ownerId}</p>
                    <text>{theSpot.description}</text>
                </div>
                <div id="details-right">
                    <p id="details-right-price">${theSpot.price} night</p>
                    <p id="details-right-rating"><FaStar/> {theSpot.avgStarRating}</p>
                    <p id="details-right-review-number">{theSpot.numReviews} reviews</p>
                    {/* <button id="details-right-reserve-button">Reserve</button> */}
                    <NavLink to={`spots/:${theSpot.id}/bookings`} id="details-right-reserve-button" >Reserve</NavLink>

                </div>
            </div>
                <div id="details-lower">
                    <h2 id="details-lower-ratings-reviews">
                        <FaStar/> {theSpot.avgStarRating} | {theSpot.numReviews} reviews
                    </h2>
                    <div className="review-card">
                        {/* {theSpot.map((review) => {
                        <ReviewCard key={spot.id} {...review} />
                        })} */}
                    </div>
                </div>
        </div>
    )
}

export default SpotDetails;
