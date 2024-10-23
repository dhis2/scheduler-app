import React from 'react'
import { shallow, mount } from 'enzyme'
import DeleteQueueAction from './DeleteQueueAction.jsx'

describe('<DeleteQueueAction>', () => {
    it('renders without errors', () => {
        shallow(<DeleteQueueAction name="name" onSuccess={() => {}} />)
    })

    it('shows the modal when MenuItem is clicked', () => {
        const wrapper = mount(
            <DeleteQueueAction name="name" onSuccess={() => {}} />
        )

        expect(wrapper.find('DeleteQueueModal')).toHaveLength(0)

        wrapper.find('a').simulate('click')

        expect(wrapper.find('DeleteQueueModal')).toHaveLength(1)
    })
})
