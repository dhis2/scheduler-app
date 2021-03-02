import React from 'react'
import { mount } from 'enzyme'
import { StoreContext } from '../Store'
import RunJobAction from './RunJobAction'

describe('<RunJobAction>', () => {
    it('shows the modal when MenuItem is clicked and the job is enabled', () => {
        const store = {
            jobs: [{ id: 'id', enabled: true }],
        }
        const wrapper = mount(
            <StoreContext.Provider value={store}>
                <RunJobAction id="id" />
            </StoreContext.Provider>
        )

        expect(wrapper.find('RunJobModal')).toHaveLength(0)
        wrapper.find('a').simulate('click')
        expect(wrapper.find('RunJobModal')).toHaveLength(1)
    })

    it('does not show the modal when MenuItem is clicked and the job is disabled', () => {
        const store = {
            jobs: [{ id: 'id', enabled: false }],
        }
        const wrapper = mount(
            <StoreContext.Provider value={store}>
                <RunJobAction id="id" />
            </StoreContext.Provider>
        )

        expect(wrapper.find('RunJobModal')).toHaveLength(0)
        wrapper.find('a').simulate('click')
        expect(wrapper.find('RunJobModal')).toHaveLength(0)
    })
})
