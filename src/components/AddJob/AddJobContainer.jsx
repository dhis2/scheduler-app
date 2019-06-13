import React from 'react';
import { connect } from 'react-redux';

import history from '../../utils/history';
import * as actions from '../../constants/actions';
import validateJob from '../../utils/validateJob';
import AddJob from './AddJob';

class AddJobContainer extends React.Component {
    state = {
        currentJob: {},
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

    handleSubmit = () => {
        this.props.save(this.state.currentJob);
    }

    discardChanges = () => {
        history.replace('/');
    }

    render() {
        return (
            <AddJob
                attributeOptions={this.props.attributeOptions}
                availableParameters={this.props.availableParameters}
                availableTypes={this.props.availableTypes}
                hasLoaded={this.props.hasLoaded}
                pending={this.props.pending}
                job={this.state.currentJob}
                isDirty={this.state.isDirty}
                discardChanges={this.discardChanges}
                handleFormChange={this.handleFormChange}
                handleSubmit={this.handleSubmit}
                isValid={this.state.isValid}
                errors={this.state.errors}
            />
        );
    }
}

const mapStateToProps = state => ({
    availableTypes: state.jobs.configuration.types,
    availableParameters: state.jobs.configuration.parameters,
    attributeOptions: state.jobs.configuration.attributeOptions,
    hasLoaded: state.jobs.loaded && state.jobs.configuration.loaded,
    pending: state.pending,
});

const mapDispatchToProps = dispatch => ({
    save: job => dispatch({ type: actions.JOB_POST, payload: { job } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddJobContainer);
