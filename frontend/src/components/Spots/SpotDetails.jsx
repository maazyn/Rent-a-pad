import { useEffect } from 'react';
// import { useParams } from "react-router-dom";
// import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { getSpot } from '../../store/spots';
import "./Spots.css"


const SpotDetails = ({spotId}) => {
    const dispatch = useDispatch();

    const theSpot = useSelector((state) => state.spots.spot);
    useEffect(() => {
        dispatch(getSpot(spotId));
    }, [dispatch, spotId])

    if (!theSpot) {
        return <div>Loading...</div>;
    }
    console.log("FLAG:", dispatch(getSpot(spotId)))
    return (
        <>
        <h1>{theSpot.name}</h1>
        <div className="spots-container">
            <ul>
                <li id="spots-card"></li>
            </ul>
        </div>
        </>
    )
}

export default SpotDetails;
