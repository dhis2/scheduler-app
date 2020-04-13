import React from 'react'
import { shallow } from 'enzyme'
import FormErrorBox from './FormErrorBox'

describe('<FormErrorBox>', () => {
    it('returns null if there are no errors', () => {
        const props = { submitError: [] }

        expect(FormErrorBox(props)).toBeNull()
    })

    it('shows errors if there are errors', () => {
        const submitError = ['Error']
        const wrapper = shallow(<FormErrorBox submitError={submitError} />)

        expect(wrapper).toMatchSnapshot()
    })
})
