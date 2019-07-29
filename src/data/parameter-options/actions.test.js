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
rootSelectors.getParameterOptions = jest.fn() // eslint-disable-line import/namespace

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

/**
 * Fetch job types
 */

describe('fetchParameterOptionsSuccess', () => {
    it('should create a FETCH_PARAMETER_OPTIONS_SUCCESS action', () => {
        const actual = actions.fetchParameterOptionsSuccess('payload', {
            meta: 'meta',
        })
        const expected = {
            type: types.FETCH_PARAMETER_OPTIONS_SUCCESS,
            meta: {
                meta: 'meta',
                receivedAt: 1,
            },
            payload: 'payload',
        }

        expect(actual).toEqual(expected)
    })
})

describe('fetchParameterOptionsFail', () => {
    it('should create a FETCH_PARAMETER_OPTIONS_FAIL action', () => {
        const actual = actions.fetchParameterOptionsFail('error', {
            meta: 'meta',
        })
        const expected = {
            type: types.FETCH_PARAMETER_OPTIONS_FAIL,
            meta: {
                meta: 'meta',
                receivedAt: 1,
            },
            error: 'error',
        }

        expect(actual).toEqual(expected)
    })
})

describe('fetchParameterOptions', () => {
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
            .reply(200, mockResponse)

        const store = mockStore({})
        const expectedActions = [
            {
                type: types.FETCH_PARAMETER_OPTIONS,
                meta,
            },
            {
                type: types.FETCH_PARAMETER_OPTIONS_SUCCESS,
                meta: {
                    ...meta,
                    receivedAt: 1,
                },
                payload: mockResponse,
            },
        ]

        return store
            .dispatch(actions.fetchParameterOptions(endpoint, meta))
            .then(() => expect(store.getActions()).toEqual(expectedActions))
    })

    it('should handle unsuccessful fetches', () => {
        const { origin, pathname } = new URL(url)
        const meta = { meta: 'data' }

        const error = new Error('Internal Server Error')
        nock(origin)
            .get(pathname)
            .reply(500, {})

        const store = mockStore({})
        const expectedActions = [
            {
                type: types.FETCH_PARAMETER_OPTIONS,
                meta,
            },
            {
                type: types.FETCH_PARAMETER_OPTIONS_FAIL,
                meta: {
                    ...meta,
                    receivedAt: 1,
                },
                error: error,
            },
        ]

        return store
            .dispatch(actions.fetchParameterOptions(endpoint, meta))
            .then(() => expect(store.getActions()).toEqual(expectedActions))
    })
})

describe('fetchParameterOptionsIfNeeded', () => {
    const { origin, pathname } = new URL(url)

    beforeEach(() => {
        nock.disableNetConnect()
    })

    afterEach(() => {
        nock.cleanAll()
        nock.enableNetConnect()
    })

    it('should fetch job types if needed', () => {
        const mockResponse = { data: 'data' }
        nock(origin)
            .get(pathname)
            .reply(200, mockResponse)
        selectors.getShouldFetch.mockReturnValueOnce(true)

        const store = mockStore({})
        const expectedActions = [
            {
                type: types.FETCH_PARAMETER_OPTIONS,
                meta: {
                    jobType: 'jobType',
                    parameterName: 'parameterName',
                },
            },
            {
                type: types.FETCH_PARAMETER_OPTIONS_SUCCESS,
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
                actions.fetchParameterOptionsIfNeeded(
                    endpoint,
                    'jobType',
                    'parameterName'
                )
            )
            .then(() => expect(store.getActions()).toEqual(expectedActions))
    })

    it('should not fetch job types if not needed', () => {
        selectors.getShouldFetch.mockReturnValueOnce(false)
        const store = mockStore({})

        return store
            .dispatch(actions.fetchParameterOptionsIfNeeded())
            .then(() => expect(store.getActions()).toEqual([]))
    })
})
