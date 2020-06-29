import React from 'react'
import { shallow } from 'enzyme'
import JobAdd from './JobAdd'

describe('<JobAdd>', () => {
    it('renders without errors', () => {
        const props = {
            isPristine: false,
            setIsPristine: () => {},
        }
        shallow(<JobAdd {...props} />)
    })
})
