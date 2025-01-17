import { useEffect, useState } from 'react';
// import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { createSpot } from '../../store/spots';
import { createSpotImage } from '../../store/spots';
import "./Forms.css"
import { FaDollarSign } from "react-icons/fa";



const SpotForm = () => {
  const dispatch = useDispatch();

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


  const [imageUrl0, setImageUrl0] = useState("");
  const [imageUrl1, setImageUrl1] = useState("");
  const [imageUrl2, setImageUrl2] = useState("");
  const [imageUrl3, setImageUrl3] = useState("");
  const [imageUrl4, setImageUrl4] = useState("");
  const updateImageUrl0 = (e) => setImageUrl0(e.target.value);
  const updateImageUrl1 = (e) => setImageUrl1(e.target.value);
  const updateImageUrl2 = (e) => setImageUrl2(e.target.value);
  const updateImageUrl3 = (e) => setImageUrl3(e.target.value);
  const updateImageUrl4 = (e) => setImageUrl4(e.target.value);

  const imageUrls = [imageUrl0, imageUrl1, imageUrl2, imageUrl3, imageUrl4];

  const [errors, setErrors] = useState({});

  // useEffect(() => {
  //   const gettingTheImages = async () => {
  //     const images = await dispatch(getSpotImages(spotId));
  //     setCurrentImages(images);
  //   }
  //   gettingTheSpot();
  // }, [dispatch, images]);


  const submitHandler = async (e) => {
    e.preventDefault();
		setErrors({});

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

    try {
      const newSpot = await dispatch(createSpot(payload));
      if (newSpot) {
        await Promise.all(
          imageUrls.map((url, i) =>
            dispatch(createSpotImage(newSpot.id, {
              url,
              preview: i === 0? true: false,
            }))
          )
        );
        navigate(`/spots/${newSpot.id}`);
      }
    } catch (res) {
      const data = await res.json();
      if (data?.errors) setErrors(data.errors);
    }
  }


  return (
    <main>
      <form className="form-container" onSubmit={submitHandler}>
        <h1>Create a new listing</h1>
        <h2>Where's your place located?</h2>
        <label>Guests will only get your exact address once they booked a reservation</label>

        <section className="form-part-one">
          <label>Country
          </label>
          <input
              type="text"
              required
              value={country}
              placeholder='Country'
              onChange={updateCountry}
          />
          {errors.country && <p>{errors.country}</p>}

          <label>Street Address
          </label>
          <input
              type="text"
              required
              value={address}
              placeholder='Address'
              onChange={updateAddress}
          />
          {errors.address && <p>{errors.address}</p>}

          <label>City
          </label>
          <input
              type="text"
              required
              value={city}
              placeholder='City'
              onChange={updateCity}
          />
          {errors.city && <p>{errors.city}</p>}

          <label>State
          </label>
          <input
              type="text"
              required
              value={state}
              placeholder='STATE'
              onChange={updateState}
          />
          {errors.state && <p>{errors.state}</p>}

          <label>Latitude
          </label>
          <input
              type="number"
              value={lat}
              placeholder='Latitude'
              onChange={updateLat}
          />
          {errors.lat && <p>{errors.lat}</p>}

          <label>Longitude
          </label>
         <input
              type="number"
              value={lng}
              placeholder='Longitude'
              onChange={updateLng}
          />
          {errors.lng && <p>{errors.lng}</p>}
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
              value={description}
              placeholder='Please write at least 30 characters'
              onChange={updateDescription}
          />
          {errors.description && <p>{errors.description}</p>}
        </section>

        <section className="form-part-three">
          <h2>Create a title for your spot</h2>
          <label>Catch guests' attention with a spot title that
            highlights what makes your place special,
          </label>
          <input
              type="text"
              required
              value={name}
              placeholder='Name of your spot'
              onChange={updateName}
          />
          {errors.name && <p>{errors.name}</p>}
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
              value={price}
              placeholder='Price per night'
              onChange={updatePrice}
            />
          {errors.price && <p>{errors.price}</p>}
          </div>
        </section>

        <section className="form-part-five">
          <h2>Liven up your spot with photos</h2>
          <label>Submit a link to at least one photo to publish your spot
          </label>
          <input
              type="url"
              required
              value={imageUrl0}
              placeholder='Preview Image URL'
              onChange={updateImageUrl0}
          />
          {errors.imageUrl0 && <p>{errors.imageUrl0}</p>}
           <input
              type="url"
              value={imageUrl1}
              placeholder='Image URL'
              onChange={updateImageUrl1}
          />
          <input
              type="url"
              value={imageUrl2}
              placeholder='Image URL'
              onChange={updateImageUrl2}
          />
           <input
              type="url"
              value={imageUrl3}
              placeholder='Image URL'
              onChange={updateImageUrl3}
          />
           <input
              type="url"
              value={imageUrl4}
              placeholder='Image URL'
              onChange={updateImageUrl4}
          />
          {/* {imageUrls.map((url, index) => (
            <input key={index} type="url" required value={url} placeholder={`Image URL ${index + 1}`} onChange={handleImageChange(index)} />
          ))}
          <button type="button" onClick={addImageField}>Add Another Image</button> */}
        </section>
         {errors.credential && <p>{errors.credential}</p>}
        <button className="create-button-1" type="submit">Create Spot</button>
      </form>
    </main>
  )
}

export default SpotForm;
