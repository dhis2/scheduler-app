import React from 'react'
import { shallow } from 'enzyme'
import { useParams } from 'react-router-dom'
import { StoreContext } from '../../components/Store'
import JobEditContainer from './JobEditContainer'

jest.mock('react-router-dom', () => ({
    useParams: jest.fn(),
}))

afterEach(() => {
    jest.resetAllMocks()
})

describe('<JobEditContainer>', () => {
    it('renders without errors when there is data', () => {
        const id = 'one'
        const store = {
            jobs: [
                {
                    id,
                    name: 'name',
                    created: 'now',
                    lastExecutedStatus: 'COMPLETED',
                    lastExecuted: 'now',
                },
            ],
        }

        useParams.mockImplementation(() => id)

        shallow(
            <StoreContext.Provider value={store}>
                <JobEditContainer />
            </StoreContext.Provider>
        )
    })
})
