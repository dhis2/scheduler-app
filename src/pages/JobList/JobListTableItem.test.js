import React from 'react'
import { shallow } from 'enzyme'
import JobListTableItem from './JobListTableItem'

describe('<JobListTableItem>', () => {
    const RealDateNow = Date.now
    const MockDateNow = jest.fn(() => 1318078080000)

    beforeAll(() => {
        global.Date.now = MockDateNow
    })

    afterAll(() => {
        global.Date.now = RealDateNow
    })

    it('renders correctly', () => {
        const job = {
            id: '1',
            displayName: 'Name',
            jobType: 'Type',
            cronExpression: '0 0 * ? * *',
            jobStatus: 'ENABLED',
            nextExecutionTime: '2011-10-10T14:48:00',
            enabled: true,
        }
        const wrapper = shallow(<JobListTableItem job={job} />)

        expect(wrapper).toMatchSnapshot()
    })
})
