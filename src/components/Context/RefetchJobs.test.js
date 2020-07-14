import React from 'react'
import { shallow } from 'enzyme'
import RefetchJobsContext from './RefetchJobs'

describe('RefetchJobsContext', () => {
    it('exports an object with provider and consumer', () => {
        expect('Provider' in RefetchJobsContext).toBe(true)
        expect('Consumer' in RefetchJobsContext).toBe(true)
    })
})

describe('RefetchJobsContext.Consumer', () => {
    it('returns a function that throws an error if used outside of the provider', () => {
        const createWrapper = () =>
            shallow(
                <RefetchJobsContext.Consumer>
                    {refetch => refetch()}
                </RefetchJobsContext.Consumer>
            )

        expect(createWrapper).toThrowErrorMatchingSnapshot()
    })
})
