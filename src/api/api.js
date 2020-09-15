import { getInstance as getD2Instance } from 'd2/lib/d2';
import { getDefaultParameterValue, determineComponentToRender } from './interface';

const JOB_PARAMETERS_ENDPOINT = 'jobConfigurations/jobTypes';
const JOBSTATUSES = ['RUNNING', 'COMPLETED', 'STOPPED', 'SCHEDULED', 'DISABLED', 'FAILED'];

const createJobTypeMapping = (cb, jobTypes) => jobTypes.reduce(
    (mapping, jobType) => ({ ...mapping, [jobType.jobType]: cb(jobType) }),
    {},
);


export const getConfiguration = () => getD2Instance()
    .then(d2 => d2.Api.getApi())
    .then(api => api.get(JOB_PARAMETERS_ENDPOINT))
    .then(({ jobTypes: response }) => {
        const jobTypes = response.map(({ jobType }) => jobType);

        const jobTypeToSchedulingTypes = createJobTypeMapping(
            ({ schedulingType }) => schedulingType,
            response,
        );

        const parameters = createJobTypeMapping(
            ({ jobParameters }) => jobParameters || [],
            response,
        );

        return {
            jobStatuses: JOBSTATUSES,
            jobParameters: parameters,
            jobTypes,
            jobTypeToSchedulingTypes,
        };
    });

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
        .then(instance => {
            const toBeSaved = {
                name: job.name,
                jobType: job.type,
                jobParameters: job.parameters || {},
            };

            if (job.cronExpression) {
                toBeSaved.cronExpression = job.cronExpression;
            }

            if (job.delay) {
                toBeSaved.delay = job.delay;
            }

            return instance.Api.getApi().post('jobConfigurations', toBeSaved);
        })
        .catch(error => {
            throw error;
        });

export const saveJob = job =>
    getD2Instance()
        .then(instance => {
            const toBeSaved = {
                name: job.name,
                enabled: job.enabled,
                jobType: job.type || job.jobType,
                jobParameters: job.parameters || job.jobParameters,
            };

            if (job.cronExpression) {
                toBeSaved.cronExpression = job.cronExpression;
            }

            if (job.delay) {
                toBeSaved.delay = job.delay;
            }

            return instance.Api.getApi().update(`jobConfigurations/${job.id}`, toBeSaved);
        })
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
            if (result.errorReports && result.errorReports.length > 0) {
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
