import { useEffect } from 'react';
// import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
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
            <div id="details-images">
                {theSpot.SpotImages.map((image, id) => {
                <img key={id} src={image.url} />
                })}
            </div>
            <div className="details">
                <div id="details-left">
                    <p>Hosted by {theSpot.ownerId}</p>
                    <text>{theSpot.description}</text>
                </div>
                <div id="details-right">
                    <p id="details-right-price">${theSpot.price} night</p>
                    <p id="details-right-rating"><FaStar/> {theSpot.avgStarRating}</p>
                    <p id="details-right-review-number">{theSpot.numReviews} reviews</p>
                    <button id="details-right-reserve-button">Reserve</button>
                </div>
            </div>
                <div id="details-lower">
                    <h2 id="details-lower-ratings-reviews">
                        <FaStar/> {theSpot.avgStarRating} | {theSpot.numReviews} reviews
                    </h2>
                    <div className="review-card">
                        {/* {theSpot.SpotImages.map((review, id) => {
                        <img key={id} src={review.message} />
                        })} */}
                    </div>
                </div>
        </div>
    )
}

export default SpotDetails;
