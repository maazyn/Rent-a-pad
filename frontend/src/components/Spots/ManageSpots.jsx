import { useEffect } from 'react';
// import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getOwnerSpots } from '../../store/spots';
import SpotCard from './SpotCard';
import "./Spots.css"


const ManageSpots = () => {
  const dispatch = useDispatch();
  const ownerSpots = useSelector((state) => state.spots.list);
  const user = useSelector((state) => state.session.user);


  useEffect(() => {
  }, [ownerSpots]);

  useEffect(() => {
    if (user) {
      dispatch(getOwnerSpots());
    }
  }, [dispatch, user]);

  // console.log("FLAG:", allSpots);

  return (
    user && ownerSpots.length !== 0? (
      <main className="manage-card">
        <div className="manage-upper">
          <h2>Manage Your Spots</h2>
          {/* <Link className="create-button-2" to="/spots" >Create a listing
          </Link> */}
        </div>
        <div className="manage-spots-container">
            {ownerSpots.map(spot => (
              // console.log(spot),
              <SpotCard key={spot.id} {...spot} showManageButtons={true} />
            ))}
        </div>
      </main>

    ): (
      <main className="manage-card">
        <div className="manage-upper">
          <h2>Manage Your Spots</h2>
        </div>
        <Link className="create-button-2" to="/spots">Create a New Spot</Link>

      </main>

    )
  )
}

export default ManageSpots;
