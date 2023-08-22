import React from 'react'
import { shallow } from 'enzyme'
import SequenceEditFormContainer from './SequenceEditFormContainer'

jest.mock('react-router-dom', () => ({
    useParams: () => ({ name: 'name' }),
}))

afterEach(() => {
    jest.resetAllMocks()
})

describe('<SequenceEditFormContainer>', () => {
    it('renders without errors', () => {
        const queue = {
            cronExpression: '',
            sequence: [],
            name: '',
        }
        const jobs = []

        shallow(
            <SequenceEditFormContainer
                queue={queue}
                jobs={jobs}
                setIsPristine={() => {}}
            />
        )
    })
})
