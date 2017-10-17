import React from 'react';
import { connect } from 'react-redux';
import { compose, withProps } from 'recompose';

import * as actionTypes from 'constants/actionTypes';
import JobDetails from 'components/JobDetails';

const enhance = compose(
    connect(
        state => ({
            title: 'Add new job',
            job: state.jobs.new,
            types: state.jobs.configuration.types,
            parameters: state.jobs.new.parameters,
            loaded: state.jobs.loaded,
        }),
        dispatch => ({
            save: job => dispatch({ type: actionTypes.JOB_POST, payload: { job }}),
            nameChanged: name => dispatch({ type: actionTypes.EDIT_NAME, payload: { name }}),
            typeChanged: type => dispatch({ type: actionTypes.EDIT_TYPE, payload: { type }}),
            cronExpressionChanged: cronExpression => dispatch({ type: actionTypes.EDIT_CRON_EXPRESSION, payload: { cronExpression }}),
        })
    ),
    withProps(props => ({
        saveLabel: 'Add job',
    })),
);

export default enhance(JobDetails);