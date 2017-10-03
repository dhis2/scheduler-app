import d2 from 'd2/lib/d2';

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
        .then(jobs => Promise.resolve(jobs.jobConfigurations))
        .catch(error => Promise.reject(error));

export const getJobTypes = () =>
    d2.getInstance()
        .then(d2 => d2.Api.getApi().get('jobConfigurations/jobTypes'))
        .then(jobTypes => Promise.resolve(jobTypes))
        .catch(error => Promise.reject(error));

export const deleteJob = id =>
    d2.getInstance()
        .then(d2 => d2.Api.getApi());