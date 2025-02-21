import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { editSpot, getSpot, createSpotImage, deleteSpotImages } from '../../store/spots';
import "./Forms.css"
import { FaDollarSign } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";



const EditSpotForm = () => {
  const dispatch = useDispatch();
  const {spotId } = useParams();
  const navigate = useNavigate();
  const [currentSpot, setCurrentSpot] = useState();
  const allImages = currentSpot?.SpotImages;
  const previewImgObj = allImages?.filter((img) => img.preview == true);
  console.log("All Images: ", allImages);
  console.log("Prev Img Obj: ", previewImgObj);

  const [address, setAddress] = useState(currentSpot?.address || "");
  const [city, setCity] = useState(currentSpot?.city || "");
  const [state, setState] = useState(currentSpot?.state || "");
  const [country, setCountry] = useState(currentSpot?.country || "");
  const [lat, setLat] = useState(currentSpot?.lat || 0);
  const [lng, setLng] = useState(currentSpot?.lng || 0);
  const [name, setName] = useState(currentSpot?.name || "");
  const [description, setDescription] = useState(currentSpot?.description || "");
  const [price, setPrice] = useState(currentSpot?.price || 0);
  const [previewImage, setPreviewImage] = useState(previewImgObj?.url || "");
  const [imageUrls, setImageUrls] = useState([]);
  const [oldPreviewImageId, setOldPreviewImageId] = useState(null);
  const [errors, setErrors] = useState({});

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
    const fetchSpot = async () => {
      const theSpot = await dispatch(getSpot(spotId));
      if (theSpot?.Spot) {
        setCurrentSpot(theSpot.Spot);
        setAddress(theSpot.Spot.address);
        setCity(theSpot.Spot.city);
        setState(theSpot.Spot.state);
        setCountry(theSpot.Spot.country);
        setLat(theSpot.Spot.lat);
        setLng(theSpot.Spot.lng);
        setName(theSpot.Spot.name);
        setDescription(theSpot.Spot.description);
        setPrice(theSpot.Spot.price);
        setPreviewImage(previewImage || "");
        setImageUrls(allImages?.filter(img => img.preview == false).url || []);
        console.log("CHECK ALL: ", theSpot.Spot.SpotImages);
        console.log("CHECK PREVIEW: ", previewImage);
        console.log("CHECK REST: ", imageUrls);
      }
    };
    fetchSpot();
  }, [dispatch, spotId]);


  // useEffect(() => {
  //   const fetchSpot = async () => {
  //     const theSpot = await dispatch(getSpot(spotId));
  //     if (theSpot?.Spot) {
  //       setCurrentSpot(theSpot.Spot);
  //       setPreviewImage(theSpot.SpotImages?.[0]?.url || "");
  //       setImageUrls(theSpot.SpotImages?.slice(1).map(img => img.url) || []);
  //     }
  //   };
  //   fetchSpot();
  // }, [dispatch, spotId]);

  const handleClearPreview = (e) => {
    e.preventDefault();
    setOldPreviewImageId(previewImgObj.id);
    setPreviewImage("");
    console.log("CLEAR TEST: ", previewImgObj);

  };

  const addImageField = () => {
    setImageUrls((prev) => [...prev, ""]);
  };

  const removeImageField = async (index) => {
    if (index < imageUrls.length) {
      console.log(index, imageUrls)
      const imageToDelete = imageUrls[index];
      if (imageToDelete.url !== previewImage) {
        await dispatch(deleteSpotImages([imageToDelete.id]));
        setCurrentSpot((prev) => ({
          ...prev,
          SpotImages: prev.SpotImages.filter(img => img.id !== imageToDelete.id),
        }));
      }
    } else {
      const newImageIndex = index - currentSpot?.SpotImages.length;
      setImageUrls((prev) => prev.filter((_, i) => i !== newImageIndex));
    }
  };

  const updateImageUrl = (index, value) => {
    const updatedImages = [...imageUrls];
    updatedImages[index] = value;
    setImageUrls(updatedImages);
  };




  const submitHandler = async (e) => {
    e.preventDefault();
    setErrors({});
    if (!currentSpot) {
      setErrors({ general: "Error fetching spot details. Try again later." });
      return;
    }
    const payload = {
      address: address !== "" ? address : currentSpot.address,
      city: city !== "" ? city : currentSpot.city,
      state: state !== "" ? state : currentSpot.state,
      country: country !== "" ? country : currentSpot.country,
      lat: lat !== "" ? lat : currentSpot.lat,
      lng: lng !== "" ? lng : currentSpot.lng,
      name: name !== "" ? name : currentSpot.name,
      description: description !== "" ? description : currentSpot.description,
      price: price !== "" ? price : currentSpot.price,
    };


    let updatedSpot = await dispatch(editSpot(currentSpot.id, payload));
    if (updatedSpot) {
      // update preview image if changed
      // const currentPreview = currentSpot?.SpotImages?.find(img => img.preview)?.url;
      if (previewImage) {
        await dispatch(createSpotImage(currentSpot.id, { url: previewImage, preview: true }));
        if (oldPreviewImageId) {
          await dispatch(deleteSpotImages([oldPreviewImageId]));
          setOldPreviewImageId(null);
        }
      }
      // new images
      const existingImageUrls = currentSpot?.SpotImages?.map(img => img.url) || [];
      const newImages = imageUrls.filter(url => !existingImageUrls.includes(url));

      await Promise.all(newImages.map(url => dispatch(createSpotImage(currentSpot.id, { url, preview: false }))));
      navigate(`/spots/${currentSpot.id}`);
    }
  };

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
              value={country}
              placeholder="Country"
              onChange={updateCountry}
          />
          <label>Street Address
          </label>
          <input
              type="text"
              required
              value={address}
              placeholder='Address'
              onChange={updateAddress}
          />
          <label>City
          </label>
          <input
              type="text"
              required
              value={city}
              placeholder='City'
              onChange={updateCity}
          />
          <label>State
          </label>
          <input
              type="text"
              required
              value={state}
              placeholder='State'
              onChange={updateState}
          />
          <label>Latitude
          </label>
          <input
              type="number"
              required
              value={lat}
              placeholder='Latitude'
              onChange={updateLat}
          />
          <label>Longitude
          </label>
          <input
                type="number"
                required
                value={lng}
                placeholder='Longitude'
                onChange={updateLng}
            />
        </section>

        <section className="form-part-two">
          <h2>Describe your place to guests.</h2>
          <label>Mention the best features of your space,
              any special amenities lke fast wifi or parking,
              and what you love about the neighborhood
          </label>
          <textarea
              type="text"
              required
              value={description}
              placeholder='Please write at least 30 characters'
              onChange={updateDescription}
          ></textarea>
        </section>

        <section className="form-part-three">
          <h2>Create a title for your spot.</h2>
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
        </section>

        <section className="form-part-four">
          <div>
            <h2>Set a base price for your spot.</h2>
            <label>Competitive pricing can help your listing stand
              out and rank higher in search results
            </label>
            <div className="price-input">
              <FaDollarSign className="dollar-icon" />
              <input
                type="number"
                required
                value={price}
                placeholder="Price per night"
                onChange={updatePrice}
              />
            </div>
          </div>
        </section>

        <section className="form-part-five">
          <h2>Manage photos.</h2>
          <label>Submit a link to at least one photo to publish your spot
          </label>
          <div className='image-input-container'>
            <input
              type="text"
              required
              value={previewImage || (currentSpot?.SpotImages?.[0]?.url ?? '')}
              placeholder="Enter preview image URL"
              onChange={(e) => setPreviewImage(e.target.value)}
              />
            <button className="clear-button" onClick={handleClearPreview}>Clear</button>
          </div>
          {currentSpot?.SpotImages?.slice(1).map((image, index) => (
            <div key={index} className="image-input-container">
              <input
                type="text"
                placeholder="Enter image URL"
                value={image.url}
                onChange={(e) => updateImageUrl(index, e.target.value)}
              />
              <button
                type="button"
                className="remove-button"
                onClick={() => removeImageField(index)}
              >
                <FaTimes />
              </button>
            </div>
          ))}

          {imageUrls.map((url, index) => (
            <div key={index} className="image-input-container">
              <input
                type="text"
                placeholder="Enter image URL"
                value={url}
                onChange={(e) => updateImageUrl(index, e.target.value)}
              />
              <button
                type="button"
                className="remove-button"
                onClick={() => removeImageField(index)}
              >
                <FaTimes />
              </button>
            </div>
          ))}
          {/* {errors.previewImage && <p>{errors.previewImage}</p>} */}
          <div className='additional-img-header-container'>
            <label id="additional-img-header"> <button type="button" className="add-button" onClick={addImageField}> Add another image</button>
            </label>
          </div>

        </section>
        <button className="create-button-1" type="submit">Update Spot</button>
      </form>
    </main>
  )
}

export default EditSpotForm;
