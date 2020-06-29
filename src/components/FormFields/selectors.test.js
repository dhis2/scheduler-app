import {
    getParameterEndpoint,
    getJobTypeObject,
    getJobTypeParameters,
    getStringValue,
} from './selectors'

describe('getParameterEndpoint', () => {
    it('removes /api/ from the start of the endpoint', () => {
        const endpoint = '/api/resource'
        const expected = 'resource'
        const actual = getParameterEndpoint(endpoint)

        expect(actual).toBe(expected)
    })

    it('returns empty strings as is', () => {
        const endpoint = ''
        const expected = ''
        const actual = getParameterEndpoint(endpoint)

        expect(actual).toBe(expected)
    })

    it('returns endpoints that are not preceded by /api/ as is', () => {
        const endpoint = 'resource'
        const expected = 'resource'
        const actual = getParameterEndpoint(endpoint)

        expect(actual).toBe(expected)
    })
})

describe('getJobTypeObject', () => {
    it('returns the requested job type object', () => {
        const jobTypes = [
            { jobType: 'one' },
            { jobType: 'two' },
            { jobType: 'three' },
        ]
        const jobType = 'one'
        const expected = { jobType: 'one' }
        const actual = getJobTypeObject(jobTypes, jobType)

        expect(actual).toEqual(expected)
    })
})

describe('getJobTypeParameters', () => {
    it('returns an array with all parameters for the requested job type', () => {
        const jobTypes = [
            { jobType: 'one', jobParameters: ['parameter one'] },
            { jobType: 'two', jobParameters: ['parameter two'] },
            { jobType: 'three', jobParameters: ['parameter three'] },
        ]
        const jobType = 'one'
        const expected = ['parameter one']
        const actual = getJobTypeParameters(jobTypes, jobType)

        expect(actual).toEqual(expected)
    })

    it('returns an empty array for a job type that has no job parameters', () => {
        const jobTypes = [
            { jobType: 'one' },
            { jobType: 'two' },
            { jobType: 'three' },
        ]
        const jobType = 'one'
        const expected = []
        const actual = getJobTypeParameters(jobTypes, jobType)

        expect(actual).toEqual(expected)
    })
})

describe('getStringValue', () => {
    it('returns numbers as a string', () => {
        const number = 1
        const expected = '1'
        const actual = getStringValue(number)

        expect(actual).toBe(expected)
    })

    it('returns values that are not numbers as is', () => {
        const str = '1'
        const arr = []
        const obj = {}

        expect(getStringValue(str)).toBe(str)
        expect(getStringValue(arr)).toBe(arr)
        expect(getStringValue(obj)).toBe(obj)
    })
})
