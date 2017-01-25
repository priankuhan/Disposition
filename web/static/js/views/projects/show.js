import React, {PropTypes}   from 'react';
import { connect }          from 'react-redux';

import Actions              from '../../actions/current_project';
import Constants            from '../../constants';
import { setDocumentTitle } from '../../utils';
import ProjectMembers       from '../../components/projects/members';


class ProjectsShowView extends React.Component {
  componentDidMount() {
    const { socket } = this.props;

    if (!socket) {
      return false;
    }

    this.props.dispatch(Actions.connectToChannel(socket, this.props.params.id));
  }

  componentWillUnmount() {
    this.props.dispatch(Actions.leaveChannel(this.props.currentProject.channel));
  }

  _renderMembers() {
    console.log(this.props.currentProject)
    const { connectedUsers, showUsersForm, channel, error } = this.props.currentProject;
    const { dispatch } = this.props;
    const members = this.props.currentProject.members;
    const currentUserIsOwner = this.props.currentProject.user.id === this.props.currentUser.id;

    return (
      <ProjectMembers
        dispatch={dispatch}
        channel={channel}
        currentUserIsOwner={currentUserIsOwner}
        members={members}
        connectedUsers={connectedUsers}
        error={error}
        show={showUsersForm} />
    );
  }

  _renderAddNewList() {
    const { dispatch, formErrors, currentProject } = this.props;

    if (!currentProject.showForm) return this._renderAddButton();

    return (
      <ListForm
        dispatch={dispatch}
        errors={formErrors}
        channel={currentProject.channel}
        onCancelClick={::this._handleCancelClick} />
    );
  }

  _renderAddButton() {
    return (
      <div className="list add-new" onClick={::this._handleAddNewClick}>
        <div className="inner">
          Add new list...
        </div>
      </div>
    );
  }
  
  _handleAddNewClick() {
    const { dispatch } = this.props;

    dispatch(Actions.showForm(true));
  }

  _handleCancelClick() {
    this.props.dispatch(Actions.showForm(false));
  }

  render() {
    const { fetching, name } = this.props.currentProject;

    if (fetching) return (
      <div className="view-container projects show">
        <i className="fa fa-spinner fa-spin"/>
      </div>
    );

    return (
      <div className="view-container projects show">
        <header className="view-header">
          <h3>{name}</h3>
          {::this._renderMembers()}
        </header>
        <div className="canvas-wrapper">
          <div className="canvas">
            <div className="lists-wrapper">
              {::this._renderAddNewList()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentProject: state.currentProject,
  socket: state.user_session.socket,
  currentUser: state.user_session.currentUser,
});

export default connect(mapStateToProps)(ProjectsShowView);