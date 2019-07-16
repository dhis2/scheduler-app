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

/**
 * Mocks
 */

// Return consistent date for testing
Date.now = jest.fn(() => 1)

// Allow selectors to be mocked
selectors.getShouldFetch = jest.fn() // eslint-disable-line import/namespace
rootSelectors.getJobTypes = jest.fn() // eslint-disable-line import/namespace

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

/**
 * Fetch job types
 */

describe('fetchJobTypesSuccess', () => {
    it('should create a FETCH_JOB_TYPES_SUCCESS action', () => {
        const actual = actions.fetchJobTypesSuccess('payload')
        const expected = {
            type: types.FETCH_JOB_TYPES_SUCCESS,
            meta: {
                receivedAt: 1,
            },
            payload: 'payload',
        }

        expect(actual).toEqual(expected)
    })
})

describe('fetchJobTypesFail', () => {
    it('should create a FETCH_JOB_TYPES_FAIL action', () => {
        const actual = actions.fetchJobTypesFail('error')
        const expected = {
            type: types.FETCH_JOB_TYPES_FAIL,
            meta: {
                receivedAt: 1,
            },
            error: 'error',
        }

        expect(actual).toEqual(expected)
    })
})

describe('fetchJobTypes', () => {
    const { origin, pathname } = new URL(endpoints.jobTypes)

    beforeEach(() => {
        nock.disableNetConnect()
    })

    afterEach(() => {
        nock.cleanAll()
        nock.enableNetConnect()
    })

    it('should handle successful fetches', () => {
        const mockResponse = { data: 'data' }
        nock(origin)
            .get(pathname)
            .reply(200, mockResponse)

        const store = mockStore({})
        const expectedActions = [
            { type: types.FETCH_JOB_TYPES },
            {
                type: types.FETCH_JOB_TYPES_SUCCESS,
                meta: {
                    receivedAt: 1,
                },
                payload: mockResponse,
            },
        ]

        return store
            .dispatch(actions.fetchJobTypes())
            .then(() => expect(store.getActions()).toEqual(expectedActions))
    })

    it('should handle unsuccessful fetches', () => {
        const error = new Error('Internal Server Error')
        nock(origin)
            .get(pathname)
            .reply(500)

        const store = mockStore({})
        const expectedActions = [
            { type: types.FETCH_JOB_TYPES },
            {
                type: types.FETCH_JOB_TYPES_FAIL,
                meta: {
                    receivedAt: 1,
                },
                error: error,
            },
        ]

        return store
            .dispatch(actions.fetchJobTypes())
            .then(() => expect(store.getActions()).toEqual(expectedActions))
    })
})

describe('fetchJobTypesIfNeeded', () => {
    const { origin, pathname } = new URL(endpoints.jobTypes)

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
            { type: types.FETCH_JOB_TYPES },
            {
                type: types.FETCH_JOB_TYPES_SUCCESS,
                meta: {
                    receivedAt: 1,
                },
                payload: mockResponse,
            },
        ]

        return store
            .dispatch(actions.fetchJobTypesIfNeeded())
            .then(() => expect(store.getActions()).toEqual(expectedActions))
    })

    it('should not fetch job types if not needed', () => {
        selectors.getShouldFetch.mockReturnValueOnce(false)
        const store = mockStore({})

        return store
            .dispatch(actions.fetchJobTypesIfNeeded())
            .then(() => expect(store.getActions()).toEqual([]))
    })
})
