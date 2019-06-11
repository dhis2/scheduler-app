import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../constants/actions';

class AuthWall extends Component {
  componentDidMount() {
    const { isAuthorized, notAuthorized } = this.props;

    if (!isAuthorized) {
      notAuthorized();
    }
  }

  render() {
    const { isAuthorized, children } = this.props;

    if (!isAuthorized) {
      return null;
    }

    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  notAuthorized: () => dispatch({ type: actions.NOT_AUTHORIZED }),
});

export default connect(null, mapDispatchToProps)(AuthWall);
