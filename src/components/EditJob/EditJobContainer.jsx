import React from 'react';
import { connect } from 'react-redux';

import history from '../../utils/history';
import * as actions from '../../constants/actions';
import EditJob from './EditJob';
import validateJob from '../../utils/validateJob';

class EditJobContainer extends React.Component {
    state = {
        currentJob: {},
        isDirty: false,
        isValid: true,
        errors: {},
    };

    getCurrentJob = () => {
        const { jobs, match } = this.props;
        const { currentJob, isDirty } = this.state;

        if (isDirty) {
            return currentJob;
        }

        const originalJob = jobs.all.find(job => job.id === match.params.id);
        const shallowClonedJob = { ...originalJob };

        if (shallowClonedJob.jobType) {
            shallowClonedJob.type = shallowClonedJob.jobType;
            delete shallowClonedJob.jobType;
        }

        if (shallowClonedJob.jobParameters) {
            shallowClonedJob.parameters = { ...shallowClonedJob.jobParameters };
            delete shallowClonedJob.jobParameters;
        }

        return shallowClonedJob;
    }

    handleFormChange = (change) => {
        const currentJob = this.getCurrentJob();
        const changedJob = { ...currentJob, ...change };

        const errors = validateJob(changedJob);
        const isValid = Object.keys(errors).length === 0;
        const isDirty = true;

        this.setState({ currentJob: changedJob, errors, isValid, isDirty });
    }

    handleTypeChange = (event, index, value) => {
        const parameters = {};
        const type = value;

        this.handleFormChange({ type, parameters });
    }

    handleParameterChange = (change) => {
        const currentJob = this.getCurrentJob();
        const currentParameters = currentJob.parameters || {};
        const changedParameters = { ...currentParameters, ...change };

        this.handleFormChange({ parameters: changedParameters });
    }

    handleSubmit = () => {
        this.props.save(this.state.currentJob);
    }

    handleDelete = () => {
        this.props.delete(this.props.match.params.id);
    }

    handleDiscard = () => {
        history.replace('/');
    }

    render() {
        const { isDirty, isValid, errors } = this.state;
        const { isLoading, isUpdating, isDeleting } = this.props;
        const currentJob = this.getCurrentJob();

        return (
            <EditJob
                errors={errors}
                handleDelete={this.handleDelete}
                handleDiscard={this.handleDiscard}
                handleParameterChange={this.handleParameterChange}
                handleTypeChange={this.handleTypeChange}
                handleFormChange={this.handleFormChange}
                handleSubmit={this.handleSubmit}
                isDeleting={isDeleting}
                isDirty={isDirty}
                isLoading={isLoading}
                isUpdating={isUpdating}
                isValid={isValid}
                job={currentJob}
            />
        );
    }
}

const mapStateToProps = state => ({
    jobs: state.jobs,
    isLoading: !state.jobs.loaded || !state.jobs.configuration.loaded,
    isUpdating: state.pending.update,
    isDeleting: state.pending.delete,
});

const mapDispatchToProps = dispatch => ({
    save: job => dispatch({ type: actions.JOB_SAVE, payload: { job } }),
    delete: id => dispatch({ type: actions.JOB_DELETE, payload: { id } }),

});

export default connect(mapStateToProps, mapDispatchToProps)(EditJobContainer);
