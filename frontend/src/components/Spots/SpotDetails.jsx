import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ReviewCard from '../Reviews/ReviewCard';
import { getSpot } from '../../store/spots';
import { getAllReviews } from '../../store/reviews';
import ReviewButton from "../Navigation/ReviewButton";
import FooterNav from "../../FooterNav/FooterNav";



import { FaStar } from "react-icons/fa6";
import EmblaCarouselReact from "embla-carousel-react";
import "./Spots.css"

const SpotDetails = () => {
    const dispatch = useDispatch();
    const {spotId} = useParams();
    const theSpot = useSelector((state) => state.spots.spot);
    const allReviews = useSelector((state) => state.reviews.list);
    const sessionUser = useSelector((state) => state.session.user);

    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

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

    const handleThumbnailClick = (index) => {
        setSelectedImageIndex(index);
    };

    return (
        <>
        <div className="details-card">
            <div id="details-upper">
                <h2 className="mt-0 text-2xl">{theSpot.name}</h2>
                <p>{theSpot.city}, {theSpot.state}, {theSpot.country}</p>
            </div>

            {/* Image Carousel */}
            {/* <div className="overflow-hidden w-full rounded-2xl shadow-lg" ref={emblaRef}>
                <div className="flex">
                    {theSpot.SpotImages.map((image, index) => (
                        <div key={index} className="min-w-full">
                            <img src={image.url} alt={`Spot Image ${index + 1}`} className="object-cover w-full h-96" />
                        </div>
                    ))}
                </div>
            </div> */}

            {/* Main image */}
            <div className="flex flex-col lg:flex-row gap-2 w-full h-[65vh] min-h-[500px] overflow-hidden ">
                <div className="w-[100%] h-[100%] lg:w-[92%] overflow-hidden rounded-2xl">
                    <img
                        src={theSpot.SpotImages[selectedImageIndex]?.url}
                        alt={`Main Spot Image`}
                        className="object-cover w-full h-full"
                    />
                </div>
                {/* Vertical thumbnails for large screens */}
                <div className="hidden lg:flex flex-col gap-2 h-full w-[9%] p-[2px] overflow-y-auto">
                    {theSpot.SpotImages.map((image, index) => (
                        <img
                            key={index}
                            src={image.url}
                            alt={`Thumbnail ${index + 1}`}
                            onClick={() => handleThumbnailClick(index)}
                            className={`object-cover w-full h-auto aspect-square flex-shrink-0 border-2 border-white rounded-lg align-top hover:scale-[1.05] box-border cursor-pointer ${
                                selectedImageIndex === index
                                    ? "border-blue-500 "
                                    : null
                            }`}
                        />
                    ))}
                </div>
                {/* Horizontal thumbnails for smaller screens */}
                <div className="flex gap-2 overflow-x-auto p-[2px] lg:hidden min-h-[90px]">
                    {theSpot.SpotImages.map((image, index) => (
                        <img
                            key={index}
                            src={image.url}
                            alt={`Thumbnail ${index + 1}`}
                            onClick={() => handleThumbnailClick(index)}
                            className={`object-cover w-20 h-20 flex-shrink-0 border-2 border-white rounded-lg justify-start hover:scale-[1.05] box-border cursor-pointer ${
                                selectedImageIndex === index
                                    ? "border-blue-500"
                                    : null
                            }`}
                        />
                    ))}
                </div>
            </div>



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
                <div className="details-lower-ratings-reviews-container w-full ">
                    <h2 id="details-lower-ratings-reviews" className="items-center text-xl w-full justify-left ">
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
        <FooterNav/>
        </>
    )
}
export default SpotDetails;
