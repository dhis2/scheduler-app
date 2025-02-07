import React from 'react'
import { shallow, mount } from 'enzyme'
import DeleteQueueButton from './DeleteQueueButton'

describe('<DeleteQueueButton>', () => {
    it('renders without errors', () => {
        shallow(<DeleteQueueButton name="name" onSuccess={() => {}} />)
    })

    it('shows the modal when button is clicked', () => {
        const wrapper = mount(
            <DeleteQueueButton name="name" onSuccess={() => {}} />
        )

        expect(wrapper.find('DeleteQueueModal')).toHaveLength(0)

        wrapper.find('button').simulate('click')

        expect(wrapper.find('DeleteQueueModal')).toHaveLength(1)
    })
})
