/**
 * @jest-environment node
 */

import 'isomorphic-fetch'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import * as rootSelectors from '../../rootSelectors'
import endpoints from '../../services/endpoints'
import * as types from './actionTypes'
import * as actions from './actions'
import * as selectors from './reducer'

const { origin, pathname } = new URL(endpoints.me)

/**
 * Mocks
 */

// Allow selectors to be mocked
selectors.getShouldFetch = jest.fn() // eslint-disable-line import/namespace
rootSelectors.getMe = jest.fn() // eslint-disable-line import/namespace

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

/**
 * Tests
 */

describe('fetchMeSuccess', () => {
    it('should create a FETCH_ME_SUCCESS action', () => {
        const actual = actions.fetchMeSuccess('payload')
        const expected = {
            type: types.FETCH_ME_SUCCESS,
            payload: 'payload',
        }

        expect(actual).toEqual(expected)
    })
})

describe('fetchMeFail', () => {
    it('should create a FETCH_ME_FAIL action', () => {
        const actual = actions.fetchMeFail('error')
        const expected = {
            type: types.FETCH_ME_FAIL,
            error: 'error',
        }

        expect(actual).toEqual(expected)
    })
})

describe('fetchMe', () => {
    beforeEach(() => {
        nock.disableNetConnect()
    })

    afterEach(() => {
        nock.cleanAll()
        nock.enableNetConnect()
    })

    it('should handle successful fetches', () => {
        const mockResponse = { mock: 'data' }
        nock(origin)
            .get(pathname)
            .reply(200, mockResponse)

        const store = mockStore({})
        const expectedActions = [
            { type: types.FETCH_ME },
            {
                type: types.FETCH_ME_SUCCESS,
                payload: mockResponse,
            },
        ]

        return store
            .dispatch(actions.fetchMe())
            .then(() => expect(store.getActions()).toEqual(expectedActions))
    })

    it('should handle unsuccessful fetches', () => {
        const error = new Error('Internal Server Error')
        nock(origin)
            .get(pathname)
            .reply(500)

        const store = mockStore({})
        const expectedActions = [
            { type: types.FETCH_ME },
            {
                type: types.FETCH_ME_FAIL,
                error: error,
            },
        ]

        return store
            .dispatch(actions.fetchMe())
            .then(() => expect(store.getActions()).toEqual(expectedActions))
    })
})

describe('fetchMeIfNeeded', () => {
    beforeEach(() => {
        nock.disableNetConnect()
    })

    afterEach(() => {
        nock.cleanAll()
        nock.enableNetConnect()
    })

    it('should fetch me if needed', () => {
        const mockResponse = { mock: 'data' }
        nock(origin)
            .get(pathname)
            .reply(200, mockResponse)
        selectors.getShouldFetch.mockReturnValueOnce(true)

        const store = mockStore({})
        const expectedActions = [
            { type: types.FETCH_ME },
            {
                type: types.FETCH_ME_SUCCESS,
                payload: mockResponse,
            },
        ]

        return store
            .dispatch(actions.fetchMeIfNeeded())
            .then(() => expect(store.getActions()).toEqual(expectedActions))
    })

    it('should not fetch me if not needed', () => {
        selectors.getShouldFetch.mockReturnValueOnce(false)
        const store = mockStore({})

        return store
            .dispatch(actions.fetchMeIfNeeded())
            .then(() => expect(store.getActions()).toEqual([]))
    })
})
