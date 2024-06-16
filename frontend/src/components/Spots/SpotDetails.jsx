import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ReviewCard from '../Reviews/ReviewCard';
import { getSpot } from '../../store/spots';
import { getAllReviews } from '../../store/reviews';
import ReviewButton from "../Navigation/ReviewButton";

import { FaStar } from "react-icons/fa6";
import "./Spots.css"

const SpotDetails = () => {
    const dispatch = useDispatch();
    const {spotId} = useParams();
    const theSpot = useSelector((state) => state.spots.spot);
    const allReviews = useSelector((state) => state.reviews.list);


    useEffect(() => {
    }, [allReviews, spotId]);

    useEffect(() => {
        dispatch(getSpot(spotId));
        dispatch(getAllReviews(spotId));
    }, [dispatch, spotId]) //having allReviews here caused endless loop


    function handleUploadImage() {
        alert("Feature coming soon!")
    }


    // console.log(theSpot);

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
                        // {console.log(image.url)}
                        return <img key={i} src={image.url} />
                    } else return null
                })}
                </ul>
                <ul id="details-rest-images">
                    {theSpot.SpotImages.map((image, id) => {
                        if (image.preview === false) {
                            return <img key={id} src={image.url} />
                        }
                    })}
                </ul>
            </li>
            <div className="details">
                <div id="details-left">
                    <p id="">Hosted by {theSpot.User.firstName}</p>
                    <p id="details-left-desc">{theSpot.description}</p>
                </div>
                <div id="details-right">
                    <p id="details-right-price">${theSpot.price} night</p>
                    <p id="details-right-rating"><FaStar/> {theSpot.avgStarRating === 0? "" :theSpot.avgStarRating?.toFixed(1)}</p>
                    <p id="details-right-review-number">{theSpot.numReviews === 0? "New" : `${theSpot.numReviews} reviews`}</p>
                    <button id="details-right-reserve-button" onClick={handleUploadImage}>Reserve</button>
                    {/* <NavLink to={`spots/${theSpot.id}/bookings`} id="details-right-reserve-button" >Reserve</NavLink> */}
                </div>
            </div>
            <div id="details-lower">
                <div className="details-lower-ratings-reviews-container">
                    <h2 id="details-lower-ratings-reviews">
                        <FaStar/> {theSpot.avgStarRating === 0? "" :theSpot.avgStarRating?.toFixed(1)} {theSpot.numReviews === 0? "New" : theSpot.numReviews === 1? `• ${theSpot.numReviews} review`: `• ${theSpot.numReviews} reviews`}
                    </h2>
                    <div>
                        {(
                            <ReviewButton theSpot={theSpot} reviews={allReviews}/>
                        )}
                    </div>
                </div>
                <div className="reviews-card">
                    {allReviews.map((review) => (
                        <div className="review-container" key={review.id}>
                            <ReviewCard {...review}  />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default SpotDetails;
