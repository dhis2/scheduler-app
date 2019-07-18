import 'isomorphic-fetch'
import fetchy from './fetchy'

window.fetch = jest.fn()
window.Headers = jest.fn()

describe('fetchy', () => {
    it('should reject with an error on fetch errors', () => {
        const error = new Error('Fetch error')

        window.fetch.mockImplementationOnce(() => Promise.reject(error))

        expect.assertions(1)

        return expect(fetchy('endpoint')).rejects.toThrowErrorMatchingSnapshot()
    })

    it('should resolve with the data if the response is ok and there is data', () => {
        const expected = { data: 'data' }
        const headers = { 'Content-Type': 'application/json' }
        const init = { status: 200, statusText: 'OK', headers }
        const body = JSON.stringify(expected)
        const response = new Response(body, init)

        window.fetch.mockImplementationOnce(() => Promise.resolve(response))

        expect.assertions(1)

        return expect(fetchy('endpoint')).resolves.toEqual(expected)
    })

    it('should resolve with undefined if the response is ok and there is no data', () => {
        const init = { status: 200, statusText: 'OK' }
        const response = new Response(null, init)

        window.fetch.mockImplementationOnce(() => Promise.resolve(response))

        expect.assertions(1)

        return expect(fetchy('endpoint')).resolves.toBeUndefined()
    })

    it('should reject with an error if the response contains invalid json', () => {
        const headers = { 'Content-Type': 'application/json' }
        const init = { status: 200, statusText: 'OK', headers }
        const response = new Response([], init)

        window.fetch.mockImplementationOnce(() => Promise.resolve(response))

        expect.assertions(1)

        return expect(fetchy('endpoint')).rejects.toThrowErrorMatchingSnapshot()
    })

    it('should reject with an error with the message in response data if the response is not ok', () => {
        const message = 'Errormessage'
        const body = JSON.stringify({ message })
        const init = { status: 401 }
        const response = new Response(body, init)

        window.fetch.mockImplementationOnce(() => Promise.resolve(response))

        expect.assertions(1)

        return expect(fetchy('endpoint')).rejects.toThrow(message)
    })

    it('should attach details to the error if there are any and the response is not ok', () => {
        const message = 'Errormessage'
        const details = 'Details'
        const data = {
            message,
            response: {
                errorReports: [
                    {
                        message: details,
                    },
                ],
            },
        }
        const body = JSON.stringify(data)
        const init = { status: 401 }
        const response = new Response(body, init)

        window.fetch.mockImplementationOnce(() => Promise.resolve(response))

        expect.assertions(1)

        return fetchy('endpoint').catch(error => {
            expect(error.details).toEqual([details])
        })
    })

    it('should reject with an error if the response is not ok and contains malformed json', () => {
        const init = { status: 401 }
        const response = new Response([], init)

        window.fetch.mockImplementationOnce(() => Promise.resolve(response))

        expect.assertions(1)

        return expect(fetchy('endpoint')).rejects.toThrowErrorMatchingSnapshot()
    })

    it('should reject with an error with the statusText if the response is not ok and there is no message', () => {
        const statusText = 'statusText'
        const body = JSON.stringify({})
        const init = { status: 401, statusText }
        const response = new Response(body, init)

        window.fetch.mockImplementationOnce(() => Promise.resolve(response))

        expect.assertions(1)

        return expect(fetchy('endpoint')).rejects.toThrow(statusText)
    })

    it('should reject with an error with the fallback message if the response is not ok and there is no message or statusText', () => {
        const body = JSON.stringify({})
        const init = { status: 401, statusText: '' }
        const response = new Response(body, init)

        window.fetch.mockImplementationOnce(() => Promise.resolve(response))

        expect.assertions(1)

        return expect(fetchy('endpoint')).rejects.toThrowErrorMatchingSnapshot()
    })
})
