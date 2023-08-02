import React from 'react'
import { shallow, mount } from 'enzyme'
import DeleteSequenceButton from './DeleteSequenceButton'

describe('<DeleteSequenceButton>', () => {
    it('renders without errors', () => {
        shallow(<DeleteSequenceButton name="name" onSuccess={() => {}} />)
    })

    it('shows the modal when button is clicked', () => {
        const wrapper = mount(
            <DeleteSequenceButton name="name" onSuccess={() => {}} />
        )

        expect(wrapper.find('DeleteSequenceModal')).toHaveLength(0)

        wrapper.find('button').simulate('click')

        expect(wrapper.find('DeleteSequenceModal')).toHaveLength(1)
    })
})
