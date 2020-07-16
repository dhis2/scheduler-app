import React from 'react'
import { shallow } from 'enzyme'
import NotAuthorized from './NotAuthorized'

describe('<NotAuthorized>', () => {
    it('renders without errors', () => {
        shallow(<NotAuthorized />)
    })
})
