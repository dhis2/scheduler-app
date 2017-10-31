import d2 from 'd2/lib/d2';
import store from '../store';
import { klassTypes, paramTypes } from 'constants/paramTypes';

export const BASE_URL = 'http://localhost:8080/api';
const JOB_PARAMETERS_ENDPOINT = 'jobConfigurations/jobTypesExtended';

export const getConfiguration = async () => {
    const instance = await d2.getInstance();
    const jobConfiguration = instance.models.jobConfiguration.modelProperties;
    const jobStatuses = jobConfiguration.jobStatus.constants;
    const jobTypes = jobConfiguration.jobType.constants;
    const jobParameters = await instance.Api.getApi().get(JOB_PARAMETERS_ENDPOINT);

    return {
        jobStatuses,
        jobParameters,
        jobTypes,
    };
}

const order = 'enabled:desc,jobStatus,nextExecutionTime';
export const getJobs = () =>
    d2.getInstance()
        .then(d2 => d2.Api.getApi().get('jobConfigurations', { fields: '*', order }))
        .then(result => result.jobConfigurations)
        .catch(error => { throw error; });

export const postJob = job =>
    d2.getInstance()
        .then(d2 =>
            d2.Api.getApi().post('jobConfigurations', {
                name: job.name,
                cronExpression: job.cronExpression,
                jobType: job.type,
                jobParameters: job.parameters,
            }))
        .catch(error => { throw error; });

export const saveJob = job =>
    d2.getInstance()
        .then(d2 => d2.Api.getApi().update(`jobConfigurations/${job.id}`, {
            name: job.name,
            enabled: job.enabled,
            cronExpression: job.cronExpression,
            jobType: job.type || job.jobType,
            jobParameters: job.parameters || job.jobParameters,
        }))
        .catch(error => { throw error; });

export const deleteJob = id =>
    d2.getInstance()
        .then(d2 => d2.Api.getApi().delete(`jobConfigurations/${id}`))
        .then(result => result)
        .catch(error => { throw error; });

const getValue = (values, field) => values && values[field];

/*
 * Parse parameter data and types (from API) into a list of 
 * parameters that can be parsed dynamically during rendering.
 */
export const parseParameters = (availableJobParameters, setValues) => {
    let localParameters = {};

    if (availableJobParameters) {
        Object.keys(availableJobParameters).forEach(key => {
            const parameter = availableJobParameters[key];
            const type = klassToType(parameter.klass, parameter.itemKlass)
            const value = getValue(setValues, parameter.name)
                       || getDefaultValue(type, parameter.collection);

            localParameters[parameter.name] = {
                value,
                meta: {
                    type,
                    label: parameter.fieldName || parameter.name,
                    collection: parameter.collection,
                    source: parameter.relativeApiEndpoint,
                },
            };
        });
    }

    return localParameters;
}

const klassToType = (klass, itemKlass) => {
    switch (klass) {
        case klassTypes.INTEGER: return paramTypes.INTEGER;
        case klassTypes.STRING: return paramTypes.STRING;
        case klassTypes.BOOLEAN: return paramTypes.BOOLEAN;
        case klassTypes.LIST: return klassToType(itemKlass);
        case klassTypes.SET: return klassToType(itemKlass);

        case klassTypes.PERIOD: return paramTypes.PERIOD;
        case klassTypes.ORG_UNIT: return paramTypes.ORG_UNIT;
        default: return paramTypes.UNDEFINED;
    }
}

const getDefaultValue = (type, collection) => {
    switch (type) {
        case paramTypes.INTEGER: return undefined;
        case paramTypes.STRING: return '';
        case paramTypes.BOOLEAN: return false;
        case paramTypes.PERIOD: return collection ? [] : undefined;
        case paramTypes.ORG_UNIT: return collection ? [] : undefined;
        default: return undefined;
    }
}