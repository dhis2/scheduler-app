import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import nock from 'nock'
import fetch from 'node-fetch'
import { mount } from 'enzyme'
import waitForExpect from 'wait-for-expect'
import { DataProvider } from '@dhis2/app-runtime'
import AuthWall from './AuthWall'

beforeAll(() => {
    // Polyfill fetch
    if (!global.fetch) {
        global.fetch = fetch
    }

    // Disable real requests
    nock.disableNetConnect()
})

afterEach(() => {
    // Clean all prepared mocks
    nock.cleanAll()
})

afterAll(() => {
    if (global.fetch) {
        delete global.fetch
    }

    // Enable requests again
    nock.enableNetConnect()
})

describe('<AuthWall>', () => {
    it('redirects unauthorized users to /notauthorized', async () => {
        nock('https://debug.dhis2.org')
            .get('/dev/api/31/me')
            .reply(200, { authorities: [] })

        const wrapper = mount(
            <DataProvider baseUrl="https://debug.dhis2.org/dev" apiVersion={31}>
                <Router>
                    <AuthWall>Child</AuthWall>
                </Router>
            </DataProvider>
        )

        // Show loading state initially
        const loadingIndicator = wrapper.find({
            'data-test': 'dhis2-uicore-circularloader',
        })

        expect(loadingIndicator).toHaveLength(1)
        expect(wrapper.text()).toEqual(
            expect.stringContaining('Checking permissions')
        )

        // Redirects after response
        await waitForExpect(() => {
            wrapper.update()

            const redirect = wrapper.find('Redirect')
            const props = redirect.props()

            expect(redirect).toHaveLength(1)
            expect(props).toEqual(
                expect.objectContaining({ to: '/notauthorized' })
            )
        })
    })

    it('renders the children for users that are authorized', async () => {
        nock('https://debug.dhis2.org')
            .get('/dev/api/31/me')
            .reply(200, { authorities: ['ALL'] })

        const wrapper = mount(
            <DataProvider baseUrl="https://debug.dhis2.org/dev" apiVersion={31}>
                <AuthWall>Child</AuthWall>
            </DataProvider>
        )

        // Show loading state initially
        const loadingIndicator = wrapper.find({
            'data-test': 'dhis2-uicore-circularloader',
        })

        expect(loadingIndicator).toHaveLength(1)
        expect(wrapper.text()).toEqual(
            expect.stringContaining('Checking permissions')
        )

        // Renders children once authorized
        await waitForExpect(() => {
            wrapper.update()
            expect(wrapper.text()).toEqual(expect.stringContaining('Child'))
        })
    })
})
