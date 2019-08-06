import React from 'react'
import { shallow } from 'enzyme'
import { DumbModalContainer as ModalContainer } from './ModalContainer'
import * as modalTypes from './modalTypes'

describe('<ModalContainer>', () => {
    it('renders nothing when type is null', () => {
        const wrapper = shallow(<ModalContainer type={null} />)

        expect(wrapper).toMatchSnapshot()
    })

    it('renders DeleteJobModal when requested', () => {
        const wrapper = shallow(<ModalContainer type={modalTypes.DELETE_JOB} />)

        expect(wrapper).toMatchSnapshot()
    })

    it('passes props to DeleteJobModal', () => {
        const wrapper = shallow(
            <ModalContainer type={modalTypes.DELETE_JOB} props={{ id: 'id' }} />
        )

        expect(wrapper).toMatchSnapshot()
    })

    it('renders RunJobModal when requested', () => {
        const wrapper = shallow(<ModalContainer type={modalTypes.RUN_JOB} />)

        expect(wrapper).toMatchSnapshot()
    })

    it('passes props to RunJobModal', () => {
        const wrapper = shallow(
            <ModalContainer type={modalTypes.RUN_JOB} props={{ id: 'id' }} />
        )

        expect(wrapper).toMatchSnapshot()
    })
})
