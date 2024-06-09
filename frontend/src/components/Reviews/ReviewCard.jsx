// import { NavLink } from 'react-router-dom';
import "./Reviews.css"


const ReviewCard = ({id, review, User, createdAt }) => {
    // console.log("FLAG:", User.firstName)

   return (
    <>
        <div id="review-owner">
            <h3> {User.firstName}</h3>
        </div>
        <div id="review-date">
            <h3> {createdAt}</h3>
        </div>
        <div id="review-text">
            <p> {review}</p>
        </div>
    </>
    );
}

export default ReviewCard;
