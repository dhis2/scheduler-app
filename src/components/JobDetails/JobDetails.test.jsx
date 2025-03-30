import React from 'react'
import { shallow } from 'enzyme'
import JobDetails from './JobDetails'

describe('<JobDetails>', () => {
    it('renders the job details', () => {
        const ten = '2020-01-01T10:00:00.000'
        const eleven = '2020-01-01T11:00:00.000'
        const twelve = '2020-01-01T12:00:00.000'

        jest.spyOn(global.Date, 'now').mockImplementation(() => twelve)

        const props = {
            created: ten,
            lastExecutedStatus: 'COMPLETED',
            lastExecuted: eleven,
        }

        const wrapper = shallow(<JobDetails {...props} />)

        expect(wrapper.text()).toEqual(
            expect.stringContaining('Created 2 hours ago.')
        )
        expect(wrapper.text()).toEqual(
            expect.stringContaining('Last run an hour ago.')
        )
        expect(wrapper.text()).toEqual(
            expect.stringContaining('Last run status: Completed.')
        )
    })

    it('omits last run info if there is no last executed prop', () => {
        const ten = '2020-01-01T10:00:00.000'
        const twelve = '2020-01-01T12:00:00.000'

        jest.spyOn(global.Date, 'now').mockImplementation(() => twelve)

        const props = {
            created: ten,
            lastExecutedStatus: 'COMPLETED',
        }

        const wrapper = shallow(<JobDetails {...props} />)

        // Should not include a last run time
        expect(wrapper.text()).toMatchInlineSnapshot(
            `"Job detailsCreated 2 hours ago.Last run status: Completed."`
        )
    })

    it('omits last run status if there is no matching translation', () => {
        const ten = '2020-01-01T10:00:00.000'
        const eleven = '2020-01-01T11:00:00.000'
        const twelve = '2020-01-01T12:00:00.000'

        jest.spyOn(global.Date, 'now').mockImplementation(() => twelve)

        const props = {
            created: ten,
            lastExecuted: eleven,
            lastExecutedStatus: 'DOES NOT EXIST',
        }

        const wrapper = shallow(<JobDetails {...props} />)

        // Should not include a last run status
        expect(wrapper.text()).toMatchInlineSnapshot(
            `"Job detailsCreated 2 hours ago.Last run an hour ago."`
        )
    })
})
