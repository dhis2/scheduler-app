import React from 'react'
import { shallow } from 'enzyme'
import { useDataQuery } from '@dhis2/app-runtime'
import expectRenderError from '../../../test/expect-render-error'
import JobEditFormContainer from './JobEditFormContainer'

jest.mock('react-router-dom', () => ({
    useParams: () => ({ id: 'id' }),
}))

jest.mock('@dhis2/app-runtime', () => ({
    useDataQuery: jest.fn(),
    useDataEngine: () => {},
}))

describe('<JobEditFormContainer>', () => {
    it('returns null when loading', () => {
        useDataQuery.mockImplementation(() => ({
            loading: true,
        }))
        const props = {
            setIsPristine: () => {},
        }

        const wrapper = shallow(<JobEditFormContainer {...props} />)

        expect(wrapper.isEmptyRender()).toBe(true)
    })

    it('throws errors it encounters during fetching', () => {
        const message = 'Something went wrong'
        const props = {
            setIsPristine: () => {},
        }

        useDataQuery.mockImplementation(() => ({
            loading: false,
            error: new Error(message),
            data: null,
        }))

        expectRenderError(<JobEditFormContainer {...props} />, message)

        useDataQuery.mockReset()
    })

    it('renders without errors if there is data', () => {
        useDataQuery.mockImplementation(() => ({
            loading: true,
            error: undefined,
            data: { job: {} },
        }))
        const props = {
            setIsPristine: () => {},
        }

        shallow(<JobEditFormContainer {...props} />)
    })
})
