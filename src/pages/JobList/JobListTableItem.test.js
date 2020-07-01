import React from 'react'
import { shallow } from 'enzyme'
import JobListTableItem from './JobListTableItem'

describe('<JobListTableItem>', () => {
    it('renders cron jobs correctly', () => {
        const job = {
            id: '1',
            displayName: 'Name',
            jobType: 'SEND_SCHEDULED_MESSAGE',
            cronExpression: '0 0 * ? * *',
            jobStatus: 'ENABLED',
            nextExecutionTime: '2100-10-10T14:48:00',
            enabled: true,
            schedulingType: 'CRON',
            configurable: true,
        }
        const wrapper = shallow(<JobListTableItem job={job} />)

        expect(wrapper).toMatchSnapshot()
    })

    it('renders fixed delay jobs correctly', () => {
        const job = {
            id: '1',
            displayName: 'Name',
            jobType: 'CONTINUOUS_ANALYTICS_TABLE',
            jobStatus: 'ENABLED',
            nextExecutionTime: '',
            enabled: true,
            schedulingType: 'FIXED_DELAY',
            delay: 6000,
            configurable: true,
        }
        const wrapper = shallow(<JobListTableItem job={job} />)

        expect(wrapper).toMatchSnapshot()
    })
})
