import { useEffect, useState } from 'react';
// import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { editSpot, getSpot } from '../../store/spots';
import "./Forms.css"
import { FaDollarSign } from "react-icons/fa";



const EditSpotForm = () => {
  const dispatch = useDispatch();
  const {spotId } = useParams();
  const [currentSpot, setCurrentSpot] = useState();

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
  const [imageUrl, setImageUrl] = useState("");

  const updateAddress = (e) => setAddress(e.target.value);
  const updateCity = (e) => setCity(e.target.value);
  const updateState = (e) => setState(e.target.value);
  const updateCountry = (e) => setCountry(e.target.value);
  const updateLat = (e) => setLat(e.target.value);
  const updateLng = (e) => setLng(e.target.value);
  const updateName = (e) => setName(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updatePrice = (e) => setPrice(e.target.value);
	const updateImageUrl = (e) => setImageUrl(e.target.value);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const gettingTheSpot = async () => {
      const theSpot = await dispatch(getSpot(spotId));
      setCurrentSpot(theSpot?.Spot);
    }
    gettingTheSpot();
  }, [dispatch, spotId]);

  // console.log(currentSpot);

  const submitHandler = async (e) => {
    e.preventDefault();
		setErrors({});

    const payload = {
        address: address || currentSpot.address,
        city: city || currentSpot.city,
        state: state || currentSpot.state,
        country: country || currentSpot.country,
        lat: lat || currentSpot.lat,
        lng: lng || currentSpot.lng,
        name: name || currentSpot.name,
        description: description || currentSpot.description,
        price: price || currentSpot.price,
    };

    let updatedSpot = await dispatch(editSpot(spotId, payload)).catch(
			async (res) => {
				const data = await res.json();
				if (data?.errors) setErrors(data.errors);
			}
    );
    if (updatedSpot) {
        navigate(`/spots/${spotId}`);
    }
  }

  return (
    <main>
      <form className="form-container" onSubmit={submitHandler}>
        <h1>Update your listing</h1>
        <h2>Where's your place located?</h2>
        <label>Guests will only get your exact address once they booked a reservation</label>

        <section className="form-part-one">
          <label>Country
          </label>
          <input
              type="text"
              required
              value={country || currentSpot?.country}
              placeholder="Country"
              onChange={updateCountry}
          />
          <label>Street Address
          </label>
          <input
              type="text"
              required
              value={address || currentSpot?.address}
              placeholder='Address'
              onChange={updateAddress}
          />
          <label>City
          </label>
          <input
              type="text"
              required
              value={city || currentSpot?.city}
              placeholder='City'
              onChange={updateCity}
          />
          <label>State
          </label>
          <input
              type="text"
              required
              value={state || currentSpot?.state}
              placeholder='STATE'
              onChange={updateState}
          />
          <label>Latitude
          </label>
          <input
              type="number"
              required
              value={lat || currentSpot?.lat}
              placeholder='Latitude'
              onChange={updateLat}
          />
          <label>Longitude
          </label>
         <input
              type="number"
              required
              value={lng || currentSpot?.lng}
              placeholder='Longitude'
              onChange={updateLng}
          />
        </section>

        <section className="form-part-two">
          <h2>Describe your place to guests</h2>
          <label>Mention the best features of your space,
              any special amenities lke fast wifi or parking,
              and what you love about the neighborhood
          </label>
          <input
              type="text"
              required
              value={description || currentSpot?.description}
              placeholder='Please write at least 30 characters'
              onChange={updateDescription}
          />
        </section>

        <section className="form-part-three">
          <h2>Create a title for your spot</h2>
          <label>Catch guests' attention with a spot title that
            highlights what makes your place special,
          </label>
          <input
              type="text"
              required
              value={name || currentSpot?.name}
              placeholder='Name of your spot'
              onChange={updateName}
          />
        </section>

        <section className="form-part-four">
          <div>
            <h2>Set a base price for your spot</h2>
            <label>Competitive pricing can help your listing stand
              out and rank higher in search results
            </label>
            <FaDollarSign />
            <input
              type="number"
              required
              value={price || currentSpot?.price}
              placeholder='Price per night'
              onChange={updatePrice}
            />
          </div>
        </section>

        {/* <section className="form-part-five">
          <h2>Liven up your spot with photos</h2>
          <label>Submit a link to at least one photo to publish your spot
          </label>
          <input
              type="url"
              required
              value={previewImage}
              placeholder='Preview Image URL'
              onChange={setImageUrl}
              checked
          />
           <input
              type="url"
              value={imageUrl}
              placeholder='Image URL'
              onChange={setImageUrl}
          />
           <input
              type="url"
              value={imageUrl}
              placeholder='Image URL'
              onChange={setImageUrl}
          />
        </section> */}
        <button className="create-button-1" type="submit">Update Spot</button>
      </form>
    </main>
  )
}

export default EditSpotForm;
