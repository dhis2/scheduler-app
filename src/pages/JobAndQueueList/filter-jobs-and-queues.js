const filterJobsAndQueues = ({ nameFilter, showSystemJobs, jobsAndQueues }) => {
    // Filter jobs and queues by the current nameFilter
    const applyNameFilter = (jobOrQueue) =>
        jobOrQueue.name.toLowerCase().includes(nameFilter.toLowerCase())

    // Filter jobs depending on the current showSystemJobs
    const applyShowSystemJobs = (jobOrQueue) =>
        // Jobs that are configurable are user jobs
        showSystemJobs ? true : jobOrQueue.configurable

    return jobsAndQueues.filter(applyNameFilter).filter(applyShowSystemJobs)
}

export default filterJobsAndQueues
