import { connect } from 'react-redux';
import { compose, lifecycle, withProps, branch, renderComponent } from 'recompose';
import i18n from '@dhis2/d2-i18n';

import * as actions from '../../constants/actions';
import Loading from '../Loading';
import Content from './Content';

const isString = value => typeof value === 'string';

const enhance = compose(
    connect(
        (state, ownProps) => {
            const currentJob = state.jobs.all.find(job => job.id === ownProps.match.params.id);
            const changes = state.jobs.changes;

            const job = currentJob
                ? {
                      ...currentJob,
                      id: currentJob.id,
                      cronExpression: isString(changes.cronExpression)
                          ? changes.cronExpression
                          : currentJob.cronExpression,
                      name: isString(changes.name) ? changes.name : currentJob.name,
                      parameters: changes.parameters || currentJob.jobParameters,
                      type: changes.type || currentJob.jobType,
                  }
                : null;

            // Hack because Mui's SelectField won't show values not in list
            const availableTypes = [...state.jobs.configuration.types];
            if (job && availableTypes.indexOf(job.type) === -1) {
                availableTypes.push(job.type);
            }

            return {
                job,
                availableTypes,
                disableEditing: currentJob && currentJob.configurable === false,
                title: currentJob && currentJob.name,
                loaded: state.jobs.loaded && state.jobs.configuration.loaded,
                availableParameters: state.jobs.configuration.parameters,
                attributeOptions: state.jobs.configuration.attributeOptions,
                pending: state.pending,
                dirty: state.jobs.dirty,
            };
        },
        dispatch => ({
            discard: () => dispatch({ type: actions.JOB_DISCARD }),
            save: job => dispatch({ type: actions.JOB_SAVE, payload: { job } }),
            delete: id => dispatch({ type: actions.JOB_DELETE, payload: { id } }),
            editJob: (fieldName, value) =>
                dispatch({
                    type: actions.JOB_EDIT,
                    payload: {
                        fieldName,
                        value,
                    },
                }),
        }),
    ),
    branch(props => !props.loaded || !props.job, renderComponent(Loading)),
    lifecycle({
        componentWillUnmount() {
            this.props.discard();
        },
    }),
    withProps(props => ({
        saveLabel: i18n.t('Save changes'),
        deleteLabel: i18n.t('Delete job'),
        save: () => {
            props.save({
                ...props.job,
                ...props.changes,
            });
        },
    })),
);

export default enhance(Content);
