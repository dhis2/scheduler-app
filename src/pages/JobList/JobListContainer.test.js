import React from 'react'
import { shallow } from 'enzyme'
import { StoreContext } from '../../components/Store'
import JobListContainer from './JobListContainer'

describe('<JobListContainer>', () => {
    it('renders without errors when there is data', () => {
        const store = {
            jobs: [
                { id: 'one', name: 'one' },
                { id: 'two', name: 'two' },
            ],
            jobFilter: ['', () => {}],
            showSystemJobs: [false, () => {}],
        }

        shallow(
            <StoreContext.Provider value={store}>
                <JobListContainer />
            </StoreContext.Provider>
        )
    })
})
