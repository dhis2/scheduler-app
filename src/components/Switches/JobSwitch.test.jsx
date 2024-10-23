import React from 'react'
import { shallow } from 'enzyme'
import JobSwitch from './JobSwitch.jsx'

describe('<JobSwitch>', () => {
    it('renders without errors', () => {
        shallow(
            <JobSwitch
                id="1"
                checked={true}
                disabled={false}
                refetch={() => {}}
            />
        )
    })
})
