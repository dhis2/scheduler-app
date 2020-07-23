import React from 'react'
import { shallow } from 'enzyme'
import JobStatus from './JobStatus'

const statuses = [
    'STOPPED',
    'DISABLED',
    'RUNNING',
    'NOT_STARTED',
    'SCHEDULED',
    'FAILED',
    'DONE',
]

describe('<JobStatus>', () => {
    it.each(statuses)('renders without errors for %s status', status => {
        shallow(<JobStatus status={status} />)
    })

    it('returns null for an invalid status', () => {
        const wrapper = shallow(<JobStatus status="INVALID" />)

        expect(wrapper.isEmptyRender()).toBe(true)
    })
})
