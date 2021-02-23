import React from 'react'
import { useParams } from 'react-router-dom'
import { shallow } from 'enzyme'
import { StoreContext } from '../../components/Store'
import JobView from './JobView'

jest.mock('react-router-dom', () => ({
    useParams: jest.fn(),
}))

afterEach(() => {
    jest.resetAllMocks()
})

describe('<JobView>', () => {
    it('renders without errors', () => {
        const id = 'one'
        const store = {
            jobs: [
                {
                    id,
                    jobType: 'DATA_SET_NOTIFICATION',
                    cronExpression: '0 0 2 * * ?',
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
                <JobView />
            </StoreContext.Provider>
        )
    })
})
