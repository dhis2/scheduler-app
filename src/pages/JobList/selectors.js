// Returns an object of jobs, indexed by their ids
export const getEntities = jobs =>
    jobs.reduce((entities, job) => {
        const id = job.id
        entities[id] = job

        return entities
    }, {})

// Returns an array of job ids
export const getIds = jobs => jobs.map(job => job.id)

// Returns jobs that can be configured by the user, which are user created jobs
export const getUserJobs = jobs => jobs.filter(job => job.configurable)

// Returns jobs whose name matches (a part of) the filter, case insensitive
export const getJobsMatchingFilter = (jobs, filter) =>
    jobs.filter(job => job.name.toLowerCase().includes(filter.toLowerCase()))
