import React from 'react';
import { connect } from 'react-redux';

import history from '../../utils/history';
import * as actions from '../../constants/actions';
import validateJob from '../../utils/validateJob';
import AddJob from './AddJob';

class AddJobContainer extends React.Component {
    state = {
        currentJob: {
            name: '',
            type: '',
            continuousExecution: false,
            cronExpression: '',
            parameters: {},
        },
        isDirty: false,
        isValid: true,
        errors: {},
    };

    handleFormChange = (change) => {
        const changedJob = { ...this.state.currentJob, ...change };

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
        const changedParameters = { ...this.state.currentJob.parameters, ...change };

        this.handleFormChange({ parameters: changedParameters });
    }

    handleSubmit = () => {
        this.props.save(this.state.currentJob);
    }

    handleDiscard = () => {
        history.replace('/');
    }

    render() {
        return (
            <AddJob
                errors={this.state.errors}
                handleDiscard={this.handleDiscard}
                handleParameterChange={this.handleParameterChange}
                handleTypeChange={this.handleTypeChange}
                handleFormChange={this.handleFormChange}
                handleSubmit={this.handleSubmit}
                isDirty={this.state.isDirty}
                isLoading={this.props.isLoading}
                isUpdating={this.props.isUpdating}
                isValid={this.state.isValid}
                job={this.state.currentJob}
            />
        );
    }
}

const mapStateToProps = state => ({
    isLoading: !state.jobs.loaded || !state.jobs.configuration.loaded,
    isUpdating: state.pending.update,
});

const mapDispatchToProps = dispatch => ({
    save: job => dispatch({ type: actions.JOB_POST, payload: { job } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddJobContainer);
