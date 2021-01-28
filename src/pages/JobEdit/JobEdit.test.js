import React from 'react'
import { shallow } from 'enzyme'
import JobEdit from './JobEdit'

describe('<JobEdit>', () => {
    it('renders without errors', () => {
        const props = {
            isPristine: false,
            setIsPristine: () => {},
            name: 'name',
            created: 'now',
            lastExecutedStatus: 'COMPLETED',
            lastExecuted: 'now',
        }
        shallow(<JobEdit {...props} />)
    })
})
