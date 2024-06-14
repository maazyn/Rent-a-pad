import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import ReviewCard from '../Reviews/ReviewCard';
import { getSpot } from '../../store/spots';
import { getAllReviews } from '../../store/reviews';
import ReviewButton from "../Navigation/ReviewButton";

import { FaStar } from "react-icons/fa6";
import "./Spots.css"
// import "./Reviews.css"

const SpotDetails = () => {
    const dispatch = useDispatch();
    const {spotId} = useParams();

    const theSpot = useSelector((state) => state.spots.spot);
    const allReviews = useSelector((state) => state.reviews.list);
    // const sessionUser = useSelector((state) => state.session.user);

    // console.log(allReviews);
    // console.log(allReviews[0]);


    useEffect(() => {
        dispatch(getSpot(spotId));
        dispatch(getAllReviews(spotId));
    }, [dispatch, spotId])

    // useEffect(() => {
    // }, [dispatch, spotId])


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
                    <p id="">Hosted by {theSpot.ownerId}</p>
                    <p id="details-left-desc">{theSpot.description}</p>
                </div>
                <div id="details-right">
                    <p id="details-right-price">${theSpot.price} night</p>
                    <p id="details-right-rating"><FaStar/> {theSpot.avgStarRating.toFixed(1)}</p>
                    <p id="details-right-review-number">{theSpot.numReviews} reviews</p>
                    {/* <button id="details-right-reserve-button">Reserve</button> */}
                    <NavLink to={`spots/${theSpot.id}/bookings`} id="details-right-reserve-button" >Reserve</NavLink>
                </div>
            </div>
            <div id="details-lower">
                <div className="details-lower-ratings-reviews-container">
                    <h2 id="details-lower-ratings-reviews">
                        <FaStar/> {theSpot.avgStarRating.toFixed(1)} • {theSpot.numReviews} reviews
                    </h2>
                    <div>
                        {(
                            <ReviewButton reviews={allReviews}/>
                        )}
                    </div>
                </div>
                <div className="reviews-card">
                    {allReviews.map((review) => (
                        <div className="review-container" key={review.id}>
                            <ReviewCard {...review} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default SpotDetails;
