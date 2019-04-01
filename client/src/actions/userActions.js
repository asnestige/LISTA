import lista from 'constants/lista';
import {FETCH_USER_SUCCESS, FETCH_USER_FAILURE} from './types';

import {camelizeKeys} from 'humps';

export const fetchUser = userEmail => async dispatch => {
  try {
    const user = await lista().getUser({userEmail});
    const lists = await lista().getUserLists({userEmail});
    const data = camelizeKeys({...user, lists: lists});
    return dispatch({
      type: FETCH_USER_SUCCESS,
      payload: data,
    });
  } catch (err) {
    console.log(err);
    return dispatch({
      type: FETCH_USER_FAILURE,
      payload: {},
    });
  }
};

/*export const postList = userEmail => async dispatch => {
  try {
    await lista().getUserLists({userEmail});
    const data = camelizeKeys({...user, lists: lists});
    return dispatch({
      type: FETCH_USER_SUCCESS,
      payload: data,
    });
  } catch (_) {
    return dispatch({
      type: FETCH_USER_FAILURE,
      payload: {},
    });
  }
};
*/
//export const fetchItem = id => async dispatch => {
//try {
//const data = await getItem(id);
//return dispatch({
//type: FETCH_ITEM_SUCCESS,
//payload: data,
//});
//} catch (_) {
//return dispatch({
//type: FETCH_ITEM_FAILURE,
//payload: {},
//});
//}
//};

//export const postUser = user => async dispatch => {
//try {
//await createUser(user);
//return dispatch({
//type: POST_USER_SUCCESS,
//payload: user,
//});
//} catch (_) {
//return dispatch({
//type: POST_USER_FAILURE,
//payload: {},
//});
//}
//};

//export const postList = list => async dispatch => {
//try {
//await createList(list);
//return dispatch({
//type: POST_LIST_SUCCESS,
//payload: list,
//});
//} catch (_) {
//return dispatch({
//type: POST_LIST_FAILURE,
//payload: {},
//});
//}
//};

//export const postItem = item => async dispatch => {
//try {
//await createItem(item);
//return dispatch({
//type: POST_ITEM_SUCCESS,
//payload: item,
//});
//} catch (_) {
//return dispatch({
//type: POST_ITEM_FAILURE,
//payload: {},
//});
//}
//};

//export const updateItem = item => async dispatch => {
//try {
//await editItem(item);
//return dispatch({
//type: UPDATE_ITEM_SUCCESS,
//payload: item,
//});
//} catch (_) {
//return dispatch({
//type: UPDATE_ITEM_FAILURE,
//payload: {},
//});
//}
//};
