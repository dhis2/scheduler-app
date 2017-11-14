import d2 from 'd2/lib/d2';
import store from '../store';
import {
    klassToParameterType,
    getDefaultParameterValue,
    paramType,
} from 'constants/paramTypes';

export const BASE_URL = 'http://localhost:8080/api';
const JOB_PARAMETERS_ENDPOINT = 'jobConfigurations/jobTypesExtended';

export const getConfiguration = async () => {
    const instance = await d2.getInstance();
    const jobConfiguration = instance.models.jobConfiguration.modelProperties;
    const jobStatuses = jobConfiguration.jobStatus.constants;
    const jobParameters = await instance.Api.getApi().get(JOB_PARAMETERS_ENDPOINT);
    const jobTypes = Object.keys(jobParameters);

    return {
        jobStatuses,
        jobParameters,
        jobTypes,
    };
}

const attributeOptionExceptions = [
    'organisationUnits' // Org units selection are handled via d2
];

/*
 * Use the relativeApiEndpoint URL in each parameter attribute to fetch
 * options for that attribute. Options are, on the server side, defined either
 * as an array of (id, value) objects (for identifiable objects) or raw arrays.
 */
export const getAttributeOptions = async parameters => {
    const attributeOptions = {};

    const instance = await d2.getInstance();
    await Promise.all(Object.keys(parameters).map(async parameterName => {
        const attributes = parameters[parameterName];
        attributeOptions[parameterName] = {};

        attributes && await Promise.all(Object.keys(attributes).map(async attributeName => {
            const attribute = attributes[attributeName];

            if (attributeOptionExceptions.indexOf(attributeName) !== -1) return;
            if (attribute.relativeApiEndpoint) {
                const withoutApiPrefix = attribute.relativeApiEndpoint.substring(4);
                const options = await instance.Api.getApi().get(withoutApiPrefix, { paging: 'false' });

                attributeOptions[parameterName][attributeName] = Array.isArray(options)
                    ? options
                    : options[attribute.name];
            }
        }));
    }));

    return attributeOptions;
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
export const parseParameters = (availableParameters, definedValues, attributeOptions) => {
    let localParameters = {};

    if (availableParameters) {
        Object.keys(availableParameters).forEach(key => {
            const parameter = availableParameters[key];
            const attributes = attributeOptions[key];

            let type = klassToParameterType(parameter.klass);
            let itemType = klassToParameterType(parameter.itemKlass);

            const value = getValue(definedValues, parameter.name)
                       || getDefaultParameterValue(type);

            localParameters[parameter.name] = {
                value,
                meta: {
                    type,
                    itemType,
                    label: parameter.fieldName || parameter.name,
                    //collection: parameter.collection,
                    //source: parameter.relativeApiEndpoint,
                    options: attributes || [],
                    //exclusiveSelection: attributes ? true : false,
                },
            };
        });
    }

    return localParameters;
}