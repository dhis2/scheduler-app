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
    it.each(statuses)('renders correctly for %s status', status => {
        const wrapper = shallow(<JobStatus status={status} />)

        expect(wrapper).toMatchSnapshot()
    })

    it('renders correctly for an invalid status', () => {
        const wrapper = shallow(<JobStatus status="INVALID" />)

        expect(wrapper).toMatchSnapshot()
    })
})
