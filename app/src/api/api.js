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

export const getJobs = () =>
    d2.getInstance()
        .then(d2 => d2.Api.getApi().get('jobConfigurations', { fields: '*', order: 'nextExecutionTime' }))
        .then(result => result.jobConfigurations)
        .catch(error => { throw error; });

export const postJob = job =>
    d2.getInstance()
        .then(d2 => 
            d2.Api.getApi().post('jobConfigurations', {
                name: job.name,
                cronExpression: job.cronExpression,
                jobType: job.type,
                jobParameters: {},
            }))
        .catch(error => { throw error; });

export const deleteJob = id =>
    d2.getInstance()
        .then(d2 => d2.Api.getApi().delete(`jobConfigurations/${id}`))
        .then(result => result)
        .catch(error => { throw error; });

export const getParametersFromType = type => {
    const state = store.getState().jobs;
    const availableJobParameters = [...state.configuration.parameters[type]];
    const parameters = parseParameters(availableJobParameters);
    return Promise.resolve(parameters);
}

/*
 * Parse parameter data and types (from API) into a list of 
 * parameters that can be parsed dynamically during rendering.
 */
const parseParameters = availableJobParameters =>
    Object.keys(availableJobParameters).map(key => {
            const parameter = availableJobParameters[key];
            const type = klassToType(parameter.klass, parameter.itemKlass)
            const value = getDefaultValue(type, parameter.collection);

            return {
                type,
                value,
                apiName: parameter.name,
                label: parameter.fieldName || parameter.name,
                collection: parameter.collection,
                source: parameter.relativeApiEndpoint,
            };
        });

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