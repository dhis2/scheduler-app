import d2 from 'd2/lib/d2';

export const getJobs = () => {
    return d2.getInstance()
        .then(d2 => d2.Api.getApi().get('jobConfigurations', { fields: '*', order: 'nextExecutionTime' }))
        .then(jobs => Promise.resolve(jobs.jobConfigurations))
        .catch(error => Promise.reject(error));
};

export const getJobTypes = () => {
    return d2.getInstance()
        .then(d2 => d2.Api.getApi().get('jobConfigurations/jobTypes'))
        .then(jobTypes => Promise.resolve(jobTypes))
        .catch(error => Promise.reject(error));
};