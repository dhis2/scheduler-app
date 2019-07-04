/**
 * @jest-environment node
 */

import 'isomorphic-fetch'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import * as rootSelectors from '../../rootSelectors'
import * as types from './actionTypes'
import * as actions from './actions'
import * as selectors from './reducer'

const { REACT_APP_DHIS2_BASE_URL } = process.env

/**
 * Mocks
 */

// Return consistent date for testing
Date.now = jest.fn(() => 1)

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
            meta: { receivedAt: 1 },
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
            meta: { receivedAt: 1 },
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
        nock(REACT_APP_DHIS2_BASE_URL)
            .get('/api/me')
            .reply(200, mockResponse)

        const store = mockStore({})
        const expectedActions = [
            { type: types.FETCH_ME },
            {
                type: types.FETCH_ME_SUCCESS,
                meta: { receivedAt: 1 },
                payload: mockResponse,
            },
        ]

        return store
            .dispatch(actions.fetchMe())
            .then(() => expect(store.getActions()).toEqual(expectedActions))
    })

    it('should handle unsuccessful fetches', () => {
        const error = new Error('Internal Server Error')
        nock(REACT_APP_DHIS2_BASE_URL)
            .get('/api/me')
            .reply(500)

        const store = mockStore({})
        const expectedActions = [
            { type: types.FETCH_ME },
            {
                type: types.FETCH_ME_FAIL,
                meta: { receivedAt: 1 },
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
        nock(REACT_APP_DHIS2_BASE_URL)
            .get('/api/me')
            .reply(200, mockResponse)
        selectors.getShouldFetch.mockReturnValueOnce(true)

        const store = mockStore({})
        const expectedActions = [
            { type: types.FETCH_ME },
            {
                type: types.FETCH_ME_SUCCESS,
                meta: { receivedAt: 1 },
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
