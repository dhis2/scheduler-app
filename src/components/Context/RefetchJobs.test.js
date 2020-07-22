import React from 'react'
import expectRenderError from '../../../test/expect-render-error'
import RefetchJobsContext from './RefetchJobs'

describe('RefetchJobsContext', () => {
    it('exports an object with provider and consumer', () => {
        expect('Provider' in RefetchJobsContext).toBe(true)
        expect('Consumer' in RefetchJobsContext).toBe(true)
    })
})

describe('RefetchJobsContext.Consumer', () => {
    it('returns a function that throws an error if used outside of the provider', () => {
        const message =
            'RefetchJobsContext consumer needs to have a valid Provider as parent'

        expectRenderError(
            <RefetchJobsContext.Consumer>
                {refetch => refetch()}
            </RefetchJobsContext.Consumer>,
            message
        )
    })
})
