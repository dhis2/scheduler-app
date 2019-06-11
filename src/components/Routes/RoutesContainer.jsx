import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../constants/actions';
import Routes from './Routes';

class RoutesContainer extends Component {
  componentDidMount() {
    const { loadJobs, loadConfiguration } = this.props;

    loadJobs();
    loadConfiguration();
  }

  render() {
    return <Routes />;
  }
}

const mapDispatchToProps = dispatch => ({
  loadJobs: () => dispatch({ type: actions.JOBS_LOAD }),
  loadConfiguration: () => dispatch({ type: actions.CONFIGURATION_LOAD }),
});

export default connect(null, mapDispatchToProps)(RoutesContainer);
