import React from 'react'
import { shallow } from 'enzyme'
import JobEdit from './JobEdit'

describe('<JobEdit>', () => {
    it('renders without errors', () => {
        const props = {
            isPristine: false,
            setIsPristine: () => {},
            name: 'name',
        }
        shallow(<JobEdit {...props} />)
    })
})
