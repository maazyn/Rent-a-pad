// import { useEffect, useState } from 'react';
// // import * as sessionActions from '../../store/session';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from "react-router-dom";
// import { createSpot } from '../../store/spots';
// import "./Spots.css"


// const SpotForm = () => {
//   const dispatch = useDispatch();
//   const newSpot = useSelector((state) => state.spots.list);
//   console.log(newSpot);

//   const navigate = useNavigate();
//   const [address, setAddress] = useState("");
//   const [city, setCity] = useState("");
//   const [state, setState] = useState("");
//   const [country, setCountry] = useState("");
//   const [lat, setLat] = useState(0);
//   const [lng, setLng] = useState(0);
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState(0);

//   const updateAddress = (e) => setAddress(e.target.value);
//   const updateCity = (e) => setCity(e.target.value);
//   const updateState = (e) => setState(e.target.value);
//   const updateCountry = (e) => setCountry(e.target.value);
//   const updateLat = (e) => setLat(e.target.value);
//   const updateLng = (e) => setLng(e.target.value);
//   const updateName = (e) => setName(e.target.value);
//   const updateDescription = (e) => setDescription(e.target.value);
//   const updatePrice = (e) => setPrice(e.target.value);

//   useEffect(() => {
//     dispatch(createSpot());
//   }, [dispatch]);

//   const submitHandler = async (e) => {
//     e.preventDefault();

//     const payload = {
//         address,
//         city,
//         state,
//         country,
//         lat,
//         lng,
//         name,
//         description,
//         price,
//     };

//     let createdSpot = await dispatch(createSpot(payload));
//     if (createdSpot) {
//         navigate(`/spots/${createdSpot.id}`);
//         // hideForm();
//     }
//   }

//   const handleCancelClick = (e) => {
//     e.preventDefault();
//     // hideFor();
//   };

//   // console.log("FLAG:", allSpots);

//   return (
//     <main>
//       <form className="form-container" onSubmit={submitHandler}>
//         <h1>Create a new listing</h1>
//         <h2>Where's your place located?</h2>
//         <p>Guests will only get your exact address once they booked a reservation</p>
//         <label>Country</label>
//         <input
//             type=""
//             // placeholder="Country"
//             min="1"
//             required
//             value={country}
//             onChange={updateCountry}
//         />
//         <button type="submit">Submit</button>
//         <button type="button" onClick={handleCancelClick}>
//             Cancel
//         </button>
//       </form>
//     </main>
//   )
// }

// export default SpotForm;
