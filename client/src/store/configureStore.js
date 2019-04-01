import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import RootReducer from 'reducers';

const InitialState = {};

const middleware = [thunk];

const configureStore = () => {
  return createStore(RootReducer, InitialState, applyMiddleware(...middleware));
};

export default configureStore;
