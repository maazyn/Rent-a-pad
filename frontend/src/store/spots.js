import { csrfFetch } from "../store/csrf"

const LOAD = 'spots/LOAD';
const LOAD_SPOT = 'spots/LOAD_ONE';
const ADD_SPOT = 'spots/ADD_SPOT';
const UPDATE_SPOT = 'spots/UPDATE_SPOT';
const REMOVE_SPOT = 'spots/REMOVE_SPOT';

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

const updateOne = (spot) => ({
  type: UPDATE_SPOT,
  payload: spot,
});

const removeOne = (spot) => ({
  type: REMOVE_SPOT,
  payload: spot,
});


//*THUNKS
export const getAllSpots = () => async (dispatch) => {
  const response = await fetch(`/api/spots`);
  if (response.ok) {
    const data = await response.json();
    const list = data.Spots.map(({ id, previewImage, avgRating, city, state, price }) => ({
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


export const createSpot = (payload) => async (dispatch) => {
    // const check = await csrfFetch('/api/session');
    // const checkRes = await check.json();
    // const user = checkRes.user;
    // console.log(user);

    // if (user && user.id !== null) {
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
    return response;
  }
  // } else {
  //   console.error("User must be logged in");
  // }
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
    dispatch(updateOne(updatedSpot));
    return response;
  } else {
    console.error("Error") ;
  }

};


export const deleteSpot = () => async (dispatch) => {
	const response = await csrfFetch("/api/spots/current", {
		method: "DELETE",
	});
	dispatch(removeOne());
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
    case UPDATE_SPOT: {
      return {
        ...state,
        list: state.list.map((spot) =>
          spot.id === action.payload.id ? action.payload : spot
      )}
    }
    case REMOVE_SPOT:
      return {
        ...state,
        [action.spotId]: {
          ...state[action.spotId],
          items: state[action.spotId].items.filter(
            (spotId) => spotId !== action.spotId
          ),
        },
      };
    default:
      return state;
  }
};

export default spotsReducer;
