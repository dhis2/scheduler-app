import React from 'react'
import { shallow } from 'enzyme'
import JobAddContainer from './JobAddContainer'

describe('<JobAddContainer>', () => {
    it('renders without errors', () => {
        shallow(<JobAddContainer />)
    })
})
