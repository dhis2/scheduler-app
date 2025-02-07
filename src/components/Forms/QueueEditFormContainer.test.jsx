import React from 'react'
import { shallow } from 'enzyme'
import QueueEditFormContainer from './QueueEditFormContainer'

jest.mock('react-router-dom', () => ({
    useParams: () => ({ name: 'name' }),
}))

afterEach(() => {
    jest.resetAllMocks()
})

describe('<QueueEditFormContainer>', () => {
    it('renders without errors', () => {
        const queue = {
            cronExpression: '',
            sequence: [],
            name: '',
        }
        const jobs = []

        shallow(
            <QueueEditFormContainer
                queue={queue}
                jobs={jobs}
                setIsPristine={() => {}}
            />
        )
    })
})
