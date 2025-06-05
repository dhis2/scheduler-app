import React from 'react'
import { shallow } from 'enzyme'
import QueueTableRow from './QueueTableRow'

describe('<QueueTableRow>', () => {
    it('renders queues without errors', () => {
        const queue = {
            id: 'lnWRZN67iDU',
            name: 'Queue 1',
            cronExpression: '0 0 3 ? * MON',
            nextExecutionTime: '2021-03-01T03:00:00.000',
            status: 'SCHEDULED',
            enabled: true,
            configurable: true,
            sequence: [
                {
                    id: 'lnWRZN67iDU',
                    name: 'Job 1',
                    type: 'DATA_INTEGRITY',
                    cronExpression: '0 0 3 ? * MON',
                    nextExecutionTime: '2021-03-01T03:00:00.000',
                    status: 'SCHEDULED',
                },
            ],
        }

        shallow(<QueueTableRow queue={queue} refetch={() => {}} />)
    })
})
