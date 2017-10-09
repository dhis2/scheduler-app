import d2 from 'd2/lib/d2';

export const BASE_URL = 'http://localhost:8080/api';

export const getConfiguration = () =>
    d2.getInstance().then(d2 => {
        const jobConfiguration = d2.models.jobConfiguration.modelProperties;
        const jobStatuses = jobConfiguration.jobStatus.constants;
        const jobTypes = jobConfiguration.jobType.constants;

        return {
            jobStatuses,
            jobTypes,
        };
    });

export const getJobs = () =>
    d2.getInstance()
        .then(d2 => d2.Api.getApi().get('jobConfigurations', { fields: '*', order: 'nextExecutionTime' }))
        .then(jobs => jobs.jobConfigurations)
        .catch(error => { throw error; });

export const getJobTypes = () =>
    d2.getInstance()
        .then(d2 => d2.Api.getApi().get('jobConfigurations/jobTypes'))
        .then(jobTypes => jobTypes)
        .catch(error => { throw error; });

export const deleteJob = id =>
    d2.getInstance()
        .then(d2 => d2.Api.getApi().delete(`jobConfigurations/${id}`))
        .then(result => result)
        .catch(error => { throw error; });