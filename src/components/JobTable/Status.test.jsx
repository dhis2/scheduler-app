import React from 'react'
import { shallow } from 'enzyme'
import Status from './Status'

const statuses = [
    'STOPPED',
    'DISABLED',
    'RUNNING',
    'NOT_STARTED',
    'SCHEDULED',
    'FAILED',
    'DONE',
]

describe('<Status>', () => {
    it.each(statuses)('renders without errors for %s status', (status) => {
        shallow(<Status status={status} />)
    })

    it('returns null for an invalid status', () => {
        const wrapper = shallow(<Status status="INVALID" />)

        expect(wrapper.isEmptyRender()).toBe(true)
    })
})
