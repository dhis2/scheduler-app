import React from 'react'
import { shallow } from 'enzyme'
import JobEditFormContainer from './JobEditFormContainer'

jest.mock('react-router-dom', () => ({
    useParams: () => ({ id: 'id' }),
}))

afterEach(() => {
    jest.resetAllMocks()
})

describe('<JobEditFormContainer>', () => {
    it('renders without errors', () => {
        const job = { id: 'id' }

        shallow(<JobEditFormContainer job={job} setIsPristine={() => {}} />)
    })
})
