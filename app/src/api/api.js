import d2 from 'd2/lib/d2';

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
        .then(jobs => jobs.jobConfigurations)
        .catch(error => { throw error; });

export const deleteJob = id =>
    d2.getInstance()
        .then(d2 => d2.Api.getApi().delete(`jobConfigurations/${id}`))
        .then(result => result)
        .catch(error => { throw error; });