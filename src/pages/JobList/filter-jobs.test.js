import filterJobs from './filter-jobs'

describe('filterJobs', () => {
    it('should filter jobs by the current jobFilter', () => {
        const jobFilter = 'One'
        const showSystemJobs = true
        const expected = { name: 'One', configurable: true }
        const jobs = [expected, { name: 'Two', configurable: true }]

        expect(filterJobs({ jobFilter, showSystemJobs, jobs })).toEqual([
            expected,
        ])
    })

    it('should ignore job name capitalization', () => {
        const jobFilter = 'one'
        const showSystemJobs = true
        const expected = { name: 'One', configurable: true }
        const jobs = [expected, { name: 'Two', configurable: true }]

        expect(filterJobs({ jobFilter, showSystemJobs, jobs })).toEqual([
            expected,
        ])
    })

    it('should ignore jobFilter capitalization', () => {
        const jobFilter = 'One'
        const showSystemJobs = true
        const expected = { name: 'one', configurable: true }
        const jobs = [expected, { name: 'Two', configurable: true }]

        expect(filterJobs({ jobFilter, showSystemJobs, jobs })).toEqual([
            expected,
        ])
    })

    it('should show system jobs and user jobs if showSystemJobs is true', () => {
        const jobFilter = ''
        const showSystemJobs = true
        const jobs = [
            { name: 'One', configurable: false },
            { name: 'Two', configurable: true },
        ]

        expect(filterJobs({ jobFilter, showSystemJobs, jobs })).toEqual(jobs)
    })

    it('should hide system jobs and show user jobs if showSystemJobs is false', () => {
        const jobFilter = ''
        const showSystemJobs = false
        const expected = { name: 'Two', configurable: true }
        const jobs = [{ name: 'One', configurable: false }, expected]

        expect(filterJobs({ jobFilter, showSystemJobs, jobs })).toEqual([
            expected,
        ])
    })
})
