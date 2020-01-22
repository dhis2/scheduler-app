import { getInstance as getD2Instance } from 'd2/lib/d2';
import { getDefaultParameterValue, determineComponentToRender } from './interface';

const JOB_PARAMETERS_ENDPOINT = 'jobConfigurations/jobTypesExtended';
const JOBSTATUSES = ['RUNNING', 'COMPLETED', 'STOPPED', 'SCHEDULED', 'DISABLED', 'FAILED'];

export const getConfiguration = async () => {
    const d2 = await getD2Instance();
    const jobStatuses = JOBSTATUSES;
    const jobParameters = await d2.Api.getApi().get(JOB_PARAMETERS_ENDPOINT);
    const jobTypes = Object.keys(jobParameters);

    return {
        jobStatuses,
        jobParameters,
        jobTypes,
    };
};

const attributeOptionExceptions = [
    'organisationUnits', // Org units selection are handled via d2
];

/*
 * Use the relativeApiEndpoint URL in each parameter attribute to fetch
 * options for that attribute. Options are, on the server side, defined either
 * as an array of (id, value) objects (for identifiable objects) or raw arrays.
 */
export const getAttributeOptions = async parameters => {
    const attributeOptions = {};

    const d2 = await getD2Instance();
    await Promise.all(
        Object.keys(parameters).map(async parameterName => {
            const attributes = parameters[parameterName];
            attributeOptions[parameterName] = {};

            attributes &&
                (await Promise.all(
                    Object.keys(attributes).map(async attributeName => {
                        const attribute = attributes[attributeName];

                        if (attributeOptionExceptions.indexOf(attributeName) !== -1) return;
                        if (attribute.relativeApiEndpoint) {
                            const withoutApiPrefix = attribute.relativeApiEndpoint.substring(4);

                            const options = await d2.Api.getApi().get(withoutApiPrefix, {
                                paging: 'false',
                            });
                            attributeOptions[parameterName][attributeName] = Array.isArray(options)
                                ? options
                                : options[attribute.name];
                        }
                    }),
                ).catch(e => {
                    // eslint-disable-next-line
                    console.warn('Error during attribute fetch:', e);
                }));
        }),
    );

    return attributeOptions;
};

const order = 'enabled:desc,jobStatus,nextExecutionTime';
export const getJobs = () =>
    getD2Instance()
        .then(instance => instance.Api.getApi().get('jobConfigurations', { fields: '*', order }))
        .then(result => result.jobConfigurations)
        .catch(error => {
            throw error;
        });

export const postJob = job =>
    getD2Instance()
        .then(instance =>
            instance.Api.getApi().post('jobConfigurations', {
                name: job.name,
                cronExpression: job.cronExpression,
                jobType: job.type,
                jobParameters: job.parameters,
            }),
        )
        .catch(error => {
            throw error;
        });

export const saveJob = job =>
    getD2Instance()
        .then(instance =>
            instance.Api.getApi().update(`jobConfigurations/${job.id}`, {
                name: job.name,
                enabled: job.enabled,
                cronExpression: job.cronExpression,
                jobType: job.type || job.jobType,
                jobParameters: job.parameters || job.jobParameters,
            }),
        )
        .catch(error => {
            throw error;
        });

export const deleteJob = id =>
    getD2Instance()
        .then(instance => instance.Api.getApi().delete(`jobConfigurations/${id}`))
        .then(result => result)
        .catch(error => {
            throw error;
        });

export const runJob = id =>
    getD2Instance()
        .then(instance => instance.Api.getApi().get(`jobConfigurations/${id}/execute`))
        .then(result => {
            if (result.errorReports) {
                throw result;
            }
        })
        .catch(error => {
            throw error;
        });

const getValue = (values, field) => values && values[field];

/*
 * Parse parameter data and types (from API) into a list of
 * parameters that can be parsed dynamically during rendering.
 */
export const parseParameters = (availableParameters, definedValues, attributeOptions) => {
    const localParameters = {};

    if (availableParameters) {
        Object.keys(availableParameters).forEach(key => {
            const parameter = availableParameters[key];

            const meta = {
                type: parameter.klass,
                itemType: parameter.itemKlass,
                label: parameter.fieldName,
                options: attributeOptions[key],
            };

            const value =
                getValue(definedValues, parameter.name) ||
                getDefaultParameterValue(parameter.klass);

            meta.renderAs = determineComponentToRender(meta);
            localParameters[parameter.name] = {
                value,
                meta,
            };
        });
    }

    return localParameters;
};
