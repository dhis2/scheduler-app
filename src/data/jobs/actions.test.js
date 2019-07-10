/**
 * @jest-environment node
 */

import 'isomorphic-fetch'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import urlJoin from 'url-join'
import * as rootSelectors from '../../rootSelectors'
import endpoints from '../../services/endpoints'
import * as types from './actionTypes'
import * as actions from './actions'
import * as selectors from './reducer'

/**
 * Mocks
 */

// Allow selectors to be mocked
selectors.getShouldFetch = jest.fn() // eslint-disable-line import/namespace
rootSelectors.getJobs = jest.fn() // eslint-disable-line import/namespace

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

/**
 * Fetch jobs
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
    const { origin, pathname } = new URL(endpoints.jobs)

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
    const { origin, pathname } = new URL(endpoints.jobs)

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

/**
 * Enable job
 */

describe('enableJobSuccess', () => {
    it('should create a ENABLE_JOB_SUCCESS action', () => {
        const actual = actions.enableJobSuccess()
        const expected = {
            type: types.ENABLE_JOB_SUCCESS,
        }

        expect(actual).toEqual(expected)
    })
})

describe('enableJobFail', () => {
    it('should create a ENABLE_JOB_FAIL action', () => {
        const error = new Error()
        const actual = actions.enableJobFail(error)
        const expected = {
            type: types.ENABLE_JOB_FAIL,
            error,
        }

        expect(actual).toEqual(expected)
    })
})

describe('enableJob', () => {
    const id = 'id'
    const { origin, pathname } = new URL(urlJoin(endpoints.jobs, `/${id}`))

    beforeEach(() => {
        nock.disableNetConnect()
    })

    afterEach(() => {
        nock.cleanAll()
        nock.enableNetConnect()
    })

    it('should handle successful fetches', () => {
        nock(origin)
            .patch(pathname)
            .reply(204)

        const store = mockStore({})
        const expectedActions = [
            { type: types.ENABLE_JOB },
            {
                type: types.ENABLE_JOB_SUCCESS,
            },
        ]

        return store
            .dispatch(actions.enableJob(id))
            .then(() => expect(store.getActions()).toEqual(expectedActions))
    })

    it('should handle unsuccessful fetches', () => {
        const error = new Error('Internal Server Error')
        nock(origin)
            .patch(pathname)
            .reply(500)

        const store = mockStore({})
        const expectedActions = [
            { type: types.ENABLE_JOB },
            {
                type: types.ENABLE_JOB_FAIL,
                error,
            },
        ]

        return store
            .dispatch(actions.enableJob(id))
            .then(() => expect(store.getActions()).toEqual(expectedActions))
    })
})

/**
 * Disable job
 */

describe('disableJobSuccess', () => {
    it('should create a DISABLE_JOB_SUCCESS action', () => {
        const actual = actions.disableJobSuccess()
        const expected = {
            type: types.DISABLE_JOB_SUCCESS,
        }

        expect(actual).toEqual(expected)
    })
})

describe('disableJobFail', () => {
    it('should create a DISABLE_JOB_FAIL action', () => {
        const error = new Error()
        const actual = actions.disableJobFail(error)
        const expected = {
            type: types.DISABLE_JOB_FAIL,
            error,
        }

        expect(actual).toEqual(expected)
    })
})

describe('disableJob', () => {
    const id = 'id'
    const { origin, pathname } = new URL(urlJoin(endpoints.jobs, `/${id}`))

    beforeEach(() => {
        nock.disableNetConnect()
    })

    afterEach(() => {
        nock.cleanAll()
        nock.enableNetConnect()
    })

    it('should handle successful fetches', () => {
        nock(origin)
            .patch(pathname)
            .reply(204)

        const store = mockStore({})
        const expectedActions = [
            { type: types.DISABLE_JOB },
            {
                type: types.DISABLE_JOB_SUCCESS,
            },
        ]

        return store
            .dispatch(actions.disableJob(id))
            .then(() => expect(store.getActions()).toEqual(expectedActions))
    })

    it('should handle unsuccessful fetches', () => {
        const error = new Error('Internal Server Error')
        nock(origin)
            .patch(pathname)
            .reply(500)

        const store = mockStore({})
        const expectedActions = [
            { type: types.DISABLE_JOB },
            {
                type: types.DISABLE_JOB_FAIL,
                error,
            },
        ]

        return store
            .dispatch(actions.disableJob(id))
            .then(() => expect(store.getActions()).toEqual(expectedActions))
    })
})

/**
 * Delete job
 */

describe('deleteJobSuccess', () => {
    it('should create a DELETE_JOB_SUCCESS action', () => {
        const actual = actions.deleteJobSuccess()
        const expected = {
            type: types.DELETE_JOB_SUCCESS,
        }

        expect(actual).toEqual(expected)
    })
})

describe('deleteJobFail', () => {
    it('should create a DELETE_JOB_FAIL action', () => {
        const error = new Error()
        const actual = actions.deleteJobFail(error)
        const expected = {
            type: types.DELETE_JOB_FAIL,
            error,
        }

        expect(actual).toEqual(expected)
    })
})

describe('deleteJob', () => {
    const id = 'id'
    const { origin, pathname } = new URL(urlJoin(endpoints.jobs, `/${id}`))

    beforeEach(() => {
        nock.disableNetConnect()
    })

    afterEach(() => {
        nock.cleanAll()
        nock.enableNetConnect()
    })

    it('should handle successful fetches', () => {
        nock(origin)
            .delete(pathname)
            .reply(200)

        const store = mockStore({})
        const expectedActions = [
            { type: types.DELETE_JOB },
            {
                type: types.DELETE_JOB_SUCCESS,
            },
        ]

        return store
            .dispatch(actions.deleteJob(id))
            .then(() => expect(store.getActions()).toEqual(expectedActions))
    })

    it('should handle unsuccessful fetches', () => {
        const error = new Error('Internal Server Error')
        nock(origin)
            .delete(pathname)
            .reply(500)

        const store = mockStore({})
        const expectedActions = [
            { type: types.DELETE_JOB },
            {
                type: types.DELETE_JOB_FAIL,
                error,
            },
        ]

        return store
            .dispatch(actions.deleteJob(id))
            .then(() => expect(store.getActions()).toEqual(expectedActions))
    })
})

/**
 * Run job
 */

describe('runJobSuccess', () => {
    it('should create a RUN_JOB_SUCCESS action', () => {
        const actual = actions.runJobSuccess()
        const expected = {
            type: types.RUN_JOB_SUCCESS,
        }

        expect(actual).toEqual(expected)
    })
})

describe('runJobFail', () => {
    it('should create a RUN_JOB_FAIL action', () => {
        const error = new Error()
        const actual = actions.runJobFail(error)
        const expected = {
            type: types.RUN_JOB_FAIL,
            error,
        }

        expect(actual).toEqual(expected)
    })
})

describe('runJob', () => {
    const id = 'id'
    const { origin, pathname } = new URL(
        urlJoin(endpoints.jobs, `/${id}/execute`)
    )

    beforeEach(() => {
        nock.disableNetConnect()
    })

    afterEach(() => {
        nock.cleanAll()
        nock.enableNetConnect()
    })

    it('should handle successful fetches', () => {
        nock(origin)
            .get(pathname)
            .reply(200)

        const store = mockStore({})
        const expectedActions = [
            { type: types.RUN_JOB },
            {
                type: types.RUN_JOB_SUCCESS,
            },
        ]

        return store
            .dispatch(actions.runJob(id))
            .then(() => expect(store.getActions()).toEqual(expectedActions))
    })

    it('should handle unsuccessful fetches', () => {
        const error = new Error('Internal Server Error')
        nock(origin)
            .get(pathname)
            .reply(500)

        const store = mockStore({})
        const expectedActions = [
            { type: types.RUN_JOB },
            {
                type: types.RUN_JOB_FAIL,
                error,
            },
        ]

        return store
            .dispatch(actions.runJob(id))
            .then(() => expect(store.getActions()).toEqual(expectedActions))
    })
})
