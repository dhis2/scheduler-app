import React from 'react'
import { shallow } from 'enzyme'
import QueueAddFormContainer from './QueueAddFormContainer'

describe('<QueueAddFormContainer>', () => {
    it('renders without errors', () => {
        const props = {
            setIsPristine: () => {},
        }

        shallow(<QueueAddFormContainer {...props} />)
    })
})
