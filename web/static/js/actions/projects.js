import Constants              from '../constants';
import { push }       from 'react-router-redux';
import { httpGet, httpPost }  from '../utils';
// import CurrentProjectActions    from './current_project';

const Actions = {
  fetchProjects: () => {
    return dispatch => {
      dispatch({ type: Constants.PROJECTS_FETCHING });

      httpGet('/api/v1/projects')
      .then((data) => {
        dispatch({
          type: Constants.PROJECTS_RECEIVED,
          projects: data.projects
        });
      });
    };
  },

  showForm: (show) => {
    return dispatch => {
      dispatch({
        type: Constants.PROJECTS_SHOW_FORM,
        show: show,
      });
    };
  },

  create: (data) => {
    return dispatch => {
      httpPost('/api/v1/projects', { project: data })
      .then((data) => {
        dispatch({
          type: Constants.PROJECTS_NEW_PROJECT_CREATED,
          project: data,
        });

        dispatch(push(`/projects/${data.id}`));
      })
      .catch((error) => {
        error.response.json()
        .then((json) => {
          dispatch({
            type: Constants.PROJECTS_CREATE_ERROR,
            errors: json.errors,
          });
        });
      });
    };
  },
};

export default Actions;