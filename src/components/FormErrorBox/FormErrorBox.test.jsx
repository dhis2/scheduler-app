import React from 'react'
import { shallow, mount } from 'enzyme'
import FormErrorBox from './FormErrorBox'

describe('<FormErrorBox>', () => {
    it('returns null if there are no errors', () => {
        const wrapper = shallow(<FormErrorBox title="" submitError={[]} />)

        expect(wrapper.isEmptyRender()).toBe(true)
    })

    it('shows errors if there are errors', () => {
        const message = 'An error message'
        const submitError = [message]
        const wrapper = mount(
            <FormErrorBox title="" submitError={submitError} />
        )

        expect(wrapper.text()).toEqual(expect.stringContaining(message))
    })
})
