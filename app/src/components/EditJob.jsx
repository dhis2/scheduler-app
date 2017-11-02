import React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle, withProps, pure, branch, renderComponent } from 'recompose';

import * as actionTypes from 'constants/actionTypes';
import JobDetails from 'components/JobDetails';
import LoadingJob from 'components/LoadingJob';

const enhance = compose(
    connect(
        (state, ownProps) => {
            const selectedJob = state.jobs.all.find(job => job.id === ownProps.match.params.id);
            const changes = state.jobs.changes;

            return {
                job: selectedJob && {
                    id: selectedJob.id,
                    cronExpression: changes.cronExpression || selectedJob.cronExpression,
                    name: changes.name || selectedJob.name,
                    parameters: changes.parameters || selectedJob.jobParameters,
                    type: changes.type || selectedJob.jobType,
                },
                title: selectedJob && selectedJob.name,
                loaded: state.jobs.loaded && state.jobs.configuration.loaded,
                availableTypes: state.jobs.configuration.types,
                availableParameters: state.jobs.configuration.parameters,
            };
        },
        dispatch => ({
            select: id => dispatch({ type: actionTypes.JOB_SELECT, payload: { id } }),
            save: job => dispatch({ type: actionTypes.JOB_SAVE, payload: { job }}),
            delete: id => dispatch({ type: actionTypes.JOB_DELETE, payload: { id }}),
            editJob: (fieldName, value) => dispatch({
                type: actionTypes.JOB_EDIT, payload: {
                    fieldName,
                    value,
                },
            }),
        })
    ),
    branch(
        props => !props.loaded || !props.job,
        renderComponent(LoadingJob),
    ),
    withProps(props => ({
        saveLabel: 'Save changes',
        deleteLabel: 'Delete job',
        save: () => {
            props.save({
                ...props.job,
                ...props.changes,
            });
        },
    })),
);

export default enhance(JobDetails);