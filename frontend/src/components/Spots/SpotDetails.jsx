import { useEffect } from 'react';
// import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ReviewCard from '../Reviews/ReviewCard';
import { getSpot } from '../../store/spots';
import { getAllReviews } from '../../store/reviews';
import { useParams } from 'react-router-dom';
import { FaStar } from "react-icons/fa6";
import "./Spots.css"


const SpotDetails = () => {
    const dispatch = useDispatch();
    const {spotId} = useParams();
    // spotId = parseInt(spotId);
    const theSpot = useSelector((state) => state.spots.spot);
    const allReviews = useSelector((state) => state.reviews.list);
    console.log(theSpot);
    // console.log(allReviews[0]);


    useEffect(() => {
        dispatch(getSpot(parseInt(spotId)));
    }, [dispatch, spotId])

    useEffect(() => {
        dispatch(getAllReviews(parseInt(spotId)));
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
                    <p id="details-right-rating"><FaStar/> {theSpot.avgStarRating}</p>
                    <p id="details-right-review-number">{theSpot.numReviews} reviews</p>
                    {/* <button id="details-right-reserve-button">Reserve</button> */}
                    <NavLink to={`spots/${theSpot.id}/bookings`} id="details-right-reserve-button" >Reserve</NavLink>

                </div>
            </div>
            <div id="details-lower">
                <h2 id="details-lower-ratings-reviews">
                    <FaStar/> {theSpot.avgStarRating} • {theSpot.numReviews} reviews
                </h2>
                <div className="reviews-card">
                    {allReviews.map((review) => (
                        <div className="review-container">
                            <ReviewCard key={review.id} {...review}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SpotDetails;
