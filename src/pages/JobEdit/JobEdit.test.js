import React from 'react'
import { mount } from 'enzyme'
import { CustomDataProvider } from '@dhis2/app-runtime'
import { useParams } from 'react-router-dom'
import JobEdit from './JobEdit'

jest.mock('react-router-dom', () => ({
    useParams: jest.fn(),
}))

describe('<JobEdit>', () => {
    it('renders without errors', () => {
        const id = 'id'
        const data = {
            jobConfigurations: {
                jobConfigurations: [
                    {
                        id,
                        name: 'name',
                        created: 'created',
                        lastExecutedStatus: 'lastExecutedStatus',
                        lastExecuted: 'lastExecuted',
                    },
                ],
            },
            'jobConfigurations/jobTypes': { jobTypes: [] },
        }

        useParams.mockImplementation(() => id)

        mount(
            <CustomDataProvider data={data}>
                <JobEdit />
            </CustomDataProvider>
        )
    })
})
