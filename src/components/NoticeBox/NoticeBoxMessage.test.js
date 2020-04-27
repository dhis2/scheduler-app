import React from 'react'
import { shallow } from 'enzyme'
import NoticeBoxMessage from './NoticeBoxMessage'

describe('NoticeBoxMessage', () => {
    it('should return null when there are no children', () => {
        expect(NoticeBoxMessage({})).toBe(null)
    })

    it('should render children', () => {
        const wrapper = shallow(<NoticeBoxMessage>children</NoticeBoxMessage>)

        expect(wrapper.text()).toEqual(expect.stringContaining('children'))
    })
})
