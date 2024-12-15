import React from 'react'
import { shallow } from 'enzyme'
import JobAdd from './JobAdd.jsx'

describe('<JobAdd>', () => {
    it('renders without errors', () => {
        shallow(<JobAdd />)
    })
})
