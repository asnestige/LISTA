import {FETCH_USER_SUCCESS, FETCH_USER_FAILURE} from 'actions/types';

const intialState = {
  id: '',
  name: '',
  email: '',
  lists: [],
  fetched: false,
  fetchingFailed: false,
};

const userReducer = (state = intialState, action) => {
  switch (action.type) {
    case FETCH_USER_SUCCESS: {
      const {userId, userName, userEmail, lists} = action.payload;
      return {
        ...state,
        fetched: true,
        id: userId,
        name: userName,
        email: userEmail,
        lists: lists,
      };
    }
    case FETCH_USER_FAILURE: {
      return {
        ...state,
        fetched: true,
        fetchingFailed: true,
      };
    }
    default: {
      return state;
    }
  }
};

export default userReducer;
