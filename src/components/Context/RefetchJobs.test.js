import RefetchJobs from './RefetchJobs'

describe('RefetchJobs', () => {
    it('exports an object with provider and consumer', () => {
        expect('Provider' in RefetchJobs).toBe(true)
        expect('Consumer' in RefetchJobs).toBe(true)
    })
})
