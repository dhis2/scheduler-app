// Returns jobs for which name matches (a part of) the filter, case insensitive
export const getJobsMatchingFilter = (jobs, filter) =>
    jobs.filter(job => job.name.toLowerCase().includes(filter.toLowerCase()))

// Returns jobs that can be configured by the user, which are user created jobs
export const getUserJobs = jobs => jobs.filter(job => job.configurable)
