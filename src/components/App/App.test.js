import React from 'react'
import { shallow } from 'enzyme'
import App from './App'

jest.mock('../../hooks/locale', () => ({
    useLocale: jest.fn(),
}))

describe('<App>', () => {
    it('renders without errors', () => {
        shallow(<App />)
    })
})
