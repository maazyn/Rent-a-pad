import { useEffect, useState } from 'react';
// import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { createSpot } from '../../store/spots';
import "./Forms.css"


const SpotForm = () => {
  const dispatch = useDispatch();
  const newSpot = useSelector((state) => state.spots.list);
  console.log(newSpot);

  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);

  const updateAddress = (e) => setAddress(e.target.value);
  const updateCity = (e) => setCity(e.target.value);
  const updateState = (e) => setState(e.target.value);
  const updateCountry = (e) => setCountry(e.target.value);
  const updateLat = (e) => setLat(e.target.value);
  const updateLng = (e) => setLng(e.target.value);
  const updateName = (e) => setName(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updatePrice = (e) => setPrice(e.target.value);

  useEffect(() => {
    dispatch(createSpot());
  }, [dispatch]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const payload = {
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
    };

    let createdSpot = await dispatch(createSpot(payload));
    if (createdSpot) {
        navigate(`/spots/${createdSpot.id}`);
    }
  }

  const handleCancelClick = (e) => {
    e.preventDefault();
  };

  // console.log("FLAG:", allSpots);

  return (
    <main>
      <form className="form-container" onSubmit={submitHandler}>
        <h1>Create a new listing</h1>
        <h2>Where's your place located?</h2>
        <p>Guests will only get your exact address once they booked a reservation</p>
        <label>Country
        <input
            type="text"
            required
            value={country}
            onChange={updateCountry}
        />
        </label>
        <label>Street Address
        <input
            type="text"
            required
            value={address}
            onChange={updateAddress}
        />
        </label>
        <label>City
        <input
            type="text"
            required
            value={city}
            onChange={updateCity}
        />
        </label>
        <label>State
        <input
            type="text"
            required
            value={state}
            onChange={updateState}
        />
        </label>
        <label>Latitude
        <input
            type="number"
            required
            value={lat}
            onChange={updateLat}
        />
        </label>
        <label>Longitude
        <input
            type="number"
            required
            value={lng}
            onChange={updateLng}
        />
        </label>

        <h2>Describe your place to guests</h2>
        <label>Mention the best features of your space,
            any special amenities lke fast wifi or parking,
            and what you love about the neighborhood</label>
        <input
            type="text"
            required
            value={description}
            onChange={updateDescription}
        />


        <button type="submit">Submit</button>
        <button type="button" onClick={handleCancelClick}>
            Cancel
        </button>
      </form>
    </main>
  )
}

export default SpotForm;
