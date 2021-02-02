import React from 'react'
import expectRenderError from '../../../test/expect-render-error'
import JobContext from './JobContext'

describe('JobContext', () => {
    it('exports an object with provider and consumer', () => {
        expect('Provider' in JobContext).toBe(true)
        expect('Consumer' in JobContext).toBe(true)
    })
})

describe('JobContext.Consumer', () => {
    it('returns a function that throws an error if used outside of the provider', () => {
        const message = 'JobContext needs a valid provider'

        expectRenderError(
            <JobContext.Consumer>
                {({ refetch }) => refetch()}
            </JobContext.Consumer>,
            message
        )
    })
})
