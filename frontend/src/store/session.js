import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import {thunk} from 'redux-thunk';
import { csrfFetch } from "../store/csrf"


const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

//*ACTIONS
const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});



//*THUNKS
export const login = ({credential, password}) =>  async (dispatch) => {
//   const {credential, password} = user;
    const response = await csrfFetch('/api/session', {
    method: "POST",
    body: JSON.stringify({
      credential,
      password,
    })
  });

  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

const initialState = {user: null};

const sessionReducer = (state = initialState, action) =>{
  switch(action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return {...state, user: null};
    default:
      return state;
  }
};

export default sessionReducer;
