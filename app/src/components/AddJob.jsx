import React from 'react';
import { connect } from 'react-redux';
import { compose, withProps, lifecycle, branch, renderComponent} from 'recompose';

import * as actionTypes from 'constants/actionTypes';
import JobDetails from 'components/JobDetails';
import Loading from 'components/Loading';

const enhance = compose(
    connect(
        state => ({
            title: 'Add new job',
            job: state.jobs.changes,
            loaded: state.jobs.loaded && state.jobs.configuration.loaded,
            availableTypes: state.jobs.configuration.types,
            availableParameters: state.jobs.configuration.parameters,
            attributeOptions: state.jobs.configuration.attributeOptions,
            dirty: state.jobs.dirty,
        }),
        dispatch => ({
            discard: id => dispatch({ type: actionTypes.JOB_DISCARD }),
            save: job => dispatch({ type: actionTypes.JOB_POST, payload: { job }}),
            editJob: (fieldName, value) => dispatch({ type: actionTypes.JOB_EDIT, payload:  { fieldName, value }}),
        })
    ),
    branch(
        props => !props.loaded,
        renderComponent(Loading),
    ),
    lifecycle({
        componentWillUnmount() {
            this.props.discard();
        },
    }),
    withProps(props => ({
        saveLabel: 'Add job',
    })),
);

export default enhance(JobDetails);