import React from 'react'
import { shallow } from 'enzyme'
import SequenceEditFormContainer from './SequenceEditFormContainer'

describe('<SequenceEditFormContainer>', () => {
    it('renders without errors', () => {
        const props = {
            setIsPristine: () => {},
        }

        shallow(<SequenceEditFormContainer {...props} />)
    })
})
