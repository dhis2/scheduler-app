import React from 'react'
import { shallow } from 'enzyme'
import JobListActions from './JobListActions'

describe('<JobListActions>', () => {
    it('renders without errors for configurable jobs', () => {
        shallow(<JobListActions id="1" configurable />)
    })

    it('renders without errors for non configurable jobs', () => {
        shallow(<JobListActions id="1" />)
    })
})
