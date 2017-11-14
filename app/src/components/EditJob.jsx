import React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle, withProps, pure, branch, renderComponent } from 'recompose';

import * as actionTypes from 'constants/actionTypes';
import JobDetails from 'components/JobDetails';
import Loading from 'components/Loading';

const isString = value => typeof(value) == 'string';

const enhance = compose(
    connect(
        (state, ownProps) => {
            const currentJob = state.jobs.all.find(job => job.id === ownProps.match.params.id);
            const changes = state.jobs.changes;

            return {
                job: currentJob && {
                    id: currentJob.id,
                    cronExpression: isString(changes.cronExpression)
                        ? changes.cronExpression
                        : currentJob.cronExpression,
                    name: isString(changes.name) ? changes.name : currentJob.name,
                    parameters: changes.parameters || currentJob.jobParameters,
                    type: changes.type || currentJob.jobType,
                },
                title: currentJob && currentJob.name,
                loaded: state.jobs.loaded && state.jobs.configuration.loaded,
                availableTypes: state.jobs.configuration.types,
                availableParameters: state.jobs.configuration.parameters,
                attributeOptions: state.jobs.configuration.attributeOptions,
                dirty: state.jobs.dirty,
            };
        },
        dispatch => ({
            discard: id => dispatch({ type: actionTypes.JOB_DISCARD }),
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
        renderComponent(Loading),
    ),
    lifecycle({
        componentWillUnmount() {
            this.props.discard();
        },
    }),
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