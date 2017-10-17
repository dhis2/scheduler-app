import React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle, withProps, pure } from 'recompose';

import * as actionTypes from 'constants/actionTypes';
import JobDetails from 'components/JobDetails';

const enhance = compose(
    connect(
        state => {
            const selectedJob = state.jobs.all.find(job => job.id === state.jobs.selected);
            
            return {
                job: selectedJob,
                title: selectedJob ? selectedJob.name : 'Loading ...',
                loaded: state.jobs.loaded,
                types: state.jobs.configuration.types,
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
    withProps(() => ({
        saveLabel: 'Save changes',
        deleteLabel: 'Delete job',
    })),
);

export default enhance(JobDetails);