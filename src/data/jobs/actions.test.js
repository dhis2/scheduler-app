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

const { origin, pathname } = new URL(endpoints.jobs)

/**
 * Mocks
 */

// Allow selectors to be mocked
selectors.getShouldFetch = jest.fn() // eslint-disable-line import/namespace
rootSelectors.getJobs = jest.fn() // eslint-disable-line import/namespace

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

/**
 * Tests
 */

describe('fetchJobsSuccess', () => {
    it('should create a FETCH_JOBS_SUCCESS action', () => {
        const actual = actions.fetchJobsSuccess('payload')
        const expected = {
            type: types.FETCH_JOBS_SUCCESS,
            payload: 'payload',
        }

        expect(actual).toEqual(expected)
    })
})

describe('fetchJobsFail', () => {
    it('should create a FETCH_JOBS_FAIL action', () => {
        const actual = actions.fetchJobsFail('error')
        const expected = {
            type: types.FETCH_JOBS_FAIL,
            error: 'error',
        }

        expect(actual).toEqual(expected)
    })
})

describe('fetchJobs', () => {
    beforeEach(() => {
        nock.disableNetConnect()
    })

    afterEach(() => {
        nock.cleanAll()
        nock.enableNetConnect()
    })

    it('should handle successful fetches', () => {
        const mockResponse = { jobConfigurations: [{ id: 1 }] }
        const mockNormalized = {
            entities: {
                jobs: { 1: { id: 1 } },
            },
            result: [1],
        }
        nock(origin)
            .get(pathname)
            .query(true)
            .reply(200, mockResponse)

        const store = mockStore({})
        const expectedActions = [
            { type: types.FETCH_JOBS },
            {
                type: types.FETCH_JOBS_SUCCESS,
                payload: mockNormalized,
            },
        ]

        return store
            .dispatch(actions.fetchJobs())
            .then(() => expect(store.getActions()).toEqual(expectedActions))
    })

    it('should handle unsuccessful fetches', () => {
        const error = new Error('Internal Server Error')
        nock(origin)
            .get(pathname)
            .query(true)
            .reply(500)

        const store = mockStore({})
        const expectedActions = [
            { type: types.FETCH_JOBS },
            {
                type: types.FETCH_JOBS_FAIL,
                error: error,
            },
        ]

        return store
            .dispatch(actions.fetchJobs())
            .then(() => expect(store.getActions()).toEqual(expectedActions))
    })
})

describe('fetchJobsIfNeeded', () => {
    beforeEach(() => {
        nock.disableNetConnect()
    })

    afterEach(() => {
        nock.cleanAll()
        nock.enableNetConnect()
    })

    it('should fetch jobs if needed', () => {
        const mockResponse = { jobConfigurations: [{ id: 1 }] }
        const mockNormalized = {
            entities: {
                jobs: { 1: { id: 1 } },
            },
            result: [1],
        }
        nock(origin)
            .get(pathname)
            .query(true)
            .reply(200, mockResponse)
        selectors.getShouldFetch.mockReturnValueOnce(true)

        const store = mockStore({})
        const expectedActions = [
            { type: types.FETCH_JOBS },
            {
                type: types.FETCH_JOBS_SUCCESS,
                payload: mockNormalized,
            },
        ]

        return store
            .dispatch(actions.fetchJobsIfNeeded())
            .then(() => expect(store.getActions()).toEqual(expectedActions))
    })

    it('should not fetch jobs if not needed', () => {
        selectors.getShouldFetch.mockReturnValueOnce(false)
        const store = mockStore({})

        return store
            .dispatch(actions.fetchJobsIfNeeded())
            .then(() => expect(store.getActions()).toEqual([]))
    })
})
