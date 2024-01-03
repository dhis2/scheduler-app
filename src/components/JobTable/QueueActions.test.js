import React from 'react'
import { shallow } from 'enzyme'
import QueueActions from './QueueActions'

describe('<QueueActions>', () => {
    it('renders without errors', () => {
        shallow(<QueueActions name="1" refetch={() => {}} />)
    })
})
