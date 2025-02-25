import { csrfFetch } from "../store/csrf"

const LOAD = 'spots/LOAD';
const LOAD_SPOT = 'spots/LOAD_ONE';
const ADD_SPOT = 'spots/ADD_SPOT';
const UPDATE_SPOT = 'spots/UPDATE_SPOT';
const REMOVE_SPOT = 'spots/REMOVE_SPOT';
const ADD_SPOT_IMAGE = 'spots/ADD_SPOT_IMAGE';
const REMOVE_SPOT_IMAGE = 'spots/REMOVE_SPOT_IMAGE'
const UPDATE_SPOT_IMAGE = 'spots/UPDATE_SPOT_IMAGE';

//*ACTIONS
const load = (list) => ({
  type: LOAD,
  payload: list,

});

const loadOne = (spot) => ({
  type: LOAD_SPOT,
  payload: spot,
});

const addOne = (spot) => ({
  type: ADD_SPOT,
  payload: spot,
});

const addOneImage = (spotImage) => ({
  type: ADD_SPOT_IMAGE,
  payload: spotImage,
});

const updateOne = (spot) => ({
  type: UPDATE_SPOT,
  payload: spot,
});

const updateOneImage = (spotImage) => ({
  type: UPDATE_SPOT_IMAGE,
  payload: spotImage,
});

const removeOne = (spot) => ({
  type: REMOVE_SPOT,
  payload: spot,
});

const removeSpotImage = (imageId) => ({
  type: REMOVE_SPOT_IMAGE,
  payload: imageId,
});

//*THUNKS
export const getAllSpots = () => async (dispatch) => {
  const response = await fetch(`/api/spots`);
  if (response.ok) {
    const data = await response.json();
    const list = data.Spots.map(({ id, name, previewImage, avgRating, city, state, price }) => ({
      id,
      name,
      previewImage,
      avgRating,
      city,
      state,
      price,
    }))

    dispatch(load(list));
    return list;
  }
};


export const getOwnerSpots = () => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/current`);
  if (response.ok) {
    const data = await response.json();
    const list = data.spots.map(({ id, previewImage, avgRating, city, state, price }) => ({
      id,
      previewImage,
      avgRating,
      city,
      state,
      price,
    }))

    dispatch(load(list));
    return list;
  }
};


export const getSpot = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}`);

    if (response.ok) {
      const spot = await response.json();
      dispatch(loadOne(spot.Spot));
      return spot;
    }
};

export const getSpotImages = (spotId) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spotId}/images`);

  if (response.ok) {
    const spot = await response.json();
    dispatch(loadOne(spot.Spot));
    return spot;
  }
};

export const createSpot = (payload) => async (dispatch) => {
  // const { address, city, state, country, lat, lng, name, description, price } = payload;

  const response = await csrfFetch(`/api/spots`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload)
  });

  if (response.ok) {
    const newSpot = await response.json();
    dispatch(addOne(newSpot));
    return newSpot;
  }
};


export const createSpotImage = (spotId, payload) => async (dispatch) => {

  const response = await csrfFetch(`/api/spots/${spotId}/images`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload)
  });

  if (response.ok) {
    const newSpotImage = await response.json();
    dispatch(addOneImage(newSpotImage));
    return response;
  };
};




export const editSpot = (spotId, payload) => async (dispatch) => {

  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload)
  });

  if (response.ok) {
    const updatedSpot = await response.json();
    // console.log(updatedSpot);
    dispatch(updateOne(spotId, updatedSpot));
    return updatedSpot;
  }
};

export const editSpotImage = (imageId, payload) => async (dispatch) => {
  const response = await csrfFetch(`/api/spot-images/${imageId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const updatedImage = await response.json();
    dispatch(updateOneImage(updatedImage));
    return updatedImage;
  }
};

export const deleteSpot = (spotId) => async (dispatch) => {
	const response = await csrfFetch(`/api/spots/${spotId}`, {
		method: "DELETE",
	});
  if (response.ok) {
    dispatch(removeOne(spotId));
    dispatch(getOwnerSpots());
  } else {
    console.error("Failed to delete")
  }
	return response;
};

export const deleteSpotImages = (imageId) => async (dispatch) => {
  console.log("Deleting image with ID:", imageId);
  const response = await csrfFetch(`/api/spot-images/${imageId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(removeSpotImage(imageId));
  } else {
    console.error("Failed to delete image.");
  }
	return response;
};


// const sortList = (list) => {
//     return list
//       .sort((spotA, spotB) => {
//         return spotA.id - spotB.id;
//       })
//       .map((spot) => spot.id);
// };

const initialState = {
    list: [],
    spot: null,
    // spotId: null,
};


const spotsReducer = (state = initialState, action) =>{
  // console.log("Action received:", action);
  switch(action.type) {
    case LOAD: {
      const spots = {};
      action.payload.forEach((spot) => {
        spots[spot.id] = spot;
      })
      return { ...state, list: action.payload };
    }
    case LOAD_SPOT: {
      // console.log(spotId)
      return {...state, spot: action.payload};
    }
    case ADD_SPOT: {
      return {
        ...state,
        list: [...state.list, action.payload]
      }
    }
    case ADD_SPOT_IMAGE: {
      return {
        ...state,
        spot: {
          ...state.spot,
          SpotImages: [...(state.spot?.SpotImages || []), action.payload],
        },
      };
    }
    case UPDATE_SPOT: {
      return {
        ...state,
        list: state.list.map((spot) =>
          spot.id === action.payload.id ? action.payload : spot
      )}
    }
    case UPDATE_SPOT_IMAGE: { 
      if(state.spot && state.spot.SpotImages) {
        return {
          ...state,
          spot: {
            ...state.spot,
            SpotImages: state.spot.SpotImages.map((image) =>
              image.id === action.payload.id ? action.payload : image
            ),
          },
        };
      }
      return state;
    }
    case REMOVE_SPOT:
      return {
        ...state,
        list: state.list.filter((spot) =>
          spot.id !== action.payload)
      };
    case REMOVE_SPOT_IMAGE: {
      return {
        ...state,
        spot: {
          ...state.spot,
          SpotImages: state.spot.SpotImages.filter(
            (image) => !action.payload.includes(image.id)
          ),
        },
      };
    }
    default:
      return state;
  }
};

export default spotsReducer;
