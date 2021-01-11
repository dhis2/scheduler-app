import LocaleContext from './RefetchJobs'

describe('LocaleContext', () => {
    it('exports an object with provider and consumer', () => {
        expect('Provider' in LocaleContext).toBe(true)
        expect('Consumer' in LocaleContext).toBe(true)
    })
})
