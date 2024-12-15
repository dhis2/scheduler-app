import React from 'react'
import { shallow } from 'enzyme'
import JobActions from './JobActions.jsx'

describe('<JobActions>', () => {
    it('renders without errors for configurable jobs', () => {
        shallow(<JobActions id="1" configurable refetch={() => {}} />)
    })

    it('renders without errors for non configurable jobs', () => {
        shallow(<JobActions id="1" refetch={() => {}} />)
    })
})
