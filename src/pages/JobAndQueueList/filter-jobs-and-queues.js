const filterJobsAndQueues = ({
    jobAndQueueFilter,
    showSystemJobs,
    jobsAndQueues,
}) => {
    // Filter jobs and queues by the current jobAndQueueFilter
    const applyJobAndQueueFilter = (jobOrQueue) =>
        jobOrQueue.name.toLowerCase().includes(jobAndQueueFilter.toLowerCase())

    // Filter jobs depending on the current showSystemJobs
    const applyShowSystemJobs = (jobOrQueue) =>
        // Jobs that are configurable are user jobs
        showSystemJobs ? true : jobOrQueue.configurable

    return jobsAndQueues
        .filter(applyJobAndQueueFilter)
        .filter(applyShowSystemJobs)
}

export default filterJobsAndQueues
