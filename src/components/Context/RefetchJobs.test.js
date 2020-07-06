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
    /**
     * This test would probably be more straightforward if we used react testing
     * library (https://testing-library.com). But since we're using enzyme here
     * I stuck with that, to avoid having two test approaches in this codebase.
     */

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
