import React from 'react'
import { shallow } from 'enzyme'
import SequenceEditFormContainer from './SequenceEditFormContainer'

jest.mock('react-router-dom', () => ({
    useParams: () => ({ id: 'id' }),
}))

afterEach(() => {
    jest.resetAllMocks()
})

describe('<SequenceEditFormContainer>', () => {
    it('renders without errors', () => {
        const sequence = {
            cronExpression: '',
            sequence: [],
            name: '',
        }

        shallow(
            <SequenceEditFormContainer
                sequence={sequence}
                setIsPristine={() => {}}
            />
        )
    })
})
