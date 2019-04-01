import {LOGIN_SUCCESS, LOGIN_FAILURE} from './types';
import {Google} from 'expo';

export const googleLogin = () => async dispatch => {
  try {
    const result = await Google.logInAsync({
      behavior: 'web',
      androidClientId:
        '577854706021-eepda6c814v7dnhv4ol9t4pvgtsknlmp.apps.googleusercontent.com',
      iosClientId:
        '577854706021-76e8jpjvsceoer940o3ue02phqtrq9fg.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
    });
    if (result.type === 'success') {
      return dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          username: result.user.name,
          photoUrl: result.user.photoUrl,
          email: result.user.email,
        },
      });
    } else {
      return dispatch({
        type: LOGIN_FAILURE,
        payload: {},
      });
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
};
