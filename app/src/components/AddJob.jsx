import React from 'react';
import { connect } from 'react-redux';
import { compose, withProps } from 'recompose';

import * as actionTypes from 'constants/actionTypes';
import JobDetails from 'components/JobDetails';

const enhance = compose(
    connect(
        state => ({
            title: 'Add new job',
            job: state.jobs.changes,
            types: state.jobs.configuration.types,
            parameters: state.jobs.changes.parameters,
            loaded: state.jobs.loaded,
        }),
        dispatch => ({
            save: job => dispatch({ type: actionTypes.JOB_POST, payload: { job }}),
            editJob: (fieldName, value) => dispatch({ type: actionTypes.JOB_EDIT, payload:  { fieldName, value }}),
        })
    ),
    withProps(props => ({
        saveLabel: 'Add job',
    })),
);

export default enhance(JobDetails);