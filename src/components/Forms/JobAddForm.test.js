import React from 'react'
import { shallow } from 'enzyme'
import { ReactFinalForm } from '@dhis2/ui'
import JobAddForm from './JobAddForm'

const { useForm } = ReactFinalForm

jest.mock('@dhis2/ui', () => {
    const originalModule = jest.requireActual('@dhis2/ui')

    return {
        __esModule: true,
        ...originalModule,
        ReactFinalForm: {
            ...originalModule.ReactFinalForm,
            useForm: jest.fn(),
        },
    }
})

describe('<JobAddForm>', () => {
    it('shows submit errors if there are any', () => {
        useForm.mockImplementation(() => ({ subscribe: () => {} }))

        const message = 'Something went wrong'
        const props = {
            handleSubmit: () => {},
            pristine: true,
            submitting: false,
            submitError: [message],
            hasSubmitErrors: true,
            values: {},
            setIsPristine: () => {},
        }

        const wrapper = shallow(<JobAddForm {...props} />)
        const actual = wrapper.find('FormErrorBox')

        expect(actual.length > 0).toBe(true)
    })
})
