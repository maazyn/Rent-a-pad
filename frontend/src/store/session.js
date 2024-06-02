import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import {thunk} from 'redux-thunk';
import { csrfFetch } from "../store/csrf"


const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
const RESTORE_USER = 'session/restoreUser';

//*ACTIONS
const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

// const restoreUser = () => ({
//   type: RESTORE_USER,
// });



//*THUNKS
export const login = (credential, password) =>  async (dispatch) => {
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

export const restoreUser = () =>  async (dispatch) => {
  const response = await csrfFetch('/api/session');
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const signup = (user) =>  async (dispatch) => {
    const { username, firstName, lastName, email, password } = user;
        const response = await csrfFetch('/api/users', {
          method: "POST",
          body: JSON.stringify({
            username,
            firstName,
            lastName,
            email,
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
