import Constants  from '../constants';

const Actions = {
  connectToChannel: (socket, projectId) => {
    return dispatch => {
      const channel = socket.channel(`projects:${projectId}`);

      dispatch({ type: Constants.CURRENT_PROJECT_FETCHING });

      channel.join().receive('ok', (response) => {
        dispatch({
          type: Constants.PROJECTS_SET_CURRENT_PROJECT,
          project: response.project,
        });
      });

      channel.on('user:joined', (msg) => {
        dispatch({
          type: Constants.CURRENT_PROJECT_CONNECTED_USERS,
          users: msg.users,
        });
      });

      channel.on('user:left', (msg) => {
        dispatch({
          type: Constants.CURRENT_PROJECT_CONNECTED_USERS,
          users: msg.users,
        });
      });

      channel.on('list:created', (msg) => {
        dispatch({
          type: Constants.CURRENT_PROJECT_LIST_CREATED,
          list: msg.list,
        });
      });

      channel.on('card:created', (msg) => {
        dispatch({
          type: Constants.CURRENT_PROJECT_CARD_CREATED,
          card: msg.card,
        });
      });

      channel.on('member:added', (msg) => {
        dispatch({
          type: Constants.CURRENT_PROJECT_MEMBER_ADDED,
          user: msg.user,
        });
      });

      channel.on('card:updated', (msg) => {
        dispatch({
          type: Constants.PROJECTS_SET_CURRENT_PROJECT,
          project: msg.project,
        });

        dispatch({
          type: Constants.CURRENT_CARD_SET,
          card: msg.card,
        });
      });

      channel.on('list:updated', (msg) => {
        dispatch({
          type: Constants.PROJECTS_SET_CURRENT_PROJECT,
          project: msg.project,
        });
      });

      channel.on('comment:created', (msg) => {
        dispatch({
          type: Constants.PROJECTS_SET_CURRENT_PROJECT,
          project: msg.project,
        });

        dispatch({
          type: Constants.CURRENT_CARD_SET,
          card: msg.card,
        });
      });

      dispatch({
        type: Constants.CURRENT_PROJECT_CONNECTED_TO_CHANNEL,
        channel: channel,
      });
    };
  },

  leaveChannel: (channel) => {
    return dispatch => {
      channel.leave();

      dispatch({
        type: Constants.CURRENT_PROJECT_RESET,
      });
    };
  },

  addNewMember: (channel, email) => {
    return dispatch => {
      channel.push('members:add', { email: email })
      .receive('error', (data) => {
        dispatch({
          type: Constants.CURRENT_PROJECT_ADD_MEMBER_ERROR,
          error: data.error,
        });
      });
    };
  },

  updateCard: (channel, card) => {
    return dispatch => {
      channel.push('card:update', { card: card });
    };
  },

  updateList: (channel, list) => {
    return dispatch => {
      channel.push('list:update', { list: list });
    };
  },

  showMembersForm: (show) => {
    return dispatch => {
      dispatch({
        type: Constants.CURRENT_PROJECT_SHOW_MEMBERS_FORM,
        show: show,
      });
    };
  },

  editList: (listId) => {
    return dispatch => {
      dispatch({
        type: Constants.CURRENT_PROJECT_EDIT_LIST,
        listId: listId,
      });
    };
  },

  showCardForm: (listId) => {
    return dispatch => {
      dispatch({
        type: Constants.CURRENT_PROJECT_SHOW_CARD_FORM_FOR_LIST,
        listId: listId,
      });
    };
  },
};

export default Actions;