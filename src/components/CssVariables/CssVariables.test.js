import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import { theme, colors } from '@dhis2/ui-core'
import CssVariables from './CssVariables'

describe('<CssVariables>', () => {
    it('inserts css theme variables', () => {
        const div = document.createElement('div')
        const root = document.documentElement

        ReactDOM.render(<CssVariables />, div)

        Object.keys(theme).forEach(key => {
            const value = getComputedStyle(root).getPropertyValue(
                `--theme-${key}`
            )
            expect(value).toEqual(theme[key])
        })

        ReactDOM.unmountComponentAtNode(div)
    })

    it('inserts css color variables', () => {
        const div = document.createElement('div')
        const root = document.documentElement

        ReactDOM.render(<CssVariables />, div)

        Object.keys(colors).forEach(key => {
            const value = getComputedStyle(root).getPropertyValue(
                `--colors-${key}`
            )
            expect(value).toEqual(colors[key])
        })

        ReactDOM.unmountComponentAtNode(div)
    })

    it('renders correctly', () => {
        const wrapper = shallow(<CssVariables />)

        expect(wrapper).toMatchSnapshot()
    })
})
