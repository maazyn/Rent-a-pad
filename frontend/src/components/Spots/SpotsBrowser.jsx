import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSpots } from '../../store/spots';
import SpotCard from './SpotCard';
import "./Spots.css"


const SpotsBrowser = () => {
  const dispatch = useDispatch();
  const allSpots = useSelector((state) => state.spots.list);
  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch]);
  // console.log("FLAG:", allSpots);

  return (
    <main>
      <div className="spots-container" >
          {allSpots.map(spot => (
            <SpotCard key={spot.id} {...spot} />
          ))}

      </div>
    </main>
  )
}

export default SpotsBrowser;
