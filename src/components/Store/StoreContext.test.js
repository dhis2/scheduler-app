import React from 'react'
import expectRenderError from '../../../test/expect-render-error'
import StoreContext from './StoreContext'

describe('StoreContext', () => {
    it('exports an object with provider and consumer', () => {
        expect('Provider' in StoreContext).toBe(true)
        expect('Consumer' in StoreContext).toBe(true)
    })
})

describe('StoreContext.Consumer', () => {
    it('returns a store with a refetchJobs function that throws an error if used outside of the provider', () => {
        const message = 'Store context needs a valid provider'

        expectRenderError(
            <StoreContext.Consumer>
                {store => store.refetchJobs()}
            </StoreContext.Consumer>,
            message
        )
    })
})
