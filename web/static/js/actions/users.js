import { push }  from 'react-router-redux';
import Constants     from '../constants';
import { httpPost }  from '../utils';

const Actions = {};

Actions.signUp = (data) => {
  return dispatch => {
    httpPost('/api/v1/users', {user: data})
    .then((data) => {
      localStorage.setItem('phoenixAuthToken', data.jwt);

      dispatch({
        type: Constants.CURRENT_USER,
        currentUser: data.user,
      });

      dispatch(push('/'));
    })
    .catch((error) => {
      console.log(error)
      error.response.json()
      .then((errorJSON) => {
        dispatch({
          type: Constants.SIGNUP_ERROR,
          errors: errorJSON.errors,
        });
      });
    });
  };
};

export default Actions;
