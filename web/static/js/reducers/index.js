import { combineReducers }  from 'redux';
import { routerReducer }     from 'react-router-redux';
import user_session         from './user_session';
import user         from './user';
import project         from './project';
import currentProject         from './current_project';

export default combineReducers({
  routing: routerReducer,
  user_session: user_session,
  user: user,
  project: project,
  currentProject: currentProject,
});
