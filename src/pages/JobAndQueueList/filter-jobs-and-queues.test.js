import filterJobsAndQueues from './filter-jobs-and-queues'

describe('filterJobsAndQueues', () => {
    it('should filter jobs and queues by the current nameFilter', () => {
        const nameFilter = 'One'
        const showSystemJobs = true
        const expected = { name: 'One', configurable: true }
        const jobsAndQueues = [expected, { name: 'Two', configurable: true }]

        expect(
            filterJobsAndQueues({
                nameFilter,
                showSystemJobs,
                jobsAndQueues,
            })
        ).toEqual([expected])
    })

    it('should ignore job or queue name capitalization', () => {
        const nameFilter = 'one'
        const showSystemJobs = true
        const expected = { name: 'One', configurable: true }
        const jobsAndQueues = [expected, { name: 'Two', configurable: true }]

        expect(
            filterJobsAndQueues({
                nameFilter,
                showSystemJobs,
                jobsAndQueues,
            })
        ).toEqual([expected])
    })

    it('should ignore nameFilter capitalization', () => {
        const nameFilter = 'One'
        const showSystemJobs = true
        const expected = { name: 'one', configurable: true }
        const jobsAndQueues = [expected, { name: 'Two', configurable: true }]

        expect(
            filterJobsAndQueues({
                nameFilter,
                showSystemJobs,
                jobsAndQueues,
            })
        ).toEqual([expected])
    })

    it('should show system jobs and user jobs if showSystemJobs is true', () => {
        const nameFilter = ''
        const showSystemJobs = true
        const jobsAndQueues = [
            { name: 'One', configurable: false },
            { name: 'Two', configurable: true },
        ]

        expect(
            filterJobsAndQueues({
                nameFilter,
                showSystemJobs,
                jobsAndQueues,
            })
        ).toEqual(jobsAndQueues)
    })

    it('should hide system jobs and show user jobs if showSystemJobs is false', () => {
        const nameFilter = ''
        const showSystemJobs = false
        const expected = { name: 'Two', configurable: true }
        const jobsAndQueues = [{ name: 'One', configurable: false }, expected]

        expect(
            filterJobsAndQueues({
                nameFilter,
                showSystemJobs,
                jobsAndQueues,
            })
        ).toEqual([expected])
    })
})
