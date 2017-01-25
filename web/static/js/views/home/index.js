import React                from 'react';
import { connect }          from 'react-redux';
import classnames           from 'classnames';

import { setDocumentTitle } from '../../utils';
import Actions              from '../../actions/projects';
import ProjectCard            from '../../components/projects/card';
import ProjectForm            from '../../components/projects/form';

class HomeIndexView extends React.Component {
  componentDidMount() {
    setDocumentTitle('Projects');

    const { dispatch } = this.props;
    dispatch(Actions.fetchProjects());
  }

  _renderProjects() {
    const { fetching } = this.props;

    let content = false;

    const iconClasses = classnames({
      fa: true,
      'fa-user': !fetching,
      'fa-spinner': fetching,
      'fa-spin':    fetching,
    });
    
    if (!fetching) {
      content = (
        <div className="projects-wrapper">
          {::this._renderProjectCards(this.props.projects)}
          {::this._renderAddNewProject()}
        </div>
      );
    }
  
    return (
      <section>
        <header className="view-header">
          <h3><i className={iconClasses} /> My Projects</h3>
        </header>
        {content}
      </section>
    );
  }

  _renderProjectCards(projects = []) {
    return projects.map((project) => {
      return <ProjectCard
                key={project.id}
                dispatch={this.props.dispatch}
                {...project} />;
    });
  }

  _renderAddNewProject() {
    let { showForm, dispatch, formErrors } = this.props;

    if (!showForm) return this._renderAddButton();

    return (
      <ProjectForm
        dispatch={dispatch}
        errors={formErrors}
        onCancelClick={::this._handleCancelClick}/>
    );
  }

  _renderAddButton() {
    return (
      <div className="project add-new" onClick={::this._handleAddNewClick}>
        <div className="inner">
          <a id="add_new_project">Create new project...</a>
        </div>
      </div>
    );
  }

  _handleAddNewClick() {
    let { dispatch } = this.props;

    dispatch(Actions.showForm(true));
  }

  _handleCancelClick() {
    this.props.dispatch(Actions.showForm(false));
  }

  render() {
    return (
      <div className="view-container projects index">
        {::this._renderProjects()}
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  state.project
);

export default connect(mapStateToProps)(HomeIndexView);