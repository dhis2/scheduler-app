import filterJobsAndQueues from './filter-jobs-and-queues'

describe('filterJobsAndQueues', () => {
    it('should filter jobs and queues by the current jobAndQueueFilter', () => {
        const jobAndQueueFilter = 'One'
        const showSystemJobs = true
        const expected = { name: 'One', configurable: true }
        const jobsAndQueues = [expected, { name: 'Two', configurable: true }]

        expect(
            filterJobsAndQueues({
                jobAndQueueFilter,
                showSystemJobs,
                jobsAndQueues,
            })
        ).toEqual([expected])
    })

    it('should ignore job or queue name capitalization', () => {
        const jobAndQueueFilter = 'one'
        const showSystemJobs = true
        const expected = { name: 'One', configurable: true }
        const jobsAndQueues = [expected, { name: 'Two', configurable: true }]

        expect(
            filterJobsAndQueues({
                jobAndQueueFilter,
                showSystemJobs,
                jobsAndQueues,
            })
        ).toEqual([expected])
    })

    it('should ignore jobAndQueueFilter capitalization', () => {
        const jobAndQueueFilter = 'One'
        const showSystemJobs = true
        const expected = { name: 'one', configurable: true }
        const jobsAndQueues = [expected, { name: 'Two', configurable: true }]

        expect(
            filterJobsAndQueues({
                jobAndQueueFilter,
                showSystemJobs,
                jobsAndQueues,
            })
        ).toEqual([expected])
    })

    it('should show system jobs and user jobs if showSystemJobs is true', () => {
        const jobAndQueueFilter = ''
        const showSystemJobs = true
        const jobsAndQueues = [
            { name: 'One', configurable: false },
            { name: 'Two', configurable: true },
        ]

        expect(
            filterJobsAndQueues({
                jobAndQueueFilter,
                showSystemJobs,
                jobsAndQueues,
            })
        ).toEqual(jobsAndQueues)
    })

    it('should hide system jobs and show user jobs if showSystemJobs is false', () => {
        const jobAndQueueFilter = ''
        const showSystemJobs = false
        const expected = { name: 'Two', configurable: true }
        const jobsAndQueues = [{ name: 'One', configurable: false }, expected]

        expect(
            filterJobsAndQueues({
                jobAndQueueFilter,
                showSystemJobs,
                jobsAndQueues,
            })
        ).toEqual([expected])
    })
})
