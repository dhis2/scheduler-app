import React from 'react'
import { mount } from 'enzyme'
import RunQueueAction from './RunQueueAction.jsx'

describe('<RunQueueAction>', () => {
    it('shows the modal when MenuItem is clicked and the queue is enabled', () => {
        const wrapper = mount(
            <RunQueueAction id="id" enabled onComplete={() => {}} />
        )

        expect(wrapper.find('RunJobModal')).toHaveLength(0)
        wrapper.find('a').simulate('click')
        expect(wrapper.find('RunJobModal')).toHaveLength(1)
    })

    it('does not show the modal when MenuItem is clicked and the queue is disabled', () => {
        const wrapper = mount(<RunQueueAction id="id" onComplete={() => {}} />)

        expect(wrapper.find('RunJobModal')).toHaveLength(0)
        wrapper.find('a').simulate('click')
        expect(wrapper.find('RunJobModal')).toHaveLength(0)
    })
})
