import React from 'react';
import { connect } from 'react-redux';
import { compose, withProps, branch, renderComponent } from 'recompose';

import * as actionTypes from 'constants/actionTypes';
import JobDetails from 'components/JobDetails';
import LoadingJob from 'components/LoadingJob';

const enhance = compose(
    connect(
        state => ({
            title: 'Add new job',
            job: state.jobs.changes,
            loaded: state.jobs.loaded && state.jobs.configuration.loaded,
            availableTypes: state.jobs.configuration.types,
            availableParameters: state.jobs.configuration.parameters,
        }),
        dispatch => ({
            save: job => dispatch({ type: actionTypes.JOB_POST, payload: { job }}),
            editJob: (fieldName, value) => dispatch({ type: actionTypes.JOB_EDIT, payload:  { fieldName, value }}),
        })
    ),
    branch(
        props => !props.loaded,
        renderComponent(LoadingJob),
    ),
    withProps(props => ({
        saveLabel: 'Add job',
    })),
);

export default enhance(JobDetails);