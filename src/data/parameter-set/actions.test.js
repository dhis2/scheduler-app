/**
 * @jest-environment node
 */

import 'isomorphic-fetch'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import urlJoin from 'url-join'
import * as rootSelectors from '../../rootSelectors'
import * as types from './actionTypes'
import * as actions from './actions'
import * as selectors from './reducer'

/**
 * Mocks
 */

// The endpoints for parameter options are dynamic, so we'll mock them
const base = process.env.REACT_APP_DHIS2_BASE_URL
const endpoint = 'parameterOptions'
const url = urlJoin(base, endpoint)

// Return consistent date for testing
Date.now = jest.fn(() => 1)

// Allow selectors to be mocked
selectors.getShouldFetch = jest.fn() // eslint-disable-line import/namespace
rootSelectors.getParameterSet = jest.fn() // eslint-disable-line import/namespace

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

/**
 * Fetch parameter set
 */

describe('fetchParameterSetSuccess', () => {
    it('should create a FETCH_PARAMETER_SET_SUCCESS action', () => {
        const actual = actions.fetchParameterSetSuccess('payload', {
            meta: 'meta',
        })
        const expected = {
            type: types.FETCH_PARAMETER_SET_SUCCESS,
            meta: {
                meta: 'meta',
                receivedAt: 1,
            },
            payload: 'payload',
        }

        expect(actual).toEqual(expected)
    })
})

describe('fetchParameterSetFail', () => {
    it('should create a FETCH_PARAMETER_SET_FAIL action', () => {
        const actual = actions.fetchParameterSetFail('error', {
            meta: 'meta',
        })
        const expected = {
            type: types.FETCH_PARAMETER_SET_FAIL,
            meta: {
                meta: 'meta',
                receivedAt: 1,
            },
            error: 'error',
        }

        expect(actual).toEqual(expected)
    })
})

describe('fetchParameterSet', () => {
    beforeEach(() => {
        nock.disableNetConnect()
    })

    afterEach(() => {
        nock.cleanAll()
        nock.enableNetConnect()
    })

    it('should handle successful fetches', () => {
        const { origin, pathname } = new URL(url)
        const meta = { meta: 'data' }
        const mockResponse = { data: 'data' }

        nock(origin)
            .get(pathname)
            .query(true)
            .reply(200, mockResponse)

        const store = mockStore({})
        const expectedActions = [
            {
                type: types.FETCH_PARAMETER_SET,
                meta,
            },
            {
                type: types.FETCH_PARAMETER_SET_SUCCESS,
                meta: {
                    ...meta,
                    receivedAt: 1,
                },
                payload: mockResponse,
            },
        ]

        return store
            .dispatch(actions.fetchParameterSet(endpoint, meta))
            .then(() => expect(store.getActions()).toEqual(expectedActions))
    })

    it('should handle unsuccessful fetches', () => {
        const { origin, pathname } = new URL(url)
        const meta = { meta: 'data' }
        const error = new Error('Internal Server Error')

        nock(origin)
            .get(pathname)
            .query(true)
            .reply(500, {})

        const store = mockStore({})
        const expectedActions = [
            {
                type: types.FETCH_PARAMETER_SET,
                meta,
            },
            {
                type: types.FETCH_PARAMETER_SET_FAIL,
                meta: {
                    ...meta,
                    receivedAt: 1,
                },
                error: error,
            },
        ]

        return store
            .dispatch(actions.fetchParameterSet(endpoint, meta))
            .then(() => expect(store.getActions()).toEqual(expectedActions))
    })
})

describe('fetchParameterSetIfNeeded', () => {
    const { origin, pathname } = new URL(url)

    beforeEach(() => {
        nock.disableNetConnect()
    })

    afterEach(() => {
        nock.cleanAll()
        nock.enableNetConnect()
    })

    it('should fetch parameter set if needed', () => {
        const mockResponse = { data: 'data' }
        nock(origin)
            .get(pathname)
            .query(true)
            .reply(200, mockResponse)
        selectors.getShouldFetch.mockReturnValueOnce(true)

        const store = mockStore({})
        const expectedActions = [
            {
                type: types.FETCH_PARAMETER_SET,
                meta: {
                    jobType: 'jobType',
                    parameterName: 'parameterName',
                },
            },
            {
                type: types.FETCH_PARAMETER_SET_SUCCESS,
                meta: {
                    jobType: 'jobType',
                    parameterName: 'parameterName',
                    receivedAt: 1,
                },
                payload: mockResponse,
            },
        ]

        return store
            .dispatch(
                actions.fetchParameterSetIfNeeded(
                    endpoint,
                    'jobType',
                    'parameterName'
                )
            )
            .then(() => expect(store.getActions()).toEqual(expectedActions))
    })

    it('should not fetch parameter set if not needed', () => {
        selectors.getShouldFetch.mockReturnValueOnce(false)
        const store = mockStore({})

        return store
            .dispatch(actions.fetchParameterSetIfNeeded())
            .then(() => expect(store.getActions()).toEqual([]))
    })
})
