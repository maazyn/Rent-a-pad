const LOAD = 'reviews/LOAD';
// const LOAD_REVIEW = 'reviews/LOAD_ONE';
// const ADD_REVIEW = 'reviews/ADD_REVIEW';
const UPDATE_REVIEW = 'reviews/UPDATE_REVIEW';
// const REMOVE_REVIEW = 'reviews/REMOVE_REVIEW';

//*ACTIONS
const load = (list) => ({
  type: LOAD,
  payload: list,

});

// const loadOne = (review) => ({
//   type: LOAD_REVIEW,
//   payload: review,
// });

// const addOne = (review) => ({
//   type: ADD_REVIEW,
//   payload: review,
// });

const updateOne = (review) => ({
  type: UPDATE_REVIEW,
  payload: review,
});

// const removeOne = (spot) => ({
//   type: REMOVE_REVIEW
// });


//*THUNKS
export const getAllReviews = (spotId) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spotId}/reviews`);
  if (response.ok) {
    const data = await response.json();
    console.log(data);
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
  };
};

export const updateReview = (reviewId, payload) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${reviewId}`, {
        method: "PUT",
        header: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
    if (response.ok) {
      const review = await response.json();
      dispatch(updateOne(review.Review));
      return review;
    }
    return response;
};


// export const createSpot = (spot) => async (dispatch) => {
//     const { country, address, city, state, lat, lng, description, name, price, previewImage } = spot;
//     const response = await fetch(`/api/spots`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             country,
//             address,
//             city,
//             state,
//             lat,
//             lng,
//             description,
//             name,
//             price,
//             previewImage,
//         })
//     });

//     if (response.ok) {
//       const newSpot = await response.json();
//       dispatch(addOne(newSpot));
//       return response;
//     }
// };

// const sortList = (list) => {
//     return list
//       .sort((spotA, spotB) => {
//         return spotA.id - spotB.id;
//       })
//       .map((spot) => spot.id);
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
      return { ...state, list: action.payload };
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
