import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ReviewCard from '../Reviews/ReviewCard';
import { getSpot } from '../../store/spots';
import { getAllReviews } from '../../store/reviews';
import ReviewButton from "../Navigation/ReviewButton";

import { FaStar } from "react-icons/fa6";
import EmblaCarouselReact from "embla-carousel-react";
import "./Spots.css"

const SpotDetails = () => {
    const dispatch = useDispatch();
    const {spotId} = useParams();
    const theSpot = useSelector((state) => state.spots.spot);
    const allReviews = useSelector((state) => state.reviews.list);
    const sessionUser = useSelector((state) => state.session.user);


    useEffect(() => {
    }, [allReviews, spotId, theSpot]);

    useEffect(() => {
        dispatch(getSpot(spotId));
        dispatch(getAllReviews(spotId));
    }, [dispatch, spotId]) //having allReviews here caused endless loop


    function handleReserve() {
        alert("Feature coming soon!")
    }

    const [emblaRef, emblaApi] = EmblaCarouselReact({
        loop: false,
        align: "start",
    })

    // console.log(theSpot);

    if (!theSpot) {
        return <div>Loading...</div>;
    }
    const isOwner = sessionUser && sessionUser.id === theSpot.User.id;
    const noReviews = allReviews.length === 0;

    return (
        <div className="details-card">
            <div id="details-upper">
                <h2 className="mt-0 text-2xl">{theSpot.name}</h2>
                <p>{theSpot.city}, {theSpot.state}, {theSpot.country}</p>
            </div>

            {/* Image Carousel */}
            <div className="overflow-hidden w-full rounded-2xl shadow-lg" ref={emblaRef}>
                <div className="flex">
                    {theSpot.SpotImages.map((image, index) => (
                        <div key={index} className="min-w-full">
                            <img src={image.url} alt={`Spot Image ${index + 1}`} className="object-cover w-full h-96" />
                        </div>
                    ))}
                </div>
            </div>
            {/* <li id="details-images">
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
            </li> */}
            <div className="details">
                <div id="details-left">
                    <p className="text-lg text-black font-extrabold pt-[3px] pb-[1px]">Hosted by {theSpot.User.firstName}</p>
                    <p id="details-left-desc">{theSpot.description}</p>
                </div>
                <div id="details-right">
                    <div id="details-right-top" className="flex gap-2 w-full justify-center pb-[5px]">
                        <p id="details-right-price">${theSpot.price}/night</p>
                        <div className="flex gap-[5px] items-center">
                            <p id="details-right-rating"><FaStar/> {theSpot.avgStarRating === 0? "" :theSpot.avgStarRating?.toFixed(1)}</p>
                            <p id="details-right-review-number">{theSpot.numReviews === 0? "New" : `(${theSpot.numReviews})`}</p>
                        </div>
                    </div>
                    <button id="details-right-reserve-button" onClick={handleReserve}>Reserve</button>
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
                    {noReviews && sessionUser && !isOwner && (
                        <p>Be the first to write a review!</p>
                    )}
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
