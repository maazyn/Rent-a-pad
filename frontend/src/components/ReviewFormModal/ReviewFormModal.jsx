import { useState } from 'react';
// import * as sessionActions from '../../store/session';
import * as reviewActions from '../../store/reviews';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { FaStar } from "react-icons/fa6";
import "./ReviewForm.css"


const ReviewFormModal = ({ spotId }) => {
    const dispatch = useDispatch();
    const [review, setReview] = useState("");
    const [stars, setStars] = useState(0);
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const reviewData = { review, stars };
    console.log("Flag:", spotId, reviewData)
    const starValues = [1, 2, 3, 4, 5];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        // console.log(reviewData);
        return dispatch(reviewActions.createReview(spotId, reviewData))
          .then(closeModal)
        //   .catch(async (res) => {
        //     const data = await res.json();
        //     if (data && data.errors) {
        //       setErrors(data.errors);
        //     }
        // });
    };


    return (
        <>
        <h1 className="form-heading">How was your stay?</h1>
        <div className="form-parent-container">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Leave your review here..."
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    required
                    />
                {errors.review && <p>{errors.review}</p>}

                <div className="rating-container">
                    {starValues.map((star) => (
                        <label key={star} className="rating-star">
                            <input
                                type="radio"
                                className="rating-input"
                                name="rating"
                                value={star}
                                onChange={() => setStars(star)}
                                required
                            />
                            <FaStar
                                color={star <= stars ? "orange" : "white"}
                            />
                        </label>
                    ))}
                    {errors.stars && <p>{errors.stars}</p>}
                </div>
                <button className="submit-button" type="submit" disabled={review.length < 10 || stars === 0}>Submit Your Review</button>
            </form>
        </div>
        </>
    )
}

export default ReviewFormModal;
