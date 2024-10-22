import React from 'react'
import { shallow } from 'enzyme'
import QueueActions from './QueueActions.jsx'

describe('<QueueActions>', () => {
    it('renders without errors', () => {
        shallow(<QueueActions name="1" refetch={() => {}} id="1" enabled />)
    })
})
