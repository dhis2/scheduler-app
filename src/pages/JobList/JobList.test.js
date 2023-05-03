import React from 'react'
import { mount } from 'enzyme'
import { BrowserRouter } from 'react-router-dom'
import { CustomDataProvider } from '@dhis2/app-runtime'
import { Store } from '../../components/Store'
import JobList from './JobList'

describe('<JobList>', () => {
    it('renders without errors', () => {
        const data = { scheduler: [{ name: '', sequence: [{ id: 'id' }] }] }

        mount(
            <CustomDataProvider data={data}>
                <BrowserRouter>
                    <Store>
                        <JobList />
                    </Store>
                </BrowserRouter>
            </CustomDataProvider>
        )
    })
})
