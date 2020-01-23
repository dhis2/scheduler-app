import { getInstance as getD2Instance } from 'd2/lib/d2';
import { getDefaultParameterValue, determineComponentToRender } from './interface';

const JOB_PARAMETERS_ENDPOINT = 'jobConfigurations/jobTypes';
const JOBSTATUSES = ['RUNNING', 'COMPLETED', 'STOPPED', 'SCHEDULED', 'DISABLED', 'FAILED'];

export const getConfiguration = () => getD2Instance()
    .then(d2 => d2.Api.getApi())
    .then(api => api.get(JOB_PARAMETERS_ENDPOINT).catch(() => fakeReponse))
    .then(response => {
        const jobTypes = response.jobTypes.map(({ jobType }) => jobType)
        const jobTypeToSchedulingTypes = jobTypes.reduce(
            (mapping, jobType) => {
                const job = response.jobTypes.find(job => job.jobType === jobType)
                return { ...mapping, [jobType]: job.schedulingType }
            },
            {},
        )
        const jobParameters = response.jobTypes.reduce(
            (parameters, job) => ({
                ...parameters,
                [job.jobType]: job.jobParameters || [],
            }),
            {}
        )

        return {
            jobStatuses: JOBSTATUSES,
            jobParameters,
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

var fakeReponse = {
  "jobTypes": [
    {
      "name":"Data integrity",
      "jobType":"DATA_INTEGRITY",
      "key":"dataIntegrityJob",
      "schedulingType":"CRON"
    },
    {
      "name":"Resource table",
      "jobType":"RESOURCE_TABLE",
      "key":"resourceTableJob",
      "schedulingType":"CRON"
    },
    {
      "name":"Analytics table",
      "jobType":"ANALYTICS_TABLE",
      "key":"analyticsTableJob",
      "schedulingType":"CRON",
      "jobParameters":[
        {
          "klass":"java.lang.Integer",
          "name":"lastYears",
          "fieldName":"Last years",
          "persisted":false,
          "attribute":false,
          "simple":false,
          "collection":false,
          "ordered":false,
          "owner":false,
          "identifiableObject":false,
          "nameableObject":false,
          "embeddedObject":false,
          "analyticalObject":false,
          "readable":false,
          "writable":false,
          "unique":false,
          "required":false,
          "manyToMany":false,
          "oneToOne":false,
          "manyToOne":false,
          "defaultValue":0
        },
        {
          "klass":"java.util.Set",
          "itemKlass":"org.hisp.dhis.analytics.AnalyticsTableType",
          "name":"skipTableTypes",
          "fieldName":"Skip table types",
          "persisted":false,
          "collectionName":"skipTableTypes",
          "attribute":false,
          "simple":false,
          "collection":true,
          "ordered":false,
          "owner":false,
          "identifiableObject":false,
          "nameableObject":false,
          "embeddedObject":false,
          "analyticalObject":false,
          "readable":false,
          "writable":false,
          "unique":false,
          "required":false,
          "manyToMany":false,
          "oneToOne":false,
          "manyToOne":false,
          "relativeApiEndpoint":"/api/analytics/tableTypes",
          "defaultValue":[

          ]
        },
        {
          "klass":"java.lang.Boolean",
          "name":"skipResourceTables",
          "fieldName":"Skip resource tables",
          "persisted":false,
          "attribute":false,
          "simple":false,
          "collection":false,
          "ordered":false,
          "owner":false,
          "identifiableObject":false,
          "nameableObject":false,
          "embeddedObject":false,
          "analyticalObject":false,
          "readable":false,
          "writable":false,
          "unique":false,
          "required":false,
          "manyToMany":false,
          "oneToOne":false,
          "manyToOne":false,
          "defaultValue":false
        }
      ]
    },
    {
      "name":"Continuous analytics table",
      "jobType":"CONTINUOUS_ANALYTICS_TABLE",
      "key":"continuousAnalyticsTableJob",
      "schedulingType":"FIXED_DELAY",
      "jobParameters":[
        {
          "klass":"java.lang.Integer",
          "name":"fullUpdateHourOfDay",
          "fieldName":"Full update hour of day",
          "persisted":false,
          "attribute":false,
          "simple":false,
          "collection":false,
          "ordered":false,
          "owner":false,
          "identifiableObject":false,
          "nameableObject":false,
          "embeddedObject":false,
          "analyticalObject":false,
          "readable":false,
          "writable":false,
          "unique":false,
          "required":false,
          "manyToMany":false,
          "oneToOne":false,
          "manyToOne":false,
          "defaultValue":0
        },
        {
          "klass":"java.lang.Integer",
          "name":"lastYears",
          "fieldName":"Last years",
          "persisted":false,
          "attribute":false,
          "simple":false,
          "collection":false,
          "ordered":false,
          "owner":false,
          "identifiableObject":false,
          "nameableObject":false,
          "embeddedObject":false,
          "analyticalObject":false,
          "readable":false,
          "writable":false,
          "unique":false,
          "required":false,
          "manyToMany":false,
          "oneToOne":false,
          "manyToOne":false,
          "defaultValue":0
        },
        {
          "klass":"java.util.Set",
          "itemKlass":"org.hisp.dhis.analytics.AnalyticsTableType",
          "name":"skipTableTypes",
          "fieldName":"Skip table types",
          "persisted":false,
          "collectionName":"skipTableTypes",
          "attribute":false,
          "simple":false,
          "collection":true,
          "ordered":false,
          "owner":false,
          "identifiableObject":false,
          "nameableObject":false,
          "embeddedObject":false,
          "analyticalObject":false,
          "readable":false,
          "writable":false,
          "unique":false,
          "required":false,
          "manyToMany":false,
          "oneToOne":false,
          "manyToOne":false,
          "relativeApiEndpoint":"/api/analytics/tableTypes",
          "defaultValue":[

          ]
        }
      ]
    },
    {
      "name":"Data sync",
      "jobType":"DATA_SYNC",
      "key":"dataSyncJob",
      "schedulingType":"CRON"
    },
    {
      "name":"Tracker programs data sync",
      "jobType":"TRACKER_PROGRAMS_DATA_SYNC",
      "key":"trackerProgramsDataSyncJob",
      "schedulingType":"CRON",
      "jobParameters":[
        {
          "klass":"java.lang.Integer",
          "name":"pageSize",
          "fieldName":"Page size",
          "persisted":false,
          "attribute":false,
          "simple":false,
          "collection":false,
          "ordered":false,
          "owner":false,
          "identifiableObject":false,
          "nameableObject":false,
          "embeddedObject":false,
          "analyticalObject":false,
          "readable":false,
          "writable":false,
          "unique":false,
          "required":false,
          "manyToMany":false,
          "oneToOne":false,
          "manyToOne":false,
          "defaultValue":20
        }
      ]
    },
    {
      "name":"Event programs data sync",
      "jobType":"EVENT_PROGRAMS_DATA_SYNC",
      "key":"eventProgramsDataSyncJob",
      "schedulingType":"CRON",
      "jobParameters":[
        {
          "klass":"java.lang.Integer",
          "name":"pageSize",
          "fieldName":"Page size",
          "persisted":false,
          "attribute":false,
          "simple":false,
          "collection":false,
          "ordered":false,
          "owner":false,
          "identifiableObject":false,
          "nameableObject":false,
          "embeddedObject":false,
          "analyticalObject":false,
          "readable":false,
          "writable":false,
          "unique":false,
          "required":false,
          "manyToMany":false,
          "oneToOne":false,
          "manyToOne":false,
          "defaultValue":60
        }
      ]
    },
    {
      "name":"Meta data sync",
      "jobType":"META_DATA_SYNC",
      "key":"metadataSyncJob",
      "schedulingType":"CRON",
      "jobParameters":[
        {
          "klass":"java.lang.Integer",
          "name":"trackerProgramPageSize",
          "fieldName":"Tracker program page size",
          "persisted":false,
          "attribute":false,
          "simple":false,
          "collection":false,
          "ordered":false,
          "owner":false,
          "identifiableObject":false,
          "nameableObject":false,
          "embeddedObject":false,
          "analyticalObject":false,
          "readable":false,
          "writable":false,
          "unique":false,
          "required":false,
          "manyToMany":false,
          "oneToOne":false,
          "manyToOne":false,
          "defaultValue":20
        },
        {
          "klass":"java.lang.Integer",
          "name":"eventProgramPageSize",
          "fieldName":"Event program page size",
          "persisted":false,
          "attribute":false,
          "simple":false,
          "collection":false,
          "ordered":false,
          "owner":false,
          "identifiableObject":false,
          "nameableObject":false,
          "embeddedObject":false,
          "analyticalObject":false,
          "readable":false,
          "writable":false,
          "unique":false,
          "required":false,
          "manyToMany":false,
          "oneToOne":false,
          "manyToOne":false,
          "defaultValue":60
        },
        {
          "klass":"java.lang.Integer",
          "name":"dataValuesPageSize",
          "fieldName":"Data values page size",
          "persisted":false,
          "attribute":false,
          "simple":false,
          "collection":false,
          "ordered":false,
          "owner":false,
          "identifiableObject":false,
          "nameableObject":false,
          "embeddedObject":false,
          "analyticalObject":false,
          "readable":false,
          "writable":false,
          "unique":false,
          "required":false,
          "manyToMany":false,
          "oneToOne":false,
          "manyToOne":false,
          "defaultValue":10000
        }
      ]
    },
    {
      "name":"Send scheduled message",
      "jobType":"SEND_SCHEDULED_MESSAGE",
      "key":"sendScheduledMessageJob",
      "schedulingType":"CRON"
    },
    {
      "name":"Program notifications",
      "jobType":"PROGRAM_NOTIFICATIONS",
      "key":"programNotificationsJob",
      "schedulingType":"CRON"
    },
    {
      "name":"Monitoring",
      "jobType":"MONITORING",
      "key":"monitoringJob",
      "schedulingType":"CRON",
      "jobParameters":[
        {
          "klass":"java.lang.Integer",
          "name":"relativeStart",
          "fieldName":"Relative start",
          "persisted":false,
          "attribute":false,
          "simple":false,
          "collection":false,
          "ordered":false,
          "owner":false,
          "identifiableObject":false,
          "nameableObject":false,
          "embeddedObject":false,
          "analyticalObject":false,
          "readable":false,
          "writable":false,
          "unique":false,
          "required":false,
          "manyToMany":false,
          "oneToOne":false,
          "manyToOne":false,
          "defaultValue":0
        },
        {
          "klass":"java.lang.Integer",
          "name":"relativeEnd",
          "fieldName":"Relative end",
          "persisted":false,
          "attribute":false,
          "simple":false,
          "collection":false,
          "ordered":false,
          "owner":false,
          "identifiableObject":false,
          "nameableObject":false,
          "embeddedObject":false,
          "analyticalObject":false,
          "readable":false,
          "writable":false,
          "unique":false,
          "required":false,
          "manyToMany":false,
          "oneToOne":false,
          "manyToOne":false,
          "defaultValue":0
        },
        {
          "klass":"java.util.List",
          "itemKlass":"java.lang.String",
          "name":"validationRuleGroups",
          "fieldName":"Validation rule groups",
          "persisted":false,
          "collectionName":"validationRuleGroups",
          "attribute":false,
          "simple":false,
          "collection":true,
          "ordered":false,
          "owner":false,
          "identifiableObject":false,
          "nameableObject":false,
          "embeddedObject":false,
          "analyticalObject":false,
          "readable":false,
          "writable":false,
          "unique":false,
          "required":false,
          "manyToMany":false,
          "oneToOne":false,
          "manyToOne":false,
          "relativeApiEndpoint":"/api/validationRuleGroups",
          "defaultValue":[

          ]
        },
        {
          "klass":"java.lang.Boolean",
          "name":"sendNotifications",
          "fieldName":"Send notifications",
          "persisted":false,
          "attribute":false,
          "simple":false,
          "collection":false,
          "ordered":false,
          "owner":false,
          "identifiableObject":false,
          "nameableObject":false,
          "embeddedObject":false,
          "analyticalObject":false,
          "readable":false,
          "writable":false,
          "unique":false,
          "required":false,
          "manyToMany":false,
          "oneToOne":false,
          "manyToOne":false,
          "defaultValue":false
        },
        {
          "klass":"java.lang.Boolean",
          "name":"persistResults",
          "fieldName":"Persist results",
          "persisted":false,
          "attribute":false,
          "simple":false,
          "collection":false,
          "ordered":false,
          "owner":false,
          "identifiableObject":false,
          "nameableObject":false,
          "embeddedObject":false,
          "analyticalObject":false,
          "readable":false,
          "writable":false,
          "unique":false,
          "required":false,
          "manyToMany":false,
          "oneToOne":false,
          "manyToOne":false,
          "defaultValue":false
        }
      ]
    },
    {
      "name":"Push analysis",
      "jobType":"PUSH_ANALYSIS",
      "key":"pushAnalysisJob",
      "schedulingType":"CRON",
      "jobParameters":[
        {
          "klass":"java.util.List",
          "itemKlass":"java.lang.String",
          "name":"pushAnalysis",
          "fieldName":"Push analysis",
          "persisted":false,
          "collectionName":"pushAnalysis",
          "attribute":false,
          "simple":false,
          "collection":true,
          "ordered":false,
          "owner":false,
          "identifiableObject":false,
          "nameableObject":false,
          "embeddedObject":false,
          "analyticalObject":false,
          "readable":false,
          "writable":false,
          "unique":false,
          "required":false,
          "manyToMany":false,
          "oneToOne":false,
          "manyToOne":false,
          "relativeApiEndpoint":"/api/pushAnalysis",
          "defaultValue":[

          ]
        }
      ]
    },
    {
      "name":"Predictor",
      "jobType":"PREDICTOR",
      "key":"predictorJob",
      "schedulingType":"CRON",
      "jobParameters":[
        {
          "klass":"java.lang.Integer",
          "name":"relativeStart",
          "fieldName":"Relative start",
          "persisted":false,
          "attribute":false,
          "simple":false,
          "collection":false,
          "ordered":false,
          "owner":false,
          "identifiableObject":false,
          "nameableObject":false,
          "embeddedObject":false,
          "analyticalObject":false,
          "readable":false,
          "writable":false,
          "unique":false,
          "required":false,
          "manyToMany":false,
          "oneToOne":false,
          "manyToOne":false,
          "defaultValue":0
        },
        {
          "klass":"java.lang.Integer",
          "name":"relativeEnd",
          "fieldName":"Relative end",
          "persisted":false,
          "attribute":false,
          "simple":false,
          "collection":false,
          "ordered":false,
          "owner":false,
          "identifiableObject":false,
          "nameableObject":false,
          "embeddedObject":false,
          "analyticalObject":false,
          "readable":false,
          "writable":false,
          "unique":false,
          "required":false,
          "manyToMany":false,
          "oneToOne":false,
          "manyToOne":false,
          "defaultValue":0
        },
        {
          "klass":"java.util.List",
          "itemKlass":"java.lang.String",
          "name":"predictors",
          "fieldName":"Predictors",
          "persisted":false,
          "collectionName":"predictors",
          "attribute":false,
          "simple":false,
          "collection":true,
          "ordered":false,
          "owner":false,
          "identifiableObject":false,
          "nameableObject":false,
          "embeddedObject":false,
          "analyticalObject":false,
          "readable":false,
          "writable":false,
          "unique":false,
          "required":false,
          "manyToMany":false,
          "oneToOne":false,
          "manyToOne":false,
          "relativeApiEndpoint":"/api/predictors",
          "defaultValue":[

          ]
        },
        {
          "klass":"java.util.List",
          "itemKlass":"java.lang.String",
          "name":"predictorGroups",
          "fieldName":"Predictor groups",
          "persisted":false,
          "collectionName":"predictorGroups",
          "attribute":false,
          "simple":false,
          "collection":true,
          "ordered":false,
          "owner":false,
          "identifiableObject":false,
          "nameableObject":false,
          "embeddedObject":false,
          "analyticalObject":false,
          "readable":false,
          "writable":false,
          "unique":false,
          "required":false,
          "manyToMany":false,
          "oneToOne":false,
          "manyToOne":false,
          "relativeApiEndpoint":"/api/predictorGroups",
          "defaultValue":[

          ]
        }
      ]
    }
  ]
}
