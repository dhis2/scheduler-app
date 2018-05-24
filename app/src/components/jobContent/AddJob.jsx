import { connect } from 'react-redux';
import { compose, withProps, lifecycle, branch, renderComponent } from 'recompose';
import i18n from '@dhis2/d2-i18n';

import * as actions from 'constants/actions';
import Content from 'components/jobContent/Content';
import Loading from 'components/Loading';

const enhance = compose(
    connect(
        state => ({
            title: i18n.t('Add new job'),
            job: state.jobs.changes,
            loaded: state.jobs.loaded && state.jobs.configuration.loaded,
            availableTypes: state.jobs.configuration.types,
            availableParameters: state.jobs.configuration.parameters,
            attributeOptions: state.jobs.configuration.attributeOptions,
            pending: state.pending,
            dirty: state.jobs.dirty,
        }),
        dispatch => ({
            discard: () => dispatch({ type: actions.JOB_DISCARD }),
            save: job => dispatch({ type: actions.JOB_POST, payload: { job } }),
            editJob: (fieldName, value) =>
                dispatch({ type: actions.JOB_EDIT, payload: { fieldName, value } }),
        }),
    ),
    branch(props => !props.loaded, renderComponent(Loading)),
    lifecycle({
        componentWillUnmount() {
            this.props.discard();
        },
    }),
    withProps(() => ({
        saveLabel: 'Add job',
    })),
);

export default enhance(Content);
