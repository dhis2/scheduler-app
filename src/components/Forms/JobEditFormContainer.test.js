import React from 'react'
import { shallow } from 'enzyme'
import { StoreContext } from '../Store'
import JobEditFormContainer from './JobEditFormContainer'

jest.mock('react-router-dom', () => ({
    useParams: () => ({ id: 'id' }),
}))

afterEach(() => {
    jest.resetAllMocks()
})

describe('<JobEditFormContainer>', () => {
    it('renders without errors', () => {
        const store = {
            jobs: { id: 'id' },
        }

        shallow(
            <StoreContext.Provider value={store}>
                <JobEditFormContainer setIsPristine={() => {}} />
            </StoreContext.Provider>
        )
    })
})
