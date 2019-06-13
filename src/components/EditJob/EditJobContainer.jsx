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
        const { currentJob } = this.state;
        const originalJob = jobs.all.find(job => job.id === match.params.id);

        return { ...originalJob, ...currentJob };
    }

    handleFormChange = (change) => {
        const currentJob = this.getCurrentJob();
        const changedJob = { ...currentJob, ...change };

        const errors = validateJob(changedJob);
        const isValid = Object.keys(errors).length === 0;
        const isDirty = true;

        this.setState({ currentJob: changedJob, errors, isValid, isDirty });
    }

    handleSubmit = () => {
        this.props.save(this.state.currentJob);
    }

    handleDelete = () => {
        this.props.delete(this.props.match.params.id);
    }

    discardChanges = () => {
        history.replace('/');
    }

    render() {
        const { isDirty, isValid, errors } = this.state;
        const { hasLoaded, pending, attributeOptions, availableParameters, availableTypes } = this.props;
        const currentJob = this.getCurrentJob();

        return (
            <EditJob
                attributeOptions={attributeOptions}
                availableParameters={availableParameters}
                availableTypes={availableTypes}
                discardChanges={this.discardChanges}
                errors={errors}
                handleDelete={this.handleDelete}
                handleFormChange={this.handleFormChange}
                handleSubmit={this.handleSubmit}
                hasLoaded={hasLoaded}
                isDirty={isDirty}
                isValid={isValid}
                job={currentJob}
                pending={pending}
            />
        );
    }
}

const mapStateToProps = state => ({
    jobs: state.jobs,
    hasLoaded: state.jobs.loaded && state.jobs.configuration.loaded,
    availableTypes: state.jobs.configuration.types,
    availableParameters: state.jobs.configuration.parameters,
    attributeOptions: state.jobs.configuration.attributeOptions,
    pending: state.pending,
});

const mapDispatchToProps = dispatch => ({
    save: job => dispatch({ type: actions.JOB_SAVE, payload: { job } }),
    delete: id => dispatch({ type: actions.JOB_DELETE, payload: { id } }),

});

export default connect(mapStateToProps, mapDispatchToProps)(EditJobContainer);
