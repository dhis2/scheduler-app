import React from 'react'
import { mount } from 'enzyme'
import { CustomDataProvider } from '@dhis2/app-runtime'
import JobAdd from './JobAdd'

describe('<JobAdd>', () => {
    it('renders without errors', () => {
        const data = { 'jobConfigurations/jobTypes': { jobTypes: [] } }

        mount(
            <CustomDataProvider data={data}>
                <JobAdd />
            </CustomDataProvider>
        )
    })
})
