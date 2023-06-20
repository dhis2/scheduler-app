import React from 'react'
import { shallow } from 'enzyme'
import SequenceAddFormContainer from './SequenceAddFormContainer'

describe('<SequenceAddFormContainer>', () => {
    it('renders without errors', () => {
        const props = {
            setIsPristine: () => {},
        }

        shallow(<SequenceAddFormContainer {...props} />)
    })
})
