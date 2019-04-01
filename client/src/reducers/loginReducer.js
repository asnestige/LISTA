import {LOGIN_SUCCESS, LOGIN_FAILURE} from 'actions/types';

const intialState = {
  name: '',
  photoUrl: '',
  loggedIn: false,
  loginFailed: false,
};

const loginReducer = (state = intialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      const {username, photoUrl, email} = action.payload;
      return {
        ...state,
        loggedIn: true,
        username: username,
        photoUrl: photoUrl,
        email: email,
      };
    }
    case LOGIN_FAILURE: {
      return {
        ...state,
        loginFailed: true,
      };
    }
    default: {
      return state;
    }
  }
};

export default loginReducer;
