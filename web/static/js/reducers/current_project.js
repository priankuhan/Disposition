import Constants  from '../constants';

const initialState = {
  connectedUsers: [],
  channel: null,
  showForm: false,
  showUsersForm: false,
  editingListId: null,
  addingNewCardInListId: null,
  error: null,
  fetching: true,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case Constants.CURRENT_PROJECT_FETCHING:
      return { ...state, fetching: true };

    case Constants.PROJECTS_SET_CURRENT_PROJECT:
      return { ...state, fetching: false, ...action.project };

    case Constants.CURRENT_PROJECT_CONNECTED_USERS:
      return { ...state, connectedUsers: action.users };
      
    case Constants.CURRENT_PROJECT_CONNECTED_TO_CHANNEL:
      return { ...state, channel: action.channel };
      
    case Constants.CURRENT_PROJECT_MEMBER_ADDED:
      const { members } = state;
      members.push(action.user);
      return { ...state, members: members, showUsersForm: false };
    
    default:
      return state;
  }
}