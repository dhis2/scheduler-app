import React from 'react'
import { mount } from 'enzyme'
import { ReactFinalForm } from '@dhis2/ui'
import { StoreContext } from '../Store'
import ScheduleField from './ScheduleField'

const { Form } = ReactFinalForm

// Mock these components to simplify this test
jest.mock('./CronField', () => () => <div>CronField</div>)
jest.mock('./DelayField', () => () => <div>DelayField</div>)

afterEach(() => {
    jest.resetAllMocks()
})

describe('<ScheduleField>', () => {
    it('renders the cron field if the scheduling type is CRON', () => {
        const props = {
            jobType: 'one',
        }
        const store = {
            jobTypes: [
                {
                    jobType: 'one',
                    schedulingType: 'CRON',
                },
            ],
        }
        const wrapper = mount(
            <StoreContext.Provider value={store}>
                <Form onSubmit={() => {}}>
                    {() => (
                        <form>
                            <ScheduleField {...props} />
                        </form>
                    )}
                </Form>
            </StoreContext.Provider>
        )

        const actual = wrapper.text()

        expect(actual).toEqual(expect.stringContaining('CronField'))
        expect(actual).toEqual(expect.not.stringContaining('DelayField'))
    })

    it('renders the delay field if the scheduling type is FIXED_DELAY', () => {
        const props = {
            jobType: 'one',
        }
        const store = {
            jobTypes: [
                {
                    jobType: 'one',
                    schedulingType: 'FIXED_DELAY',
                },
            ],
        }
        const wrapper = mount(
            <StoreContext.Provider value={store}>
                <Form onSubmit={() => {}}>
                    {() => (
                        <form>
                            <ScheduleField {...props} />
                        </form>
                    )}
                </Form>
            </StoreContext.Provider>
        )

        const actual = wrapper.text()

        expect(actual).toEqual(expect.stringContaining('DelayField'))
        expect(actual).toEqual(expect.not.stringContaining('CronField'))
    })

    it('returns null for unrecognised scheduling types', () => {
        const props = {
            jobType: 'one',
        }
        const store = {
            jobTypes: [
                {
                    jobType: 'one',
                    schedulingType: 'RANDOM',
                },
            ],
        }
        const wrapper = mount(
            <StoreContext.Provider value={store}>
                <Form onSubmit={() => {}}>
                    {() => (
                        <form>
                            <ScheduleField {...props} />
                        </form>
                    )}
                </Form>
            </StoreContext.Provider>
        )

        const children = wrapper.find('form').children()

        expect(children.isEmptyRender()).toBe(true)
    })
})
