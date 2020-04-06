import React from 'react'
import { shallow } from 'enzyme'
import NoticeBoxTitle from './NoticeBoxTitle.js'

describe('NoticeBoxTitle', () => {
    it('should return null when there is no title', () => {
        expect(NoticeBoxTitle({})).toBe(null)
    })

    it('should render title', () => {
        const wrapper = shallow(<NoticeBoxTitle title="title" />)

        expect(wrapper.text()).toEqual(expect.stringContaining('title'))
    })
})
