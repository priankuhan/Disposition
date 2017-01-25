import React, {PropTypes} from 'react';
import { push }           from 'react-router-redux';

export default class ProjectCard extends React.Component {
  _handleClick() {
    this.props.dispatch(push(`/projects/${this.props.id}`));
  }

  render() {
    return (
      <div id={this.props.id} className="project" onClick={::this._handleClick}>
        <div className="inner">
          <h4>{this.props.name}</h4>
        </div>
      </div>
    );
  }
}

ProjectCard.propTypes = {
};