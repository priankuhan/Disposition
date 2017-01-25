import Constants from '../constants';

const initialState = {
  projects: [],
  showForm: false,
  formErrors: null,
  fetching: true,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case Constants.PROJECTS_FETCHING:
      return { ...state, fetching: true };

    case Constants.PROJECTS_RECEIVED:
      return { ...state, projects: action.projects, fetching: false };

    case Constants.PROJECTS_SHOW_FORM:
      return { ...state, showForm: action.show };

    case Constants.PROJECTS_CREATE_ERROR:
      return { ...state, formErrors: action.errors };

    case Constants.PROJECTS_NEW_PROJECT_CREATED:
      const { projects } = state;

      return { ...state, projects: [action.project].concat(projects) };
    case Constants.PROJECTS_ADDED:
      const { invitedProjects } = state;

      return { ...state, invitedProjects: [action.project].concat(invitedProjects) };
      
    default:
      return state;
  }
}