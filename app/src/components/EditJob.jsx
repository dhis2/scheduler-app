import React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle, withProps, pure } from 'recompose';

import * as actionTypes from 'constants/actionTypes';
import JobDetails from 'components/JobDetails';

const enhance = compose(
    connect(
        state => {
            const job = state.jobs.all.find(job => job.id === state.jobs.selected);

            return {
                job,
                title: job ? job.name : 'Job details',
                loadingDone: state.jobs.loadingDone,
                types: state.edit.configuration.jobTypes,
                parameters: state.edit.configuration.jobParameters,
            };
        },
        dispatch => ({
            select: id => dispatch({ type: actionTypes.JOB_SELECT, payload: { id } }),
            delete: id => dispatch({ type: actionTypes.JOB_DELETE, payload: { id }})
        })
    ),
    lifecycle({
        componentWillMount() {
            this.props.select(this.props.match.params.id);
        }
    }),
);

export default enhance(JobDetails);