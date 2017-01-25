import { push }                           from 'react-router-redux';
import Constants                          from '../constants';
import { Socket }                         from 'phoenix';
import { httpGet, httpPost, httpDelete }  from '../utils';

function setCurrentUser(dispatch, user) {
  dispatch({
    type: Constants.CURRENT_USER,
    currentUser: user,
  });

  const socket = new Socket('/socket', {
    params: { token: localStorage.getItem('phoenixAuthToken') },
  });

  socket.connect();

  const channel = socket.channel(`users:${user.id}`);

  if (channel.state != 'joined') {
    channel.join().receive('ok', () => {
      dispatch({
          type: Constants.SOCKET_CONNECTED,
          socket: socket,
          channel: channel,
        });
    });
  }
  
  channel.on('projects:add', (msg) => {
    dispatch({
        type: Constants.PROJECTS_ADDED,
        project: msg.project,
      });
  });
};

const Actions = {
  signIn: (email, password) => {
    return dispatch => {
      const data = {
        user_session: {
          email: email,
          password: password,
        },
      };

      httpPost('/api/v1/user_sessions', data)
      .then((data) => {
        localStorage.setItem('phoenixAuthToken', data.jwt);
        setCurrentUser(dispatch, data.user);
        dispatch(push('/'));
      })
      .catch((error) => {
        console.log(error)
        error.response.json()
        .then((errorJSON) => {
          dispatch({
            type: Constants.USER_SESSIONS_ERROR,
            error: errorJSON.error,
          });
        });
      });
    };
  },

  currentUser: () => {
    return dispatch => {
      httpGet('/api/v1/current_user')
      .then(function(data) {
        setCurrentUser(dispatch, data);
      })
      .catch(function(error) {
        console.log(error);
        dispatch(push('/sign_in'));
      });
    };
  },
  
  signOut: () => {
    return dispatch => {
      httpDelete('/api/v1/user_sessions')
      .then((data) => {
        localStorage.removeItem('phoenixAuthToken');

        dispatch({
          type: Constants.USER_SIGNED_OUT,
        });

        dispatch(push('/sign_in'));
      })
      .catch(function(error) {
        console.log(error);
      });
    };
  },
};

export default Actions;