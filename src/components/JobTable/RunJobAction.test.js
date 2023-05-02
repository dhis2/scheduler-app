import React from 'react'
import { mount } from 'enzyme'
import RunJobAction from './RunJobAction'

describe('<RunJobAction>', () => {
    it('shows the modal when MenuItem is clicked and the job is enabled', () => {
        const wrapper = mount(
            <RunJobAction id="id" enabled onComplete={() => {}} />
        )

        expect(wrapper.find('RunJobModal')).toHaveLength(0)
        wrapper.find('a').simulate('click')
        expect(wrapper.find('RunJobModal')).toHaveLength(1)
    })

    it('does not show the modal when MenuItem is clicked and the job is disabled', () => {
        const wrapper = mount(<RunJobAction id="id" onComplete={() => {}} />)

        expect(wrapper.find('RunJobModal')).toHaveLength(0)
        wrapper.find('a').simulate('click')
        expect(wrapper.find('RunJobModal')).toHaveLength(0)
    })
})
