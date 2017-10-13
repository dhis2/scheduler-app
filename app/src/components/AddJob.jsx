import React from 'react';
import { connect } from 'react-redux';
import { compose, withProps } from 'recompose';

import * as actionTypes from 'constants/actionTypes';
import JobDetails from 'components/JobDetails';

const enhance = compose(
    connect(
        state => ({
            title: 'Add new job',
            job: state.edit.job,
            loadingDone: true,
            types: state.edit.configuration.jobTypes,
            parameters: state.edit.configuration.jobParameters,
        }),
        dispatch => ({
            editName: name => dispatch({ type: actionTypes.EDIT_NAME, payload: { name }}),
            editType: type => dispatch({ type: actionTypes.EDIT_TYPE, payload: { type }}),
            editCronExpression: cronExpression => dispatch({ type: actionTypes.EDIT_CRON_EXPRESSION, payload: { cronExpression }}),
        })
    ),
);

export default enhance(JobDetails);