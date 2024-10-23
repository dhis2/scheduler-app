import React from 'react'
import { shallow } from 'enzyme'
import JobAddFormContainer from './JobAddFormContainer.jsx'

describe('<JobAddFormContainer>', () => {
    it('renders without errors', () => {
        const props = {
            setIsPristine: () => {},
        }

        shallow(<JobAddFormContainer {...props} />)
    })
})
