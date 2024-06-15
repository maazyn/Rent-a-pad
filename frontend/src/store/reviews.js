import { csrfFetch } from "./csrf";

const LOAD = 'reviews/LOAD';
// const LOAD_REVIEW = 'reviews/LOAD_ONE';
const ADD_REVIEW = 'reviews/ADD_REVIEW';
const UPDATE_REVIEW = 'reviews/UPDATE_REVIEW';
const REMOVE_REVIEW = 'reviews/REMOVE_REVIEW';

//*ACTIONS
const load = (list) => ({
  type: LOAD,
  payload: list,

});

// const loadOne = (review) => ({
//   type: LOAD_REVIEW,
//   payload: review,
// });

const addOne = (review) => ({
  type: ADD_REVIEW,
  payload: review,
});

const updateOne = (review) => ({
  type: UPDATE_REVIEW,
  payload: review,
});

const removeOne = (review) => ({
  type: REMOVE_REVIEW
});


//*THUNKS
export const getAllReviews = (spotId) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spotId}/reviews`);
  if (response.ok) {
    const data = await response.json();
    if (data.reviews) {
      const list = data.reviews.map(({ id, review, User, createdAt, ReviewImages }) => ({
        id,
        review,
        User,
        createdAt,
        ReviewImages,
      }))

      dispatch(load(list));
      return list;
    }
  }
};


export const createReview = (spotId, payload) => async (dispatch) => {
  const { review, stars} = payload;
  // console.log(spotId)
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      review,
      stars
    }),
  })
  // console.log("Response:", response)
  if (response.ok) {
    const data = await response.json();
    // console.log("Data:", data.reviews)
    dispatch(addOne(spotId, data));
    return data;
  } else {
    console.error("Something went wrong")
  }
}




export const updateReview = (reviewId, payload) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${reviewId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
    if (response.ok) {
      const updatedReview = await response.json();
      dispatch(updateOne(updatedReview.review));
      return updatedReview.review;
    }
    return response;
};



export const deleteReview = (reviewId) => async (dispatch) => {
	const response = await csrfFetch(`/api/reviews/${reviewId}`, {
		method: "DELETE",
	});
  if (response.ok) {
    dispatch(removeOne(reviewId));
  }
	return response;
};


// const sortList = (list) => {
//     return list
//       .sort((revA, revB) => {
//         return revA.createdAt - revB.createdAt;
//       })
//       .map((review) => review.id);
// };

const initialState = {
    list: [],
    review: null,
};


const reviewsReducer = (state = initialState, action) =>{
  // console.log("Reducer action received:", action);
  switch(action.type) {
    case LOAD: {
      const reviews = {};
      action.payload.forEach((review) => {
        reviews[review.id] = review;
      })
      return { ...state, list: action.payload};
    }
    case ADD_REVIEW: {
      return {
        ...state,
        list: [...state.list, action.payload]
      }
    }
    case REMOVE_REVIEW:
      return {
        ...state,
        list: state.list.filter((review) =>
          review !== action.payload
        )
      }
    // case UPDATE_REVIEW: {
      // console.log(spotId)
    //   if (!state[action.pokemon.id]) {
    //       const newState = {
    //         ...state,
    //         [action.reviews.id]: action.reviews
    //       }
    //   }
        // const updatedReview = action.payload;
        // return {
        //     ...state,
        //     list: state.list.map((review) =>
        //         review.id === updatedReview.id ? updatedReview : review
        //     ),
        // };
    // }
    default:
      return state;
  }
};

export default reviewsReducer;
