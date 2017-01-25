import { IndexRoute, Route }    from 'react-router';
import React                    from 'react';
import MainLayout               from '../layouts/main';
import AuthenticatedContainer   from '../containers/authenticated';
import HomeIndexView            from '../views/home/index';
import UsersNew                 from '../views/users/new';
import UserSessionsNew          from '../views/user_sessions/new';
import ProjectsShowView         from '../views/projects/show';
// import PersonasShowView         from '../views/personas/show';


export default (
  <Route component={MainLayout}>
    <Route path="/sign_up" component={UsersNew} />
    <Route path="/sign_in" component={UserSessionsNew} />
    
    <Route path="/" component={AuthenticatedContainer}>
      <IndexRoute component={HomeIndexView} />
      
      <Route path="/projects/:id" component={ProjectsShowView} />
    </Route>
  </Route>
);

// export default (
//   <Route component={MainLayout}>
//     <Route path="/sign_up" component={UsersNew} />
//     <Route path="/sign_in" component={UserSessionsNew} />

//     <Route path="/" component={AuthenticatedContainer}>
//       <IndexRoute component={HomeIndexView} />

//       <Route path="/projects/:id" component={ProjectsShowView} />
//       <Route path="/personas/:id" component={PersonasShowView} />
//     </Route>
//   </Route>
// );