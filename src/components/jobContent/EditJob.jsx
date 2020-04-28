import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import i18n from '@dhis2/d2-i18n';

import { CRON, FIXED_DELAY } from '../../constants/schedulingTypes';
import * as actions from '../../constants/actions';
import Loading from '../Loading';
import Content from './Content';

/**
 * Selectors
 */
const isString = value => typeof value === 'string';

const getAllJobs = state => state.jobs.all;

const getChanges = state => state.jobs.changes;

const getAvailableTypes = state =>
    state.jobs.configuration.types;

const getTypeToSchedulingTypes = state =>
    state.jobs.configuration.typeToSchedulingTypes;

const getLoaded = state =>
    state.jobs.loaded && state.jobs.configuration.loaded;

const getAvailableParameters = state =>
    state.jobs.configuration.parameters;

const getAttributeOptions = state =>
    state.jobs.configuration.attributeOptions;

/**
 * Hooks
 */
const useCreateJob = (currentJob, changes) => {
    const jobTypeToSchedulingTypes = useSelector(getTypeToSchedulingTypes);

    if (!currentJob) return null;

    const type = changes.type || currentJob.jobType;
    const name = isString(changes.name) ? changes.name : currentJob.name;
    const parameters = changes.parameters || currentJob.jobParameters;
    const job = { ...currentJob, name, parameters, type };

    const schedulingType = jobTypeToSchedulingTypes[type];

    if (schedulingType === CRON) {
        delete job.delay;
        job.cronExpression = isString(changes.cronExpression)
            ? changes.cronExpression
            : currentJob.cronExpression;
    } else if (schedulingType === FIXED_DELAY) {
        delete job.cronExpression;
        job.delay = isString(changes.delay)
            ? changes.delay
            : currentJob.delay;
    }

    return job;
};

/**
 * Actual component
 */
const EditJob = ({ match }) => {
    const dispatch = useDispatch();
    const allJobs = useSelector(getAllJobs);
    const changes = useSelector(getChanges);
    const loaded = useSelector(getLoaded);
    const availableParameters = useSelector(getAvailableParameters);
    const attributeOptions = useSelector(getAttributeOptions);
    const pending = useSelector(state => state.pending);
    const dirty = useSelector(state => state.jobs.dirty);
    const availableTypes = [...useSelector(getAvailableTypes)];

    const currentJob = allJobs.find(({ id }) => id === match.params.id);
    const job = useCreateJob(currentJob, changes);

    // Hack because Mui's SelectField won't show values not in list
    if (job && availableTypes.indexOf(job.type) === -1) availableTypes.push(job.type);
    const title = currentJob && currentJob.name;
    const disableEditing = currentJob && currentJob.configurable === false;

    // on onmount
    useEffect(() => () => dispatch({ type: actions.JOB_DISCARD }), []);

    if (!loaded || !job) return <Loading />;

    return (
        <Content
            job={job}
            availableTypes={availableTypes}
            saveLabel={i18n.t('Save changes')}
            deleteLabel={i18n.t('Delete job')}
            save={() => dispatch({
                type: actions.JOB_SAVE,
                payload: { job: { ...job, ...changes } },
            })}
            delete={id => dispatch({
                type: actions.JOB_DELETE,
                payload: { id },
            })}
            editJob={(fieldName, value) => dispatch({
                type: actions.JOB_EDIT,
                payload: { fieldName, value },
            })}
            loaded={loaded}
            availableParameters={availableParameters}
            attributeOptions={attributeOptions}
            pending={pending}
            dirty={dirty}
            title={title}
            disableEditing={disableEditing}
        />
    );
};

export default EditJob;
